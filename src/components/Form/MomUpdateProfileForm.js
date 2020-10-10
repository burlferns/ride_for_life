import React, {useState} from 'react';
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";

import InputComp from './InputComp.js';
import DisplayProfileValueComp from './DisplayProfileValueComp.js';
import SubmitButtonWithWait from './SubmitButtonWithWait.js';
import ActionButton from './ActionButton.js';
import {axiosWithAuth} from '../../utils/axiosConfig.js';

import iconUser from '../../icons/fontawesome/user-alt.svg';
import iconMobile from '../../icons/fontawesome/mobile.svg';
import iconMap from '../../icons/fontawesome/map-marked-alt.svg';

import {updateUserData} from '../../reducers/userDataReducer.js';

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

const selectorFunc = state=>state.userData.users_email;

export default function(props) {
  const className = props.className;
  const dispatch = useDispatch();
  const email = useSelector(selectorFunc);
  const histObj = useHistory();

  //This is for the please wait message that appears after the login button is pressed
  const [waitMsgOn,setWaitMsgOn] = useState(false); 

  //This is for the delete profile warning
  const [warningOn, setWarningOn] = useState(false);

  //This is for the message 'update successful'
  const[doSuccessMsg,setDoSuccessMsg] = useState(false); 

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
    onSubmit: async function(values) {
      setWaitMsgOn(true);

      try {
        const dataToServer = {
          users_name: values.name,
          users_plot: values.plot,
          users_phone_number: values.phone
        }
        const userId = localStorage.getItem('userId');
        await axiosWithAuth().put(`/api/users/${userId}`, dataToServer);
        dispatch(updateUserData(dataToServer));
        setWaitMsgOn(false);
        setDoSuccessMsg(true);
      }
      catch(error) {
        // console.log('MomUpdateProfileForm error :', error.response);
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
    histObj.push('/mom/profile')
  }

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
        msgOn={waitMsgOn}
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