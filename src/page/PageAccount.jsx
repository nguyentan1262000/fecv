import { Space } from "antd";
import TableComponent from "../component/common/TableComponent";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import axios from "axios";
import { fetchGetUsers } from "../services/userAPI";
import moment from "moment";
import { data } from "autoprefixer";

const cl = [
    {
        title : 'avatarName',
        dataIndex: 'avatarName',
        key: 'avatarName',
        render: (_,record) =>(
            <NavLink className="avatar-account-item" to="#">
                <img src={record.avatarName} alt="" />
            </NavLink>
        )
    },
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
        title : 'updateAt',
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: (_,record) =>{
            let date = formattedDateTime(record.updateAt);
            return <p>{date}</p>
        }
    },
    {
        title: 'action',
        key: 'action',
        render: (_,record) => (
            <Space size="middle">
                <NavLink className="btn-action btn-update" to={"/account/update/" + record.id}>update</NavLink>
                <NavLink className="btn-action btn-delete" to="#">delete</NavLink>
            </Space>
        ),
    }
]

const formSearch = [

]

const formattedDateTime = (date) => {
    return moment(date).format("DD MMM YYYY, hh:mm A");
}
const PageAccount = (props) => {
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
        username: "like",
        role: "equal"
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

    const getUsers = async () => {
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
        const res = await fetchGetUsers(pageable,request);
        if(res.status == 200){
            setDataSource({
                ...dataSource,
                ...res.data
            })
        }
    }
 
    useEffect(() =>{
        getUsers();
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
                <span>Username</span>
                <Input placeholder="Username" name="username" onChange={handleInputChange} value={valueConditions.username}/>
            </div>
            <div className="item-form">
                <span>Role</span>
                <Input placeholder="Role" name="role" onChange={handleInputChange} value={valueConditions.role}/>
            </div>
            </div>
            {/* <button onClick={handleSubmitSearchForm} className="btn-search-form-common">Search</button> */}
        </div>
        <TableComponent columns={columns} 
        data={dataSource.items} 
        total={dataSource.total*10} 
        title="Table Account" 
        onPageChange={handlePageChange}
        linkAdd={`http://localhost:5173/account/new`}
        />
    </>
}

export default PageAccount;