import NavElement from "./NavElement";
import { useState } from 'react';
import Theme from './Theme';
import  Link  from 'next/link';

const Sidebar = () => {
  const [themeToday, setThemeToday] = useState("Lorem ipsum ist nicht gut fur mich")
  const [themeTomorrow, setThemeTomorrow] = useState("Lorem ipsum ist gut fur du")
  const [hovered, setHovered] = useState(false)
  return (
  <div className="menu flex flex-col bg-gray-600 rounded-box h-screen p-1 w-16">
    <ul className="">
      <li><Link href="/"><img src="https://img.icons8.com/ios/25/null/old-vmware-logo.png"/></Link></li>
      <li><Link href="/play"><img src="https://img.icons8.com/ios-glyphs/25/null/chat.png"/></Link></li>
    </ul>
    <ul className="flex flex-col mt-auto">
      <li><Link href="/play"><img src="https://img.icons8.com/ios/25/null/settings--v1.png"/></Link></li>
      <li><Link href="/play"><img src="https://img.icons8.com/ios/25/null/user-female-circle.png"/></Link></li>
    </ul>
    
  </div>
  );
};

export default Sidebar;