import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';

import DDSelect from '../Form/DDSelect.js';
import MomDrvSchEmail from './MomDrvSchEmail.js'
import MomDrvSchLoca from './MomDrvSchLoca.js'

import {setSearchType} from '../../reducers/uiMomDrvListReducer.js';


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

const DDsearchDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left:1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StylLabelP = styled.p`
  margin-right: 0.8rem;
`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function(props) {
  const className = props.className;
  const dispatch = useDispatch();
  const uiMomDrvList = useSelector(selectFunc);
  const searchType = uiMomDrvList.searchType;
  
  useEffect(()=>{
    //This useEffect does nothing on mount and nothing on re-render.
    //However when we are done with the Mom Drivers page, and this component is
    //unmounted, it will reset the state.uiData.uiMomDrvList state slice to 
    //its initial value, thus ensuring that when we later come back to Mom Drivers page
    //it is in its initial reset state

    return ()=>dispatch(setSearchType(''));
    // eslint-disable-next-line
  },[])

  function setDDvalue(data) {
    dispatch(setSearchType(data));
  }

  return (
    <ContainerDiv className={className}>
      <StylP>Find drivers by using the search inputs below</StylP>

      {/* Displays the Drop Down Search Menu */}
      <DDsearchDiv>
        <StylLabelP>Search by:</StylLabelP>
        <DDSelect 
          options={["Driver's email", "Plot location range", "Price range"]} 
          description='Choose search criteria'
          setValue={setDDvalue}
        />
      </DDsearchDiv>


      {/* Displays the various search inputs and the Search Button */}
      { searchType==="Driver's email" && <MomDrvSchEmail/> }
      { searchType==="Plot location range" && <MomDrvSchLoca/> }

      



    </ContainerDiv>
  );  
}