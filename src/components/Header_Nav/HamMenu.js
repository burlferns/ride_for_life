import React from 'react';
import styled from "styled-components";

const MenuDiv = styled.div`
  height: 4.4rem;
  width: 4.4rem;
  cursor: pointer;
  // border:1px solid grey;

  grid-area: momNav;
  justify-self: end;

  :hover {
    background:grey;
  }
`;

const LineDivTop = styled.div`
  height: 0.4rem;
  //width: 2.8rem;
  width: 3rem;
  background:white;
  margin-left:0.7rem;
  //margin-top:1rem;
  margin-top:1.1rem;
  margin-bottom:0.5rem;
  border-radius:0.4rem;
`;

const LineDiv = styled.div`
  height: 0.4rem;
  //width: 2.8rem;
  width: 3rem;
  background:white;
  margin-left:0.7rem;
  margin-bottom:0.5rem;
  border-radius:0.4rem;
`;

export default function MomNavMobile(props) {
  const onClickHdlr = props.onClickHdlr;

  return (
    <MenuDiv onClick={onClickHdlr}>
      <LineDivTop/>
      <LineDiv/>
      <LineDiv/>
    </MenuDiv>
  )
}