import React from 'react';
import styled from "styled-components";

const StylButton = styled.button`
  font-size:1.6rem;
  color: white;
  background: grey;
  border:0.2rem solid grey;
  border-radius: 0.5rem;
  margin-left:1rem;
  margin-top: 1rem;
  padding: 0.2rem 0.8rem;
  border:grey;
  outline:none;

  position: relative;
  top:0;
  left:0;
  :hover::after {
    content: '';
    position:absolute;
    box-sizing: border-box;
    top: -0.2rem;
    left: -0.2rem;
    bottom: -0.2rem;
    right: -0.2rem;
    border-radius: 0.5rem;
    border: 0.2rem solid #5DADE2;
  }

  :active {
    background: lightgrey;
  }
`;

export default function(props) {
  const className = props.className;
  const onClick = props.onClick
  const text = props.text;

  return (
    <StylButton onClick={onClick} className={className}>{text}</StylButton> 
  );
}