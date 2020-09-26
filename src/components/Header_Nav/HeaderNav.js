import React from 'react';
import styled from "styled-components";

import MomNavDesktop from './MomNavDesktop.js';

const StylHeader = styled.header`
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: [first] 100% [end];
  grid-template-areas: "stylH1 momNavdesktop";
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

// const StylMomNavDesktop = styled(MomNavDesktop)`
//   grid-area: momNavdesktop;
//   // justify-self: end;

  
// `;

export default function HeaderNav() {
  return (
    <StylHeader>
      <StylH1>Ride for Life</StylH1>
      <MomNavDesktop/>
    </StylHeader>
  )
}