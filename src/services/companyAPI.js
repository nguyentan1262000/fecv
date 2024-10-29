import axios from './axios'

const fetchGetCompanies = (pageable,request) => {
    return axios.get("/company/get-companies",{
        params:{
            ...pageable,
            request: request
        }
    });
}

const fetchCreateCompany = (data) => {
    return axios.post("/company/",data);
}

const fetchGetDetailCompanyById = (id) => {
    return axios.get("/company/" + id);
}

const fetchUpdateCompany = (id,data) => {
    return axios.put(`/company/${id}`, data);
}

const fetchDeleteCompanyById = (id) => {
    return axios.delete(`/company/${id}`);
}

export {fetchGetCompanies,fetchCreateCompany,fetchGetDetailCompanyById,fetchDeleteCompanyById,fetchUpdateCompany}