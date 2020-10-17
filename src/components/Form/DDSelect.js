import React, { useState } from 'react';
import styled from "styled-components";

import iconDropDown from '../../icons/fontawesome/drop-down.svg';

const DivSelect = styled.div`
  width:18rem;
  height:2rem;
  border-radius: 0.5rem;
  border:0.1rem solid black;

  position: relative;
  top:0;
  left:0;

  display:flex;
  flex-direction: column;

  outline:none;

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

const DisplayP = styled.p`
  color: #5F6A6A;
  font-size:1.6rem;
  margin-top:0.2rem;
  margin-left:0.5rem;
`;

const StylImage = styled.img`
  width: 1rem;
  height: 1rem;
  
  position: absolute;
  top: 0.5rem;
  right: 0.2rem;
`;

const MenuDiv = styled.div`
  max-width:none;
  width:18.2rem;
  height:fit-content;
  border-radius: 0.5rem;
  background: #E5E7E9;
  border:0.1rem solid #A6ACAF;

  position: absolute;
  top: 100%;
  right: -0.2rem;
  z-index: ${props=>props.zIndexValue};
`;

const StylBtn = styled.button`
  max-width:none;
  width:18.2rem;
  font-size: 1.6rem;
  padding: 0.5rem 0;
  color:black;
  background:transparent;
  border:none;

  :hover {
    background: #3C97D7;
  }

  :focus {
    outline:0;
  }
`;


export default function(props) {
  const className = props.className;
  const description = props.description;
  const options = props.options;
  const zIndexValue = props.zIndexValue || 1;
  const setValue = props.setValue;

  const [menuOn, setMenuOn] = useState(false);
  const [textDisplay, setTextDisplay] = useState(description); 

  function containerBlur(event) {
    setMenuOn(false);

    /*
    See long note in ./DDSelectError.js for why the if statement below is 
    necessary
    */
   if( event.relatedTarget &&
    event.relatedTarget.type==='button' &&
    event.relatedTarget.name==='menuItems' 
    ) {
      setTextDisplay(event.relatedTarget.value);
      setValue(event.relatedTarget.value);
    } 
  }

  function containerClick() {
    if(menuOn) {
      setMenuOn(false);
    }
    else {
      setMenuOn(true);
      setTextDisplay(description);
      setValue('');
    }
  }

  function btnClick(event) {
    setMenuOn(false);
    setTextDisplay(event.target.value);
    setValue(event.target.value);
  }

  return (

    <DivSelect 
      onBlur={containerBlur} onClick={containerClick}  
      tabIndex='-1' //Setting a tabIndex value makes the div focusable
      className={className}
    >
      <DisplayP>{textDisplay}</DisplayP>
      <StylImage src={iconDropDown} />

      {/* The menu of options */}
      { menuOn && 
        <MenuDiv zIndexValue={zIndexValue}>
          { options.map((elem,index) => (
              <StylBtn
                type='button' name='menuItems' value={elem} 
                onClick={btnClick} key={index}
              >
                {elem}
              </StylBtn>
            ))
          }
        </MenuDiv>
      }    


    </DivSelect>




  );
}