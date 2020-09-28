import React from 'react';
import styled from "styled-components";
import { Link, useLocation} from "react-router-dom";

const StylLink = styled(Link)`
  font-size:1.6rem;
  color:white;
  text-decoration-line:none;
  margin: 0 1rem;
  width:fit-content;
  padding: ${props=>props.topPad || 0} 0;
  cursor: pointer;
  display:block;
  
  :hover {
    background:grey;
  }
`;


export default function NavLinkComp(props) {
  const linkText = props.linkText;
  const path = props.path;
  const className = props.className;
  const topPad = props.topPad;
  const location = useLocation();
  
  return (
    <StylLink 
     to={path} 
     className={className} 
     topPad={topPad}
    >
      {linkText}
    </StylLink>
  )
}