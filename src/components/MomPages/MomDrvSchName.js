import React, {useState, useEffect} from 'react';
import styled from "styled-components";


const NameSearchDiv = styled.div`
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

const StylInput = styled.input`
  font-size:1.6rem;
  color: #5F6A6A;
  background: transparent;
  border-radius: 0.5rem;
  border:0.1rem solid black;
  padding: 0.2rem 0.8rem;

  position: relative;
  top:0;
  left:0;
  :focus::after {
    content: '';
    position:absolute;
    box-sizing: border-box;
    top: -0.2rem;
    left: -0.2rem;
    bottom: -0.2rem;
    right: -0.2rem;
    border-radius: 0.5rem;
    border: 0.2rem solid #5DADE2;
  }
`;

export default function(props) {
  const className = props.className;
  const [nameValue,setNameValue] = useState('');


  // eslint-disable-next-line
  useEffect(()=>{
    setNameValue(nameSearch);
  });

  function onChange(event) {
    setNameValue(event.target.value);
  }

  async function nameSearch() {
    if(nameValue==='') {
      return;
    }

    //First make sure array of all drivers in state.momData.drivers
    //is the latest downloaded
    dispatch()


  }

  return (
    <NameSearchDiv className={className}>
      <StylLabel htmlFor='drvName'>Driver's name:</StylLabel>
      <StylInput type='text' name='drvName' id='drvName' 
        value={nameValue} onChange={onChange}
      />
    </NameSearchDiv>
  );
} 








