import React from 'react';

import NavDtopOrMob from './NavDtopOrMob.js'

//These are the buttons to render for 
//nvaigation for drrivers
const driverNavArray =[
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

  return (
    <NavDtopOrMob className={className} navArray={driverNavArray}/>
  )
}