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
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      const promptNewVersionAvailable = () => {
        console.log('----- waiting')
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (confirm('新しいバージョンが利用できます。リロードしますか？')) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSkipWaiting()
        } else {
          console.log(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          )
        }
      }
      wb.addEventListener('installed', (evnet: any) => {
        console.log('----- installed', event)
      })

      wb.addEventListener('activated', (evnet: any) => {
        console.log('----- activated', event)
      })
      wb.addEventListener('message', (event: any) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('waiting', promptNewVersionAvailable)
      // register falseにしないと？
      wb.register()
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
