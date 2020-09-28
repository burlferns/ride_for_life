import React from 'react';
import styled from "styled-components";

const StylButton = styled.button`
  font-size:1.6rem;
  background:black;
  border:none;
  color:white;
  text-decoration-line:none;
  margin: 0 1rem;
  cursor: pointer;
  
  :hover {
    background:grey;
  }
`;

export default function NavLogOutBtn() {

  return (
    <StylButton>Log Out</StylButton>
  )
}