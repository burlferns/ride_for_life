import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux';

const selectorFunc = state=>state.userData.userType;

export default function(props) {
  const routeAttributes = props.routeAttributes;
  const element = props.element;
  const userType = useSelector(selectorFunc);

  return (
    <Route
      {...routeAttributes}
      render = { 
        function() {
          if(userType===null) {
            return element;
          }
          if(userType==='mom') {
            return <Redirect to="/mom/profile" />
          }
          if(userType==='driver') {
            return <Redirect to="/driver/profile" />
          }
        }
      }
    />
  );
}