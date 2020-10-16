import React, {useState} from 'react';
import styled from "styled-components";

const ContainerDiv = styled.div`
  width:100%;
  background: beige;
  display: flex;
  flex-direction: column;

  
`;

const PositionDiv = styled.div`
  width: calc(100% - 4rem);
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


export default function(props) {
  const className = props.className;
  
  //unSortedData contains the searched data sorted by driver's id
  //When the searchType is cleared, the unSortedData must also be cleared
  const [searchType, setSearchType] = useState('');
  const [unSortedData, setUnSortedData] = useState([]);

  //sortedData contains the sorted searched data, that is sorted by sortType
  //When the sortType is cleared, the sortedData must also be cleared
  const [sortType, setSortType] = useState('');
  const [sortedData, setSortedData] = useState([]);


  return (
    <ContainerDiv className={className}>
      <PositionDiv>
        <StylH1>Find Drivers</StylH1>





      </PositionDiv>
    </ContainerDiv>  
  );
}