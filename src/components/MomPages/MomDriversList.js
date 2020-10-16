import React, {useState} from 'react';
import styled from "styled-components";

import MomDriverSearch from './MomDriverSearch.js';

const ContainerDiv = styled.div`
  width:100%;
  background: beige;
  display: flex;
  flex-direction: column;  
`;

const PositionDiv = styled.div`
  width: calc(100% - 2rem);
  height: fit-content;
  padding: 2rem 0;
  margin: 0 auto;
`;

const StylH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-decoration: underline;
  margin-bottom: 2rem;
`;

const StylMomDriverSearch = styled(MomDriverSearch)`

`;


export default function(props) {
  const className = props.className;
  
  //unSortedData contains the searched data sorted by driver's id
  const [searchType, setSearchType] = useState('');
  const [unSortedData, setUnSortedData] = useState([]);

  //sortedData contains the sorted searched data, that is sorted by sortType
  const [sortType, setSortType] = useState('');
  const [sortedData, setSortedData] = useState([]);

  //This stores the driverID for the driver whose details is to be shown
  //If it is null, then no driver has been selected for his details to be shown
  const [driverIdDetail, setDriverIdDetail] = useState(null);


  return (
    <ContainerDiv className={className}>
      <PositionDiv>
        <StylH1>Find Drivers</StylH1>

        <StylMomDriverSearch
          searchType={searchType}
          setSearchType={setSearchType}
          setUnSortedData={setUnSortedData}
        />




      </PositionDiv>
    </ContainerDiv>  
  );
}