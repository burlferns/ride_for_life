import React from 'react';
import styled from "styled-components";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 5rem;
`;

export default function SignIn() {
  return (
    <>
      <StylH1>This is the Sign-In page</StylH1>
      <a href='/mom/profile'>Mom Profile</a>
      <a href='/driver/profile' style={{marginLeft:'20px'}}>Driver Profile</a>
    </>
    );
}