import React, {useState} from 'react';
import styled from "styled-components";

import HamMenu from './HamMenu.js';

const DivContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;

  grid-area: momNav;
  justify-self: end;

`;



export default function MomNavMobile() {
  const [menuOn, setMenuOn] = useState(false);

  function onClickHdlr() {
    setMenuOn(!menuOn);
    console.log("HamMenu clicked")
  }

  return (
    <DivContainer>
       <HamMenu onClickHdlr={onClickHdlr}/>
    </DivContainer>
  )
}