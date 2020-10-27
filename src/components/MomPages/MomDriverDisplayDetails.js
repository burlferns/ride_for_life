import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";

import SmallButton from '../Form/SmallButton.js'

import {setDriverReviewMod,setDriverReviewAdd} from '../../reducers/uiMomRvwListReducer.js';

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
  const driverId = props.driverId;
  const dispatch = useDispatch();
  const histObj = useHistory();
  
  function addReview() {
    //We will navigate over to the /mom/reviewsList page to do the adding
    //of the review. So we need to create the object that sets redux state
    //information for that path 
    const stateObject = {
      id: driverId,
      drivers_name: driverData.drivers_name,
      drivers_email: driverData.drivers_email
    }

    //Set the state for the /mom/reviewsList page
    dispatch(setDriverReviewAdd(stateObject));

    //Navigate to the /mom/reviewsList page
    histObj.push('/mom/reviewsList');
  };



  function updateDeleteReview() {
    //This is the update review handler, so we need to get the review details for
    //the driver that the mom already has written. This means we have to get the
    //correct object from the array in driverData.reviews.reviews
    const momId = parseInt(localStorage.getItem('userId'));
    const momReviewData = driverData.reviews.reviews.find(elem=>parseInt(elem.user_id)===momId);
    
    //We will navigate over to the /mom/reviewsList page to do the update
    //of the review. So we need to create the object that sets redux state
    //information for that path 
    const stateObject = {
      id: momReviewData.driver_id,
      drivers_name: driverData.drivers_name,
      drivers_email: driverData.drivers_email,
      rating: momReviewData.rating,
      review_text: momReviewData.review_text,
      review_date: momReviewData.review_date,
      review_id: momReviewData.id
    }

    //Set the state for the /mom/reviewsList page
    dispatch(setDriverReviewMod(stateObject));

    //Navigate to the /mom/reviewsList page
    histObj.push('/mom/reviewsList');
  };

  let buttonText = 'Review driver';
  let buttonFunc = addReview;
  if(driverData.reviews.reviewStatus==='update') {
    buttonText = 'Update/Delete driver review';
    buttonFunc = updateDeleteReview;
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


