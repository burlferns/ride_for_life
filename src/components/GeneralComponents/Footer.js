import React from 'react';
import styled from "styled-components";

const StylFooter = styled.footer`
  position: absolute;
  bottom:0;
  left:0;


  width:100%;
  background:black;
  color: white;
  height:4rem;
`;

const StylP = styled.p`
  padding:1.3rem 2rem;
  font-size:1.3rem;
`;


export default function() {
  return(
    <StylFooter>
      <StylP>Copyright &copy; Ride for Life 2020</StylP>
    </StylFooter>
  )
}