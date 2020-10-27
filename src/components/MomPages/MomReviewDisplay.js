import React, {useState} from 'react';
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';

import SmallButton from '../Form/SmallButton.js';
import ActionButton from '../Form/ActionButton.js';

import {setDriverReviewMod,deleteReview,updateReview} 
  from '../../reducers/uiMomRvwListReducer.js';

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

const ErrorP = styled.p`
  font-size: 2rem;
  margin:1rem;
  color: darkRed;
  align-self:center;
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
  width: calc(100% - 4rem);
  margin-left: 2rem;
  margin-right: 2rem;
  font-family: 'Roboto';
  font-style: normal;
`;

const ScreenDiv = styled.div`
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  z-index: 2;
  background: rgba(192,192,192, 0.9);
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;

const WarnDiv = styled.div`
  width:fit-content;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background: white;
`;


const WarnText = styled.p`
  font-size: 2.5rem;
  margin-bottom:2.5rem;
  margin-top:2.5rem;
  text-align: center;
  width: 32rem;
  font-weight: 900;
`;

const WarnButtons = styled(ActionButton)`
  margin-bottom:2.5rem;
`;

const selectFunc = state=>state.uiData.uiMomRvwList; 

export default function(props) {
  const className = props.className;
  const [rating,setRating] = useState('');
  const [update,setUpdate] = useState('');
  const [deleteWarning,setDeleteWarning] = useState(false);
  const [showError,setShowError] = useState(false);
  const dispatch = useDispatch();
  const uiMomRvwList = useSelector(selectFunc);
  const driverList = uiMomRvwList.driverList;
  const driverId = uiMomRvwList.driverId;
  const driverData = uiMomRvwList.driverData;

  function onRatingChange(event) {
    setRating(event.target.value);
    setShowError(false);
  }

  function onTboxChange(event) {
    setUpdate(event.target.value);
    setShowError(false);
  }


  function deleteHdlr() {
    setDeleteWarning(true);
  }

  function noDelete() {
    setDeleteWarning(false);
  }

  async function yesDelete() {
    setDeleteWarning(false);
    try {
      await dispatch(deleteReview(driverData.review_id,driverId));
    }
    catch(error) {
      console.log('MomReviewDisplay.js/yesDelete, error=',error);
    }
  }

  async function updateHdlr() {
    //First check if the ratings input is valid & update text is there.
    const checkValidUpdateSchema = Yup.object().shape({
      rating: Yup.number().required().typeError().integer().min(1).max(5),
      update: Yup.string().required()
    });
    const inputData = {rating, update};

    const isValid = await checkValidUpdateSchema.isValid(inputData);

    if(!isValid) {
      setShowError(true);
      return;
    }

    //Obtain review date
    const today = new Date();
    let month = today.getMonth();
    month = ((month+1)<10) ? `0${month+1}` : (month+1);
    const review_date = `${today.getFullYear()}-${month}-${today.getDate()}`;

    //Create update object with update data
    const updateObj = {
      rating,
      review_date,
      review_text:update,
      driver_id: driverId
    } 

    try {
      await dispatch(updateReview(updateObj,driverData.review_id));
    }
    catch(error) {
      console.log('MomReviewDisplay.js/updateHdlr, error=',error);
    }
  }

  async function addHdlr() {
    //First check if the ratings input is valid & update text is there.
    const checkValidUpdateSchema = Yup.object().shape({
      rating: Yup.number().required().typeError().integer().min(1).max(5),
      update: Yup.string().required()
    });
    const inputData = {rating, update};

    const isValid = await checkValidUpdateSchema.isValid(inputData);

    if(!isValid) {
      setShowError(true);
      return;
    }

    //Obtain review date
    const today = new Date();
    let month = today.getMonth();
    month = ((month+1)<10) ? `0${month+1}` : (month+1);
    const review_date = `${today.getFullYear()}-${month}-${today.getDate()}`;









  }




  return (
    <ContainerDiv className={className}>

      { driverId==='' && driverList!=='' && driverList.length===0 &&
        <NoReviewsP>
          You have not reviewed any drivers yet.
        </NoReviewsP>
      }


      {/* This is creates a list of cards of all drivers reviewed by the mom */}
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


      {/* This creates a listing of driver info for one driver with options
      to delete or update the existing review */}
      { driverId!=='' && driverData.review_id!==null &&
        <>
          <ListDiv>
            <StylPfirst>Name: {driverData.drivers_name}</StylPfirst>
            <StylP>Email: {driverData.drivers_email}</StylP>
            <StylP>Review date: {driverData.review_date}</StylP>
            <StylP>Rating: {driverData.rating}</StylP>
            <StylP>Review: {driverData.review}</StylP>

            <StylButton text='Delete Review' 
              onClick={deleteHdlr}
            />
          </ListDiv>          

          <UpdateP>Update review and rating below:</UpdateP>

          <StylInputLabel >
            Rating (1 to 5) :
            <StylInput type='text' name='lowPrice'  
            value={rating} onChange={onRatingChange}
          />
          </StylInputLabel>
          
          { showError &&
            <ErrorP>
              Rating must be an integer from 1 to 5, 
              and you must have text in the update text-box
            </ErrorP>
          }

          <StylTextAreaLabel >
            Review : 
            <StylTextArea maxLength='255' onChange={onTboxChange}
              value={update}
            />
          </StylTextAreaLabel>

          <StylButton text='Update Review' 
            onClick={updateHdlr}
          />

        </>
      }


      {/* This creates a listing of driver info for one driver with option
      to add a driver review */}
      { driverId!=='' && driverData.review_id===null &&
        <>
          <ListDiv>
            <StylPfirst>Name: {driverData.drivers_name}</StylPfirst>
            <StylP>Email: {driverData.drivers_email}</StylP>
          </ListDiv>          

          <UpdateP>Add review and rating below:</UpdateP>

          <StylInputLabel >
            Rating (1 to 5) :
            <StylInput type='text' name='lowPrice'  
            value={rating} onChange={onRatingChange}
          />
          </StylInputLabel>
          
          { showError &&
            <ErrorP>
              Rating must be an integer from 1 to 5, 
              and you must have text in the update text-box
            </ErrorP>
          }

          <StylTextAreaLabel >
            Review : 
            <StylTextArea maxLength='255' onChange={onTboxChange}
              value={update}
            />
          </StylTextAreaLabel>

          <StylButton text='Add Review' 
            onClick={addHdlr}
          />

        </>
      }


      {/* This displays a warning before deleting a review */}
      { deleteWarning &&
        <ScreenDiv>
          <WarnDiv>
            <WarnText>Are you sure you want to delete your review?</WarnText>
            <WarnButtons
              text='Yes - delete review'
              onClick={yesDelete}
            />
            <WarnButtons
              text='No - keep review'
              onClick={noDelete}
            />
          </WarnDiv>
        </ScreenDiv>

      }

    </ContainerDiv>
  )
}
