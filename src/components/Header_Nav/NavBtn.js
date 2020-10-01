import React from 'react';
import styled from "styled-components";
import { useLocation, useHistory} from "react-router-dom";

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
  const runFunc = props.runFunc;

  const history = useHistory();
  const location = useLocation();

  function clickHdlr() {
    history.push(path);
    if(runFunc) {
      runFunc();
    }
  }

  return (
    <StylButton 
      className={className}
      type='button'
      onClick={clickHdlr} 

      // The text is underlined when we are at the location that the
      // button takes us to, otherwise there is no underline
      uLine={path===location.pathname ? 'underline' : 'none'}
    >
      {btnTxt}
    </StylButton>
  )
}