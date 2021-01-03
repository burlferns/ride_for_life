import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { BrowserRouter} from "react-router-dom";
import 'jest-styled-components';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import 'jest-localstorage-mock';
import * as axiosFunc from '../../utils/axiosConfig';

import SignIn from './SignIn.js';

import { conLog } from '../Form/SignInForm.js';

const middlewares = [];
const mockStore = configureStore(middlewares);



describe('Tests for SignIn page', () => {

  let container;
  let store;

  beforeEach(() => {
    // Initialize mockstore with empty state
    const initialState = {}
    store = mockStore(initialState)

    const renderReturn  = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>        
      </Provider>
    )
    container = renderReturn.container;
    localStorage.clear();
  });


  test('snapshot of SignIn page', () => {
    expect(container.firstChild).toMatchSnapshot();
  })


  test('error message after clicking and leaving email field', async ()=>{
    //Error message not there initially
    const search1 = screen.queryByText('Email address is required', { selector: 'p' });
    expect(search1).not.toBeInTheDocument();

    // screen.debug();

    //Now click on email input and then click outside email input
    const titleH1 = screen.getByText('Login to Ride for Life');
    const emailInput = screen.getByTestId('email');
    userEvent.click(emailInput);
    userEvent.click(titleH1);

    //Error message should be there now
    const search2 = await screen.findByText('Email address is required', { selector: 'p' });
    expect(search2).toBeInTheDocument();

    // screen.debug();
  })


  test('error message after clicking and leaving password field', async ()=>{
    //Error message not there initially
    const search1 = screen.queryByText('Please input a password', { selector: 'p' });
    expect(search1).not.toBeInTheDocument();

    //Now click on password input and then click outside password input
    const titleH1 = screen.getByText('Login to Ride for Life');
    const passInput = screen.getByTestId('passwd');
    userEvent.click(passInput);
    userEvent.click(titleH1);

    //Error message should be there now
    const search2 = await screen.findByText('Please input a password', { selector: 'p' });
    expect(search2).toBeInTheDocument();
  })


  test('error message after clicking and leaving account type drop down', async ()=>{
    //Error message not there initially
    const search1 = screen.queryByText('Please choose account type', { selector: 'p' });
    expect(search1).not.toBeInTheDocument();

    //Now click on account type drop down and then click outside it
    const titleH1 = screen.getByText('Login to Ride for Life');
    const dropDown = screen.getByTestId('userType');
    userEvent.click(dropDown);
    userEvent.click(titleH1);

    //Error message should be there now
    const search2 = await screen.findByText('Please choose account type', { selector: 'p' });
    expect(search2).toBeInTheDocument();
  })


  test('error message to input proper email', async ()=>{
    //Error message not there initially
    const search1 = screen.queryByText('Please input a valid email address', { selector: 'p' });
    expect(search1).not.toBeInTheDocument();

    // screen.debug();

    //Now click on email input and then click outside email input
    const titleH1 = screen.getByText('Login to Ride for Life');
    const emailInput = screen.getByTestId('email');
    userEvent.click(emailInput);
    userEvent.click(titleH1);
    await userEvent.type(emailInput,'abc');
    
    //Error message should be there now
    const search2 = await screen.findByText('Please input a valid email address', { selector: 'p' });
    expect(search2).toBeInTheDocument();

    // screen.debug();

    await userEvent.type(emailInput,'abc@def');

    //Error message should still be there
    const search3 = await screen.findByText('Please input a valid email address', { selector: 'p' });
    expect(search3).toBeInTheDocument();

    // screen.debug();

    await userEvent.type(emailInput,'abc@def.com');

    //Error message should still be there
    const search4 = await screen.findByText('Please input a valid email address', { selector: 'p' });
    expect(search4).not.toBeInTheDocument();

    // screen.debug();
  })

  test('error message after clicking login button without inputs', async ()=>{
    const search1A = screen.queryByText('Email address is required', { selector: 'p' });
    const search1B = screen.queryByText('Please input a password', { selector: 'p' });
    const search1C = screen.queryByText('Please choose account type', { selector: 'p' });
    expect(search1A).not.toBeInTheDocument();
    expect(search1B).not.toBeInTheDocument();
    expect(search1C).not.toBeInTheDocument();
    
    const lgInButton = screen.getByText('Login');
    userEvent.click(lgInButton);

    const search2A = await screen.findByText('Email address is required', { selector: 'p' });
    const search2B = screen.queryByText('Please input a password', { selector: 'p' });
    const search2C = screen.queryByText('Please choose account type', { selector: 'p' });
    expect(search2A).toBeInTheDocument();
    expect(search2B).toBeInTheDocument();
    expect(search2C).toBeInTheDocument();    
  })

  test('successful mom login', async ()=>{
    //Enter mom's email and password for login
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput,'mom@gmail.com');
    const passInput = screen.getByTestId('passwd');
    await userEvent.type(passInput,'goodPass');

    //Select mom as the user type
    let search = screen.queryByText('Mom', { selector: 'p' });
    expect(search).not.toBeInTheDocument();
    // screen.debug();
    const dropDown = screen.getByTestId('userType');
    userEvent.click(dropDown);
    // screen.debug();
    const dropDownMom = screen.getByText('Mom', { selector: 'button' })
    userEvent.click(dropDownMom);
    search = await screen.findByText('Mom', { selector: 'p' });
    expect(search).toBeInTheDocument();
    // screen.debug();   
    
    expect(localStorage.__STORE__).toEqual({});
    search = screen.queryByText('Please Wait...', { selector: 'p' });  
    expect(search).not.toBeInTheDocument();

    //Click the login button to login a mom
    let axiosNoAuthPostData = {
      users_email: 'mom@gmail.com',
      password: 'goodPass'
    }
    let axiosNoAuthPostReturn = {
      data : {
        token: 'abcd-token',
        id: '123-id'
      }
    }
    let axiosNoAuthPostFunc = jest.fn(  ()=>axiosNoAuthPostReturn  );
    axiosFunc.axiosNoAuth = jest.fn(  ()=>({post:axiosNoAuthPostFunc})  );
    let axiosWithAuthGetReturn = {
      data : {
        users_name: 'momTest',
        users_plot: 123,
        users_phone_number: 456,
        users_email: 'mailTest' 
      }
    }
    let axiosWithAuthGetFunc = jest.fn(  ()=>axiosWithAuthGetReturn  );
    axiosFunc.axiosWithAuth = jest.fn(  ()=>({get:axiosWithAuthGetFunc})  );
    const actions = store.getActions();
    let reducerData = {
      type: 'userData/setUserData',
      payload: {
        userType: 'mom',
        users_name: 'momTest',
        users_plot: 123,
        users_phone_number: 456,
        users_email: 'mailTest'
      }
    };
    const lgInButton = screen.getByText('Login');
    userEvent.click(lgInButton);   

    search = await screen.findByText('Please Wait...', { selector: 'p' });    

    expect(axiosNoAuthPostFunc)
      .toHaveBeenCalledWith('/api/auth/user_login',axiosNoAuthPostData);
    expect(localStorage.__STORE__['authToken']).toBe('abcd-token');
    expect(localStorage.__STORE__['userId']).toBe('123-id');
    expect(axiosWithAuthGetFunc)
      .toHaveBeenCalledWith(`/api/users/123-id`);
    expect(actions).toEqual([reducerData]);
  })



  test('bad mom credentials', async ()=>{
    //Enter mom's email and password for login
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput,'mom@gmail.com');
    const passInput = screen.getByTestId('passwd');
    await userEvent.type(passInput,'badPass');

    //Select mom as the user type
    let search = screen.queryByText('Mom', { selector: 'p' });
    expect(search).not.toBeInTheDocument();
    
    const dropDown = screen.getByTestId('userType');
    userEvent.click(dropDown);
    
    const dropDownMom = screen.getByText('Mom', { selector: 'button' })
    userEvent.click(dropDownMom);
    search = await screen.findByText('Mom', { selector: 'p' });
    expect(search).toBeInTheDocument();
        
    expect(localStorage.__STORE__).toEqual({});
    search = screen.queryByText('Please Wait...', { selector: 'p' });  
    expect(search).not.toBeInTheDocument();

    //Click the login button but don't login mom because of bad credentials
    let axiosNoAuthPostData = {
      users_email: 'mom@gmail.com',
      password: 'badPass'
    };
    let axiosNoAuthPostReturnData = {
      response : {
        data : {
          message: 'Invalid credentials'
        }
      }
    };
    let axiosNoAuthPostReject;
    let axiosNoAuthPostReturn = new Promise((ful,rej)=>{
      axiosNoAuthPostReject = ()=>rej(axiosNoAuthPostReturnData);
    });
    let axiosNoAuthPostFunc = jest.fn(  ()=>axiosNoAuthPostReturn  );
    axiosFunc.axiosNoAuth = jest.fn(  ()=>({post:axiosNoAuthPostFunc})  );

    const lgInButton = screen.getByText('Login');
    userEvent.click(lgInButton);   

    search = await screen.findByText('Please Wait...', { selector: 'p' });  

    expect(axiosNoAuthPostFunc)
      .toHaveBeenCalledWith('/api/auth/user_login',axiosNoAuthPostData);
    expect(axiosNoAuthPostFunc).toHaveReturnedWith(axiosNoAuthPostReturn);

    search = screen.queryByText(
      'Incorrect login credentials used, please try again', 
      { selector: 'p' }
    );  
    expect(search).not.toBeInTheDocument();

    //Make the noAuth post API request return an error from server 
    axiosNoAuthPostReject();
    
    search = await screen.findByText(
      'Incorrect login credentials used, please try again', 
      { selector: 'p' }
    );  

    expect(localStorage.__STORE__).toEqual({});
    search = screen.queryByText('Please Wait...', { selector: 'p' });  
    expect(search).not.toBeInTheDocument();
  })


  //Tests for successful driver login and unsuccessful driver login 
  //are not here in this demo project, because they are just copy and
  //paste of the last two tests with some modifications.


});