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
  const driverId = uiMomDrvList.driverId;
  const drvsInLoca = uiMomDrvList.drvsInLoca;

  return (
    <>
    { error && 
      <StylErrorP>
        Please enter integer values for lower and upper location range values.
        Also the upper value must be the same as or bigger than the lower value.
      </StylErrorP>  
    }

    {
      driverId!=='' &&
      <StylErrorP>
        Here are details on one driver.
      </StylErrorP>
    }

    {
      !error && driverId==='' &&
      <>
        {
          drvsInLoca==='none' &&
          <StylErrorP>
            No drivers have been found within this location range.
          </StylErrorP>
        }

        {
          Array.isArray(drvsInLoca) && drvsInLoca.length>0 &&
          <StylErrorP>
            Here is a list of drivers found
          </StylErrorP>
        }
      </>       
    }



    </>
  )
}