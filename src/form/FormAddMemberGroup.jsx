import { Button, Flex, Form, Input, Select, Tag, Divider } from "antd";
import ItemUser from "../component/common/ItemUser";
import { useEffect, useState } from "react";
import { fetchGetUsers, fetchGetUsersNotInGroup } from "../services/userAPI";
import { fetchAddMembers } from "../services/groupAPI";
import { HttpStatusCode } from "axios";

const { Option, OptGroup } = Select;

const FormAddMemberGroup = (props) => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState([]);
    const [success,setSuccess] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [pageable,setPageable] = useState({
        page: 0,
        size: 10,
        sort: "id:ASC"
    });

    const {ids,groupId} = props

    const addManyMembers = async () => {
        const data = {
            members: selectedItems,
            groupRole: "MEMBER",
            group: groupId
        }
        const res = await fetchAddMembers(data);
        if(res.status == HttpStatusCode.Accepted){
            setSuccess(true);
        }
    }

    const getUsers = async () => {
        const res = await fetchGetUsersNotInGroup(pageable,JSON.stringify(ids));
        if(res.status == 200){
            setUsers(
                [...users,
                ...res.data.items]
            )
        }
        setLoading(false);
    }


    const onFinish = () => {
        addManyMembers();
    }

    const addMoreUser = () => {
        setLoading(true);
        setPageable(prev => ({
            ...prev,
            page: prev.page + 1
        }))
      };

    const tagRender = (props) => {
        const { label, value, onClose } = props;
        
        return (
          <Tag
            color="blue"  // Màu của tag
            onClose={onClose}
            closable
            style={{ marginRight: 3}}
          >
            {label} {/* Nội dung của tag */}
          </Tag>
        );
      };

    useEffect(()=>{
        getUsers();
    },[pageable]);
    return <div className="form__add-member">
        <h2 className="title">Form Add Member</h2>
        <p className='title-bottom'>Please fill in candidate information in the form below.</p>
        {(!success) ? 
        <Form form={form} layout='vertical' onFinish={() => {onFinish()}}>
            <Form.Item label="Name" name="member">
            <Select mode="multiple" 
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                className="w-full"
                tagRender={tagRender}
                >
                    <OptGroup>
                    
                    {Object.values(users).map(item => (
                       <Option key={item.id} value={item.id}>
                           <ItemUser data={item} />
                       </Option>
                   ))}
                    
                    </OptGroup>
                    <Divider/>
                    <Option key="addUser" value="addUser" disabled>
                        <span onClick={addMoreUser} style={{ cursor: 'pointer', color: '#1890ff' }}>
                            more
                        </span>
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Add Member</Button>
            </Form.Item>
        </Form>

        :
        <p>Add member success.</p>
        }
    </div>
}

export default FormAddMemberGroup;