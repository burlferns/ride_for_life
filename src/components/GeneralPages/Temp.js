import React, {useState} from 'react';
import styled from "styled-components";

import RadioInput from '../Form/RadioInput.js';


const ContentsDiv = styled.div`  
  width:30rem;
  height:40rem;
  box-sizing:content-box;
`;


export default function() {
  const [search,setSearch] = useState('');
  const [sort,setSort] = useState('');

  return (
    
        <ContentsDiv>
          <input type='radio' checked={true}/>
          <RadioInput text='Rating' checked={true}/>


        </ContentsDiv>
      
    );
}