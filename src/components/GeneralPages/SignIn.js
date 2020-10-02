import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

import SignInForm from '../Form/SignInForm';
import img1 from '../../images/random-institute-JP9BQVlcED8-unsplash.jpg';

const MarginDiv = styled.div`


`;


const DivContainer = styled.div`
  display:flex;
  flex-direction:columns;
  background:white;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  margin:5rem 5rem;
  border:1px solid #e6e6e6;
`; 

const PictureDiv = styled.div`
  width: 600px;
  height:600px;
  background-image: url(${img1});
  background-size: cover;
  background-position: bottom center;
`;


const ContentsDiv = styled.div`
  margin:0 4rem;
  width:fit-content;
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

      <DivContainer>
        <PictureDiv></PictureDiv>
        <ContentsDiv>
          <StylH1>Sign-In</StylH1>   
          <StylSignInForm/>
        </ContentsDiv>
      </DivContainer>

      


      



    </>
    );
}