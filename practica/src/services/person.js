import axios from "axios";
const baseDir = "http://localhost:3001/persons"

const create = newObject =>{
    const request = axios.post(baseDir,newObject);
    return request.then(response => response.data);
}

const delete_ = id =>{
    const request = axios.delete(`${baseDir}/${id}`);
    return request.then(response => response.data);
}

const getAll = ()=>{
    const request = axios.get(baseDir);
    return request.then(response => response.data);
}

const update = (newObject) =>{
    const numberChanged = {
        ...newObject,
        number: newObject.number
    };
    const request = axios.put(`${baseDir}/${newObject.id}`, numberChanged);
    return request.then(response => response.data);
}

export default {create, getAll, delete: delete_, update}