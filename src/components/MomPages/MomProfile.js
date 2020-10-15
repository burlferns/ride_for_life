import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';

const ContainerDiv = styled.div`
  width:100%;
  background: beige;
  display: flex;
  align-items: center;
`;

const PositionDiv = styled.div`
  width: 90%;
  height: fit-content;
  padding: 2rem 0;
  margin: 0 auto;
  // background: cyan;
`;


const StylH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-decoration: underline;
  margin-bottom: 2rem;
`;

const StylP = styled.p`
  margin-top: 1rem;
`;

const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;
  const userData = useSelector(selectorFunc);

  return (
    <ContainerDiv className={className}>
      <PositionDiv>
        <StylH1>Profile Data</StylH1>

        <StylP>Plot number: {userData.users_plot}</StylP>
        <StylP>Phone number: {userData.users_phone_number}</StylP>
        <StylP>Email: {userData.users_email}</StylP>
      </PositionDiv>
    </ContainerDiv>
  );
}

/*

<div
      style={{height:'50rem', background:'beige'}}
    >
      This in MomProfile page
      <Link to='/driver/updateprofile' style={{margin:'0 20px'}}>Update Driver Profile</Link>
      <Link to='/' style={{margin:'0 20px'}}>Home page</Link>
      <Link to='/mom/junk' style={{margin:'0 20px'}}>To mom junk page</Link>
      <Link to='/mom/register' style={{margin:'0 20px'}}>To new mom register page</Link>
    </div>



*/