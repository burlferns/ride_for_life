import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

import MomDrvSchEmailDisplay from './MomDrvSchEmailDisplay.js';
import MomDrvSchLocaDisplay from './MomDrvSchLocaDisplay.js';

const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function(props) {
  const className = props.className;
  const uiMomDrvList = useSelector(selectFunc);
  const searchType = uiMomDrvList.searchType;

  return (
    <ContainerDiv className={className}>

      { searchType==="Driver's email" && <MomDrvSchEmailDisplay/> }
      { searchType==="Plot location range" && <MomDrvSchLocaDisplay/> }

      
    </ContainerDiv>
  )
}