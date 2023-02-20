
import { useRef } from 'react';

const Vid = ({reference}) => {


    return (
        <video ref={reference} autoPlay playsInline  className=" "/>
    )
}

export default Vid