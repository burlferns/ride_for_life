import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

import InputForm from '../Form/InputForm.js';
import iconEnvelope from '../../icons/fontawesome/envelope.svg';

const StylH1 = styled.h1`
  margin:2rem 2rem;
  font-size: 5rem;
`;

const StylInputForm = styled(InputForm)`
  margin-left: 5px;
  margin: 0 auto;

`;


export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <StylH1>This is the Sign-In page</StylH1>

      <button 
        onClick={()=>{
          dispatch({type:'setUserTypeMom'});
          history.push('/mom/profile');
        }}
      >
        Mom Profile
      </button>

      <button 
        onClick={()=>{
          dispatch({type:'setUserTypeDriver'});
          history.push('/driver/profile');
        }}
        style={{marginLeft:'40px', marginBottom:'50px'}}
      >
        Driver Profile
      </button>
      
      <StylInputForm
        icon={iconEnvelope}
        value=''
        description='Email Address'
      />



    </>
    );
}