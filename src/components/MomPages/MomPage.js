import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from "styled-components";
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import ResizeObserver from 'resize-observer-polyfill';

import MomProfile from './MomProfile.js';
import MomDriversList from './MomDriversList.js';
import MomReviewsList from './MomReviewsList.js';
import MomTopSection from './MomTopSection.js';
import {ViewportContext} from '../../App.js';

import narrowImg from '../../images/narrow.jpg';

import {useSizeObserver} from '../../utils/hooks.js';

const OuterContainer = styled.div.attrs(props=>({
  style: {
    margin:`${props.topMargin}px auto ${props.botMargin}px`
  }
}))`
  box-sizing: content-box;
  box-shadow:  4px 4px 3px 0px #f2f2f2;
  border:1px solid #e6e6e6;

  width: calc(100vw - 10rem - 0.2rem); //5rem*2 is the margin & 0.1rem*2 is the border
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
    width: calc(100vw - 2rem);  //1rem*2 is for the margin & border
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
  const vpSize = useContext(ViewportContext);
  const match = useRouteMatch();
  const [elemRef,elemSize] = useSizeObserver();
  const cntrHgt = elemSize.height;

  //These are the vertical margin calculations for OuterContainer
  let topMargin ;
  let botMargin ;
  const minMargin = 2*vpSize[2];
  const spaceForMargins = vpSize[1]-(4.4+4)*vpSize[2]-Math.round(cntrHgt+2); //The 2 added is for
                                                    //the border which is not included in cntrHgt
  if(spaceForMargins<minMargin*2) {
    topMargin = minMargin;
    botMargin = minMargin;
  }
  else {
    topMargin = Math.round(spaceForMargins/2);
    botMargin = spaceForMargins - topMargin;
  }

  return (
    <OuterContainer ref={elemRef} topMargin={topMargin} botMargin={botMargin} data-name='outerContainer'>
      <StylMomTopSection/>

      <Switch>
        <Route exact path={`${match.url}/profile`} component={StylMomProfile}/>
        <Route exact path={`${match.url}/driversList`} component={StylMomDriversList}/>
        <Route exact path={`${match.url}/reviewsList`} component={StylMomReviewsList}/>
        <Redirect to="/" /> 
      </Switch>

      <StylImg src={narrowImg}/>
    </OuterContainer>
  );
}