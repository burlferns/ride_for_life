import React, {useEffect, useState} from 'react';

import NavDesktop from './NavDesktop.js'
import NavMobile from './NavMobile.js';

export default function(props) {
  const className = props.className;
  const navArray = props.navArray;

  const [width, setWidth] = useState(window.innerWidth);

  //This width and higher shows the desktop version of the menu
  const transitionPt = 600;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      { width < transitionPt ?
        <NavMobile className={className} navArray={navArray}/> :
        <NavDesktop className={className} navArray={navArray}/>
      }
    </>
  )


}