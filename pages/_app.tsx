import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router)
  useEffect(() => {
    console.log('--- path changed')
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      wb.register()
      console.log('--- registered')
    }
  }, [router.pathname])

  return <Component {...pageProps} />
}

export default MyApp
