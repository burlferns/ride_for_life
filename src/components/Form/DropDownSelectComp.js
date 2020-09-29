import React from 'react';
import styled from "styled-components";

const DivContainer = styled.div`
  width:fit-content;
  
`;

const StylSelect = styled.select`


`;

export default function(props) {
  const className = props.className;

  return (
    <DivContainer className={className} >

      

    </DivContainer>
  )
}