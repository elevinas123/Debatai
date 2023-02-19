

const NavElement = (props) => {

console.log(props)

    return (
        <div className="hover:bg-teal-300 mt-3 text-center h-10 font-sans text-lg font-bold">
            {props.name}
        </div>
    )
}


export default NavElement