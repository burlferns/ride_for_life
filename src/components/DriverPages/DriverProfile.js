import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 3rem;

  color:green;
`;

const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;
  const userData = useSelector(selectorFunc);

  return (
    <>
      <StylH1>This is the Driver Profile page</StylH1>
      <p>driver name : {userData.drivers_name}</p>
      <p>driver plot : {userData.drivers_plot}</p>
      <p>driver phone number : {userData.drivers_phone_number}</p>
      <p>driver email : {userData.drivers_email}</p>
      <p>driver price : {userData.drivers_price}</p>
    </>
  );
}