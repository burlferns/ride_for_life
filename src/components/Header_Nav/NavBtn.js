import React from 'react';
import styled from "styled-components";
import { useLocation, useHistory} from "react-router-dom";

const StylButton = styled.button`
  font-size:1.6rem;
  background:black;
  border:none;
  color:white;

  //The text is underlined when we are at the location that the
  //button takes us to, otherwise there is no underline
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
  const toggleMenu = props.toggleMenu;

  const history = useHistory();
  const location = useLocation();

  function clickHdlr() {
    history.push(path);
    if(toggleMenu) {
      toggleMenu();
    }
  }

  return (
    <StylButton 
      className={className}
      onClick={clickHdlr} 
      uLine={path===location.pathname ? 'underline' : 'none'}
    >
      {btnTxt}
    </StylButton>
  )
}