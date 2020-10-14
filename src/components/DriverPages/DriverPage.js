import React from 'react';
import styled from "styled-components";
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';

import DriverProfile from './DriverProfile.js';
import DriverReviewsList from './DriverReviewsList.js';




export default function() {
  const match = useRouteMatch();

  return (
    <>
      <div style={{width:'fit-content', background:'tomato', fontSize:'2.5rem'}}>
        This is the main driver page
      </div>

      <Switch>
        <Route exact path={`${match.url}/profile`} component={DriverProfile}/>
        <Route exact path={`${match.url}/reviewsList`} component={DriverReviewsList}/>
        <Redirect to="/" /> 
      </Switch>



    </>
  ) 
}