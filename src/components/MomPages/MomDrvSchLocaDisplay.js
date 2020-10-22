import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

import MomDriverDisplayDetails from './MomDriverDisplayDetails.js'

const StylErrorP = styled.p`
  margin:1rem;
`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function() {
  const uiMomDrvList = useSelector(selectFunc);
  const error = uiMomDrvList.error;

  return (
    <>
    { error && 
      <StylErrorP>
        Please enter integer values for lower and upper location range values.
        Also the upper value must be the same as or bigger than the lower value.
      </StylErrorP>  
    }

    

    </>
  )
}