import { Avatar, Button, Select, Space } from "antd";
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
import { fetchGetCompanies } from "../services/companyAPI";

const cl = [
    {
        title : 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (_,record) =>(
            <NavLink className="avatar-account-item" to="#">
                <Avatar src={record.avatar} alt="no-image" />
            </NavLink>
        )
    },
    {
        title : 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title : 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title : 'Phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title : 'Websize',
        dataIndex: 'websize',
        key: 'websize',
    },
    {
        title : 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'action',
        key: 'Action',
        render: (_,record) => (
            <Space size="middle">
                    <NavLink className="btn-action btn-update" to={"/company/update/" + record.id}>
                        <FontAwesomeIcon icon={faPen} />
                    </NavLink>
                    <Button type="default" className="btn-action btn-delete" onClick={() => DeleteAccount(record.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </Space>
        ),
    }
]

const formattedDateTime = (date) => {
    return moment(date).format("DD-MM-YYYY hh:mm A");
}
const PageCompany = (props) => {
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

    const getCandidates = async () => {
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
        const res = await fetchGetCompanies(pageable,request);
        if(res.status == 200){
            setDataSource({
                ...dataSource,
                ...res.data
            })
        }
    }
 
    useEffect(() =>{
        getCandidates();
    },[pageable,valueConditions])

    return <>
        <div className="container-form-serach-common">
            <span className="title-form-search-common">Search form</span>
            <div className="form-search-common">
            <div className="item-form">
                <span>Name</span>
                <Input placeholder="Name user" onChange={handleInputChange} name="name" value={valueConditions.name}/>
            </div>
            <div className="item-form">
                <span>Email</span>
                <Input placeholder="Email" name="email" onChange={handleInputChange} value={valueConditions.email}/>
            </div>
            <div className="item-form">
                <span>Phone</span>
                <Input placeholder="Phone" name="phone" onChange={handleInputChange} value={valueConditions.phone}/>
            </div>
            <div className="item-form">
                <span>Location</span>
                <Input placeholder="location" name="location" onChange={handleInputChange} value={valueConditions.location}/>
            </div>
            <div className="item-form">
                <span>Websize</span>
                <Input placeholder="websize" name="websize" onChange={handleInputChange} value={valueConditions.websize}/>
            </div>
            </div>
            {/* <button onClick={handleSubmitSearchForm} className="btn-search-form-common">Search</button> */}
        </div>
        <TableComponent columns={columns} 
        data={dataSource.items} 
        total={dataSource.total*10} 
        title="Table Companys" 
        onPageChange={handlePageChange}
        linkAdd={`http://localhost:5173/company/new`}
        />
    </>
}

export default PageCompany;