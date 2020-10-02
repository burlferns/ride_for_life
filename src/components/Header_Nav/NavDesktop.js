import React from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";

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

  const history = useHistory();
  const dispatch = useDispatch();

  function logOut() {
    dispatch({
      type:'setUserTypeNone'
    });
  }

  return (
    <DivContainer className={className}>
      {navArray.map((elem,index) =>
        <StylNavBtn 
          key={index}
          btnTxt={elem.text}
          path={elem.path}
          clickHdlr={ 
            elem.path !== '/' 
          ?
            function() {
              history.push(elem.path);
            }
          :
            function() {
              history.push(elem.path);
              logOut();
            }
          }
        />
      )}
    </DivContainer>
  )
}




