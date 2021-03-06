import React, {useState} from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

import InputComp from './InputComp.js';
import SubmitButtonWithWait from './SubmitButtonWithWait.js';
import ActionButton from './ActionButton.js';
import {axiosNoAuth} from '../../utils/axiosConfig.js';

import iconUser from '../../icons/fontawesome/user-alt.svg';
import iconEnvelope from '../../icons/fontawesome/envelope.svg';
import iconLock from '../../icons/fontawesome/lock.svg';
import iconUnLock from '../../icons/fontawesome/unlock.svg';
import iconMobile from '../../icons/fontawesome/mobile.svg';
import iconMap from '../../icons/fontawesome/map-marked-alt.svg';
import iconMoney from '../../icons/fontawesome/money-bill.svg';

const StylForm = styled.form`
  display: flex;
  flex-direction: column;
  width:fit-content;
`;

const ErrorMsgDiv = styled.div`
  margin-top 0.5rem;
  width:26rem;
  height:2.4rem;
`;

const ErrorP = styled.div`
  color:red;
  font-size: 1.2rem;
`;

const RegisterDiv = styled.div`
  width:26rem;
  margin-top:1.8rem;
`;

const StylLink = styled(Link)`
  font-size: 1.2rem;
`;

const ScreenDiv = styled.div`
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  z-index: 2;
  background: rgba(192,192,192, 0.9);
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;

const TransferDiv = styled.div`
  width:fit-content;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background: white;
`;

const TransferText = styled.p`
  font-size: 2.5rem;
  margin-top:2.5rem;
  text-align: center;
  width: 32rem;
  font-weight: 900;
`;

const TransferButton = styled(ActionButton)`
  margin-top:2.5rem;
  margin-bottom:2.5rem;
`;

export default function(props) {
  const className = props.className;

  const histObj = useHistory();

  //This is for the please wait message that appears after the login button is pressed
  const[waitMsgOn,setWaitMsgOn] = useState(false); 

  //This is for the error message that appears if email is already being used
  const[errorMsgOn,setErrorMsgOn] = useState(false); 

  //This is for the message 'transferring to login page' after registration is successful
  const[doTransfer,setDoTransfer] = useState(false); 

  function transferHdnl() {
    histObj.push('/');
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwd: '',
      rptPasswd: '',
      phone:'',
      plot:'',
      price: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input a name"),
      email: Yup.string()
        .email('Please input a valid email address')
        .required('Email address is required'),
      passwd: Yup.string()
        .required("Please input a password")
        .min(3,"Min of 3 chars for the password"),
      rptPasswd: Yup.string()
        .required("Please input a password confirmation")
        .oneOf([Yup.ref('passwd')], 'Passwords must match'),
      phone: Yup.string().required("Please input a phone number"),
      plot: Yup.number()
        .required("Please input a plot location")
        .typeError("Please input an integer plot number")
        .integer("Please input an integer plot number"),
      price: Yup.number()
      .required("Please input a price")
      .typeError("Please input only numeric digits")
      .integer("Please input only integers")
    }),
    onSubmit: async function(values) {
      setWaitMsgOn(true);
      setErrorMsgOn(false);
      
      try {
        const dataToServer = {
          drivers_name: values.name,
          drivers_plot: values.plot,
          drivers_phone_number: values.phone,
          drivers_email: values.email,
          password: values.passwd,
          drivers_price:values.price
        }
        await axiosNoAuth().post('/api/auth/register_driver',dataToServer);
        setWaitMsgOn(false);
        setDoTransfer(true);
      }
      catch(error) {
        if(error.response && error.response.data.msg==='Email already being used') {
          setErrorMsgOn(true);
          setWaitMsgOn(false);
        }
        else {
          console.log('DriverRegisterForm error :', error.response);
        }
      }
    }
  })

  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>

      <InputComp
        name='name'
        description='Name'
        type='text'
        icon={iconUser}
        error={formik.touched.name && formik.errors.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />

      <InputComp
        name='email'
        description='Email'
        type='text'
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

      <InputComp
        name='rptPasswd'
        description='Confirm Password'
        type='password'
        icon={iconUnLock}
        error={formik.touched.rptPasswd && formik.errors.rptPasswd}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rptPasswd}
      />

      <InputComp
        name='phone'
        description='Phone Number'
        type='text'
        icon={iconMobile}
        error={formik.touched.phone && formik.errors.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
      />

      <InputComp
        name='plot'
        description='Address Plot Number'
        type='text'
        icon={iconMap}
        error={formik.touched.plot && formik.errors.plot}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.plot}
      />

      <InputComp
        name='price'
        description='Price'
        type='text'
        icon={iconMoney}
        error={formik.touched.price && formik.errors.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
      />

      <SubmitButtonWithWait
        text='Register'
        msgOn={waitMsgOn}
      />

      <ErrorMsgDiv>
        { errorMsgOn &&
          <ErrorP>Email already being used. Try another email or 
            login using the link below.</ErrorP>
        }        
      </ErrorMsgDiv>

      <RegisterDiv>
        <StylLink to='/'>
          Already have a driver's account? Login here.
        </StylLink>
      </RegisterDiv> 

      { doTransfer &&
        <ScreenDiv>
          <TransferDiv>
            <TransferText>Registration successful.</TransferText>
            <TransferText>Please click the button below to transfer to Login page.</TransferText>
            <TransferButton
              text='Transfer'
              onClick={transferHdnl}
            />
          </TransferDiv>
        </ScreenDiv>
      }  
    </StylForm>      
  )
}