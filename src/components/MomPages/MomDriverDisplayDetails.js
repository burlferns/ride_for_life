import React from 'react';
import styled from "styled-components";

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
  // border-bottom: 0.1rem solid white;
`;

export default function(props) {
  const className = props.className;
  const driverData = props.driverData;
  

  return (
    <ContainerDiv className={className}>
        <StylP>Name: {driverData.drivers_name}</StylP>
        <StylP>Email: {driverData.drivers_email}</StylP>
        <StylP>Phone: {driverData.drivers_phone_number}</StylP>
        <StylP>Plot: {driverData.drivers_plot}</StylP>
        <StylP>Price: {driverData.drivers_price}</StylP>

        {driverData.reviews.reviews.length===0 &&
          <StylP>Avg Rating: No reviews available</StylP>
        }

        {driverData.reviews.reviews.length!==0 &&
          <>
            <StylP>Avg Rating: {driverData.reviews.avgRating}</StylP>

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


