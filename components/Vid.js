
import { useRef } from 'react';

const Vid = ({reference}) => {
    return (
        <div className='bg-red-600'>
            <video ref={reference} autoPlay playsInline  className=" p-3 bg-red-600 w-96 "/>
            
        </div>
    )
}

export default Vid