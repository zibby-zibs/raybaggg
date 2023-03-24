import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuth from '../hooks/useAuth'
import { CiMenuKebab } from 'react-icons/ci'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { GoSignIn } from 'react-icons/go'
import { FaHome } from 'react-icons/fa'
import { HiCurrencyDollar } from 'react-icons/hi'
type Props = {}

function Header({}: Props) {

    const {user, profile, logout} = useAuth()


    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
  return (
    <header className='z-50 font-prompt w-full flex justify-between items-center text-white p-2 sticky top-0 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 drop-shadow-xl'>
        <section className='font-righteous'>
          <h1 className='text-[#c1f888]'>Trustifield</h1>
          <h4 className='font-light'>Trading company</h4>
        </section>

        <section className='relative flex items-center'>
            <img
              src={profile?.avatar_url}
              alt='user-img'
              height={0}
              width={0}
              sizes='100vw'
              className='object-contain rounded-full h-9 w-9'
            />
            <CiMenuKebab className='cursor-pointer text-xl hover:text-[#ccf888]' onClick={()=>setShowModal(!showModal)}/>
            {
              showModal && 
              <aside className='absolute top-11 right-1 bg-[#202a2b]'>
                <ul className='list-none p-3 space-y-8' onClick={()=>setShowModal(!showModal)}>
    
                    <li onClick={()=>router.push('/')} className='cursor-pointer flex gap-3 items-center border-l-2 border-[#f35b04]'><FaHome />Home</li>

              
                    <li onClick={()=>router.push('/activeInvestment')} className='cursor-pointer flex gap-3 items-center border-l-2 border-[#f35b04]'><HiCurrencyDollar  />Investments</li>

              
                    <li onClick={()=>router.push('/login')} className='cursor-pointer flex gap-3 items-center border-l-2 border-[#f35b04]'><GoSignIn />Sign in</li>

              
                    <li onClick={logout} className='cursor-pointer flex gap-3 items-center border-l-2 border-[#f35b04]'><AiOutlinePoweroff />Sign out</li>

                </ul>
              </aside>
            }
        </section>
    </header>
  )
}

export default Header