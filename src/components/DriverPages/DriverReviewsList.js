import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 5rem;

  color:green;
`;


export default function(props) {
  // const className = props.className;

  return (
    <>
      <StylH1>This is the Driver's Review listing page</StylH1>
      <Link to='/driver/updateprofile' style={{margin:'0 20px'}}>Update Driver Profile</Link>
      <Link to='/' style={{margin:'0 20px'}}>Home page</Link>
      <Link to='/mom' style={{margin:'0 20px'}}>To mom page</Link>
      <Link to='/driver' style={{margin:'0 20px'}}>To just /driver page</Link>
      <Link to='/driver/junk' style={{margin:'0 20px'}}>To /driver/junk page</Link>
    </>
  );
}