import React, {useEffect} from 'react';
import styled from "styled-components";

import DDSelect from '../Form/DDSelect.js';
import MomDrvSchName from './MomDrvSchName.js'


const ContainerDiv = styled.div`
  border: 2px solid black;
  border-radius: 1rem;
`;

const StylP = styled.p`
  font-size: 1.4rem;
  margin-left:1rem;
  width:fit-content;
  margin-top: 1rem;
`;

const DDsearchDiv = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left:1rem;
  margin-top: 1rem;
`;

const StylLabel = styled.label`
  margin-right: 0.8rem;
`;


export default function(props) {
  const className = props.className;
  const setSearchType = props.setSearchType;
  const searchType = props.searchType;
  const setUnSortedData = props.setUnSortedData;

  //This variable points to the search function that must be run when
  //the search button is pressed
  const [searchFunc, setSearchFunc] = useState(null); 

  function runSearch() {
    searchFunc();
  }


  return (
    <ContainerDiv className={className}>
      <StylP>Find drivers by using the search inputs below</StylP>

      {/* Displays the Drop Down Search Menu */}
      <DDsearchDiv>
        <StylLabel>Search by:</StylLabel>
        <DDSelect 
          options={["Driver's name", "Plot location range", "Price range"]} 
          description='Choose search criteria'
          setValue={setSearchType}
        />
      </DDsearchDiv>




      {/* Displays the various search inputs and the Search Button */}
      { searchType==="Driver's name" && 
        <MomDrvSchName 
          setSearchFunc={setSearchFunc}
        />
      }

      {/* {
        searchType!=='' &&
        
      } */}



    </ContainerDiv>
  );  
}