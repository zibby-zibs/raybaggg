import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import  { useRouter } from 'next/router';
import Image from 'next/image'
import useAuth from '../hooks/useAuth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { IoIosCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';

type Props = {}
interface Inputs {
    password: string
}

function reset({}: Props) {

  const router = useRouter()

    const [login, setLogin] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)
    const { updatePassword, error } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async({password}) => {
        if (login) {
            await updatePassword?.(password)
            router.push('/')
        }
    }

  return (
    <main className='flex flex-col justify-center items-center space-y-3 h-screen'>

        <Image 
          src='/btc_wallpaper.jpg'
          alt=""
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
     
    <form onSubmit={handleSubmit(onSubmit)} className=' space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
      <h1 className='capitalize text-4xl font-semibold text-white'>Reset password</h1>
      <div className='space-y-4'>
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
        <button className='w-full rounded bg-white py-3 font-semibold capitalize' 
            onClick={() => setLogin(true)}
          >
            Update Password
          </button>
      </div>
            
    </form>
  </main>
  )
}

export default reset