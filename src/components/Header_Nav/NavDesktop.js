import React from 'react';
import styled from "styled-components";

import NavBtn from './NavBtn.js';

const DivContainer = styled.div`
  width:fit-content;
`;

const StylNavBtn = styled(NavBtn)`
  padding: 1.4rem 0;
  margin: 0 1rem;
`;

export default function(props) {
  const className = props.className;
  const navArray = props.navArray;

  return (
    <DivContainer className={className}>
      {navArray.map((elem,index) =>
        <StylNavBtn 
          key={index}
          btnTxt={elem.text}
          path={elem.path}
        />
      )}
    </DivContainer>
  )
}




