import { faCameraRetro, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input ,Space} from "antd";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { fetchGetDetailCandidateById } from "../services/candidateApi";
import TableComponent from "../component/common/TableComponent";
import { getNameReference } from "../utils/ConvertTime";

const DetailCandidate = (props) => {
    const [data,setData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const cl = [
        {
            title: '',
            render:(_,record) => (
                <NavLink to={`/cv/${record.id}`}>See Detail</NavLink>
            )
        },
        {
            title : 'Position',
            dataIndex: 'position',
            key: 'position'
        },
        {
            title : 'Experience',
            dataIndex: 'experience',
            key: 'experience'
        },
        {
            title : 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title : 'Skills',
            dataIndex: 'skills',
            key: 'skills',
        },
        {
            title : 'Education',
            dataIndex: 'education',
            key: 'education',
        },
        {
            title : 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            render: (_,record) => (
                <NavLink className="text-start" to={record.reference}>
                    {getNameReference(record.reference)}
                </NavLink>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <Space size="middle">
                    <NavLink className="btn-action btn-update" to={"/cv/update/" + record.id}>
                        <FontAwesomeIcon icon={faPen} />
                    </NavLink>
                    <NavLink className="btn-action btn-delete" to="#"><FontAwesomeIcon icon={faTrash} /></NavLink>
                </Space>
            ),
        }
    ]

    const getCandidate = async (idUser) => {
        const res = await fetchGetDetailCandidateById(idUser);
        setData(res.data);
        setLoading(false);
    }

    const formattedDateTime = (date) => {
        return moment(date).format("DD-MM-YYYY hh:mm:ss");
    }

    useEffect(() => {
      getCandidate(id);
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
                <p>{data.gender}</p>
            </div>
            </div>
        </div>
        <div className="underline"></div>
        <TableComponent 
            columns={cl} 
            data={data.listCV} 
            total={data.totalCv} 
            title="Table Candidate" 
            linkAdd={`http://localhost:5173/candidate/new`}
        />
    </div>
    
}

export default DetailCandidate;