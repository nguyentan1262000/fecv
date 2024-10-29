import axios from './axios'

const fetchGetCvs = (pageable,request) => {
    return axios.get("/cv/get-cvs",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateCv = (data) => {
    return axios.post("/cv/",data,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    });
}

const fetchGetDetailCvById = (id) => {
    return axios.get("/cv/" + id);
}

const fetchUpdateCv = (id,data) => {
    return axios.put(`/cv/${id}`, data,
        {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
    );
}

const fetchDeleteCvById = (id) => {
    return axios.delete(`/cv/${id}`);
}

export {fetchGetCvs,fetchCreateCv,fetchGetDetailCvById,fetchDeleteCvById,fetchUpdateCv}