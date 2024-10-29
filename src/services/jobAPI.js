import axios from './axios'

const fetchGetJobs = (pageable,request) => {
    return axios.get("/job/get-jobs",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateJob = (data) => {
    return axios.post("/job/",data);
}

const fetchGetDetailJobById = (id) => {
    return axios.get("/job/" + id);
}

const fetchUpdateJob = (id,data) => {
    return axios.put(`/job/${id}`, data);
}

const fetchDeleteJobById = (id) => {
    return axios.delete(`/job/${id}`);
}

export {fetchGetJobs,fetchCreateJob,fetchGetDetailJobById,fetchDeleteJobById,fetchUpdateJob}