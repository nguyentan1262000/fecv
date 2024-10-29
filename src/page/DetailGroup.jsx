
import { faCameraRetro, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Input ,Modal,Space} from "antd";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { fetchGetDetailCandidateById } from "../services/candidateApi";
import TableComponent from "../component/common/TableComponent";
import { fetchGetDetailGroupById, fetchRemoveMember } from "../services/groupAPI";
import FormAddMemberGroup from "../form/FormAddMemberGroup";

const DetailGroup = (props) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] =  useState(true);
    const {id} = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const cl = [
        {
            title : 'Avatar',
            dataIndex: 'avatarName',
            key: 'avatarName',
            render: (_,record) =>(
                <NavLink className="avatar-account-item" to="#">
                    <Avatar src={record.avatarName} alt="" />
                </NavLink>
            )
        },
        {
            title : 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_,record) => {
                return <NavLink to={``}>{record.name}</NavLink>
            }
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
            title : 'Role',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <Space size="middle">
                    <Button type="default" className="btn-action btn-delete" onClick={() => requestRemoveMember(record.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </Space>
            ),
        }
    ];

    const ids = () => {
        
    }    

    const requestRemoveMember = async (memberId) => {
        const res = await fetchRemoveMember(memberId,id);
        if(res){
            getGroup(id);
        }else{
            alert('Fail to remove member.');
        }
        
    }

    const getGroup = async (idUser) => {
        const res = await fetchGetDetailGroupById(idUser);
        setData(res.data);
        setLoading(false);
    }

    console.log(data)
    const handleOkModal = () => {
        setIsModalOpen(false);
        getGroup(id);
    }

    const handleCancelModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
      getGroup(id);
    },[])
return <div className="candidate__detail group__detail">
        <h2 className="title__candidate">Caniddate information</h2>
        <div className="info group__detail-info">
            <div className="context-info flex w-full flex-wrap">
            <div className="item-form ">
                <span >Name :</span>
                <p>{data.name}</p>
            </div>
            <div className="item-form ">
                <span>Manager :</span>
                <p>{data.manager && data.manager.name}</p>
            </div>
            <div className="item-form ">
                <span>Type :</span>
                <p>{data.modifier}</p>
            </div>
            <div className="item-form w-100">
                <span>Description :</span>
                <p>{data.description}</p>
            </div>
            </div>
        </div>
        <div className="underline"></div>
        <div className="tab-menu-group">
            <Button onClick={() => {setIsModalOpen(true)}} className="btn__add-member">Add member</Button>
        </div>  
        <TableComponent columns={cl} 
            data={data.listMember} 
            total={data.totalMember} 
            title="List Members" 
            linkAdd={`http://localhost:5173/group/new-member`}
        />
        {
            (loading ? <p>loading.....</p> : 
                <Modal  title="Form Add Member" 
                    width={1000}
                    open={isModalOpen} 
                    onOk={() => {handleOkModal()}} 
                    onCancel={() => {handleCancelModal()}}>
                    <FormAddMemberGroup groupId={id} ids={data.listMember.map(item => item.id)}/>
                </Modal> 
            )
        }
         
    </div>
    
}

export default DetailGroup;