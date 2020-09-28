import React from 'react';

import NavDesktop from './NavDesktop.js'
import NavMobile from './NavMobile.js';

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

  return (
    <>
      {/* <NavDesktop className={className} navArray={momNavArray}/> */}
      <NavMobile className={className} navArray={momNavArray}/>
    </>
  )
}





