import React from 'react';
import styled from "styled-components";

const DivContainer = styled.div`
  width: 26rem;
  height:7.4rem;
`;

const StylP = styled.p`
  font-size:1.6rem;
  color: black;
  margin-left:1rem;
  line-height: normal;
`;

export default function(props) {
  const className = props.className;
  const keyText = props.keyText;
  const valueText = props.valueText;

  return (
    <DivContainer className={className}>
      <StylP>{keyText}</StylP>
      <StylP>{valueText}</StylP>
    </DivContainer>
  )

}