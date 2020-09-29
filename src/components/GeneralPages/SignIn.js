import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { useHistory} from "react-router-dom";

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 5rem;
`;

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <StylH1>This is the Sign-In page</StylH1>

      <button 
        onClick={()=>{
          dispatch({type:'setUserTypeMom'});
          history.push('/mom/profile');
        }}
      >
        Mom Profile
      </button>

      <button 
        onClick={()=>{
          dispatch({type:'setUserTypeDriver'});
          history.push('/driver/profile');
        }}
        style={{marginLeft:'40px'}}
      >
        Driver Profile
      </button>
      
    </>
    );
}