import React from 'react';
import styled from "styled-components";

import SmallButton from '../Form/SmallButton.js'

const ContainerDiv = styled.div`
  background: rgb(149,122,9);
  color: white;
  margin:1rem;
  padding:1rem;
`;

const StylP = styled.p`
  line-height:normal;
`;

const ReviewDiv = styled.div`
  border-top: 0.1rem solid white;
  margin-top: 1rem;
  padding-top: 0.5rem;
`;

const StylButton = styled(SmallButton)`
  border:1px solid white;
`;

export default function(props) {
  const className = props.className;
  const driverData = props.driverData;
  
  function addReview() {};
  function updateReview() {};

  let buttonText = 'Review driver';
  let buttonFunc = addReview;
  if(driverData.reviews.reviewStatus==='update') {
    buttonText = 'Update driver review';
    buttonFunc = updateReview;
  }

  return (
    <ContainerDiv className={className}>
        <StylP>Name: {driverData.drivers_name}</StylP>
        <StylP>Email: {driverData.drivers_email}</StylP>
        <StylP>Phone: {driverData.drivers_phone_number}</StylP>
        <StylP>Plot: {driverData.drivers_plot}</StylP>
        <StylP>Price: {driverData.drivers_price}</StylP>

        {driverData.reviews.reviews.length===0 &&
          <>
            <StylP>Avg Rating: No reviews available</StylP>
            <StylButton onClick={buttonFunc} text={buttonText}/>
          </>
        }

        {driverData.reviews.reviews.length!==0 &&
          <>
            <StylP>Avg Rating: {driverData.reviews.avgRating}</StylP>
            <StylButton onClick={buttonFunc} text={buttonText}/>

            {driverData.reviews.reviews.map(elem=>
              <ReviewDiv key={elem.id}>
                <StylP>Reviewer: {elem.reviewer}</StylP>
                <StylP>Review date: {elem.review_date}</StylP>
                <StylP>Rating: {elem.rating}</StylP>
                <StylP>Review: {elem.review_text}</StylP>
              </ReviewDiv>  
            )}
          </>
        }
    </ContainerDiv>  
  )
}


