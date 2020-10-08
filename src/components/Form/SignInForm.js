import React, {useState} from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

import InputComp from './InputComp.js';
import DropDownSelectComp from './DropDownSelectComp.js';
import SubmitButtonWithWait from './SubmitButtonWithWait.js';
import {axiosNoAuth} from '../../utils/axiosConfig.js';

import iconEnvelope from '../../icons/fontawesome/envelope.svg';
import iconLock from '../../icons/fontawesome/lock.svg';

const StylForm = styled.form`
  display: flex;
  flex-direction: column;
  width:fit-content;
`;

const ErrorMsgDiv = styled.div`
  margin-top 0.5rem;
  width:fit-content;
  height: 1.2rem;
`;

const ErrorP = styled.p`
  color:red;
  font-size: 1.2rem;
`;

const RegisterDiv = styled.div`
  width:26rem;
  margin-top:3rem;
`;

const MarginDiv = styled.div`
  width:25rem;
  height:2rem;
  background:transparent;
`;

const StylLink = styled(Link)`
  font-size: 1.2rem;
`;


export default function(props) {
  const className = props.className;

  //This is for the please wait message that appears after the login button is pressed
  const[waitMsgOn,setWaitMsgOn] = useState(false); 

  //This is for the error message that appears if login credentials are bad
  const[errorMsgOn,setErrorMsgOn] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: '',
      passwd: '',
      userType: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please input a valid email address')
        .required('Email address is required'),
      passwd: Yup.string()
        .required("Please input a password"),
      userType: Yup.string()
        .oneOf(["Mom", "Driver"],"Please choose account type")
        .required("Please choose account type")
    }),
    onSubmit: async function(values) {
      setWaitMsgOn(true);
      setErrorMsgOn(false);

      let response;
      
      try {
        if(values.userType==='Mom') {
          const dataToServer = {
            users_email: values.email,
            password: values.passwd
          }
          response = await axiosNoAuth().post('/api/auth/user_login',dataToServer);
          // console.log('login,response=',response);
        }

      


      } catch(error) {
        // console.log('login,error.response=',error.response);
        if(error.response && error.response.data.message==='Invalid credentials') {
          setErrorMsgOn(true);
          setWaitMsgOn(false);
        }
        
      }


      

    }
  })

  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>

      <InputComp
        name='email'
        description='Email Address'
        type='email'   
        icon={iconEnvelope}
        error={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />

      <InputComp
        name='passwd'
        description='Password'
        type='password'
        icon={iconLock}
        error={formik.touched.passwd && formik.errors.passwd}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.passwd}
      />

      <DropDownSelectComp 
        name='userType'
        description='Account Type'
        error={formik.touched.userType && formik.errors.userType}
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        options={['Mom', 'Driver']}
      />

      <SubmitButtonWithWait
        text='Login'
        msgOn={waitMsgOn}
      />

      <ErrorMsgDiv>
        { errorMsgOn &&
          <ErrorP>Incorrect login credentials used, please try again</ErrorP>
        }        
      </ErrorMsgDiv>
 
      <RegisterDiv>
        <StylLink to='/mom/register'>
          Are you an expecting mother? Register here.
        </StylLink>
        <MarginDiv/>
        <StylLink to='/driver/register'>
          Want to be a driver? Register here.
        </StylLink>
      </RegisterDiv>     

    </StylForm>    
  )
}

