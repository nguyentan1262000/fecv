import React, { useEffect, useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchAdminUpdateAccount, fetchCreateNewAccount, fetchGetDetailUserById } from '../services/userAPI';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import { fetchGetDetailCandidateById, fetchUpdateCandidate } from '../services/candidateApi';
import { formDateTimeRequest } from '../utils/ConvertTime';

const UpdateCandidate = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this account?');
    const [loading, setLoading] = useState(true);
    const [fileList,setFileList] = useState([]);
    const [dataAccount,setDataAccount] = useState({});
    const {id} = useParams();

    const handleUploadChange = ({ fileList }) => {
    // Giới hạn chỉ 1 file
    setFileList(fileList.slice(-1));

    // Lấy URL của file upload để hiển thị
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
   
    const updateUser = async (id,data) => {
        const res = await fetchUpdateCandidate(id,data);
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
          avatar: (fileList.length < 1 ? null : fileList[0].originFileObj),
          birthday: formDateTimeRequest(form.birthday)
        }
        updateUser(id, data)
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };

    const getCandidate = async (idUser) => {
        const res = await fetchGetDetailCandidateById(idUser);
        setDataAccount(res.data);
        setFileList([{
          uid: '-1',
          name: 'existing_image.jpg',
          status: 'done',
          url: res.data.avatar,
        }]);
        setLoading(false);
    }

    useEffect(() => {
      getCandidate(id);
    },[])

    return <div className="form-add-entity">
        <h2 className="title">
            Form Update Candidate
        </h2>
        <p className='title-bottom'>Please fill in candidate information in the form below.</p>

        {loading ? (
        <p>Loading form data...</p>
        ) : (
            <Form className=''
        layout='vertical'
        name='useForm'
        form={form}
        initialValues={{
            name: dataAccount.name,
            phone: dataAccount.phone,
            gender: dataAccount.gender,
            birthday: formDateTimeRequest(dataAccount.birthday),
            email: dataAccount.email,
        }}
        onFinish={clickSubmit}
        >
        <Form.Item label="Upload Avatar" name='avatar' >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false} // Để tắt upload tự động
          onChange={handleUploadChange}
          onRemove={() => {
            setFileList([]); // Xóa file đã upload
          }}
        >
          {fileList.length < 1 && <PlusOutlined />}
        </Upload>
        
      </Form.Item>
        <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item label="Birthday" name="birthday">
        <Input type='datetime-local' placeholder="Birthday" />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select defaultValue="">
        <Select.Option value="FEMALE">FEMALE</Select.Option>
        <Select.Option value="MALE">MALE</Select.Option>
        </Select>
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

export default UpdateCandidate;