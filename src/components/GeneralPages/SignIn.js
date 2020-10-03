import React, {useContext} from 'react';
import styled from "styled-components";

import {ViewportContext} from '../../App.js';
import SignInForm from '../Form/SignInForm';
import img1 from '../../images/random-institute-JP9BQVlcED8-unsplash.jpg';

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarginDivTop = styled.div`
  width:1rem;
  min-height: 2rem;
  height: ${props=>props.marginTop};
`;

const MarginDivBottom = styled.div`
  width:1rem;
  min-height: 2rem;
  height: ${props=>props.marginBottom};
`;

const MarginDivLeft = styled.div`
  height:1rem;
  min-width: 2rem;
  width: 
`;

const MarginDivRight = styled.div`
  height:1rem;
  min-width: 2rem;
  width: 
`;

const DivContainer = styled.div`
  width:95rem;
  height:60rem;
  background:transparent;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;
  box-sizing: content-box;

  display:grid;
  grid-template-columns: auto 34rem;
  grid-template-rows: [first] 100% [end];
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
  const vpSize = useContext(ViewportContext);
  const hfs = vpSize[2];
  const vpHigh = vpSize[1]

  console.log('sigin.js,vpSize=',vpSize);

  const verticalSpaceAvailable = (vpHigh - 4.4*hfs - 60.2*hfs - 4*hfs);
  const marginTop = Math.round(verticalSpaceAvailable / 2);
  const marginBottom = verticalSpaceAvailable - marginTop;

  return (
    <ComponentContainer>
      <MarginDivTop marginTop={marginTop+'px'} />

      <DivContainer>
        <PictureDiv></PictureDiv>
        <ContentsDiv>
          <StylH1>Login to Ride for Life</StylH1>   
          <StylSignInForm/>
        </ContentsDiv>
      </DivContainer>

      <MarginDivBottom marginBottom={marginBottom+'px'} />
    </ComponentContainer>
    );
}