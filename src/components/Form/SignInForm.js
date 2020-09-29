import React from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputComp from '../Form/InputComp.js';
import iconEnvelope from '../../icons/fontawesome/envelope.svg';


const StylForm = styled.form`
  
`;


const StylInputComp = styled(InputComp)`
  

`;


export default function(props) {
  const className = props.className;

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please input a valid email address')
        .required('Email address is required')
    }),
    obSubmit: function(values) {
      console.log('onSubmit func, arguments=',arguments);
      console.log('onSubmit func, values=',values);
    }
  })


  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>
      <StylInputComp
        name='email'
        description='Email Address'
        type='text'
        icon={iconEnvelope}
        error={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        

      />


    </StylForm>    
  )
}

