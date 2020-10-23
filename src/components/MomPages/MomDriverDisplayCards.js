import React from 'react';
import styled from "styled-components";

import SmallButton from '../Form/SmallButton.js';

const DivContainer = styled.div`
  width:22rem;
  border:0.1rem solid black;
  border-radius: 1rem;
  background: rgb(149,122,9);
  color: white;
  display:flex;
  flex-direction: column;
  margin:1rem;
`;

const StylP = styled.p`
  margin-left: 1rem;
  line-height: normal;
`;

const NumberP = styled.p`
  margin-left: 1rem;
  width: 4rem;
  border: 1px solid darkRed;
  border-radius: 1rem;
  text-align:center;
  background: darkRed;
`;

const StylButton = styled(SmallButton)`
  border:1px solid white;
  width: fit-content;
  align-self: flex-end;
`;

export default function(props) {
  const className = props.className;
  const drvsInLoca = props.drvsInLoca;

  return (
    <>
      {drvsInLoca.map((elem,index)=>(
        <DivContainer key={elem.id}>
          <NumberP>{index+1}</NumberP>
          <StylP>Name: {elem.drivers_name}</StylP>
          <StylP>Plot: {elem.drivers_plot}</StylP>
          <StylP>Price: {elem.drivers_price}</StylP>
          <StylP>Rating: {elem.reviews.avgRating==='NaN'
            ?'No reviews yet'
            :elem.reviews.avgRating
          }</StylP>
          <StylButton text='View details' 
            onClick={()=>}
          />
        </DivContainer>
      ))}
    </>
  );
}