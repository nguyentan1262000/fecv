import { useState } from "react"
import { Input} from 'antd';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { requestVeryfyOtp } from "../services/authAPI";

const VerifyOTP = (props) => {
    const [otp,setOtp] = useState(0);
    const location = useLocation();
    const {username} = location.state || {};
    const navigate = useNavigate();

    const rqVeryfyOtp = async (data) => {
        const res = await requestVeryfyOtp(data);
        if(res.data.status != undefined){
            alert('chan qua');
        }else{
            localStorage.setItem('id', res.data.userId);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            navigate("/dashboard");
        }
    }

    const handleChange = (value) => {
        setOtp(value);
      }; 
    
      const handleSubmit = () => {
        const data = {
            username: username,
            otp: otp
        }
         
        rqVeryfyOtp(data);
      };
    return (
        <div className="form-verify-otp">
            <span className="title">OTP authentication</span>
            <span className="text">Please check your email and enter the OTP code just sent</span>
            <Input.OTP
            value={otp}
            onChange={handleChange} 
            />
            {/* time */}
            <div className="btn-form">
                <NavLink className="item-btn-form btn-cancel" to="/login/signin">Cancel</NavLink>
                <button className="item-btn-form btn-submit" onClick={() => {handleSubmit()}}>Submit</button>
            </div>
        </div>
    )
}

export default VerifyOTP;