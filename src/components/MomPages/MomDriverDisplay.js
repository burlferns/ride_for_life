import React from 'react';
import styled from "styled-components";

const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;


export default function(props) {
  const className = props.className;

  return (
    <ContainerDiv className={className}>
      
    </ContainerDiv>
  )
}