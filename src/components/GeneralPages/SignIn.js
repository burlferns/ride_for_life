import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

import SignInForm from '../Form/SignInForm';

const StylH1 = styled.h1`
  margin:2rem 2rem;
  font-size: 5rem;
`;

const StylSignInForm = styled(SignInForm)`
  margin-left: 30px;

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
        style={{marginLeft:'40px', marginBottom:'20px'}}
      >
        Driver Profile
      </button>
      
      <StylSignInForm/>



    </>
    );
}