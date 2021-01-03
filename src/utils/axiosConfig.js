import axios from "axios";

/*******************************************************************

      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        IMPORTANT NOTE
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      I later learned that this way of writing the module creates
      a new axios instance whenever we use either of the functions.

      This means we create many axios instances, as we use the functions
      a lot.

      We only need 2 axios instances for this project and not so many.
      See my Docs/axios folder for more information on how to do better
      in the future.



********************************************************************/




export function axiosWithAuth() {
  const token = localStorage.getItem('authToken');

  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Authorization': `${token}`,
    },
  });
};


export function axiosNoAuth() {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
  });
};
