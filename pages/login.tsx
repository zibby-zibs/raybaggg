import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'
import Image from 'next/image';
import { IoIosCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

type Props = {}
interface Inputs {
  email: string;
  password: string
}

const signup = (props: Props) => {

    const [login, setLogin] = useState(false)
    const [isError, setIsError] = useState(true)
    const [passwordShown, setPasswordShown] = useState(false)
    const {signIn, error, setError} = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async({email, password}) => {
      if (login) {
      await signIn?.(email, password)
    }
  };

  useEffect(()=>{
    const timer = setTimeout(() => {
      setError?.({message: "", type: ""});
    }, 3000);
    return () => clearTimeout(timer);
  },[error])

  const router = useRouter();

  return (
    <main className='flex flex-col justify-center items-center space-y-3 h-screen'>

      <Image 
        src='/btc_wallpaper.jpg'
        alt=""
        unoptimized
        width={0}
        height={0}
        sizes="100vw"
        className='object-cover w-full h-full absolute top-0'
      />
  
      
       { error?.type === 'success' ? (
           <aside className='z-20 px-3 py-1 flex bg-[#04de04] rounded-lg text-white'>
           <IoIosCheckmarkCircle className="w-6 h-6"/> {error?.message}
         </aside>) : (
        error?.type === 'error' &&
           <aside className='z-20 px-3 py-1 flex bg-[#d41111] rounded-lg text-white'>
           <IoMdCloseCircle className="w-6 h-6"/> {error?.message}
         </aside>)
       }  
     

       

      <section className='drop-shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)} className=' space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
            <h1 className='capitalize text-4xl font-semibold text-white'>sign In</h1>
            <div className='space-y-4'>
              <label className='inline-block w-full'>
                <input 
                  type="email" 
                  id="" 
                  placeholder='Email'  
                  className='inputForm'
                  {...register("email",{required: true})}
                />
                {
                  errors.email && 
                  <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
                }
              </label>
              <label className='inline-block w-full relative'>
                <input 
                  type={passwordShown ? "text" : "password"}
                  id="" 
                  placeholder='Password' 
                  className='inputForm '
                  {...register("password", {required: true})}
                />
                {passwordShown? <AiFillEye className='text-white absolute right-2 top-[25%] w-6 h-6' onClick={()=>setPasswordShown(!passwordShown)}/> : <AiFillEyeInvisible className='text-white absolute right-2 top-[25%] w-6 h-6' onClick={()=>setPasswordShown(!passwordShown)}/>}
                {
                  errors.password && 
                  <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
                }
              </label>
            </div>
              
            <button className='w-full rounded bg-white py-3 font-semibold capitalize' 
              onClick={() => setLogin(true)}
            >
              sign In
            </button>

            <div className='text-[gray]'>
              New to RayBagg? &nbsp;
              <button type='submit' className='text-white hover:underline capitalize' onClick={() => router.push("signup")}>sign up now</button>
            </div>

            <div>
              <p 
                onClick={() =>router.push('updatePassword')}
                className='underline text-white cursor-pointer'
              >
                Forgot password
              </p>
            </div>
          </form>
      </section>
    </main>
  )
}

export default signup