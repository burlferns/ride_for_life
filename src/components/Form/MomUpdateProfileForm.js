import React, {useState} from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

import InputComp from './InputComp.js';
import DisplayProfileValueComp from './DisplayProfileValueComp.js';
import SubmitButtonWithWait from './SubmitButtonWithWait.js';
import ActionButton from './ActionButton.js';

import iconUser from '../../icons/fontawesome/user-alt.svg';
import iconMobile from '../../icons/fontawesome/mobile.svg';
import iconMap from '../../icons/fontawesome/map-marked-alt.svg';

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

const StylActionButton = styled(ActionButton)`
  margin-top:3.4rem;
`;


export default function(props) {
  const className = props.className;
  const email = 'abc@def.com';

  //This is for the please wait message that appears after the login button is pressed
  const[waitMsgOn,setWaitMsgOn] = useState(false); 

  //This is for the error message that appears if email is already being used
  const[errorMsgOn,setErrorMsgOn] = useState(true); 

  const formik = useFormik({
    initialValues: {
      name: '',
      phone:'',
      plot:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input a name"),
      phone: Yup.string().required("Please input a phone number"),
      plot: Yup.number()
        .required("Please input a plot location")
        .typeError("Please input an integer plot number")
        .integer("Please input an integer plot number")
    }),
    onSubmit: function(values) {
      setWaitMsgOn(true);
      setErrorMsgOn(false);
      console.log('onSubmit func, values=',values);
    }
  })

  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>

      <DisplayProfileValueComp keyText='Email:' valueText={email}/>

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

      <SubmitButtonWithWait
        text='Update Profile'
      />

      <StylActionButton
        text='Delete Profile'
      />


    </StylForm>      
  )
}