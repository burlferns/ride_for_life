import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

import MomDrvSchNameDisplay from './MomDrvSchNameDisplay.js';

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

      { searchType==="Driver's name" && <MomDrvSchNameDisplay/> }

      
    </ContainerDiv>
  )
}