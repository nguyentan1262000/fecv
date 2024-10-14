import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8083",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyb290IiwiaWF0IjoxNzI4OTAxMTAwLCJleHAiOjE3Mjg5MjE4MzZ9.0qye31TCa3CejCaeGj8i3k_ewwRytr5rk4EMvDAmbKm848w6_w3MvldJJbwNhUeW',
        'Content-Type': 'multipart/form-data'
    }

});

instance.interceptors.response.use(function (response){
    // if (localStorage.getItem("access-token")) {
    //     const token = localStorage.getItem("access-token");
    //     response.headers.Authorization = `Bearer ${token}`;
    // }

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