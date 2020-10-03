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
  width:10px;
  // border:1px solid black;
  min-height: 2rem;
  height: ${props=>props.marginTop};
`;

const MarginDivBottom = styled.div`
  width:10px;
  // border:1px solid black;
  min-height: 2rem;
  height: ${props=>props.marginBottom};
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
  
  margin:0 auto;
  // margin: calc((100vh - 44px - 40px - 411px) / 2) auto;
  // margin-top: ${props=>props.marginTop};
  // margin-bottom: ${props=>props.marginBottom};
  // margin-top: 242px;
  // margin-bottom: 241px;
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

const hfs = 10; //This is the font-size set on the html element in px

export default function SignIn() {
  const vpSize = useContext(ViewportContext);

  console.log('sigin.js,vpSize=',vpSize);

  const verticalSpaceAvailable = (vpSize[1] - 4.4*hfs - 60.2*hfs - 4*hfs);
  const divCntrMarginTop = Math.round(verticalSpaceAvailable / 2);
  const divCntrMarginBottom = verticalSpaceAvailable - divCntrMarginTop;

  return (
    <ComponentContainer>
      <MarginDivTop marginTop={divCntrMarginTop+'px'} />

      <DivContainer>
        <PictureDiv></PictureDiv>
        <ContentsDiv>
          <StylH1>Login to Ride for Life</StylH1>   
          {/* <StylH1>Login {window.innerHeight}</StylH1>   */}
          {/* <StylH1>Login {window.innerWidth} ,, {document.documentElement.clientWidth} </StylH1>   */}
          {/* <StylH1>Login {verticalSpaceAvailable}</StylH1>   */}
          {/* <StylH1>Login {divCntrMarginTop}</StylH1>   */}
          {/* <StylH1>Login {divCntrMarginBottom}</StylH1>   */}
          <StylSignInForm/>
        </ContentsDiv>
      </DivContainer>

      <MarginDivBottom marginBottom={divCntrMarginBottom+'px'} />
    </ComponentContainer>
    );
}