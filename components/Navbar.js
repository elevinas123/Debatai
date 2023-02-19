import NavElement from "./NavElement";
import { useState } from 'react';
import Theme from './Theme';

const Sidebar = () => {
  const [themeToday, setThemeToday] = useState("Lorem ipsum ist nicht gut fur mich")
  const [themeTomorrow, setThemeTomorrow] = useState("Lorem ipsum ist gut fur du")
  const [hovered, setHovered] = useState(false)
  return (

    <div className="flex flex-col bg-teal-400 w-16 h-screen hover:w-32 " onMouseEnter={()=> setHovered(true)} onMouseLeave={() => setHovered(false)} >
      <div>
        icon
      </div>
      <div className="mt-11 " >
        <NavElement   name={"Play"}/>
        <NavElement  name={"Learn"}/>
        <NavElement  name={"test3"}/>
      </div>
      <div className="mt-auto">
        <Theme today={true} hovered={hovered} />
        <Theme today={false} hovered={hovered}/>
      </div>

    <div>
      Account
    </div>


    </div>
  );
};

export default Sidebar;