import axios from './axios'

const fetchGetUsers = (pageable,request) => {
    return axios.get("/user/get-users",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateNewAccount = (data) => {
    return axios.post("/user/create-user",data);
}

const fetchGetDetailUserById = (id) => {
    return axios.get("/user/" + id);
}

const fetchAdminUpdateAccount = (id,data) => {
    return axios.put(`/user/update/${id}`, data);
}

export {fetchGetUsers,fetchCreateNewAccount,fetchGetDetailUserById,fetchAdminUpdateAccount}