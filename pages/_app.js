import '@/styles/globals.css'
import Navbar from './../components/Navbar';

export default function App({ Component, pageProps }) {
  try {
    fetch("http://localhost:3000/api/connectToDB")
    console.log("connectToDB")
  } catch(error) {
    console.log(error)
  }
  return (
    <div className='flex'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
