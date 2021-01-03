import React from 'react';
import { render, screen, } from '@testing-library/react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import 'jest-localstorage-mock';
import {axiosNoAuth} from '../../utils/axiosConfig';
const { exec } = require("child_process");
const { toMatchDiffSnapshot, getSnapshotDiffSerializer} = require('snapshot-diff');

import rootReducer from '../../reducers/rootReducer.js';

import MomDriversList from './MomDriversList.js'


expect.extend({ toMatchDiffSnapshot });
expect.addSnapshotSerializer(getSnapshotDiffSerializer());
const store = createStore(rootReducer, applyMiddleware(thunk));
const pathBackEnd = '/Volumes/ST5/DB/OL/CI-LambdaSchool/Unit07-Endorsement/A1-FrontEndPrj_unit3/BackEndCode/ride_for_life_backend';
let asFragment;
let timeOutVal = 10000;
let testCntr = 100;
let stopTests = true;


async function osCmd(cmd){
  let fulfill;
  const promiseObj = new Promise((f)=>{fulfill=f});
  exec(cmd,(error,stdout,stderr)=>{
    if (error) {
      console.log(`osCmd error: ${error.message}`);
      return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    // console.log(`stdout: ${stdout}`);
    fulfill();
  });
  await promiseObj;  
}


/*********************************************************************************
*
*  Note that this test works with the seed data provided from the backend.
*  This means that you must start the backend for these tests to run successfully
*  This also means then that the tests check the axios API code without mocking
*  the axios functions.
*  Also the momDataReducer and the uiMomDrvListReducer sub-reducers are checked
*  without being mocked
*
**********************************************************************************/
describe('Tests for MomDriversList', ()=>{
  beforeAll(async ()=>{
    //Increase the timeout from default value of 5sec
    jest.setTimeout(timeOutVal); 

    //Check that the backend server is running
    try {
      let response = await axiosNoAuth().get('/');
      stopTests = false;
      // console.log('The URL of jsdom is :',window.location.href);
      // console.log('The message from backend :',response.data.server);
    }
    catch(err) {
      console.log('********************** LOOKS LIKE THE BACKEND SERVER IS NOT STARTED');
    }
  })


  beforeEach(async ()=>{
    if(stopTests) return;
    //Render the component
    const renderReturn  = render(
      <Provider store={store}>
          <MomDriversList/>        
      </Provider>
    )
    asFragment = renderReturn.asFragment;
  })
  
  test(`- ${testCntr++} - check initial contents`, ()=>{
    if(stopTests) return;
    expect(asFragment()).toMatchSnapshot();
  })


  test(`- ${testCntr++} - check that there are 3 search options`, ()=>{
    if(stopTests) return;
    const firstRender = asFragment();
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by email shows input box and run button`, ()=>{
    if(stopTests) return;
    const firstRender = asFragment();
    
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownEmail = screen.getByText("Driver's email", { selector: 'button' });
    userEvent.click(dropDownEmail);

    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - search for driver by email where driver has no reviews`, async ()=>{
    if(stopTests) return;
    //Initialize the backend database
    await osCmd(`cd ${pathBackEnd} && ./node_modules/.bin/knex seed:run --env development`);

    //Get a token for the mom from backend and save it to localStorage
    localStorage.clear();
    let dataToServer = {
      users_email: 'seedMom1@gmail.com',
      password: 'pass'
    }
    let response = await axiosNoAuth().post('/api/auth/user_login',dataToServer);
    localStorage.setItem('authToken',response.data.token);
    localStorage.setItem('userId',response.data.id);

    //Enter driver's email address and capture firstRender
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownEmail = screen.getByText("Driver's email", { selector: 'button' });
    userEvent.click(dropDownEmail);
    const inputBox = screen.getByLabelText("Driver's email:");
    await userEvent.type(inputBox,'seedDriver1@gmail.com');
    const firstRender = asFragment();

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/Plot:/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - search for driver by email where email is bad`, async ()=>{
    if(stopTests) return;
    //Initialize the backend database
    await osCmd(`cd ${pathBackEnd} && ./node_modules/.bin/knex seed:run --env development`);

    //Get a token for the mom from backend and save it to localStorage
    localStorage.clear();
    let dataToServer = {
      users_email: 'seedMom1@gmail.com',
      password: 'pass'
    }
    let response = await axiosNoAuth().post('/api/auth/user_login',dataToServer);
    localStorage.setItem('authToken',response.data.token);
    localStorage.setItem('userId',response.data.id);

    //Enter driver's email address and capture firstRender
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownEmail = screen.getByText("Driver's email", { selector: 'button' });
    userEvent.click(dropDownEmail);
    const inputBox = screen.getByLabelText("Driver's email:");
    await userEvent.type(inputBox,'bad@gmail.com');
    const firstRender = asFragment();

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/No driver found/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - search for driver by email where driver has reviews`, async ()=>{
    if(stopTests) return;
    //Initialize the backend database
    await osCmd(`cd ${pathBackEnd} && ./node_modules/.bin/knex seed:run --env development`);

    //Get a token for the mom from backend and save it to localStorage
    localStorage.clear();
    let dataToServer = {
      users_email: 'seedMom1@gmail.com',
      password: 'pass'
    }
    let response = await axiosNoAuth().post('/api/auth/user_login',dataToServer);
    localStorage.setItem('authToken',response.data.token);
    localStorage.setItem('userId',response.data.id);

    //Enter driver's email address and capture firstRender
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownEmail = screen.getByText("Driver's email", { selector: 'button' });
    userEvent.click(dropDownEmail);
    const inputBox = screen.getByLabelText("Driver's email:");
    await userEvent.type(inputBox,'seedDriver2@gmail.com');
    const firstRender = asFragment();

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/Plot:/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot shows input boxes, check circles and run button`, ()=>{
    if(stopTests) return;
    const firstRender = asFragment();
    
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);

    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot gives proper error message
      with lower value higher than upper`, async ()=>{
    if(stopTests) return;
    //Get initial snapshot   
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);
    const firstRender = asFragment();

    //Type in the inputs, but with lower number higher than upper number
    const inputBoxLower = screen.getByLabelText("Lower range value:");
    await userEvent.type(inputBoxLower,'150');
    const inputBoxUpper = screen.getByLabelText("Upper range value:");
    await userEvent.type(inputBoxUpper,'50');

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/the same as or bigger/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot finds correct drivers - sorted by rating`, async ()=>{
    if(stopTests) return;
    //Get initial snapshot   
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);
    const firstRender = asFragment();

    //Type in the inputs
    const inputBoxLower = screen.getByLabelText("Lower range value:");
    await userEvent.type(inputBoxLower,'50');
    const inputBoxUpper = screen.getByLabelText("Upper range value:");
    await userEvent.type(inputBoxUpper,'150');

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/seedDriver10/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot finds correct drivers - sorted by price`, async ()=>{
    if(stopTests) return;
    //Get initial snapshot   
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);
    const firstRender = asFragment();

    //Type in the inputs
    const inputBoxLower = screen.getByLabelText("Lower range value:");
    await userEvent.type(inputBoxLower,'50');
    const inputBoxUpper = screen.getByLabelText("Upper range value:");
    await userEvent.type(inputBoxUpper,'150');

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/seedDriver10/, { selector: 'p' },{timeout:timeOutVal});
    
    //Click the price radio button
    const priceRdBtn = screen.getByTestId('divCirChk-Price');
    userEvent.click(priceRdBtn);
    
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot finds correct drivers, 
      then exercise the 'view details' and 'back to list' buttons`, async ()=>{
    if(stopTests) return;
    //Choose to search by plot location range  
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);

    //Type in the inputs
    const inputBoxLower = screen.getByLabelText("Lower range value:");
    await userEvent.type(inputBoxLower,'50');
    const inputBoxUpper = screen.getByLabelText("Upper range value:");
    await userEvent.type(inputBoxUpper,'150');

    //Get first snapshot   
    const firstRender = asFragment();

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/seedDriver10/, { selector: 'p' },{timeout:timeOutVal});

    //Click the 'view details' button of the seedDriver10
    const driver10ViewDetailsBtn = screen.getAllByText("View details", { selector: 'button' })[4];
    userEvent.click(driver10ViewDetailsBtn);

    await screen.findByText(/Phone/, { selector: 'p' },{timeout:timeOutVal});

    //Get second snapshot   
    const secondRender = asFragment();

    //Save first diffSnapshot
    expect(firstRender).toMatchDiffSnapshot(secondRender);

    //Click the 'back to list' button 
    const backToListBtn = screen.getByText("Back to List", { selector: 'button' });
    userEvent.click(backToListBtn);

    await screen.findByText(/seedDriver4/, { selector: 'p' },{timeout:timeOutVal});

    //Save second diffSnapshot
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  test(`- ${testCntr++} - check that driver search by plot gives proper error message
      when no driver can be found in plot range`, async ()=>{
    if(stopTests) return;
    //Get initial snapshot   
    const dropDown = screen.getByText('Choose search criteria', { selector: 'p' });
    userEvent.click(dropDown);
    const dropDownPlot = screen.getByText("Plot location range", { selector: 'button' });
    userEvent.click(dropDownPlot);
    const firstRender = asFragment();

    //Type in the inputs, but with lower number higher than upper number
    const inputBoxLower = screen.getByLabelText("Lower range value:");
    await userEvent.type(inputBoxLower,'500');
    const inputBoxUpper = screen.getByLabelText("Upper range value:");
    await userEvent.type(inputBoxUpper,'600');

    //Click the run search button
    const runBtn = screen.getByText("Run Search", { selector: 'button' });
    userEvent.click(runBtn);

    await screen.findByText(/No drivers/, { selector: 'p' },{timeout:timeOutVal});
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  })


  /*****************************************************************
   * 
   * The tests for price range search are not here in this demo project
   * because they are just copy and paste of the location range search 
   * with some modifications
   *  
  *******************************************************************/




})