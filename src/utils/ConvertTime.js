import React from 'react';
import moment from "moment";

const formDateTimeRequest = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}


const formattedDateTime = (date) => {
    return moment(date).format("DD-MM-YYYY");
}

function getNameReference(url){
    if(!url){
        return url
    }
    let urlParts = url.split('/');
    const fileNameWithParams = urlParts[urlParts.length - 1];
    const fileName = fileNameWithParams.split('?')[0];
    return fileName.split("_")[1];
}

export {formDateTimeRequest,formattedDateTime,getNameReference}