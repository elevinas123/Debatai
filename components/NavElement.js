
import Link  from 'next/link';

const NavElement = (props) => {

    return (
        <li className="hover-bordered"><Link href={props.link}><div>{props.name}</div></Link></li>
    )
}


export default NavElement