import React from 'react';
import styled from "styled-components";

const MenuDiv = styled.div`
  height: 4.4rem;
  width: 4.4rem;
  cursor: pointer;

  :hover {
    background:grey;
  }
`;

const MarginDiv = styled.div`
  height: 1.1rem;
  width: 100%;
  background:transparent;
`;

const LineDiv = styled.div`
  height: 0.4rem;
  width: 3rem;
  margin-left:0.7rem;
  margin-bottom:0.5rem;
  background:white;
  border-radius:0.4rem;
`;

export default function MomNavMobile(props) {
  const onClickHdlr = props.onClickHdlr;

  return (
    <MenuDiv onClick={onClickHdlr}>
      <MarginDiv/>
      <LineDiv/>
      <LineDiv/>
      <LineDiv/>
    </MenuDiv>
  )
}