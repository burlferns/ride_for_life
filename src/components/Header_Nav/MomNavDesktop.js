import React from 'react';
import styled from "styled-components";

import NavLinkComp from './NavLinkComp.js';
import NavLogOutBtn from './NavLogOutBtn.js';

const DivContainer = styled.div`
  display:grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: [first] 100% [end];
  grid-template-areas: "nav nav nav logOut";

  width:fit-content;
  white-space: nowrap;

  grid-area: momNavdesktop;
  justify-self: end;
`;

const StylNav = styled.nav`
  grid-area: nav;

  display:grid;
  grid-template-columns: auto;
  grid-template-rows: [first] 100% [end];
  grid-template-areas: "profile drivers myReview";
  justify-items: center;
  align-items: center;
`;

const Profile = styled(NavLinkComp)`
  grid-area: profile;
`;

const Drivers = styled(NavLinkComp)`
grid-area: drivers;
`;

const MyReview = styled(NavLinkComp)`
grid-area: myReview;
`;

const StylNavLogOutBtn = styled(NavLogOutBtn)`
  grid-area: logOut;
`;

export default function MomNavDesktop() {
  
  return (
    <DivContainer>
       <StylNav>
        <Profile path='/mom/profile' linkText='My Profile'/>
        <Drivers path='/mom/driversList' linkText='Drivers'/>
        <MyReview path='/mom/reviewsList' linkText='My Reviews'/>
      </StylNav>
      <StylNavLogOutBtn/>
    </DivContainer>
  )
}