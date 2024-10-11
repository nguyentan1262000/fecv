import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5173/",
});

instance.interceptors.response.use(function (response){
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        response.headers.Authorization = `Bearer ${token}`;
    }

    return response ? response.data : {statusCode: response.status};
},function (error){
    let res = {}
    if(error.response)
    {
        res.data =  error.response.data;
        res.status = error.response.status;
        res.headers =error.response.headers;
    }else if(error.request){
        console.log(error.request);
    }else{
        console.log("Error",error.message);
    }

    return res;
    // return Promise.reject(error);
});

export default instance;