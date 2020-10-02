import React from 'react';
import styled, { keyframes } from "styled-components";

const DivContainer = styled.div`
  width:26rem;
  height:4rem;
  border-radius: 0.5rem;

  position: relative;
  top:0;
  left:0;

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

const DivWait = styled.div`
  width:26rem;
  height:4rem;
  border-radius: 0.5rem;

  display: flex;

  position: absolute;
  top:0;
  left:0;
  z-index: 1;

  background: #3C97D7;
  // opacity: 0.75;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const DivLoader = styled.div`
  border: 0.3rem solid white; /* Light grey */
  border-top: 0.3rem solid #99A3A4; /* Blue */
  border-radius: 50%;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  width: 3rem;
  height: 3rem;
  animation: ${rotate} 2s linear infinite;
`;

const StylP = styled.p`
  margin-top: 1.3rem;
  margin-left: 2rem;
  font-size:1.6rem;
  color: white;
`;

export default function(props) {
  const className = props.className;
  const text = props.text;
  const msgOn = props.msgOn;

  return (
    <DivContainer className={className}>
      <StlyBtn type='submit'>
        {text}
      </StlyBtn>

      { msgOn &&
        <DivWait>
          <DivLoader/>
          <StylP>Please Wait...</StylP>
        </DivWait>
      }

    </DivContainer>
  )
}

