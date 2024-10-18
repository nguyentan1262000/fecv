import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8083",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyb290IiwiaWF0IjoxNzI5MTUwMDI0LCJleHAiOjE3MjkxNzA3NjB9.j6FXP4vo4QIAEY4_CrHDmaCYy_RgrzIihu4aNZAijGZcs5BkK-cq7AzgmNsHEmqF',
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
        res.message = error.response.message;
        res.status = error.response.status;
        res.headers =error.response.headers;
    }else if(error.request){
        console.log(error.request);
    }else{
        console.log("Error",error.message);
    }

    return res;
});

export default instance;