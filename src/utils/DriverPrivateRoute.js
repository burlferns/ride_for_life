import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux';

const selectorFunc = state=>state.userData.userType;

export default function(props) {
  const elemToRndr = props.elemToRndr;
  const userType = useSelector(selectorFunc);

  return (
    <>
      {(userType==='driver') && elemToRndr}
      {(userType==='mom') && <Redirect to="/mom/profile" />}
      {(userType===null) && <Redirect to="/" />}
    </>
  );
}

