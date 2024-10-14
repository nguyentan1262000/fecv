import { useState } from "react"
import { Input} from 'antd';
import { Link, NavLink } from "react-router-dom";

const VerifyOTP = () => {
    const [otp,setOtp] = useState(0);

    const handleChange = (e) => {
        setOtp(e.target.value); // Cập nhật state khi input thay đổi
      };
    
      // Hàm xử lý khi người dùng nhấn nút
      const handleSubmit = () => {
        console.log('Input value:', inputValue); // Lấy giá trị từ state
        // Thực hiện các hành động khác với giá trị này
      };
    return (
        <div className="form-verify-otp">
            <span className="title">OTP authentication</span>
            <span className="text">Please check your email and enter the OTP code just sent</span>
            <Input.OTP
            value={otp} // Đặt giá trị của input từ state
            onChange={handleChange} // Xử lý sự kiện thay đổi
            />
            {/* time */}
            <div className="btn-form">
                <NavLink className="item-btn-form btn-cancel" to="/login/signin">Cancel</NavLink>
                <button className="item-btn-form btn-submit">Submit</button>
            </div>
        </div>
    )
}

export default VerifyOTP;