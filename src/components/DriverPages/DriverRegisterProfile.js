import React, {useContext} from 'react';
import styled from "styled-components";


import DriverRegisterForm from '../Form/DriverRegisterForm';
import bike1 from '../../images/bike1.jpg';
import bike2 from '../../images/bike2.jpg';
// import bike3 from '../../images/bike3.jpg';

import {ViewportContext} from '../../App.js';


const ComponentContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8.4rem);
  min-height: 68.2rem; //60.2rem {Height of DivContainer} + 4rem*2 {min margin}
  display:grid;
  grid-template-columns: minmax(4rem, 1fr) minmax(28rem, 95.2rem) minmax(4rem, 1fr);
  grid-template-rows: minmax(4rem, 1fr) 60.2rem minmax(4rem, 1fr);
  grid-template-areas: ". . ." ". container ." ". . .";

  @media (max-width: 599px) {
    grid-template-columns: minmax(2rem, 1fr) minmax(28rem, 95.2rem) minmax(2rem, 1fr);
    grid-template-rows: minmax(2rem, 1fr) 65.1rem minmax(2rem, 1fr);
    min-height: 69.1rem; //65.1rem {Height of DivContainer} + 2rem*2 {min margin}
  }

`;

const DivContainer = styled.div`
  height:69.1rem;
  background:transparent;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;
  box-sizing: content-box;

  grid-area: container;

  display:grid;
  grid-template-columns: 1fr 34rem;
  grid-template-rows: 100%;
  grid-template-areas: "picture content";

  @media (max-width: 599px) {
    height:fit-content;

    display:grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "picture" "content";

    // justify-items: center;
  }

`; 

const PictureDiv = styled.div`
  height: 69.1rem;
  background-image: url(${bike1});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  grid-area: picture;

  @media (max-width: 739px) {
    background-image: url(${bike2});
  }

  @media (max-width: 639px) {
    background-size: 100%;
  }




  @media (max-width: 599px) {
    height:20rem;
    min-width:26rem;
  }
`;

// const PictureDiv = styled.img`
//   width: 17.9rem;
//   height: 69.1rem;

//   grid-area: picture;

//   @media (max-width: 599px) {
//     height:20rem;
//     min-width:26rem;
//   }
// `;

const ContentsDiv = styled.div`
  padding: 0 4rem;
  margin: auto 0;
  width:fit-content;
  box-sizing: content-box;

  grid-area: content;

  @media (max-width: 599px) {
    padding:0;
    padding-top:2rem;
    padding-bottom:2rem;
    margin:0;

    justify-self: center;
  }
`;


const StylH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
`;

export default function SignIn() {
  const vpSize = useContext(ViewportContext);


  return (
    <ComponentContainer>

      <DivContainer>
        {/* <PictureDiv src={img1} ></PictureDiv> */}
        <PictureDiv></PictureDiv>
        <ContentsDiv>
          {/* <StylH1>Drive with Ride for Life</StylH1>    */}
  <StylH1>w={vpSize[0]},h={vpSize[1]}</StylH1>
          <DriverRegisterForm/>
        </ContentsDiv>
      </DivContainer>

    </ComponentContainer>
    );
}
