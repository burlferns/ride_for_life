import React from 'react';
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';

import SmallButton from '../Form/SmallButton.js'
import MomDriverDisplayDetails from './MomDriverDisplayDetails.js'
import MomDriverDisplayCards from './MomDriverDisplayCards.js'
import {setSTLoca_DrvDetails} from '../../reducers/uiMomDrvListReducer.js';

const StylErrorP = styled.p`
  margin:1rem;
`;

const DivContainer = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const StylButton = styled(SmallButton)`
  
`;

const selectFunc = state=>state.uiData.uiMomDrvList; 

export default function() {
  const uiMomDrvList = useSelector(selectFunc);
  const dispatch = useDispatch();
  const error = uiMomDrvList.error;
  const driverId = uiMomDrvList.driverId;
  const drvsInLoca = uiMomDrvList.drvsInLoca;
  const driverData = uiMomDrvList.driverData;

  function toList() {
    dispatch(setSTLoca_DrvDetails('',{}));
  }

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
      <>
        <StylButton onClick={toList} text='Back to List'/>
        <MomDriverDisplayDetails driverData={driverData} driverId={driverId}/>
      </>
      
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
          <DivContainer>
            <MomDriverDisplayCards drvsInRange={drvsInLoca}/>
          </DivContainer>
        }
      </>       
    }

    </>
  );
}