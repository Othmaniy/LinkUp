import axios from "axios"
const getRequest=axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true,
})


export default getRequest;
