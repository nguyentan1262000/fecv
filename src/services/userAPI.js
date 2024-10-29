import axios from './axios'

const fetchGetUsers = (pageable,request) => {
    return axios.get("/user/get-users",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchGetUsersNotInGroup = (pageable,request) => {
    return axios.get("/user/get-users-not-in-group",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateNewAccount = (data) => {
    return axios.post("/user/create-user",data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const fetchGetDetailUserById = (id) => {
    return axios.get("/user/" + id);
}

const fetchAdminUpdateAccount = (id,data) => {
    return axios.put(`/user/update/${id}`, data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const fetchAdminDeleteAccountById = (id) => {
    return axios.patch(`/user/delete/${id}`);
}

const fetchGetMyProfile = () => {
    return axios.get(`/user/get-info`);
}
export {fetchGetUsers,fetchCreateNewAccount,fetchGetDetailUserById,fetchAdminUpdateAccount,fetchGetMyProfile,fetchAdminDeleteAccountById,fetchGetUsersNotInGroup}