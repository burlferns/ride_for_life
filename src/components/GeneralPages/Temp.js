import React, {useState} from 'react';
import styled from "styled-components";

import DDSelect from '../Form/DDSelect';


const ContentsDiv = styled.div`  
  width:30rem;
  height:40rem;
  box-sizing:content-box;
`;

const StylInput = styled.input`
  

`;


export default function() {
  const [search,setSearch] = useState('');
  const [sort,setSort] = useState('');

  return (
    
        <ContentsDiv>
          <div style={{height:'50px'}}/>
          <div  
            style={{display:'flex', boxSizing:'content-box', alignItems:'center',
            border:'3px solid transparent', width:'fit-content', height:'fit-content'}}
          >
            <p style={{width:'8rem', background:'cyan'}}>Search by: </p>
            <DDSelect description='Choose search criteria' setValue={setSearch}
              options={["Driver's name", 'Plot location', 'Price range']}
            />
          </div>

          <div style={{height:'50px'}}/>

          <div  
            style={{display:'flex', boxSizing:'content-box', alignItems:'center',
            border:'3px solid transparent', width:'fit-content', height:'fit-content'}}
          >
            <p style={{width:'8rem', background:'cyan'}}>Sort by: </p>
            <DDSelect description='Choose sort criteria' setValue={setSort}
              options={['Price', 'Rating']}
            />
          </div>
          
          <div style={{height:'50px'}}/>
          <p>Search = {search}</p>
          <p>Sort = {sort}</p>



        </ContentsDiv>
      
    );
}