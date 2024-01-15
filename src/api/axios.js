import axios from "axios";

const backend = process.env.REACT_APP_BASEURL;


const instance = axios.create({
  baseURL: backend,
});

export default instance;
