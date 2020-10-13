import React from 'react';
import styled from "styled-components";

import wideImg from '../../images/baby-6000verticalPixels.jpg';

const OuterContainer = styled.div`
  width:100%;
  max-width:100rem;
  height: 20rem;
  margin-bottom: 2rem;
  background: rgb(242, 137, 7);

  position:reference;
  top:0;
  left:0;
  
  display: flex;
  align-items: center;
  justify-content:flex-start;

  // @media (max-width:774px) {
  //   flex-direction: column;
  // }

`;

const StylImg = styled.img`
  max-height:15rem;
  border: 0.4rem solid rgb(242, 203, 7);
  margin-left: 2.5rem;
  box-sizing: content-box;

  @media (max-width:884px) {
    max-width:30rem;
    margin-left:1rem;
  }
`;

const NameDiv= styled.div`
  margin-left:5rem;

  @media (max-width:884px) {
    margin-left:2.5rem;
  }

  @media (max-width:774px) {
    margin-left:2.5rem;
  }
`;

const StylH1 = styled.h1`
  font-weight: 900;
  font-size: 2rem;
  color:white;
  width: 30rem;

  @media (max-width:774px) {
    font-size: 1.6rem;
    width: 22rem;
  }


  background: green;
`;

export default function(props) {
  const className = props.className;

  return (
    <OuterContainer className={className}>
      <StylImg src={wideImg} />

      <NameDiv>
        <StylH1>User name:</StylH1>
        <StylH1>ABCDEFGHIJKLMNOPQRST@</StylH1>
      </NameDiv>

    </OuterContainer>



  )



}