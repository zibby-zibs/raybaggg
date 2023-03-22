import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavLink } from 'react-router-dom'
import {data} from '../utils/links'

type Props = {}

function Footer({}: Props) {


  const router = useRouter()
  return (
    <main className='sticky bottom-1 flex justify-between mx-auto  max-w-sm  rounded-full bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10'>
      <section className='flex justify-between items-center w-full p-4 rounded-full'>
        {
          data?.map((data)=>{
            const { id, text, push, icon } = data
            return (
              <Link href={push}>
                <div key={id} className='flex flex-col items-center text-[#468fb4] text-sm md:text-xl font-extralight'>
                    {icon} {text}
                </div>
              </Link>
            )
          })
        }
        
      </section>

    </main>
    
  )
}

export default Footer