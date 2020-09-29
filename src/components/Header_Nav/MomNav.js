import React from 'react';

import NavDesktop from './NavDesktop.js'
import NavMobile from './NavMobile.js';

//These are the buttons to render for 
//nvaigation for moms
const momNavArray =[
  {
    text:'My Profile',
    path:'/mom/profile',
  },
  {
    text:'Drivers',
    path:'/mom/driversList',
  },
  {
    text:'My Reviews',
    path:'/mom/reviewsList',
  },
  {
    text:'Log Out',
    path:'/',
  }
]

export default function(props) {
  const className = props.className;
  const viewportWidth = props.viewportWidth;
  const transitionPt = props.transitionPt;

  return (
    <>
      { viewportWidth < transitionPt ?
        <NavMobile className={className} navArray={momNavArray}/> :
        <NavDesktop className={className} navArray={momNavArray}/>
      }
    </>
  )
}





