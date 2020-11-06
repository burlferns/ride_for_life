import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 2.5rem;
  color:green;
`;

const StylP = styled.p`
  margin-left:2rem;
  padding-bottom:1.5rem;
`;

const StylLink = styled(Link)`
  margin-left:2rem;
  margin-bottom:2rem;
  margin-top:2rem;
  display:block;
`;

const selectorFunc = state=>state.userData;

export default function() {
  const driverData = useSelector(selectorFunc);

  return (
    <>
      <StylH1>Driver Profile page - still under construction, but functionally complete</StylH1>
      <StylP>driver plot : {driverData.drivers_plot}</StylP>
      <StylP>driver phone number : {driverData.drivers_phone_number}</StylP>
      <StylP>driver email : {driverData.drivers_email}</StylP>
      <StylP>driver price : {driverData.drivers_price}</StylP>
      <StylLink to='/driver/updateprofile'>Update Driver Profile</StylLink>
    </>
  );
}