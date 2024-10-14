import React, { useState} from 'react';
import { Button, Form, Input, Select } from 'antd';
import { fetchCreateNewAccount } from '../services/userAPI';
import { HttpStatusCode } from 'axios';

const AddNewAccount = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');

    const createUser = async (data) => {
        const res = await fetchCreateNewAccount(data);
        if(res.status == HttpStatusCode.Ok){
            console.log(res.message);
        }
    }

    const clickSubmit = (data)=> {
        console.log(data);
        createUser(data);
    }
    return <div className="form-add-entity">
        <h2 className="title">
            Form create new account
        </h2>

        <Form className=''
        layout={formLayout}
        form={form}
        initialValues={{
            layout: formLayout,
        }}
        onFinish={clickSubmit}
        >

        <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item label="Username" name="username">
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Select defaultValue={3}>
        <Select.Option value={1}>ADMIN</Select.Option>
        <Select.Option value={2}>MANAGER</Select.Option>
        <Select.Option value={3}>HR</Select.Option>
        </Select>
      </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
        </Form>
    </div>
}

export default AddNewAccount;