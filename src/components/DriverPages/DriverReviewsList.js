import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import DriverReviewCards from './DriverReviewCards.js';

import {axiosWithAuth} from '../../utils/axiosConfig.js';


const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 2.5rem;
  color:green;
`;

const ListDiv = styled.div`
  width: (100% - 4rem);
  height:fit-content;
  margin: 0 2rem;
  margin-bottom:2rem;
  border:0.2rem solid black;
  border-radius:1rem;

  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
`;

const StylP = styled.p`
  text-align:center;
  height:fit-content;
  margin: 5rem 1rem;
`;


export default function() {
  const [reviewsList,setReviewsList] = useState(null);

  useEffect(()=>{
    //A useEffect function cannot return anything except for a function. Thus you cannot 
    //make the useEffect function (i.e. the first argument of the useEffect call)
    //an async function, as async function always return a promise object.
    //You will get a warning from React if you try to do this.
    //
    //So this is why async funcA is defined below and immediately called.
    async function funcA() {
      try {
        const driverId = localStorage.getItem('userId');
        let response = await axiosWithAuth().get(`/api/drivers/${driverId}/reviews`);
        console.log('response =',response);
        setReviewsList(response.data);
      }
      catch(error) {
        console.log('DriverReviewList.js/useEffect, error=',error);
      }
    }
    funcA();
  },[])



  return (
    <>
      <StylH1>Driver's Review listing page</StylH1>
      
      <ListDiv>
        { reviewsList!==null && reviewsList.length===0 &&
          <StylP>You currently have no reviews</StylP>
        }

        { reviewsList!==null && reviewsList.length>0 &&
          reviewsList.map(elem=>(
            <DriverReviewCards key={elem.id} revwData={elem} />
          ))
        }
      </ListDiv>

    </>
  );
}