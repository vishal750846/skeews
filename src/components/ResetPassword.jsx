import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import validator from "validator";
import Header from "./header";
import Footer from "./footer";
const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [token, setToken] = useState(params.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirmMessage, setErrorConfirmMessage] = useState("");
  const handleresetpassword = () => {
    if (newPassword) {
      if (confirmPassword) {
        if (newPassword === confirmPassword) {
          if (errorMessage != undefined && errorConfirmMessage != undefined) {
            ExportApi.resetPassword(newPassword, token).then((res) => {
              if (res.status === 200) {
                toast.success(res.data.message);
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              } else {
                toast.error("Password reset failed");
              }
            });
          } else {
            toast.error("Password Should Not Follow Rules");
          }
        } else {
          toast.error("Password does not match");
        }
      } else {
        toast.error("Please enter Confirm Password");
      }
    } else {
      toast.error("Please Enter Password");
    }
  };

  console.log(errorMessage, errorConfirmMessage);

  const handleNewPassword = (data) => {
    if (
      validator.isStrongPassword(data, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Passsword Should Contains min. 1, lowercase 1, uppercase 1, number 1, special character"
      );
    }
    setNewPassword(data);
  };
  const handleNewConfirmPassword = (data) => {
    if (
      validator.isStrongPassword(data, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      setErrorConfirmMessage("");
    } else {
      setErrorConfirmMessage(
        "Passsword Should Contains min. 1, lowercase 1, uppercase 1, number 1, special character"
      );
    }
    setConfirmPassword(data);
  };

  return (
    <div>
      <Header />
      <div className="forgot_container container">
        <h2 className="text-center">Reset Password</h2>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">New Password </label>
          <input
            type="password"
            name="password"
            className="input form-control forgot_input"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => handleNewPassword(e.target.value)}
          />
          {errorMessage === "" ? null : (
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errorMessage}
            </span>
          )}
        </div>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">Confirm Password</label>
          <input
            type="password"
            name="password"
            className="input form-control forgot_input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => handleNewConfirmPassword(e.target.value)}
          />
          {errorConfirmMessage === "" ? null : (
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errorConfirmMessage}
            </span>
          )}
        </div>
        <Button
          className="forgot_buton bg-success border-success fs-5"
          onClick={handleresetpassword}
        >
          Submit
        </Button>
        <span className="d-flex justify-content-center mt-3">
          <Link to="/"> Click Here For the Login</Link>
        </span>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
