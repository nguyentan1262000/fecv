import React, { useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchCreateNewAccount } from '../services/userAPI';
import { UploadOutlined } from '@ant-design/icons';
import { fetchCreateCandidate } from '../services/candidateApi';
import { NavLink } from 'react-router-dom';
import { fetchCreateCompany } from '../services/companyAPI';

const FormCreateCompany = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this Company?');

    const createCompany = async (data) => {
        const res = await fetchCreateCompany(data);
        if(res.status == 400){
          setModalText("The information entered is not in the correct format, please re-enter.");
        }
        if(res.status == 201){
          setModalText(res.message)
        }
    }

    const clickSubmit = (data)=> {
      setModalText('Are you sure you want to create this company?');
      setModalOpen(true)
    }

    const handleOk = () => {
        const data = form.getFieldsValue();
        createCompany(data);
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };


    return <div className="form-add-entity">
        <h2 className="title">
            Form create Company
        </h2>
        <p className='title-bottom'>Please fill in company information in the form below.</p>
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
      <Form.Item label="Websize" name="websize">
        <Input placeholder="Domain Websize" />
      </Form.Item>
      <Form.Item label="Location" name="location">
        <Input placeholder="location" />
      </Form.Item>
        <Form.Item className='btn-submit'>
        <NavLink to="/company" className='btn-cancel mr-4 w-[150px]' type='default'>
        Cancel
        </NavLink>
        <Button className='w-[150px]' type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
        </Form>
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          title = "Confirm creating new Candidate"
          open={modalOpen}
        >
          <p>{modalText}</p>
        </Modal>
    </div>
}

export default FormCreateCompany;