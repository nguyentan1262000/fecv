import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8083",
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => response.data,
    error => {
    let res = {};
    if(error.response)
    {
        res.data =  error.response.data;
        res.message = error.response.message;
        res.status = error.response.status;
        res.headers =error.response.headers;
    }else if(error.request){
        console.log(error.request);
    }else{
        console.log("Error",error.message);
    }
    return Promise.reject(res)
});

export default instance;