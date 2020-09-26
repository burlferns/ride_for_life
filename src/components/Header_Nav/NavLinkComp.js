import React from 'react';
import styled from "styled-components";
import { Link, useLocation} from "react-router-dom";

const StylLink = styled(Link)`
  font-size:1.6rem;
  color:white;
  text-decoration-line:none;
  margin: 0 1rem;
  width:fit-content;
  padding: 1.4rem 0;
  
  :hover {
    background:grey;
  }
`;


export default function NavLinkComp(props) {
  const linkText = props.linkText;
  const path = props.path;
  const location = useLocation();
  
  return (
    <StylLink to={path}>{linkText}</StylLink>
  )
}