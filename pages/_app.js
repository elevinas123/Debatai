import '@/styles/globals.css'
import Navbar from './../components/Navbar';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [need, setNeed] = useState(true)
  if (need) {
    try {
      fetch("/Debatai/api/connectToDB")
      console.log("connectToDB")
    } catch(error) {
      console.log(error)
    }
    setNeed(false)
  }
  return (
    <div className='flex'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
