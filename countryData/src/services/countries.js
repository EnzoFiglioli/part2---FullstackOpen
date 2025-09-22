import axios from "axios";
const baseDir = "https://studies.cs.helsinki.fi/restcountries/api";

    function filter(){
    const request = axios.get(`${baseDir}/all`)
    return request.then(response => response.data)
}

export default {filter}