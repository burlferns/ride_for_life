import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

import ActionButton from '../Form/ActionButton.js';
import DDSelectError from '../Form/DDSelectError.js';

import momImg from '../../images/baby-6000verticalPixels.jpg';

const StylH1 = styled.h1`
  margin:5rem 5rem;
  font-size: 3rem;
  color:orange;
`;

const StylBtn = styled.button`
  width: fit-content;
  padding: 0.5rem 0.5rem;
  margin-right:0.5rem;
`;


const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;
  const userData = useSelector(selectorFunc);

  return (
    <>
      <StylH1>This is the Mom Profile page</StylH1>
      <p>mom name : {userData.users_name}</p>
      <p>mom plot : {userData.users_plot}</p>
      <p>mom phone number : {userData.users_phone_number}</p>
      <p>mom email : {userData.users_email}</p>
      <Link to='/mom/updateprofile'>Update or Delete Profile</Link>

{/* Desktop check - BEGIN */}

      <div style={{display:'flex', flexDirection:'column'}}>


        {/* <div style={{width:'30rem', border:'1px solid black', height:'fit-content', fontWeight:'900', fontSize:'2rem', marginLeft:'0.5rem',
        }}>
          ABCDEFGHIJKLMNOPQRST@
        </div> */}

        

        <div style={{display:'flex', flexDirection:'row', border:'1px solid purple', width:'fit-content', height:'fit-content'}}>
          <p style={{whiteSpace:'nowrap'}}>Search by: </p>
          <DDSelectError options={["Driver's name", 'Plot location', 'Price range']} onChange={()=>{}} onBlur={()=>{}} description='Choose search criteria'/>
        </div>

        <div style={{display:'flex', flexDirection:'row', border:'1px solid purple', width:'fit-content', height:'fit-content'}}>
          <p style={{whiteSpace:'nowrap'}}>Sort by: </p>
          <DDSelectError options={['Price', 'Rating']} onChange={()=>{}} onBlur={()=>{}} description='Choose sort criteria' />
        </div>

        <div style={{display:'flex', flexDirection:'row', border:'1px solid purple', width:'fit-content', height:'fit-content'}}>
          <p style={{whiteSpace:'nowrap', fontSize:'1.6rem'}}>Drivers name:</p>
          <input type="text" value='ABCDEFGHIJKLMNOPQRST@' style={{fontSize:'1.6rem', width:'18rem'}}/>
        </div>

        <div style={{width:'30rem', border:'4px solid orange', height:'20rem', fontSize:'1.4rem',
          display:'flex', flexDirection:'row', justifyContent: 'space-evenly', flexWrap:'wrap'
        }}>
          <div style={{display:'flex', flexDirection:'column', border:'3px solid green', width:'30rem', height:'fit-content'}}>
            <p>Name: ABCDEFGHIJKLMNOPQRST@</p> 
            <p>Plot: B2345678901234567890</p>
            <p>Price: C2345678901234567890</p>
            <p>Rating: D234567890</p>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
              <StylBtn>Add Review</StylBtn>
              <StylBtn>Show details</StylBtn>
            </div>
          </div>  

          <div style={{display:'flex', flexDirection:'column', border:'3px solid green', width:'30rem', height:'fit-content'}}>
            <p>Name: ABCDEFGHIJKLMNOPQRST@</p> 
            <p>Plot: B2345678901234567890</p>
            <p>Price: C2345678901234567890</p>
            <p>Rating: D234567890</p>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
              <StylBtn>Add Review</StylBtn>
              <StylBtn>Show details</StylBtn>
            </div>
          </div>   
        </div>

      </div>

      
{/* Desktop check - END */}







      


{/* Mobile check - BEGIN */}


      <div style={{width:'32rem', border:'4px solid orange', height:'20rem'}}>
        <div style={{display:'flex', flexDirection:'column', border:'3px solid green', width:'30rem', height:'fit-content'}}>
          <p>Name: ABCDEFGHIJKLMNOPQRST@</p> 
          <p>Plot: B2345678901234567890</p>
          <p>Price: C2345678901234567890</p>
          <p>Rating: D234567890</p>
          <div style={{display:'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
            <StylBtn>Add Review</StylBtn>
            <StylBtn>Show details</StylBtn>
          </div>
        </div>        
      </div>

{/* Mobile check - END */}

      <div style={{width:'80rem', marginTop:'10rem'}}>
        <img src={momImg} style={{width:'100%', height:'100%', objectFit: 'cover'}}/>
      </div>
      

      {/* <div style={{width:'80rem', marginTop:'10rem'}}>
        <img src={momImg} style={{width:'100%', height:'100%', objectFit: 'cover'}}/>
      </div> */}

      


    </>
  );
}