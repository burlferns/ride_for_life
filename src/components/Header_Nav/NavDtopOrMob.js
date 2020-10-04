import React, {useContext} from 'react';

import NavDesktop from './NavDesktop.js'
import NavMobile from './NavMobile.js';
import {ViewportContext} from '../../App.js';

export default function(props) {
  const className = props.className;
  const navArray = props.navArray;

  const vpSize = useContext(ViewportContext);

  //This width and higher shows the desktop version of the menu
  const transitionPt = 600;

  return (
    <>
      { vpSize[0] < transitionPt ?
        <NavMobile className={className} navArray={navArray}/> :
        <NavDesktop className={className} navArray={navArray}/>
      }
    </>
  )


}