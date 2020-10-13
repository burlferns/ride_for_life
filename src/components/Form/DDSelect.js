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

export default function(props) {
  const className = props.className;
  const textDisplay = props.description;

  function containerBlur() {

  }

  function containerClick() {

  }

  return (

    <DivSelect 
      onBlur={containerBlur} onClick={containerClick}  
      tabIndex='-1' //Setting a tabIndex value makes the div focusable
    >
        <DisplayP>{textDisplay}</DisplayP>
        <StylImage src={iconDropDown} />

        {/* The menu of options */}
        {/* { menuOn && 
          <MenuDiv>
            { options.map((elem,index) => (
                <StylBtn
                  type='button' name={name} value={elem} 
                  onClick={btnClick} key={index}
                >
                  {elem}
                </StylBtn>
              ))
            }
          </MenuDiv>
        }     */}


    </DivSelect>




  );
}