
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { Button, Checkbox, Form, Input } from 'antd';
import { requestLogin } from '../services/authAPI';
import { useState } from 'react';

const FormSignIn = (props) => {
    const [form,setForm] = useState({
        username: "",
        password: ""
    });

    const fetchLogin = async (data) => {
        const res = await requestLogin(data);
        if(res.data.status == 200){

        }
      }

    const onFinish = (values) => {
      console.log('Success:', values);
      setForm(prevState => ({
        ...prevState,
        username : values.username,
        password : values.password
      }));

      fetchLogin(form);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className="about-form-login">
            <span className="title-form">FORM LOGIN</span>
            <div className="social-signin">
                <a className="social-item facebook-color" href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                    <span>Login with Facebook</span>
                    
                </a>
                <a className="social-item twitter-color" href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                    <span>Login with Twitter</span>
                </a>
            </div>
            
            <div className="signin-underline">
                <span>OR</span>
            </div>
            {/* form */}
            <Form
            layout="vertical"
            className='form-signin'
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      className='remember-forgot'
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
      <a href="">forgot your password?</a>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
      className='btn-login'
    >
      <Button  type="primary" htmlType="submit">
      Login
      </Button>
    </Form.Item>
  </Form>
            <div className="link-signup">
            </div>
            </div>
    )
}

export default FormSignIn;