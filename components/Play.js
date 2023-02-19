import Link from 'next/link'



const Play = (props) => {



    return (
        <div className="bg-slate-100 w-96 h-64 ml-32 mt-20 ">
            <Link href="/1v1" >
            <div className="text-center text-bold, text-lg shadow-inner">
                1V1 Debates
            </div>
            <div className="bg-teal-300 w-full h-full shadow-xl rounded-lg  " >
                
            </div>
            </Link>
        </div>
    )
}

export default Play