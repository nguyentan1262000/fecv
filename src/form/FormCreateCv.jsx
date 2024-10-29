import React, { useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchCreateNewAccount } from '../services/userAPI';
import { UploadOutlined } from '@ant-design/icons';
import { fetchCreateCandidate } from '../services/candidateApi';
import TextArea from 'antd/es/input/TextArea';
import { NavLink } from 'react-router-dom';
import { fetchCreateCv } from '../services/cvAPI';

const FormCreateCv = () => {
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
        console.log(data)
        const newData = {
          ...data,
          fileCV: (data.fileCV.fileList.length < 1 ? null : data.fileCV.fileList[0].originFileObj)
        }
        console.log(newData)
        createCv(newData);
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };


    return <div className="form-add-entity">
        <h2 className="title">
            Form create Cv
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
            <Form.Item label="Candidate" name="candidateId">
            <Input placeholder="Candidate" />
        </Form.Item>
        <Form.Item label="Position" name="position">
            <Input placeholder="Position" />
        </Form.Item>
        <Form.Item label="experience" name="experience">
        <Input placeholder="experience" />
      </Form.Item>
      <Form.Item label="skills" name="skills">
        <Input placeholder="skills" />
      </Form.Item>
      <Form.Item label="education" name="education">
        <Input placeholder="education" />
      </Form.Item>
      <Form.Item initialValue="PENDING" label="status" name="status">
        <Select>
        <Option value="PASS">Pass</Option>
        <Option value="FAIL">Fail</Option>
        <Option value="PENDING">Pending</Option>
        </Select>
      </Form.Item>
      <Form.Item label="description" name="description">
        <TextArea rows={4} placeholder="description" />
      </Form.Item>
      <Form.Item label="File CV" name="fileCV">
        <Upload >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item className='btn-submit'>
        <NavLink to="/cv" className='btn-cancel mr-4 w-[150px]' type='default'>
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

export default FormCreateCv;