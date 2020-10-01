import React from 'react';
import styled from "styled-components";

const DivContainer = styled.div`
  width:200px;
  display:flex;
  flex-direction: column;

  height: 100px;
  margin-bottom:30px;
  background: cyan;

`;

const DescriptionP = styled.p`
  

`;


const OptionsP = styled.p`


`;





export default function(props) {
  const className = props.className;
  const name = props.name; //This matches the property name in the formik state object
  const description = props.description; //This descibes what needs to be selected
  const options = props.options; //This is an array of the different options
  const error = props.error;
  const errDivHeight = props.errDivHeight; //This is the number of lines of error text. If not 
                                           //specified, then default is 2
  const onChange = props.onChange;
  const onBlur = props.onBlur;

  // const [value, setValue] 

  function btnHdlr(event) {
    console.log('in btnHdlr function');
    onChange(event);

  }


  return (
    <DivContainer className={className} onBlur={onBlur} tabIndex='0' id={name} >

      <button type='button' name='userType' value='mom' onClick={btnHdlr} style={{margin:'10px', height:'25px'}}>mom</button>

      <button type='button' name='userType' value='driver' onClick={btnHdlr} style={{margin:'10px', height:'25px'}}>driver</button>

      {error && <p style={{fontSize:'16px'}}>{error}</p> }

    </DivContainer>
  )
}