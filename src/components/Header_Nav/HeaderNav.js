import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

import MomNav from './MomNav.js';
import DriverNav from './DriverNav.js';

const StylHeader = styled.header`
  display:grid;
  grid-template-columns: auto;
  grid-template-rows: [first] 100% [end];
  grid-template-areas: "stylH1 nav";
  align-items: center;

  background:black;
  color: white;
  height:4.4rem;
`;

const StylH1 = styled.h1`
  grid-area: stylH1;

  margin-left:0.5rem;
  font-size: 4rem;
`;

const StylMomNav = styled(MomNav)`
  grid-area: nav;
  justify-self: end;
`;

const StylDriverNav = styled(DriverNav)`
  grid-area: nav;
  justify-self: end;
`;

const selectorFunc = state=>state.userData.userType;

export default function() {
  const userType = useSelector(selectorFunc);
 
  let navToUse = null;
  if(userType==='mom') {
    navToUse = <StylMomNav/>
  }
  if(userType==='driver') {
    navToUse = <StylDriverNav/>
  }

  return (
    <>
    <StylHeader>
      <StylH1>Ride for Life</StylH1>
      {navToUse}
    </StylHeader>
    </>
  )
}