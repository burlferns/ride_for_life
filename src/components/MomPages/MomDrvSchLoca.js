import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import SmallButton from '../Form/SmallButton.js';
import RadioInput from '../Form/RadioInput.js';
import {downloadDriverArray} from '../../reducers/momDataReducer.js';
import {setSTLoca_setSort,setSTLoca_setError, setSTLoca} 
  from '../../reducers/uiMomDrvListReducer.js';

const LocaSearchDiv = styled.div`
  width: fit-content;
  display: grid;
  flex-direction: row;
  align-items: center;
  margin-left:1rem;
  margin-top: 1rem;
`;

const StylInputLabel = styled.label`
  margin-right: 0.8rem;
  margin-bottom: 1rem;
`;

const StylInput = styled.input`
  font-size:1.6rem;
  color: #5F6A6A;
  background: transparent;
  border-radius: 0.5rem;
  border:0.1rem solid black;
  padding: 0.2rem 0.8rem;
  width: 7rem;
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

const StylButton = styled(SmallButton)`
  margin-bottom: 1.5rem;
`;

const StylPdiv = styled.div`
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
`;

const StylRadioInput = styled(RadioInput)`
  margin-left: 1rem;
`;


const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function(props) {
  const [lowValue,setLowValue] = useState('');
  const [uppValue,setUppValue] = useState('');
  const dispatch = useDispatch();
  const uiMomDrvList = useSelector(selectFunc);
  const sortType = uiMomDrvList.sortType;
  

  function onLowChange(event) {
    dispatch(setSTLoca());
    setLowValue(event.target.value);
  }

  function onUppChange(event) {
    dispatch(setSTLoca());
    setUppValue(event.target.value);
  }

  function sortHandler(event) {
    dispatch(setSTLoca_setSort(event.currentTarget.dataset.value));
  }


  async function locaSearch() {   
    console.log('Yup =', Yup);
    console.log('Yup.object =', Yup.object);
    console.log('Yup.object().shape =', Yup.object().shape);
    try {
      //First check location input values for errors and display error message
      //if necessary
      const checkValidLocaSchema = Yup.object().shape({
        lowValue: Yup.number().required().typeError().integer(),
        uppValue: Yup.number().required().typeError().integer().min(Yup.ref('lowValue'))
      });
      const inputData = {lowValue, uppValue};

      const isValid = await checkValidLocaSchema.isValid(inputData);

      if(!isValid) {
        dispatch(setSTLoca_setError(true));
        return;
      }
      dispatch(setSTLoca_setError(false));
     

      //Then make sure array of all drivers in state.momData.drivers
      //is the latest downloaded
      await dispatch(downloadDriverArray());
      
      // await dispatch(doLocaSearch(lowValue,uppValue))


    }
    catch(error) {
      console.log('MomDrvSchLoca.js/locaSearch, error=',error);
    } 

  }

  return (
    <>
    <LocaSearchDiv>
      <StylInputLabel >
        Lower range value:
        <StylInput type='text' name='lowLoc'  
        value={lowValue} onChange={onLowChange}
      />
      </StylInputLabel>

      <StylInputLabel >
        Upper range value:
        <StylInput type='text' name='uppLoc'  
        value={uppValue} onChange={onUppChange}
      />
      </StylInputLabel>      
    </LocaSearchDiv>

    <StylButton onClick={locaSearch} text='Run Search'/>

    <StylPdiv> 
      Sort by:
      <StylRadioInput text='Rating' checked={sortType==='Rating'} onClick={sortHandler}/>
      <StylRadioInput text='Price' checked={sortType==='Price'} onClick={sortHandler}/>
    </StylPdiv>
    </>
  );
} 








