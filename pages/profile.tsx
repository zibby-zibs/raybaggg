import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '../hooks/useAuth';
import { supabase } from '../libs';
import { Database } from '../db_types'
import Avatar from '../components/Avatar';
import { useRecoilState } from 'recoil';
import { publicUrlState } from '../atoms/urlAtoms';
import { Router } from 'react-router-dom';
import { useRouter } from 'next/router'
import { IoIosCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';
type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {}



interface Inputs {
    username: string;
    full_name: string
  }
function profile({}: Props) {

    const {user, profile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [login, setLogin] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [usernames, setUsernames] = useState<string[]>([]);
    const [avatarUrl, setAvatarUrl] = useRecoilState<Profiles['avatar_url']>(publicUrlState)
    const [error, setError] = useState({message: "", type: ""})
    const [referralLink, setReferralLink] = useState<string | null>(null);
    const [signupsCount, setSignupsCount] = useState<number | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async({username}) => {
     if (isUserNameTaken(username)) {
        console.log('nope, already taken') //if the username is taken, the form won't submit
        setError({message: 'username exists', type: 'error'})
     } 
    if (!isUserNameTaken(username) && login){
        const { username, full_name } = getValues();
        console.log(username, full_name)
        const { error} = await supabase
        .from('profiles')
        .upsert({id: user?.id, username, full_name})
        if (error){
          //do something
          setError({message: error.message, type: 'error'})
        } else {
          //do something
          setError({message: 'Profile updated', type: 'success'})
          router.push('/')
        }
     }
  };



  async function getFullNames(): Promise<string[]> {
    const { data, error } = await supabase.from('profiles').select('username');
  
    if (error) {
      console.error(error);
      return [];
    }
  
    return data.map((profile) => profile.username); // the function return the list of all usernames in the supabase profiles table
  }

  useEffect(() => {
    const fetchData = async() => {
      const usernames = await getFullNames();
      setUsernames(usernames);  // set the list of usernames gotten from the getFullNames function to usernames
    }
    fetchData();
  }, []);

  const isUserNameTaken = (username: string)=>{
    return usernames.includes(username) //finally, check if whatever username the function receives is included in the list of usernames returned
  }

  useEffect(() => {
    getProfile()
  }) 

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, avatar_url`)
        .eq('id', user.id)
        .single() //get username, full_name and avatar url from profiles table

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setValue("username", data.username) //set the valueof username form input to the username coming from the profiles table
        setValue("full_name", data.full_name) //setthe value of full_name form input to the full_name coming from the profiles table
        setAvatarUrl(data.avatar_url) //set the value of avatarUrl  to the avatar_url coming from the profiles table. Of course this is in a global state
        
         if ( data.username && data.full_name && data.avatar_url) setIsDisabled(true) // if these aren't empty, then push the user to the homepage
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const generateReferralLink = async (userId: string | undefined) => {
    // create a new referral link for the user
    const referralLink = `http://localhost:3000/signup?ref=${userId}`;

    // add the referral link to the user's profile in the Supabase database
    await supabase.from('profiles').update({ referral_link: referralLink }).eq('id', userId);

     // retrieve the list of users who signed up with the referral link
      const { data: referredUsers, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('referred_by', userId);

    if (error) {
      console.error(error);
      setSignupsCount(null);
    } else {
      // update state with the referral link and signups count
      setReferralLink(referralLink);
      setSignupsCount(referredUsers?.length || null);
    }
    
  }; 

  useEffect(() => {
    const userId = profile?.id
    
      generateReferralLink(userId);
      console.log("x",referralLink)
      console.log("y",signupsCount)
      
  }, [profile]);
  
  const router = useRouter()
  return (
    <>
      <Header />
      <main className='h-screen flex flex-col items-center text-white space-y-3'>
          <section className='space-y-2 flex flex-col items-center'>
              <h1 className='uppercase xl:text-5xl text-[#c1f888]'>profile</h1>
              <p className='tracking-[2px] font-light'>Please fill in all details</p>
          </section>

          <section>
          { error?.type === 'success' ? (
            <aside className='z-20 px-3 py-1 flex bg-[#04de04] rounded-lg text-white'>
            <IoIosCheckmarkCircle className="w-6 h-6"/> {error?.message}
          </aside>) : (
          error?.type === 'error' &&
            <aside className='z-20 px-3 py-1 flex bg-[#d41111] rounded-lg text-white'>
            <IoMdCloseCircle className="w-6 h-6"/> {error?.message}
          </aside>)
        }  
              <Avatar />
              <form onSubmit={handleSubmit(onSubmit)}
                  className='space-y-5 p-5 max-w-3xl'
              >
                  <label className='inline-block w-full'>
                      <input type="text" 
                          value={user?.email} 
                          id="email" 
                          disabled
                          className='inputForm font-light'
                      />
                  </label>
              <label className='inline-block w-full'>
                  <input 
                    type="text" 
                    disabled={isDisabled}
                    placeholder='Enter username'  
                    className='inputForm'
                    {...register("username",{required: true})}
                  />
                  {
                    errors.username && 
                    <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
                  }
                </label>
              <label className='inline-block w-full'>
                  <input 
                    type="text" 
                    disabled={isDisabled}
                    placeholder='Enter Fullname'  
                    className='inputForm'
                    {...register("full_name",{required: true})}
                  />
                  {
                    errors.full_name && 
                    <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
                  }
                </label>

                <div className='w-full flex justify-center'>
                  <button 
                    onClick={()=>setLogin(true)}
                    className='bg-[#c1f888] p-3 outline-none w-full rounded-lg text-black font-semibold uppercase tracking-[3px]'>
                    Submit
                  </button>
                </div>
              </form>

              <aside>
                <h4>Referral ID: {referralLink}</h4>
                <p>Number of people that signed-up with your link: {signupsCount} </p>
              </aside>
          </section>
      </main>
      <Footer />
    </>
  )
}

export default profile