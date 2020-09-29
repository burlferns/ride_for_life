import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';

import NavBtn from './NavBtn.js';
import HamMenu from './HamMenu.js';

const DivContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;
`;

//This contains the menu list that appers when
//the hamburger menu is touched
const ToggledContainer = styled.div`
  width: fit-content;
  padding:0 1rem;
  box-sizing: content-box;
  position: absolute;
  top:4.4rem;
  right:0;
  z-index:1;
  display:flex;
  flex-direction: column;
  background:black;
`;

const StylNavBtn = styled(NavBtn)`
  padding: 1.6rem 0;
`;

export default function(props) {
  const className = props.className;
  const navArray = props.navArray;

  //menuOn = true means that the menu shows
  const [menuOn, setMenuOn] = useState(false);

  const dispatch = useDispatch();

  function toggleMenu() {
    setMenuOn(!menuOn);
  }

  function logOut() {
    dispatch({
      type:'setUserTypeNone'
    });
  }

  return (
    <DivContainer className={className}>
      <HamMenu onClickHdlr={toggleMenu}/>
      { menuOn &&
        <ToggledContainer>
          {navArray.map((elem,index) =>
            <StylNavBtn 
              key={index}
              btnTxt={elem.text}
              path={elem.path}
              runFunc={ elem.text !== 'Log Out' ?
                toggleMenu :
                function() {
                  toggleMenu();
                  logOut();
                }
              }
            />
          )}
        </ToggledContainer>
      }
    </DivContainer>
  )
}