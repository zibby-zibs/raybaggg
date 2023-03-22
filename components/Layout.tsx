import React from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
    children: React.ReactNode
}

function Layout({children}: Props) {
  return (
    <div>
        <Header />
            <main>{children}</main>
        <Footer />
    </div>
  )
}

export default Layout