import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { userInfo } from 'os'
import Avatar from '../components/Avatar'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'

const Home: NextPage = () => {

    const {logout, user, profile} = useAuth()
  return (
    <main className=' h-screen'>
      <Head>
        <title>Trustfield Trading Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className='text-white'>{profile?.username}</p>
    </main>
  )
}

export default Home
