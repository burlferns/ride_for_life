import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';

import DDSelect from '../Form/DDSelect.js';
import MomDrvSchName from './MomDrvSchName.js'

import {setSearchType} from '../../reducers/uiMomDrvListReducer.js';


const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;

const StylP = styled.p`
  font-size: 1.4rem;
  margin-left:1rem;
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
`;

const StylLabelP = styled.p`
  margin-right: 0.8rem;
`;

const StylButton = styled.button`


`;

const selectFunc = state=>state.uiData.uiMomDrvList.searchType; 

export default function(props) {
  const className = props.className;
  const dispatch = useDispatch();
  const searchType = useSelector(selectFunc);
  
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
          options={["Driver's name", "Plot location range", "Price range"]} 
          description='Choose search criteria'
          setValue={setDDvalue}
        />
      </DDsearchDiv>


      {/* Displays the various search inputs and the Search Button */}
      { searchType==="Driver's name" && <MomDrvSchName/> }

      { searchType!=='' && <StylButton>Search</StylButton> }



    </ContainerDiv>
  );  
}