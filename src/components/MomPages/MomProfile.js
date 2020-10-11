import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 3rem;
  color:orange;
`;

const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;
  const userData = useSelector(selectorFunc);

  return (
    <>
      <StylH1>This is the Mom Profile page</StylH1>
      <p>mom name : {userData.users_name}</p>
      <p>mom plot : {userData.users_plot}</p>
      <p>mom phone number : {userData.users_phone_number}</p>
      <p>mom email : {userData.users_email}</p>
      <Link to='/mom/updateprofile'>Update or Delete Profile</Link>
    </>
  );
}