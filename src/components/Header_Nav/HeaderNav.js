import React, {useEffect} from 'react';
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

const selectorFunc = state=>state.userType;

export default function() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const userType = useSelector(selectorFunc);
  
  //This width and higher shows the desktop version of the menu
  const transitionPt = 600;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  let navToUse = null;
  if(userType==='mom') {
    navToUse = <StylMomNav viewportWidth={width} transitionPt={transitionPt}/>
  }
  if(userType==='driver') {
    navToUse = <StylDriverNav viewportWidth={width} transitionPt={transitionPt}/>
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