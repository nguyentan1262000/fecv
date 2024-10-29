import { faCameraRetro, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input ,Space} from "antd";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { fetchGetDetailCandidateById } from "../services/candidateApi";
import TableComponent from "../component/common/TableComponent";
import { fetchGetDetailCvById } from "../services/cvAPI";
import { getNameReference } from "../utils/ConvertTime";

const DetailCv = (props) => {
    const [data,setData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const getCv = async (idUser) => {
        const res = await fetchGetDetailCvById(idUser);
        setData(res.data);
        setLoading(false);
    }

    const formattedDateTime = (date) => {
        return moment(date).format("DD-MM-YYYY hh:mm A");
    }

    
    useEffect(() => {
        getCv(id);
    },[])
    
return <div className="candidate__detail">
        <h2 className="title__candidate">Caniddate information</h2>
        
        <div className="info">
            <div className="avatar">
                <img src={data.avatar} alt="avatar" />
                <FontAwesomeIcon icon={faCameraRetro} />
            </div>
            <div className="context-info">
            <div className="item-form">
                <span>Name :</span>
                <p>{data.name}</p>
            </div>
            <div className="item-form">
                <span>Email :</span>
                <p>{data.email}</p>
            </div>
            <div className="item-form">
                <span>Phone :</span>
                <p>{data.phone}</p>
            </div>
            <div className="item-form">
                <span>Birthday :</span>
                <p>{data.birthday}</p>
            </div>
            <div className="item-form">
                <span>Gender :</span>
                <p>MALE</p>
            </div>
            </div>
        </div>
        <div className="underline"></div>
        {loading ? (
        <p>Loading form data...</p>
        ) : (
        <div className="cv-detail">
            <h2 className="title__candidate">CV information</h2>
            <div className="info-cv">
            <div className="item-form">
                <span>Position :</span>
                <p>{data.position}</p>
            </div>
            <div className="item-form">
                <span>Experience :</span>
                <p>{data.experience}</p>
            </div>
            <div className="item-form">
                <span>Education :</span>
                <p>{data.education}</p>
            </div>
            <div className="item-form w-100">
                <span>Skills :</span>
                <p>{data.skills}</p>
            </div>
            <div className="item-form w-100">
                <span>Description :</span>
                <p className="text-start">{data.description}</p>
            </div>
            <div className="item-form w-100">
                <span className="">Reference :</span>
                <NavLink className="text-start" to={data.reference}>
                    {getNameReference(data.reference)}
                    </NavLink>
            </div>
        </div>
        </div>)}
    </div>
}

export default DetailCv;