import axios from './axios'

const fetchGetInterviews = (pageable,request) => {
    return axios.get("/interview/get-interviews",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateInterview = (data) => {
    return axios.post("/interview/",data);
}

const fetchGetDetailInterviewById = (id) => {
    return axios.get("/interview/" + id);
}

const fetchUpdateInterview = (id,data) => {
    return axios.put(`/interview/${id}`, data);
}

const fetchDeleteInterviewById = (id) => {
    return axios.delete(`/interview/${id}`);
}

export {fetchGetInterviews,fetchCreateInterview,fetchGetDetailInterviewById,fetchDeleteInterviewById,fetchUpdateInterview}