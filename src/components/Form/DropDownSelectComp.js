import React, { useState } from 'react';
import styled from "styled-components";

import iconDropDown from '../../icons/fontawesome/drop-down.svg';

const DivSelect = styled.div`
  width:26rem;
  height:4rem;
  border-radius: 0.5rem;
  border:0.1rem solid #A6ACAF;

  position: relative;
  top:0;
  left:0;

  display:flex;
  flex-direction: column;
`;

const DisplayP = styled.p`
  color: #5F6A6A;
  font-size:1.6rem;
  margin-top:1.1rem;
  margin-left:1.5rem;
`;

const StylImage = styled.img`
  width: 1rem;
  height: 1rem;
  
  position: absolute;
  top: 1.4rem;
  right: 0.2rem;
`;

const MenuDiv = styled.div`
  width:26rem;
  height:fit-content;
  border-radius: 0.5rem;
  background: #E5E7E9;
  border:0.1rem solid #A6ACAF;

  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
`;


const StylBtn = styled.button`
  width:26rem;
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

const DivError = styled.div`
  width:26rem;
  margin-top 0.5rem;
  height: ${props=>props.height};
`;

const StylP = styled.p`
  color:red;
  font-size: 1.2rem;
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

  const [menuOn, setMenuOn] = useState(false);
  const [textDisplay, setTextDisplay] = useState(description); 

  function containerClick() {
    setMenuOn(!menuOn);
  }

  function btnClick() {

  }

  return (
    <div className={className}>

      <DivSelect 
        onBlur={onBlur} onClick={containerClick} 
        tabIndex='0' id={name}
      >
        <DisplayP>{textDisplay}</DisplayP>
        <StylImage src={iconDropDown} />

        {/* The menu of options */}
        { menuOn && false &&
          <MenuDiv>
            { options.map((elem,index) => (
                <StylBtn
                  type='button' name={name} value={elem} onClick={btnClick}
                  key={index}
                >
                  {elem}
                </StylBtn>
              ))
            }
          </MenuDiv>
        }      
      </DivSelect>

      {/* The error message */}
      <DivError 
        height={ errDivHeight===undefined ?
          '2.9rem' :
          (Number(errDivHeight)*1.2)+'rem'
        }
      >
        {error && <StylP>{error}</StylP> }
      </DivError> 

    </div>
  )
}



