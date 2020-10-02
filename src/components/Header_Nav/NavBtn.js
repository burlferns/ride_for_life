import React from 'react';
import styled from "styled-components";
import { useLocation} from "react-router-dom";

const StylButton = styled.button`
  font-size:1.6rem;
  background:black;
  border:none;
  color:white;
  text-decoration-line:${props=>props.uLine};
  cursor: pointer;
  width:fit-content;
  
  :hover {
    background:grey;
  }

  :focus {
    outline:0;
  }
`;

export default function(props) {
  const className = props.className;
  const btnTxt = props.btnTxt;
  const path = props.path;
  const clickHdlr = props.clickHdlr;

  const location = useLocation();

  return (
    <StylButton 
      className={className}
      type='button'
      name='navBtn'
      onClick={clickHdlr} 
      value={path}

      // The text is underlined when we are at the location that the
      // button takes us to, otherwise there is no underline
      uLine={path===location.pathname ? 'underline' : 'none'}
    >
      {btnTxt}
    </StylButton>
  )
}