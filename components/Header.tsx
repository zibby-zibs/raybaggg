import React, { useState } from 'react'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import { CiMenuKebab } from 'react-icons/ci'
type Props = {}

function Header({}: Props) {

    const {user, profile} = useAuth()

    const [showModal, setShowModal] = useState(false);

  return (
    <header className='font-prompt bg-[#182122] w-full flex justify-between items-center text-white p-2'>
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
            <CiMenuKebab onClick={()=>setShowModal(!showModal)}/>
            {
              showModal && 
              <aside className='absolute top-5 right-1 bg-[#202a2b]'>
                <ul className='list-none p-3'>
                  <li>Home</li>
                  <li>Active Investment</li>
                  <li>Sign in</li>
                  <li>Sign out</li>
                </ul>
              </aside>
            }
        </section>
    </header>
  )
}

export default Header