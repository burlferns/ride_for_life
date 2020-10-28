import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const OuterContainer = styled.div`
  width:100%;
  max-width:100rem;
  height: fit-content;
  background: rgb(242, 137, 7); 

  display:flex;
  flex-direction:column;
`;

const StylH1 = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  color:white;
  line-height:normal;
  margin-left:2rem;
  margin-right:2rem;
  padding-top:2rem;
  margin-bottom:2rem;
`;

const StylP = styled.p`
  font-weight: 900;
  font-size: 2rem;
  color:white;
  align-self:flex-end;
  padding-bottom:2rem;
  margin-left:2rem;
  margin-right:2rem;
  text-align:right;
`;


const selectorFunc = state=>state.userData.drivers_name;

export default function() {
  const drivers_name = useSelector(selectorFunc);

  return (
    <OuterContainer>
      <StylH1>The Driver Pages</StylH1>
      <StylP>Driver name : {drivers_name}</StylP>
    </OuterContainer>
  );
}