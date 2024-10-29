import axios from './axios'

const fetchGetGroups = (pageable,request) => {
    return axios.get("/team/get-groups",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateGroup = (data) => {
    return axios.post("/team/",data);
}

const fetchAddMember = (data) => {
    return axios.post("/team/add-member",data);
}

const fetchGetDetailGroupById = (id) => {
    return axios.get("/team/" + id);
}

const fetchUpdateGroup = (id,data) => {
    return axios.put(`/team/${id}`, data);
}

const fetchDeleteGroupById = (id) => {
    return axios.delete(`/team/${id}`);
}

const fetchRemoveMember = (memberId,groupId) => {
    return axios.delete(`/team/remove-member/${groupId}`,{
        params:{
            idUser : memberId
        }
    });
}

const fetchAddMembers = (data) => {
    return axios.post('/team/add-list-member',data);
}

export {fetchAddMember,fetchCreateGroup,fetchDeleteGroupById,fetchGetDetailGroupById,fetchGetGroups,fetchRemoveMember,fetchUpdateGroup,fetchAddMembers}