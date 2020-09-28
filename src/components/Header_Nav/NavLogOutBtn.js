import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

  :focus {
    outline:0;
  }
`;

export default function NavLogOutBtn() {
  const history = useHistory();

  function clickHdlr() {
    history.push('/');
  }

  return (
    <StylButton onClick={clickHdlr}>Log Out</StylButton>
  )
}