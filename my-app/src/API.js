import axios from "axios";

const API = axios.create({
    baseURL: "http://34.123.176.124:8080/"

})

export default API;
