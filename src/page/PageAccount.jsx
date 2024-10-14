import { Space } from "antd";
import TableComponent from "../component/common/TableComponent";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import axios from "axios";
import { fetchGetUsers } from "../services/userAPI";

const cl = [
    {
        title : 'name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title : 'email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title : 'phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title : 'username',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title : 'role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title : 'updateBy',
        dataIndex: 'updateBy',
        key: 'updateBy'
    },
    {
        title : 'updateAt',
        dataIndex: 'updateAt',
        key: 'updateAt'
    },
    {
        title: 'action',
        key: 'action',
        render: (_,record) => (
            <Space size="middle">
                <NavLink to="#">update</NavLink>
                <NavLink to="#">delete</NavLink>
            </Space>
        ),
    }
]
const PageAccount = (props) => {
    const [dataSource,setDataSource] = useState({});
    const [columns, setColumns] = useState(cl);
    const [pageable,setPageable] = useState({
        page: 0,
        size: 10,
        sort: ""
    });
    const [formConditions,setFormConditions] = useState({
        name: "",
        email: "",
        username:"",
        role: "",
        phone: "",
    });
    const handlePageChange = (newPage) =>{
        setPageable({
            ...pageable,
            page: newPage - 1
        })
    }

    const getUsers = async () => {
        const res = await fetchGetUsers();
        if(res.status == 200){
            setDataSource({
                ...dataSource,
                ...res.data
            })
        }
    }

    useEffect(() =>{
        getUsers();
    },[pageable])

    console.log(dataSource)

    return <>
        <div className="container-form-serach-common">
            <span className="title-form-search-common">Search form</span>
            <div className="form-search-common">
            <div className="item-form">
                <span>Name</span>
                <Input placeholder="Name user" value={formConditions.name}/>
            </div>
            <div className="item-form">
                <span>Email</span>
                <Input placeholder="Email" value={formConditions.email}/>
            </div>
            <div className="item-form">
                <span>Phone</span>
                <Input placeholder="Phone" value={formConditions.phone}/>
            </div>
            <div className="item-form">
                <span>Username</span>
                <Input placeholder="Username" value={formConditions.username}/>
            </div>
            <div className="item-form">
                <span>Role</span>
                <Input placeholder="Role" value={formConditions.role}/>
            </div>
            </div>
            <button className="btn-search-form-common">Search</button>
        </div>
        <TableComponent columns={columns} data={dataSource.items} total={dataSource.total*10} title="Table Account" onPageChange={handlePageChange}/>
    </>
}

export default PageAccount;