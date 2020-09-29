import React from 'react';
import styled from "styled-components";

const DivContainer = styled.div`
  width:fit-content;
  display: grid;
  grid-template-columns: 4rem 22rem;
  grid-template-rows: 4rem auto;
  grid-template-areas: "divImg divInput" "divError divError";
`;

const DivImg = styled.div`
  width: 4rem;
  height: 4rem;
  border-top-left-radius:0.5rem;
  border-bottom-left-radius:0.3rem;
  background: #E5E7E9;
  border:0.1rem solid #A6ACAF;

  grid-area: divImg;
`;

const StylImage = styled.img`
  width:1.6rem;
  height:1.6rem;
  margin-top:1.2rem;
  margin-left:1.2rem;
`;

const DivInput = styled.div`
  width: 22rem;
  height: 4rem;
  border:0.1rem solid #A6ACAF;
  position:relative;
  top:0;
  left:0;
  
  :focus-within {
    outline 2px solid #5DADE2;
  }

  grid-area: divInput;
`;

const StylInput = styled.input`
  width:20rem;
  margin-top:1.1rem;
  margin-left:1rem;
  font-size:1.6rem;
  color: #5F6A6A;
  border:none;
  outline:none;
  background:transparent;
`;

const DescriptionP = styled.p`
  width:20rem;
  margin-top:1.1rem;
  margin-left:1rem;
  font-size:1.6rem;
  color: #5F6A6A;
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
`;

const DivError = styled.div`
  width:26rem;
  height:2.9rem;
  grid-area: divError;
`;

const StylP = styled.p`
  color:red;
  margin-top 0.5rem;
  font-size: 1.2rem;

`;



export default function(props) {
  const className = props.className;
  const name = props.name; //This matches the property name in the formik state object
  const description = props.description; //This descibes what needs to be input
  const type = props.type; 
  const icon = props.icon;  
  const error = props.error;
  const errDivHeight = props.errDivHeight; //This is the number of lines of error text. If not 
                                           //specified, then default is 2
  const onChange = props.onChange;
  const onBlur = props.onBlur;
  const value = props.value;

  return (
    <DivContainer className={className} >

      {/* The icon */}
      <DivImg>
        <StylImage src={icon} />
      </DivImg>
      

      {/* The actual input */}
      <DivInput>
        <StylInput
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />  
        {value==='' && <DescriptionP>{description}</DescriptionP>} 
      </DivInput>


      {/* The error message */}
      <DivError 
        height={ errDivHeight===undefined ?
          '2.9rem' :
          (Number(errDivHeight)*1.2+0.5)+'rem'
        }
      >
        {error && <StylP>{error}</StylP> }
      </DivError>     

    </DivContainer>
  )
}


