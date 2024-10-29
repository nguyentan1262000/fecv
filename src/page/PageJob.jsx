import { Select, Space } from "antd";
import TableComponent from "../component/common/TableComponent";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import axios from "axios";
import { fetchGetUsers } from "../services/userAPI";
import moment from "moment";
import { data } from "autoprefixer";
import { fetchGetCandidate } from "../services/candidateApi";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash,faPen} from '@fortawesome/free-solid-svg-icons';
import { fetchGetJobs } from "../services/jobAPI";

const cl = [
    {
        title : 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    
    {
        title : 'position',
        dataIndex: 'position',
        key: 'position'
    },
    {
        title : 'requirements',
        dataIndex: 'requirements',
        key: 'requirements'
    },
    {
        title : 'expirationTime',
        dataIndex: 'expirationTime',
        key: 'expirationTime'
    },
    {
        title : 'Quantity',
        dataIndex: 'candidateQuantity',
        key: 'candidateQuantity',
    },
    {
        title: 'action',
        key: 'action',
        render: (_,record) => (
            <Space size="middle">
                <NavLink className="btn-action btn-update" to={"/account/update/" + record.id}>
                    <FontAwesomeIcon icon={faPen} />
                </NavLink>
                <NavLink className="btn-action btn-delete" to="#"><FontAwesomeIcon icon={faTrash} /></NavLink>
            </Space>
        ),
    }
]

const formattedDateTime = (date) => {
    return moment(date).format("DD-MM-YYYY hh:mm A");
}
const PageJob = (props) => {
    const [dataSource,setDataSource] = useState({});
    const [columns, setColumns] = useState(cl);
    const [pageable,setPageable] = useState({
        page: 0,
        size: 10,
        sort: "id:ASC"
    });
    const [valueConditions,setValueConditions] = useState({
    });
    const [matchModeConditions,setMatchModeConditions] = useState({
        name: "like",
        email: "like",
        phone: "like",
        birthday: "like",
        gender: "equal"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(value == ''){
            setValueConditions((prevState) => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
            });
        }else{
            setValueConditions((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handlePageChange = (newPage) =>{
        setPageable({
            ...pageable,
            page: newPage - 1
        })
    }

    const getJobs = async () => {
        let newConditions = {};
        Object.keys(valueConditions).forEach((condition) => {
            newConditions = {
                ...newConditions,
                [condition]: {
                    value: valueConditions[condition],
                    matchMode: matchModeConditions[condition]
                }
            }
        });
        const request = JSON.stringify(newConditions)
        const res = await fetchGetJobs(pageable,request);
        if(res.status == 200){
            setDataSource({
                ...dataSource,
                ...res.data
            })
        }
    }
 
    useEffect(() =>{
        getJobs();
    },[pageable,valueConditions])

    return <>
        <div className="container-form-serach-common">
            <span className="title-form-search-common">Search form</span>
            <div className="form-search-common">
            <div className="item-form">
                <span>Title</span>
                <Input placeholder="Title" onChange={handleInputChange} name="title" value={valueConditions.title}/>
            </div>
            </div>
            {/* <button onClick={handleSubmitSearchForm} className="btn-search-form-common">Search</button> */}
        </div>
        <TableComponent columns={columns} 
        data={dataSource.items} 
        total={dataSource.total*10} 
        title="Table Job" 
        onPageChange={handlePageChange}
        linkAdd={`http://localhost:5173/job/new`}
        />
    </>
}

export default PageJob;