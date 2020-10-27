import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';

import SmallButton from '../Form/SmallButton.js'
import {downloadDriverArray} from '../../reducers/momDataReducer.js';
import {doEmailSearch,setSTEmail} from '../../reducers/uiMomDrvListReducer.js';

const EmailSearchDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left:1rem;
  margin-top: 1rem;
`;

const StylLabel = styled.label`
  margin-right: 0.8rem;
`;

const StylInput = styled.input`
  font-size:1.6rem;
  color: #5F6A6A;
  background: transparent;
  border-radius: 0.5rem;
  border:0.1rem solid black;
  padding: 0.2rem 0.8rem;
  width: 15rem;

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
  margin-bottom: 1rem;
`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function(props) {
  const [emailValue,setEmailValue] = useState('');
  const dispatch = useDispatch();
  const uiMomDrvList = useSelector(selectFunc);
  const driverId = uiMomDrvList.driverId;
  

  function onChange(event) {
    if(driverId!=='') {
      dispatch(setSTEmail());
    }
    setEmailValue(event.target.value);
  }

  async function emailSearch() {
    if(emailValue==='') {
      return;
    }

    try {
      //First make sure array of all drivers in state.momData.drivers
      //is the latest downloaded
      await dispatch(downloadDriverArray());
      
      //Then do the email search
      await dispatch(doEmailSearch(emailValue));
    }
    catch(error) {
      console.log('MomDrvSchEmail.js/emailSearch, error=',error);
    }   
  }

  return (
    <>
    <EmailSearchDiv>
      <StylLabel htmlFor='drvEmail'>Driver's email:</StylLabel>
      <StylInput type='text' name='drvEmail' id='drvEmail' 
        value={emailValue} onChange={onChange}
      />
    </EmailSearchDiv>
    <StylButton onClick={emailSearch} text='Run Search'/>
    </>
  );
} 








