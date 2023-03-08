
import { useRef } from 'react';

const Vid = ({reference, team}) => {
    return (
        <div >
            <video ref={reference} autoPlay playsInline  className={`w-96 p-3 bg-blue-500`}/>
            
        </div>
    )
}

export default Vid