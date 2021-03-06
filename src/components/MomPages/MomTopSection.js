import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

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

  @media (max-width:669px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  @media (max-width:459px) {
    align-items: center;
  }

`;

const StylImg = styled.img`
  max-height:15rem;
  border: 0.4rem solid rgb(242, 203, 7);
  margin-left: 2.5rem;
  box-sizing: content-box;

  @media (max-width:901px) {
    max-width:29.2rem;
    margin-left:1rem;
  }

  @media (max-width:459px) {
    margin-left:0;
  }
`;

const NameDiv= styled.div`
  margin-left:5rem;
  text-align: right;

  @media (max-width:901px) {
    margin-left:2.5rem;
  }

  @media (max-width:774px) {
    margin-left:2.5rem;
  }

  @media (max-width:669px) {
    align-self: flex-end;
    margin-top:1.5rem;
    margin-left:0;
    margin-right:2.5rem;
  }

  @media (max-width:459px) {
    align-self: center;
    margin-right:0;
    text-align: left;
  }

`;

const StylH1 = styled.h1`
  font-weight: 900;
  font-size: 2rem;
  color:white;
  width: 30rem;
  line-height:normal;

  @media (max-width:774px) {
    font-size: 1.6rem;
    width: 22rem;
  }
`;

const selectorFunc = state=>state.userData.users_name;

export default function(props) {
  const className = props.className;
  const users_name = useSelector(selectorFunc);

  return (
    <OuterContainer className={className}>
      <StylImg src={wideImg} />

      <NameDiv>
        <StylH1>User name:</StylH1>
        <StylH1>{users_name}</StylH1>
        {/* <StylH1>ABCDEFGHIJKLMNOPQRST@</StylH1> */}
      </NameDiv>

    </OuterContainer>



  )



}