import React from 'react';
import styled from "styled-components";

import SignInForm from '../Form/SignInForm';


const ContentsDiv = styled.div`
  
  width:fit-content;
  box-sizing: content-box;

  grid-area: content;

  background:cyan;
  margin: 20px 0;
`;


const StylH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
`;

const StylSignInForm = styled(SignInForm)`
  

`;

export default function SignIn() {

  return (
    
        <ContentsDiv>
          <StylH1>Login to Ride for Life</StylH1>   
          <StylSignInForm/>
        </ContentsDiv>
      
    );
}