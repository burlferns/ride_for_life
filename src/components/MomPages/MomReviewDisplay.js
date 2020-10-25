import React, {useState} from 'react';
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';

import SmallButton from '../Form/SmallButton.js';


import {setDriverReviewMod} from '../../reducers/uiMomRvwListReducer.js';

const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction:column;
`;

const ListDiv = styled.div`
  border:0.1rem solid black;
  border-radius: 1rem;
  background: rgb(149,122,9);
  color: white;
  display:flex;
  flex-direction: column;
  margin:1rem;
`;

const NoReviewsP = styled.p`
  margin:1rem;
`;

const StylP = styled.p`
  line-height:normal;
  margin-left:0.5rem;
  margin-right:0.5rem;
`;

const StylPfirst = styled.p`
  line-height:normal;
  margin-left:0.5rem;
  margin-right:0.5rem;
  margin-top:0.5rem;
`;

const NumberP = styled.p`
  margin-left: 1rem;
  width: 4rem;
  border: 1px solid darkRed;
  border-radius: 1rem;
  text-align:center;
  background: darkRed;
  margin-top:0.5rem;
`;

const StylButton = styled(SmallButton)`
  border:1px solid white;
  width: fit-content;
  align-self: flex-end;
  margin-right:0.5rem;
  margin-bottom:0.5rem;
`;

const UpdateP = styled.p`
  font-size: 1.4rem;
  margin:1rem;
`;

const StylInputLabel = styled.label`
  margin: 1rem;
`;

const StylInput = styled.input`
  font-size:1.6rem;
  color: #5F6A6A;
  background: transparent;
  border-radius: 0.5rem;
  border:0.1rem solid black;
  padding: 0.2rem 0.8rem;
  width: 3rem;
  margin-left:1rem;

  position: relative;
  top:0;
  left:0;
  :focus::after {
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
`;

const StylTextAreaLabel = styled.label`
  margin: 1rem;
  width:fit-content;
`;


const StylTextArea = styled.textarea`
  font-size:1.6rem;
  resize:none;
  color: #5F6A6A;
  background: transparent;
  border-radius: 0.5rem;
  border:0.1rem solid black;
  margin-top:0.2rem;
  padding: 0.2rem 0.8rem;
  display:block;
  height:8.6rem;
  // width:26.5rem;
  width: 100%;
  // width: calc(100% - 2rem);
  // margin-left: 1rem;
  // margin-right: 1rem;

  font-family: 'Roboto';
  font-style: normal;

  // @media(max-width:340px) {
  //   width:23.5rem;
  // }
`;


const selectFunc = state=>state.uiData.uiMomRvwList; 

export default function(props) {
  const className = props.className;
  const [rating,setRating] = useState('');
  const dispatch = useDispatch();
  const uiMomRvwList = useSelector(selectFunc);
  const driverList = uiMomRvwList.driverList;
  const driverId = uiMomRvwList.driverId;
  const driverData = uiMomRvwList.driverData;

  function onRatingChange(event) {
    setRating(event.target.value);
  }

  return (
    <ContainerDiv className={className}>

      { driverId==='' && driverList!=='' && driverList.length===0 &&
        <NoReviewsP>
          You have not reviewed any drivers yet.
        </NoReviewsP>
      }

      { driverId==='' && driverList!=='' && driverList.length>0 &&
        driverList.map((elem,index)=>(
          <ListDiv key={elem.review_id}>
            <NumberP>{index+1}</NumberP>
            <StylP>Name: {elem.drivers_name}</StylP>
            <StylP>Email: {elem.drivers_email}</StylP>
            <StylP>Phone: {elem.drivers_phone_number}</StylP>
            <StylP>Plot: {elem.drivers_plot}</StylP>
            <StylP>Price: {elem.drivers_price}</StylP>
            <StylP>Review date: {elem.review_date}</StylP>
            <StylP>Rating: {elem.rating}</StylP>
            <StylP>Review: {elem.review_text}</StylP>

            <StylButton text='Update Review' 
              onClick={()=>dispatch(setDriverReviewMod(elem))}
            />
          </ListDiv>
        ))
      }

      { driverId!=='' && driverData.review_id!==null &&
        <>
          <ListDiv>
            <StylPfirst>Name: {driverData.drivers_name}</StylPfirst>
            <StylP>Email: {driverData.drivers_email}</StylP>
            <StylP>Review date: {driverData.review_date}</StylP>
            <StylP>Rating: {driverData.rating}</StylP>
            <StylP>Review: {driverData.review}</StylP>

            <StylButton text='Delete Review' 
              onClick={()=>{}}
            />
          </ListDiv>          

          <UpdateP>Update review and rating below:</UpdateP>

          <StylInputLabel >
            Rating (1 to 5) :
            <StylInput type='text' name='lowPrice'  
            value={rating} onChange={onRatingChange}
          />
          </StylInputLabel>

          <StylTextAreaLabel >
            Review : 
            <StylTextArea maxLength='255'
          />
          </StylTextAreaLabel>

          <StylButton text='Update Review' 
            onClick={()=>{}}
          />

        </>
      }

    </ContainerDiv>
  )
}
