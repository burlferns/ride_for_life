import React from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputComp from './InputComp.js';
import DropDownSelectComp from './DropDownSelectComp.js';

import iconEnvelope from '../../icons/fontawesome/envelope.svg';
import iconLock from '../../icons/fontawesome/lock.svg';

const StylForm = styled.form`
  display:grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas: "email" "pass" "select";
`;

const EmailInput = styled(InputComp)`
  grid-area: email;
`;

const PassInput = styled(InputComp)`
  grid-area: pass;
`;

const StylSelect = styled(DropDownSelectComp)`
  grid-area: select;

  margin-bottom:30px;
`;

export default function(props) {
  const className = props.className;

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
        .oneOf(["mom", "driver"],"Please choose account type")
        .required("Please choose account type")
    }),
    onSubmit: function(values) {
      console.log('onSubmit func, arguments=',arguments);
      console.log('onSubmit func, values=',values);
    }
  })


  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>

      <EmailInput
        name='email'
        description='Email Address'
        type='text'
        icon={iconEnvelope}
        error={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />

      <PassInput
        name='passwd'
        description='Password'
        type='password'
        icon={iconLock}
        error={formik.touched.passwd && formik.errors.passwd}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.passwd}
      />

      <StylSelect 
        name='userType'
        description='Account Type'
        error={formik.touched.userType && formik.errors.userType}
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        options={['Mom', 'Driver']}
        
        
      />


      <button type="submit" style={{width:'100px', margin:'30px'}}>Submit</button>

      



    </StylForm>    
  )
}

