import Link from 'next/link'



const Play = (props) => {



    return (
        <div className='card w-96 h-64 mt-32 ml-32 bg-teal-500'>
            <div className='card-body'>
                <h2 className="card-title text-black">Join a 1v1 debate</h2>
                <p className='text-black'>Here you can join a 1v1 debate. The theme you will be talking, will be given.</p>
                <div className="card-actions justify-end">
                <Link href="/1v1" ><button className="btn btn-primary">Join</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Play