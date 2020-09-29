import React from 'react';

import NavDtopOrMob from './NavDtopOrMob.js'

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

  return (
    <NavDtopOrMob className={className} navArray={momNavArray}/>      
  )
}





