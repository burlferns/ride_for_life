import React, {useState} from 'react';
import styled from "styled-components";

import HamMenu from './HamMenu.js';


export default function MomNavMobile() {
  const [menuOn, setMenuOn] = useState(false);

  function onClickHdlr() {
    setMenuOn(!menuOn);
    console.log("HamMenu clicked")
  }

  return (
    <HamMenu onClickHdlr={onClickHdlr}/>
  )
}