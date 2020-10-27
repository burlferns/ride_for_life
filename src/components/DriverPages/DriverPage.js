import React, {useContext} from 'react';
import styled from "styled-components";
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';

import DriverTopSection from './DriverTopSection.js';
import DriverProfile from './DriverProfile.js';
import DriverReviewsList from './DriverReviewsList.js';
import {ViewportContext} from '../../App.js';

import {useSizeObserver} from '../../utils/customHooks.js';

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
    <OuterContainer ref={elemRef} topMargin={topMargin} botMargin={botMargin} data-name='drvPg'>
      <DriverTopSection/>

      <Switch>
        <Route exact path={`${match.url}/profile`} component={DriverProfile}/>
        <Route exact path={`${match.url}/reviewsList`} component={DriverReviewsList}/>
        <Redirect to="/" /> 
      </Switch>

    </OuterContainer>
  ) 
}