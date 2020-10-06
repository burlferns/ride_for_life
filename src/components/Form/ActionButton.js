import React from 'react';
import styled, { keyframes } from "styled-components";

const DivContainer = styled.div`
  width:26rem;
  height:4rem;
  border-radius: 0.5rem;
`;

const StlyBtn = styled.button`
  width:26rem;
  height:4rem;
  border-radius: 0.5rem;

  font-size:1.6rem;
  color: white;
  background: #3C97D7;
  outline: none;
  border: none;
`;


export default function(props) {
  const className = props.className;
  const text = props.text;
  const onClick = props.onClick;

  return (
    <DivContainer className={className}>
      <StlyBtn type='button' onClick={onClick}>
        {text}
      </StlyBtn>
    </DivContainer>
  )
}

