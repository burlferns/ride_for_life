import React, {useState} from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";

import InputComp from './InputComp.js';
import DisplayProfileValueComp from './DisplayProfileValueComp.js';
import SubmitButtonWithWait from './SubmitButtonWithWait.js';
import ActionButton from './ActionButton.js';
import {axiosWithAuth} from '../../utils/axiosConfig.js';

import iconUser from '../../icons/fontawesome/user-alt.svg';
import iconMoney from '../../icons/fontawesome/money-bill.svg';

import {updateUserData} from '../../reducers/userDataReducer.js';
import {resetReducers} from '../../reducers/rootReducer.js';

const StylForm = styled.form`
  display: flex;
  flex-direction: column;
  width:fit-content;
`;

const DeleteButton = styled(ActionButton)`
  margin-top:3.4rem;
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

const WarnDiv = styled.div`
  width:fit-content;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background: white;
`;

const WarnText = styled.p`
  font-size: 2.5rem;
  margin-bottom:2.5rem;
  margin-top:2.5rem;
  text-align: center;
  width: 32rem;
  font-weight: 900;
`;

const WarnButtons = styled(ActionButton)`
  margin-bottom:2.5rem;
`;

const selectorFunc = state=>state.userData;

export default function(props) {
  const className = props.className;

  const userData = useSelector(selectorFunc);
  const email = userData.drivers_email;
  const phone = userData.drivers_phone_number;
  const plot = userData.drivers_plot;

  const dispatch = useDispatch();

  const histObj = useHistory();

  //This is for the please wait message that appears after the login button is pressed
  const[updateWaitMsgOn,setUpdateWaitMsgOn] = useState(false); 

  //This is for the delete profile warning
  const [warningOn, setWarningOn] = useState(false);

  //This is for the message 'update successful'
  const[doSuccessMsg,setDoSuccessMsg] = useState(false); 

  //This is for the please wait message that appears after the confirm delete button is pressed
  const [removeWaitMsgOn,setRemoveWaitMsgOn] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input a name"),
      price: Yup.number()
      .required("Please input a price")
      .typeError("Please input only numeric digits")
      .integer("Please input only integers")
    }),
    onSubmit: async function(values) {
      setUpdateWaitMsgOn(true);
      
      try {
        const dataToServer = {
          drivers_name: values.name,
          drivers_price: values.price
        }
        const userId = localStorage.getItem('userId');
        await axiosWithAuth().put(`/api/drivers/${userId}`, dataToServer);
        dispatch(updateUserData(dataToServer));
        setUpdateWaitMsgOn(false);
        setDoSuccessMsg(true);
      }
      catch(error) {
        console.log('DriverUpdateProfileForm error :', error.response);
      }
    }
  })

  function deleteHdnl() {
    setWarningOn(true);
  }

  function noHdnl() {
    setWarningOn(false);
  }

  function toProfileHdnl() {
    histObj.push('/driver/profile')
  }

  async function removeHdnl() {
    setRemoveWaitMsgOn(true);
    const userId = localStorage.getItem('userId');
    try {
      await axiosWithAuth().delete(`/api/drivers/${userId}`);
      setTimeout(()=>{
        dispatch(resetReducers());
        localStorage.clear();
      },3000)
    }
    catch(error) {
      console.log('MomUpdateProfileForm error :', error.response);
    }
  }


  return (
    <StylForm onSubmit={formik.handleSubmit} className={className}>

      <DisplayProfileValueComp keyText='Email:' valueText={email}/>

      <DisplayProfileValueComp keyText='Phone:' valueText={phone}/>

      <DisplayProfileValueComp keyText='Address Plot Number:' valueText={plot}/>

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
        text='Update Profile'
        msgOn={updateWaitMsgOn}
      />

      <DeleteButton
        text='Delete Profile'
        onClick={deleteHdnl}
      />

      { warningOn &&
        <ScreenDiv>
          <WarnDiv>
            <WarnText>Are you sure you want to delete your profile?</WarnText>
            <WarnButtons
              text='Yes - delete profile'
              onClick={removeHdnl}
              msgOn={removeWaitMsgOn}
            />
            <WarnButtons
              text='No - keep profile'
              onClick={noHdnl}
            />
          </WarnDiv>
        </ScreenDiv>
      }

      { doSuccessMsg &&
        <ScreenDiv>
          <WarnDiv>
            <WarnText>Profile update complete</WarnText>
            <WarnButtons
              text='Back to Profile'
              onClick={toProfileHdnl}
            />
          </WarnDiv>
        </ScreenDiv>
      }

    </StylForm>      
  )
}