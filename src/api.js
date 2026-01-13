import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.101.144:8000/api/",
});
