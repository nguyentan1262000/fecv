import axios from './axios'

const fetchGetCandidate = (pageable,request) => {
    return axios.get("/candidate/get-candidates",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateCandidate = (data) => {
    return axios.post("/candidate/create",data,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    });
}

const fetchGetDetailCandidateById = (id) => {
    return axios.get("/candidate/" + id);
}

const fetchUpdateCandidate = (id,data) => {
    return axios.put(`/candidate/${id}`, data,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    });
}

const fetchDeleteCandidateById = (id) => {
    return axios.delete(`/candidate/${id}`);
}

export {fetchGetCandidate,fetchDeleteCandidateById,fetchCreateCandidate,fetchGetDetailCandidateById,fetchUpdateCandidate}