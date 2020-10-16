import React, {useState} from 'react';
import styled from "styled-components";

import MomDriverSearch from './MomDriverSearch.js';

const ContainerDiv = styled.div`
  width:100%;
  background: beige;
  display: flex;
  flex-direction: column;  
`;

const PositionDiv = styled.div`
  width: calc(100% - 2rem);
  height: fit-content;
  padding: 2rem 0;
  margin: 0 auto;
`;

const StylH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-decoration: underline;
  margin-bottom: 2rem;
`;

const StylMomDriverSearch = styled(MomDriverSearch)`

`;


export default function(props) {
  const className = props.className;
  
  return (
    <ContainerDiv className={className}>
      <PositionDiv>
        <StylH1>Find Drivers</StylH1>

        <StylMomDriverSearch/>




      </PositionDiv>
    </ContainerDiv>  
  );
}