import Videos from "@/components/Videos";
import { useState, useEffect } from 'react';


export default function Debate (){

    const [s, setS] = useState(false)
    useEffect(() => {
      setS(true)
      }, [])

    return(
        <div className=""> 
            <div>Join random</div>
        </div>
    )

}