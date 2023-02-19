
import { useState } from 'react';

const Theme = (props) => {
    const today = "Lorem  ipsum ist gut"
    const tomorrow = "Lorem  ipsum ist nicht du  gut"


    return (
        <div className="bg-teal-500 mt-5">
           {props.hovered?`${props.today?"Today":"Tommorow"}'s theme: ${props.today?today:tomorrow}`:`${props.today?"Today":"Tommorow"}`}
        </div>
    )
}

export default Theme