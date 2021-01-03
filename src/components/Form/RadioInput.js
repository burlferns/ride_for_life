import React from 'react';
import styled from "styled-components";

const CntnrDiv = styled.div`
  width:fit-content;
  height: fit-content;
  display:flex;
  align-items: baseline;
`;

const CircleDiv = styled.div`
  border:1px rgb(118,118,118) solid;
  border-radius: 50%;
  width:1.3rem;
  height:1.3rem;
  margin-right:0.2rem;
`;

const DotDiv = styled.div`
  background: rgb(118,118,118);
  border-radius: 50%;
  width:0.7rem;
  height:0.7rem;
  margin:0.2rem;
`;


export default function(props) {
  const className = props.className;
  const text = props.text;
  const checked = props.checked;
  const onClick = props.onClick;

  return (
    <CntnrDiv className={className} onClick={onClick} data-value={text}
      data-testid={`divCirChk-${text}`}
    >
      <CircleDiv>
        {checked && <DotDiv/>}
      </CircleDiv>
      <p>{text}</p>
    </CntnrDiv>
  );
}