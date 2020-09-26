import React from 'react';
import styled from "styled-components";

import MomNavDesktop from './MomNavDesktop.js';

const StylHeader = styled.header`
  background:black;
  color: white;
  // height:4.4rem; **************************************************
`;

const StylH1 = styled.h1`
  margin-left:0.5rem;
  font-size: 4rem;
`;

export default function HeaderNav() {
  return (
    <StylHeader>
      <StylH1>Ride for Life</StylH1>
      <MomNavDesktop/>
    </StylHeader>
  )
}