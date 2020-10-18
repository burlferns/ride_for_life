import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

import MomDriverDisplayDetails from './MomDriverDisplayDetails.js'

const StylNoneP = styled.p`
  margin:1rem;

`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function() {
  const uiMomDrvList = useSelector(selectFunc);
  const driverId = uiMomDrvList.driverId;
  const driverData = uiMomDrvList.driverData;

  return (
    <>
    { driverId==="none" && 
      <StylNoneP>No driver found with that name.</StylNoneP>  
    }

    { driverId!=="none" && driverId!=='' &&
      <MomDriverDisplayDetails driverData={driverData}/>
    }

    </>
  )
}


