import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { MdOutlineDoubleArrow } from 'react-icons/md'

type Props = {}

function about({}: Props) {
  return (
    <>
      <Header />
      <main className=' h-screen flex flex-col items-center md:items-start space-y-3 text-white font-prompt'>
          <h1 className='pt-5 text-xl md:text-3xl mx-auto uppercase font-semibold'>About <span className='text-[#ccf888] tracking-[3px]'>Trustfield</span> </h1>

          <article className='font-prompt'>
            <h3 className='items-start px-3 uppercase underline'><span className='text-[#ccf888] tracking-[3px]'>Trustfield</span> investment policies</h3>
            <ul className='p-3 space-y-3'>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span> On every investment there will be a weekly 30% increment.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>Investors can only initiate withdrawal after 90 days except for VIPs.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>Referrals get a 10% profit of their investors.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>There is an extra 10% b  VIPs.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>After 90 days of investing you get a weekly 30% of your available balance.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>A long term investment worth $5,000,000 gets you on the company's shares.</li>
              <li className='flex gap-2 items-center'><span><MdOutlineDoubleArrow className='text-[#ccf888] md:text-2xl'/></span>Contact with the admin concerning issues, withdrawal and funding will happen over mail.</li>
            </ul>
          </article>
          <div className='w-full'>
            <h1 className='text-center uppercase md:text-3xl pt-5'>contact us</h1>
            <p className='text-center'>Please reach out to the admin using the form below. You will receive a reply.</p>
          </div> 
          <form action="" className='lg:max-w-md flex flex-col mx-auto space-y-3'>
            <label className='inline-block w-full'>
              <input 
                type="text" 
                placeholder='Your Email'
                className='inputForm'
              />
            </label>
            <label className='inline-block w-full'>
              <input 
                type="text" 
                placeholder='Your Name'
                className='inputForm'
              />
            </label>
            <label className='inline-block w-full'>
              <textarea  
                name="" 
                id="" 
                placeholder='Enter your message'
                className='inputForm'
              />
            </label>
          </form>
      </main>
      <Footer />
    </>
  )
}

export default about