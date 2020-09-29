import React from 'react';

import NavDesktop from './NavDesktop.js'
import NavMobile from './NavMobile.js';

//These are the buttons to render for 
//nvaigation for moms
const momNavArray =[
  {
    text:'My Profile',
    path:'/driver/profile',
  },
  {
    text:'My Reviews',
    path:'/driver/reviewsList',
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