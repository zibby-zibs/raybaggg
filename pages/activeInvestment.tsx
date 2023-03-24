import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import {  GiMoneyStack } from 'react-icons/gi'
import {  MdAttachMoney, MdStackedLineChart } from 'react-icons/md'
import { FaDollarSign } from 'react-icons/fa'
import {  BsFillBarChartLineFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'
type Props = {}

const activeInvestment = (props: Props) => {

    const { user, profile, btcValuesSum, dollarsValuesSum } = useAuth();
    const [screenSize, setScreenSize] = useState(0)
    const [screenWidth, setScreenWidth] = useState(false)

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      if (screenSize >= 1024) {
        setScreenWidth(true);
      } else {
        setScreenWidth(false);
      }
    }, [screenSize]);

    const router = useRouter();
  return (
    <>
      <Header />
      <main className={`h-full mt-16 font-prompt ${screenWidth && 'flex gap-3 px-4'}`}>
          {
            !profile && !user ? (
              <aside className='w-full h-screen flex flex-col p-2 items-center justify-center text-white text-xl space-y-3'>
                <p>Please <span className='underline' onClick={()=>router.push('/login')}>login</span> or <span className='underline' onClick={()=>router.push('/signup')}>sign up</span> to see your investments</p>
                <p>If you have signed in and can't see details, kindly refresh the page</p>
              </aside>
            ): (
              <section className={`relative flex flex-col items-center ${screenWidth && 'w-[70%]'}`}>
                <aside className='absolute border-[#c1bffd] border-2 h-52 w-52 rounded-full animate-pulse'>
                  {/* just for border and animation   */}
                </aside>
                <aside className='absolute border-[#ccf888] border-2 h-52 w-52 rounded-full animate-ping'>
                  {/* just for border and animation   */}
                </aside>
              
                <aside className='flex flex-col justify-center items-center h-52 w-52 space-y-3 font-prompt text-white rounded-full bg-[#202a2b] overflow-hidden '>
                    <div className='w-48 flex flex-col items-center'>
                      <h5 className='font-light'> Total amount</h5>
                      <h1 className='text-2xl font-semibold'>
                          ${dollarsValuesSum}
                      </h1>
                    </div>

                    <div className='text-[gray] flex flex-col justify-center'>
                      <p className=''>BTC: {btcValuesSum?.toString().substring(0,10)}...</p>
                    </div>

                </aside>

                <aside className='mt-10 space-y-8 md:flex md:space-x-8 md:space-y-0 '>
                  <aside className='relative flex flex-col items-center'>
                    <MdAttachMoney className='p-2 bg-[#ccf888] h-11 w-11 rounded-full absolute -top-4'/>
                    <div className='investment-container'>

                    balance
                    </div>
                  </aside>
                  <aside className='relative flex flex-col items-center'>
                    <GiMoneyStack className='p-2 bg-[#ccf888] h-11 w-11 rounded-full absolute -top-4'/>
                    <div className='investment-container'>

                    profit
                    </div>
                  </aside>
                  <aside className='relative flex flex-col items-center'>
                    <BsFillBarChartLineFill className='p-2 bg-[#ccf888] h-11 w-11 rounded-full absolute -top-4'/>
                    <div className='investment-container'>

                    Interest rate
                    </div>
                  </aside>
                  {/* <aside className='relative'>

                    <div>

                    </div>
                    balance
                  </aside> */}
                </aside>

                <aside className='mt-8 text-white text-center'>
                  <h1 className='text-xl'>Transaction history</h1>
                  <div className='space-y-4 '>
                    { profile?.deposit_made_dollars ? (
                      profile?.deposit_made_dollars?.map((deposit:number, i:number)=>{
                        return (
                          <div key={i} className='flex justify-between p-4 bg-[#202a2b] w-[90vw] rounded-2xl max-w-3xl mx-auto'>
                            <MdStackedLineChart className='text-[#ccf888]'/>
                            <p className='flex items-center'><FaDollarSign />{deposit}</p>
                          </div>
                        )
                      })
                    ) : (
                      <p> No transaction history yet. <span className='underline uppercase'>contact admin</span>  to fund your account</p>
                    )
                    }
                  </div>
                </aside>

              </section> )
          }
              { profile && screenWidth && (
                <section className='flex flex-col gap-5 w-full'>
                  <aside className='bg-[#202a2b] w-full flex flex-col items-center p-5 rounded-lg space-y-5'>
                    
                      <img 
                        src={profile?.avatar_url}
                        alt='user'
                        height={0}
                        width={0}
                        sizes='100vw'
                        className='rounded-full object-cover w-48 h-48 border-[#ccf888] border-2'
                      />
                    <div className='flex gap-3 items-center'>
                      <h1 className='bg-[#ccf888] p-1 rounded-xl font-righteous'> +1.2% </h1>
                      <BsFillArrowUpRightCircleFill className='text-[#ccf888] text-2xl'/>
                    </div>
                    <div className='flex flex-col space-y-2 items-center text-white'>
                      <h1 className=' font-righteous uppercase text-2xl'>Total Balance</h1>
                      <p className='text-xl'>$42.4567</p>
                    </div>
                    <div>
                      <h1 className='text-[#ccf888]'>withdrawal date: <span>11th March, 2023</span></h1>
                    </div>
                  </aside>
                  <aside className='bg-[#202a2b] w-full'>card 2</aside>
                </section>
                )
              }
           
      </main>
      <Footer />
    </>
  )
}

export default activeInvestment