import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { userInfo } from 'os'
import { useRouter } from 'next/router'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { BsArrowRightCircle } from 'react-icons/bs'

const Home: NextPage = () => {

    const {logout, user, profile} = useAuth()
    const router = useRouter();
  return (
    <main className='min-h-screen relative font-prompt'>
      <Head>
        <title>Trustfield Trading Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Image 
        src={'/grid.jpg'}
        alt='background'
        height={0}
        width={0}
        sizes='100vw'
        className='-z-10 absolute top-0 left-0 h-full w-full object-cover opacity-20'
      />
      <section className='h-screen xl:flex xl:items-center font-semibold'>
        <Image 
          src={'/fotor_AI.png'}
          alt='ai'
          unoptimized
          height={0}
          width={0}
          sizes='100vw'
          className='z-0 absolute top-0 left-0 h-full w-full object-cover'
        />
        <div className='relative z-10 md:max-w-md text-white xl:text-black'>
          <h1 className='uppercase h-auto leading-10 w-[80%] text-2xl p-5 z-10'>a new and efficient way to invest your bitcoin and <span className='text-[#ccf888]'>yield</span>  amazing interest <span className='text-[#ccf888]'>weekly</span> </h1>
          <div className='flex gap-2'>
            <span 
              onClick={()=>router.push('/about')} 
              className='bg-[#f35b04] flex items-center gap-2 w-fit p-3 uppercase ml-3 text-white'
            >
              start now <BsArrowRightCircle className='text-3xl'/>
            </span>
            {!user || !profile && 
              <span 
                onClick={()=>router.push('/login')} 
                className='bg-[#f35b04] flex items-center gap-2 w-fit p-3 uppercase ml-3 text-white'
              >
                login <BsArrowRightCircle className='text-3xl'/>
              </span>
            }
          </div>
        </div>

      </section>
      
      <Footer />
    </main>
  )
}

export default Home
