import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";

import NavBtn from './NavBtn.js';
import HamMenu from './HamMenu.js';

import {resetReducers} from '../../reducers/rootReducer.js';

const DivContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;
  outline: none;
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

  const history = useHistory();
  const dispatch = useDispatch();

  //menuOn = true means that the menu shows
  const [menuOn, setMenuOn] = useState(false);

  function toggleMenu() {
    setMenuOn(!menuOn);
  }

  function logOut() {
    dispatch(resetReducers());
    localStorage.clear();
  }

  function blurHndl(event) {
    /* I needed the persist method below, because react would recycle the synthetic event. I  
    noticed this when I console.logged the event and saw that the target was null. Then I saw
    a warning under the log saying that react had did some optimizations and recycled the event.
    It also said that if I wanted the event data I needed to run the persist method */
    event.persist(); 
    
    setMenuOn(false);

    /* For why the if statement is needed below, see the long comment in the file
    ../Form/DropDownSelectComp.js    */
    if( event.relatedTarget &&
      event.relatedTarget.type==='button' &&
      event.relatedTarget.name==='navBtn' 
      ) {
      history.push(event.relatedTarget.value);
      if(event.relatedTarget.value === '/') {
        logOut()
      } 
    }
  }


  return (
    <DivContainer className={className} tabIndex='-1' onBlur={blurHndl}>
      <HamMenu onClickHdlr={toggleMenu}/>
      { menuOn &&
        <ToggledContainer>
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
                  setMenuOn(false);
                }
              :
                function() {
                  history.push(elem.path);
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