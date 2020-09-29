import React from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputComp from '../Form/InputComp.js';
import iconEnvelope from '../../icons/fontawesome/envelope.svg';
import iconLock from '../../icons/fontawesome/lock.svg';

const StylForm = styled.form`
  display:grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas: "email" "pass";
`;

const EmailInput = styled(InputComp)`
  grid-area: email;
`;

const PassInput = styled(InputComp)`
  grid-area: pass;
`;


export default function(props) {
  const className = props.className;

  const formik = useFormik({
    initialValues: {
      email: '',
      passwd: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please input a valid email address')
        .required('Email address is required'),
      passwd: Yup.string()
        .required("Please input a password")
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

      <button type="submit">Submit</button>

    </StylForm>    
  )
}

