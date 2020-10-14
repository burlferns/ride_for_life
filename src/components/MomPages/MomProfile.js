import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

export default function(props) {
  const className = props.className;

  return (
    <div
      style={{height:'50rem', background:'cyan'}}
    >
      This in MomProfile page
      <Link to='/driver/updateprofile' style={{margin:'0 20px'}}>Update Driver Profile</Link>
      <Link to='/' style={{margin:'0 20px'}}>Home page</Link>
      <Link to='/mom/junk' style={{margin:'0 20px'}}>To mom junk page</Link>
    </div>


  );
}