import axios from "axios";
import { api } from "./urlConfig";
const token = localStorage.getItem("token");
console.log("======> token ", token);
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    'Authorization': token ? `Bearer ${token}` : ''
  }
});
export default axiosIntance;
