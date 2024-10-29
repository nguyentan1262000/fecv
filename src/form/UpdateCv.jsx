import React, { useEffect, useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchAdminUpdateAccount, fetchCreateNewAccount, fetchGetDetailUserById } from '../services/userAPI';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import { fetchGetDetailCandidateById, fetchUpdateCandidate } from '../services/candidateApi';
import { formDateTimeRequest } from '../utils/ConvertTime';
import TextArea from 'antd/es/input/TextArea';
import { fetchGetDetailCvById, fetchUpdateCv } from '../services/cvAPI';

const UpdateCv = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this account?');
    const [loading, setLoading] = useState(true);
    const [fileList,setFileList] = useState([]);
    const [dataAccount,setDataAccount] = useState({});
    const {id} = useParams();

    const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));

    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(fileList[0].originFileObj);
    } else {
      setImageUrl('');
    }
  };

  const onFinish = (values) => {
    console.log('Form data:', values);
    console.log('Uploaded file:', fileList);
  };
   
    const updateCv = async (id,data) => {
        const res = await fetchUpdateCv(id,data);
        if(res.status == 400){
          setModalText("The information entered is not in the correct format, please re-enter.");
        }
        if(res.status == 202){
          setModalText("Update account successfully.")
        }
    }

    const clickSubmit = (data)=> {
      setModalText('Are you sure you want to add this account?');
      setModalOpen(true)
    }

    const handleOk = () => {
        const data = {
          ...form.getFieldsValue(),
          fileCV: (fileList.length < 1 ? null : fileList[0].originFileObj),
        }
        updateCv(id, data)
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };

    const getCandidate = async (id) => {
        const res = await fetchGetDetailCvById(id);
        setDataAccount(res.data);
        setFileList([{
          uid: '-1',
          name: 'existing_image.jpg',
          status: 'done',
          url: res.data.reference,
        }]);
        setLoading(false);
    }

    useEffect(() => {
      getCandidate(id);
    },[])

    return <div className="form-add-entity">
        <h2 className="title">
            Form Update CV
        </h2>
        <p className='title-bottom'>Please fill in cv information in the form below.</p>

        {loading ? (
        <p>Loading form data...</p>
        ) : (
            <Form className=''
        layout='vertical'
        name='useForm'
        form={form}
        initialValues={{
            candidateId: dataAccount.idCandidate,
            position: dataAccount.position,
            experience: dataAccount.experience,
            description: dataAccount.description,
            skills: dataAccount.skills,
            education: dataAccount.education,
            status: dataAccount.status,
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
      <Form.Item label="status" name="status">
        <Select>
        <Option value="PASS">Pass</Option>
        <Option value="FAIL">Fail</Option>
        <Option value="PENDING">Pending</Option>
        </Select>
      </Form.Item>
      <Form.Item label="description" name="description">
        <TextArea rows={4} placeholder="description" />
      </Form.Item>
        <Form.Item label="File CV" name='fileCV' >
        <Upload
          listType="file"
          fileList={fileList}
          beforeUpload={() => false} // Để tắt upload tự động
          onChange={handleUploadChange}
          onRemove={() => {
            setFileList([]); // Xóa file đã upload
          }}
        >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item className='btn-submit'>
        <NavLink to="/candidate" className='btn-cancel mr-4 w-[150px]' type='default'>Cancel</NavLink>
          <Button className='w-[150px]'  type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
        </Form>
        
        )}
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

export default UpdateCv;