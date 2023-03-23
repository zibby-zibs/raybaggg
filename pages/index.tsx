import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { userInfo } from 'os'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'

const Home: NextPage = () => {

    const {logout, user, profile} = useAuth()
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
        className='absolute top-0 left-0 h-full w-full object-cover opacity-20'
      />
      <section className='h-screen'>
        <div>
          <h1 className='uppercase w-[80%] text-2xl text-white leading-relaxed p-5'>a new and efficient way to invest your bitcoin and <span className='text-[#ccf888]'>yield</span>  amazing interest <span className='text-[#ccf888]'>weekly</span> </h1>
          <span className='bg-[#f35b04] p-3 uppercase ml-3 text-white'>start now</span>
        </div>
        <Image 
          src={'/fotor_AI.png'}
          alt='ai'
          height={0}
          width={0}
          sizes='100vw'
          className='w-72 h-72 object-contain'
        />
      </section>
      <Footer />
    </main>
  )
}

export default Home
