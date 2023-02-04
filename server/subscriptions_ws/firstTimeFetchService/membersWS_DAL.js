import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/users'
export const getAllMembers = () =>{
    return axios.get(url);
}

