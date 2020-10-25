import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;

const StylP = styled.p`
  margin:1rem;
`;

const selectFunc = state=>state.uiData.uiMomRvwList; 

export default function(props) {
  const className = props.className;
  const uiMomRvwList = useSelector(selectFunc);
  const driverList = uiMomRvwList.driverList;
  const driverId = uiMomRvwList.driverId;
  const driverData = uiMomRvwList.driverData;

  return (
    <ContainerDiv className={className}>

      { driverId==='' && driverList!=='' && driverList.length===0 &&
        <StylP>
          You have not reviewed any drivers yet.
        </StylP>
      }

      { driverId==='' && driverList!=='' && driverList.length>0 &&
        
      }
      
    </ContainerDiv>
  )
}
