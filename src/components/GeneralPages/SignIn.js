import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

import SignInForm from '../Form/SignInForm';
import img1 from '../../images/random-institute-JP9BQVlcED8-unsplash.jpg';

const MarginDiv = styled.div`


`;


const DivContainer = styled.div`
  width:95rem;
  height:60rem;
  background:white;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;
  box-sizing: content-box;

  display:grid;
  grid-template-columns: auto 34rem;
  grid-template-rows: [first] 100% [end];
  grid-template-areas: "picture content";
  
  // margin:0 auto;
  margin: calc((100vh - 44px - 40px - 411px) / 2) auto;
`; 

const PictureDiv = styled.div`
  width: 60rem;
  height: 60rem;
  background-image: url(${img1});
  background-size: cover;
  background-position: bottom center;

  grid-area: picture;
`;


const ContentsDiv = styled.div`
  padding: 0 4rem;
  margin: auto 0;
  width:fit-content;
  box-sizing: content-box;

  grid-area: content;
  // border:1px solid black;
`;


const StylH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
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
          <StylH1>Login to Ride for Life</StylH1>   
          <StylSignInForm/>
        </ContentsDiv>
      </DivContainer>

    </>
    );
}