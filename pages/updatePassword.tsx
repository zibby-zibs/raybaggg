import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { IoIosCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';

type Props = {}
interface Inputs  {
  email: string;
}

const updatePassword = (props: Props) => {

  const [login, setLogin] = useState(false)

  const { passwordReset, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async({email}) => {
    if (login) {
    await passwordReset?.(email)
  }
};

const router = useRouter();
  return (
    <main className='flex flex-col justify-center items-center space-y-3 h-screen bg-[#d82a2a]'>

      
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
          <button className='w-full rounded bg-white py-3 font-semibold capitalize' 
              onClick={() => setLogin(true)}
            >
              Send Link
            </button>
        </div>
              
      </form>
    </main>
  )
}

export default updatePassword;