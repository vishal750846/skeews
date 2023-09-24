import React from "react";
import { useState } from "react";
import ExportApi from "../api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPassword = (props) => {
  const [email, setEmail] = useState();
  const [isLoading, setLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleForgotPassword = () => {
    setLoading(true)
    if (email == "" || email == null) {
      toast.error('Please enter an email address')
      setLoading(false)
    } else if (!validateEmail(email)) {
      setIsValidEmail(false);
      toast.error('Please Enter Valid Email');
      setLoading(false)
    } else {
      ExportApi.ForgotPassword(email)
        .then((resp) => {
          if (resp.data.message == "Email not found") {
            toast.error('Email not found')
            setLoading(false)
          } else {
            setTimeout(() => {
              props.modal ? props.modal() : ""
              setLoading(false);
            }, 100)
            toast.success("Forgot password link has been sent Successfully");
          }
        })
        .catch((err) =>
          console.log(err)
        );
    }
  }

  const handleEmail = (value) => {
    setEmail(value)
    setIsValidEmail(true);
  }


  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div>
      <div className="input-container w-100">
        <label className="label fs-5 mb-2">Email: </label>
        <input
          type="email"
          name="email"
          className="input form-control forgot_input"
          placeholder="Please Enter Your Email"
          required
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
      </div>



      <button
        type="submit"
        className=" d-block rounded py-2 bg-danger text-white mt-4 w-50 mb-3 mx-auto px-5 border-0"
        onClick={handleForgotPassword}
        disabled={isLoading ? true : false}
      >
        {isLoading ? 'Loading...' : 'Reset Password'}
      </button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
