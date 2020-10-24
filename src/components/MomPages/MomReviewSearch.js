import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';

import SmallButton from '../Form/SmallButton.js';

import {axiosWithAuth} from '../../utils/axiosConfig.js';
import {resetState,setDriverList} from '../../reducers/uiMomRvwListReducer.js';
import {downloadDriverArray} from '../../reducers/momDataReducer.js';

const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;

const StylP = styled.p`
  font-size: 1.4rem;
  margin-left:1rem;
  margin-right:1rem;
  width:fit-content;
  margin-top: 1rem;
`;

const StylButton = styled(SmallButton)`
  margin-bottom: 1rem;
`;

export default function(props) {
  const className = props.className;
  const dispatch = useDispatch();


  useEffect(()=>{
    //This useEffect does nothing on mount and nothing on re-render.
    //However when we are done with the Mom Reviews page, and this component is
    //unmounted, it will reset the state.uiData.uiMomRvwList state slice to 
    //its initial value, thus ensuring that when we later come back to Mom Reviews page
    //it is in its initial reset state

    return ()=>dispatch(resetState());
    // eslint-disable-next-line
  },[])

  async function reviewSearch() {
    //First reset the state to the initial value
    dispatch(resetState()); 

    let response;
    try {
      
      //Then get all the reviews that the mom has done
      const momId = localStorage.getItem('userId')
      response = await axiosWithAuth().get(`/api/users/${momId}/reviews`);

      if(response.data.length===0) {
        dispatch(setDriverList(response.data));
        return;
      }
      
      //Get an array of ids of the drivers reviewed by the mom
      const idDrvsRevwd = response.data.map(elem=>elem.driver_id);
      
      //Then make sure array of all drivers in state.momData.drivers
      //is the latest downloaded
      response = await dispatch(downloadDriverArray());
      



    }
    catch(error) {
      console.log('MomReviewSearch.js/reviewSearch, error=',error);
    }
  }


  return (
    <ContainerDiv className={className}>
      <StylP>Get all your reviews by pressing the button below</StylP>

      <StylButton onClick={reviewSearch} text='Get Reviews'/>
    </ContainerDiv>
  );
}