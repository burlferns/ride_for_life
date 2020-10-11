import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 3rem;

  color:green;
`;

const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;
  const driverData = useSelector(selectorFunc);

  return (
    <>
      <StylH1>This is the Driver Profile page</StylH1>
      <p>driver name : {driverData.drivers_name}</p>
      <p>driver plot : {driverData.drivers_plot}</p>
      <p>driver phone number : {driverData.drivers_phone_number}</p>
      <p>driver email : {driverData.drivers_email}</p>
      <p>driver price : {driverData.drivers_price}</p>
      <Link to='/driver/updateprofile'>Update Profile</Link>
    </>
  );
}