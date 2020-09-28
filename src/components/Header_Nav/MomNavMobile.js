import React, {useState} from 'react';
import styled from "styled-components";

import HamMenu from './HamMenu.js';
import NavLinkComp from './NavLinkComp.js';
import NavLogOutBtn from './NavLogOutBtn.js';

const DivContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;
`;

const ToggledContainer = styled.div`
  width: 100vw;
  position: absolute;
  top:4.4rem;
  right:0;

  background:black;
`;

export default function MomNavMobile(props) {
  const className = props.className;
  const [menuOn, setMenuOn] = useState(false);

  function onClickHdlr() {
    setMenuOn(!menuOn);
  }

  return (
    <DivContainer className={className}>
      <HamMenu onClickHdlr={onClickHdlr}/>
      { menuOn &&
        <ToggledContainer>
          <nav>
            <NavLinkComp path='/mom/profile' linkText='My Profile' topPad='0.6rem'/>
            <NavLinkComp path='/mom/driversList' linkText='Drivers' topPad='0.6rem'/>
            <NavLinkComp path='/mom/reviewsList' linkText='My Reviews' topPad='0.6rem'/>
          </nav>
          <NavLogOutBtn/>
        </ToggledContainer>    
      }
    </DivContainer>
  )
}