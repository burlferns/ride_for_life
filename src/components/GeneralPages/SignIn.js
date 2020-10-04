import React from 'react';
import styled from "styled-components";

import SignInForm from '../Form/SignInForm';
import img1 from '../../images/random-institute-JP9BQVlcED8-unsplash.jpg';

const ComponentContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8.4rem);
  min-height: 69.4rem;
  display:grid;
  grid-template-columns: minmax(4rem, 1fr) minmax(30rem, 95.2rem) minmax(4rem, 1fr);
  grid-template-rows: minmax(4rem, 1fr) 60.2rem minmax(4rem, 1fr);
  grid-template-areas: ". . ." ". container ." ". . .";
`;

const DivContainer = styled.div`
  height:60rem;
  background:transparent;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;
  box-sizing: content-box;

  grid-area: container;

  display:grid;
  grid-template-columns: 1fr 34rem;
  grid-template-rows: 100%;
  grid-template-areas: "picture content";
`; 

const PictureDiv = styled.div`
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

  return (
    <ComponentContainer>

      <DivContainer>
        <PictureDiv></PictureDiv>
        <ContentsDiv>
          <StylH1>Login to Ride for Life</StylH1>   
          <StylSignInForm/>
        </ContentsDiv>
      </DivContainer>

    </ComponentContainer>
    );
}