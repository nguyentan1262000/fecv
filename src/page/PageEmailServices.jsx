import { faFilter, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Label } from "recharts";
import { fetchGetUsers } from "../services/userAPI";
import { stringify } from "postcss";
import { fetchRequestSendEmail } from "../services/servicesAPI";

const PageEmailServices = () => {
    const [form] = Form.useForm();
    const [arrive,setArrive] = useState([]);
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [search,setSearch]=  useState('');
    const [pageable,setPageable] = useState({
        page: 0,
        size: 5,
        sort: "id:ASC"
    });


    const onFinish = (values) => {
        const data = {
            ...values,
            arrives: values.arrives.join(",")
        }
        submitSendMail(data)
    }

    const submitSendMail = async (data) => {
        const  res = fetchRequestSendEmail(data);
        if(res.status == 200){
            alert('Email pending....');
        }else{
            alert('Send email fail.');
        }
    }

    const getUsers = async () => {
        let newConditions = {
            email: {
                value: search,
                matchMode: 'like'
            }
        };
        const request = JSON.stringify(newConditions)
        const res = await fetchGetUsers(pageable,request);
        if(res.status == 200){
            const newArrive = res.data.items.map(e => e.email);
            setArrive(newArrive);
            setLoading(false)
        }
    }
    
    const onChangeArrive = (e) => {
        setSearch(e)
    }

    useEffect(() => {
        getUsers();
    },[search]);

    return <div className="email-service">
        <Form form={form} name='useForm' onFinish={onFinish}>
        <Form.Item name="arrives">
        <Select
          mode="multiple"
          placeholder="Arrive"
          onSearch={onChangeArrive}
          filterOption={false}
          onChange={onChangeArrive}
          style={{
            width: '100%',
          }}
        >
            {
                arrive.map(e => (<Option key={e} value={e}>{e}</Option>))
            }
        </Select>
        </Form.Item>
        <Form.Item name="title">
            <Input placeholder="Title" type="text" />
        </Form.Item>
        <Form.Item name="content">
            <TextArea rows={20} placeholder="Write content to here" allowClear="true"></TextArea>
        </Form.Item>
        <Form.Item>
            <Button icon={<FontAwesomeIcon icon={faPaperPlane} />} htmlType="submit" type="primary">Send</Button>
        </Form.Item>
        </Form>
    </div>
}

export default PageEmailServices;