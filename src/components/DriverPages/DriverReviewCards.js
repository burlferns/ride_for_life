import React from 'react';
import styled from "styled-components";


const DivContainer = styled.div`
  width:22rem;
  border:0.1rem solid black;
  border-radius: 1rem;
  background: rgb(149,122,9);
  color: white;
  display:flex;
  flex-direction: column;
  margin:1rem;
  padding:1rem;
`;

const StylP = styled.p`
  margin:0.5rem;
`;


export default function(props) {
  const className = props.className;
  const revwData = props.revwData;

  return (
    <DivContainer className={className}>
      <StylP>Reviewer : {revwData.reviewer}</StylP>
      <StylP>Rating : {revwData.rating}</StylP>
      <StylP>Review date : {revwData.review_date}</StylP>
      <StylP>Review : {revwData.review_text}</StylP>
    </DivContainer>
  );
}