import axios from "axios";

const url = 'https://api.tvmaze.com/shows'
export const getMovies = () =>{
    return axios.get(url);
}

