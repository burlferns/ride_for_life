import React from 'react';
import styled from "styled-components";
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';

import MomProfile from './MomProfile.js';
import MomDriversList from './MomDriversList.js';
import MomReviewsList from './MomReviewsList.js';
import MomTopSection from './MomTopSection.js';

import narrowImg from '../../images/narrow.jpg';

const MarginOuterContainer = styled.div`
  width:100vw;
  height:calc(100vh - 4.4rem - 4rem);
  display:grid;
  grid-template-columns: minmax(5rem,1fr) auto minmax(5rem,1fr);
  grid-template-rows: minmax(2rem,1fr) auto minmax(2rem,1fr);
  grid-template-areas: ". . ." ". innerContiner ." ". . .";

  @media (max-width:459px) {
    width: calc(100vw - 2rem);
    grid-template-columns: minmax(1rem,1fr) auto minmax(1rem,1fr);
  }
`;

const InnerContainer = styled.div`
  grid-area: innerContiner;
  box-sizing: content-box;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;

  width: calc(100vw - 10rem - 0.2rem);
  max-width:100rem;
  height:fit-content;
  

  display: grid;
  grid-template-columns: 1fr 30rem;
  grid-template-rows: auto;
  grid-template-areas: "topsection topsection" "leftprofile rightimg";

  @media (max-width:741px) {
    grid-template-columns: 34rem 1fr;
  }

  @media (max-width:599px) {
    grid-template-columns: auto;
    grid-template-areas: "topsection" "leftprofile";
  }

  @media (max-width:459px) {
    width: calc(100vw - 2rem);
  }
`;

const StylMomTopSection = styled(MomTopSection)`
  grid-area: topsection;
`;

const StylMomProfile = styled(MomProfile)`
  grid-area: leftprofile;
`;

const StylMomDriversList = styled(MomDriversList)`
  grid-area: leftprofile;
`;

const StylMomReviewsList = styled(MomReviewsList)`
  grid-area: leftprofile;
`;

const StylImg = styled.img`
  width: calc(100% - 5rem);
  max-width:25rem;
  margin-left:2.5rem;
  margin-right:2.5rem;
  margin-bottom:2.5rem;

  grid-area: rightimg;

  @media (max-width:599px) {
    display:none;
  }
`;



export default function() {
  const match = useRouteMatch();


  return (
    <MarginOuterContainer>
    <InnerContainer>
      <StylMomTopSection/>

      <Switch>
        <Route exact path={`${match.url}/profile`} component={StylMomProfile}/>
        <Route exact path={`${match.url}/driversList`} component={StylMomDriversList}/>
        <Route exact path={`${match.url}/reviewsList`} component={StylMomReviewsList}/>
        <Redirect to="/" /> 
      </Switch>

      <StylImg src={narrowImg}/>
    </InnerContainer>
    </MarginOuterContainer>
  );
}