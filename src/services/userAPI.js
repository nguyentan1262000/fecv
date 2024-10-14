import axios from './axios'

const fetchGetUsers = () => {
    return axios.get("/user/get-users",);
}

const fetchCreateNewAccount = (data) => {
    return axios.post("/user/create-user",data);
}

export {fetchGetUsers,fetchCreateNewAccount}