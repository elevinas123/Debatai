import NavElement from "./NavElement";
import { useState } from 'react';
import Theme from './Theme';
import  Link  from 'next/link';

const Sidebar = () => {
  const [themeToday, setThemeToday] = useState("Lorem ipsum ist nicht gut fur mich")
  const [themeTomorrow, setThemeTomorrow] = useState("Lorem ipsum ist gut fur du")
  const [hovered, setHovered] = useState(false)
  return (

    <div className="menu bg-base-300 w-32 h-screen rounded-box">
      <Link href="/"><div>Icon</div></Link>
    <ul className="mt-">
     <NavElement name={"Debate"} link={"/debate"}/>
     <NavElement name={"Learn"} link={"/comingsoon"}/>
     <NavElement name={"Database"} link={"/comingsoon"}/>

    </ul>
    <ul>
      <div className="ml-2 mb-5">
        <div className="stat-title">Today's Debate:</div>
        <div className="stat-desc">Are people good?</div>
      </div>
      <div className="ml-2 mb-5">
        <div className="stat-title flex flex-wrap w-10">Tomorrow's Debate:</div>
        <div className="stat-desc">Am I good?</div>
      </div>
    </ul>
    
</div>
  );
};

export default Sidebar;