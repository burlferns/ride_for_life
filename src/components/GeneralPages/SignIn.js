import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

import SignInForm from '../Form/SignInForm';

const ContentsDiv = styled.div`
  width:fit-content;
  margin:2rem 2rem;
  box-sizing: content-box;
  border:1px solid black;
`;


const StylH1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const StylSignInForm = styled(SignInForm)`
  

`;


export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <ContentsDiv>
        <StylH1>Sign-In</StylH1>   
        <StylSignInForm/>
      </ContentsDiv>


      



    </>
    );
}