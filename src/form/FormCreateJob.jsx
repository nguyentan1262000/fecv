import React, { useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchCreateNewAccount } from '../services/userAPI';
import { UploadOutlined } from '@ant-design/icons';
import { fetchCreateCandidate } from '../services/candidateApi';
import TextArea from 'antd/es/input/TextArea';
import { NavLink } from 'react-router-dom';
import { fetchCreateCv } from '../services/cvAPI';

const FormCreateJob = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this account?');

    const createCv= async (data) => {
        const res = await fetchCreateCv(data);
        if(res.status == 400){
          setModalText("The information entered is not in the correct format, please re-enter.");
        }
        if(res.status == 201){
          setModalText(res.message)
        }
    }

    const clickSubmit = (data)=> {
      setModalText('Are you sure you want to add this candidate?');
      setModalOpen(true)
    }

    const handleOk = () => {
        const data = form.getFieldsValue();
        createCv(data);
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };


    return <div className="form-add-entity">
        <h2 className="title">
            Form create Job
        </h2>
        <p className='title-bottom'>Please fill in job information in the form below.</p>
        <Form className=''
        layout='vertical'
        form={form}
        initialValues={{
            layout: 'vertical',
        }}
        onFinish={clickSubmit}
        >
            <Form.Item label="Title" name="title">
            <Input placeholder="title" />
        </Form.Item>
        <Form.Item label="Company" name="companyId">
            <Input placeholder="Company" />
        </Form.Item>
        <Form.Item label="Position" name="Position">
            <Input placeholder="Position" />
        </Form.Item>
        <Form.Item label="Requirements" name="requirements">
            <Input placeholder="requirements" />
        </Form.Item>
        <Form.Item label="expirationTime" name="expirationTime">
            <Input type='date' placeholder="expirationTime" />
        </Form.Item>
        <Form.Item label="Quantity" name="candidateQuantity">
            <Input placeholder="Quantity" />
        </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="description" />
      </Form.Item>
        <Form.Item className='btn-submit'>
        <NavLink to="/job" className='btn-cancel mr-4 w-[150px]' type='default'>
        Cancel
        </NavLink>
        <Button className='w-[150px]' type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
        </Form>
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          title = "Confirm creating new Job"
          open={modalOpen}
        >
          <p>{modalText}</p>
        </Modal>
    </div>
}

export default FormCreateJob;