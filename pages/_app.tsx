import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import Layout from '../components/Layout'
import { RecoilRoot } from 'recoil'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <main className='bg-[#182122]'>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </RecoilRoot>
        
    </AuthProvider>
  )
}

export default MyApp
