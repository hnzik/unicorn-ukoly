import axios from "axios";
console.log(process.env.REACT_APP_IS_MOCK);

export const api = axios.create({
    baseURL: process.env.REACT_APP_IS_MOCK ?  process.env.REACT_APP_MOCK_URL : process.env.REACT_APP_PROD_URL,
  });

  