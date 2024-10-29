import React, { useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchCreateNewAccount } from '../services/userAPI';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const AddNewAccount = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this account?');

    const createUser = async (data) => {
        const res = await fetchCreateNewAccount(data);
        if(res.status == 400){
          setModalText("The information entered is not in the correct format, please re-enter.");
        }
        if(res.status == 201){
          setModalText(res.message)
        }
    }

    const clickSubmit = (data)=> {
      setModalText('Are you sure you want to add this account?');
      setModalOpen(true)
    }

    const handleOk = () => {
        const data = form.getFieldsValue();
        createUser({
          ...data,
          avatar: null
        });
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };


    return <div className="form-add-entity">
        <h2 className="title">
            Form create new account
        </h2>
        <p className='title-bottom'>Please fill in candidate information in the form below.</p>

        <Form className=''
        layout='vertical'
        form={form}
        initialValues={{
            layout: 'vertical',
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
      <Form.Item label="Role" name="role" initialValue={3}>
        <Select>
        <Select.Option value={1}>ADMIN</Select.Option>
        <Select.Option value={2}>MANAGER</Select.Option>
        <Select.Option value={3}>HR</Select.Option>
        </Select>
      </Form.Item>
        <Form.Item className='btn-submit'>
        <NavLink to="/account/list" className='btn-cancel mr-4 w-[150px]' type='default'>
          Cancel
        </NavLink>
        <Button className='w-[150px]' type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
        </Form>
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          title = "Confirm creating new account"
          open={modalOpen}
        >
          <p>{modalText}</p>
        </Modal>
    </div>
}

export default AddNewAccount;