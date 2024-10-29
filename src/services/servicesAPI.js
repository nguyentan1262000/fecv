import axios from './axios';

const fetchRequestSendEmail= (data) => {
    return axios.post("/notification/send-email",data)
}

export {fetchRequestSendEmail}