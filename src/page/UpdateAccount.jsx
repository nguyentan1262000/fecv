import React, { useEffect, useState} from 'react';
import { Button, Form, Input, Select,Modal, Upload } from 'antd';
import { fetchAdminUpdateAccount, fetchCreateNewAccount, fetchGetDetailUserById } from '../services/userAPI';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const UpdateAccount = () => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to add this account?');
    const [loading, setLoading] = useState(true);
    const [fileList,setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
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
        const res = await fetchAdminUpdateAccount(id,data);
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
        const data = form.getFieldsValue();
        console.log(data)
        updateUser(id, data)
    };
  
    const handleCancel = () => {      
      setModalOpen(false);
    };

    const getUser = async (idUser) => {
        const res = await fetchGetDetailUserById(idUser);
        setDataAccount(res.data);
        setLoading(false);
    }

    useEffect(() => {
      getUser(id);
    },[])

    return <div className="form-add-entity">
        <h2 className="title">
            Form Update account
        </h2>

        {loading ? (
        <p>Loading form data...</p>
        ) : (
            <Form className=''
        layout='vertical'
        name='useForm'
        form={form}
        initialValues={{
            avatar : dataAccount.avatarName,
            name: dataAccount.name,
            phone: dataAccount.phone,
            role: dataAccount.role,
            email: dataAccount.email,
        }}
        onFinish={clickSubmit}
        >
        <Form.Item label="Upload Avatar" valuePropName="fileList" >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false} // Để tắt upload tự động
          onChange={handleUploadChange}
          onRemove={() => {
            setFileList([]); // Xóa file đã upload
            setImageUrl('');  // Xóa ảnh hiển thị
          }}
        >
          {fileList.length < 1 && <PlusOutlined />}
        </Upload>
        
      </Form.Item>
        <Form.Item initialValue={dataAccount.name} label="Name" name="name">
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Select defaultValue={3}>
        <Select.Option value={1}>ADMIN</Select.Option>
        <Select.Option value={2}>MANAGER</Select.Option>
        <Select.Option value={3}>HR</Select.Option>
        </Select>
      </Form.Item>
        <Form.Item className='btn-submit'>
        <Button  type="primary" htmlType='submit'>Submit</Button>
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

export default UpdateAccount;