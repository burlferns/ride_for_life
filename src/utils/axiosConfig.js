import axios from "axios";

export function axiosWithAuth() {
  const token = localStorage.getItem('token');

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



