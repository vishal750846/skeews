import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import validator from "validator";
const Signup = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opt_email, setOtpEmail] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [checkErrorMessage, setCheckErrorMessage] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (data) => {
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
    setPassword(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((firstname, lastname, email, password)) {
      if (newsletter) {
        setCount(1);
        ExportApi.Register(firstname, lastname, email, password, opt_email)
          .then((resp) => {
            if (resp.data.Status == true) {
              let data = resp.data.Data;
              localStorage.setItem(
                "favourite",
                JSON.stringify(data?.favourite)
              );
              localStorage.setItem("token", JSON.stringify(resp.data.token));
              localStorage.setItem("tokenuser", JSON.stringify(data));
              let Data = data.shipping_address.street;
              localStorage.setItem("useraddress", JSON.stringify(Data));
              if (location.pathname == "/") {
                navigate("/profile/" + resp.data.Data.id);
                props.modal();
                if (opt_email) {
                  HandleSubscribeEmail(email, firstname);
                }
              } else {
                navigate(location.href);
                props.modal();
                if (opt_email) {
                  HandleSubscribeEmail(email, firstname);
                }
              }
              setCount(2);
              setError(resp.data.Message);
            } else {
              setCount(1);
              setError(resp.data.Message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setCount(1);
        setError("Please Select Term and Condition");
      }
    } else {
      setCount(1);
      setError("All Field Required");
    }
  };

  const HandleSubscribeEmail = async (email, firstname) => {
    let data = { email, firstname };
    const response = await fetch(
      "https://api.sendgrid.com/v3/contactdb/recipients",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result);
    return;
  };

  return (
    <div>
      <form className="form w-100 p-0" onSubmit={handleSubmit}>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">First Name: </label>
          <input
            type="text"
            name="firstname"
            className="input form-control"
            placeholder="First Name"
            value={firstname}
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">Last Name: </label>
          <input
            type="text"
            name="lastname"
            className="input form-control"
            placeholder="Last Name"
            value={lastname}
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">Email: </label>
          <input
            type="email"
            name="email"
            className="input form-control"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container w-100">
          <label className="label fs-5 mb-2">Password: </label>

          <div className="w-100 d-block position-relative">
            <input
              type={passwordStatus ? "text" : "password"}
              name="password"
              className="input form-control position-relative"
              placeholder="Password "
              value={password}
              required
              onChange={(e) => handleChange(e.target.value)}
            />
            {passwordStatus ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-slash-fill position-absolute signup_eye_icon"
                viewBox="0 0 16 16"
                onClick={() => setPasswordStatus(!passwordStatus)}
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                class="bi bi-eye-fill position-absolute signup_eye_icon"
                viewBox="0 0 16 16"
                onClick={() => setPasswordStatus(!passwordStatus)}
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            )}
          </div>
        </div>
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

        <div className="newslatter mt-2">
          <input
            type="checkbox"
            name="checkbox"
            checked={opt_email ? true : false}
            onChange={() => setOtpEmail(!opt_email)}
          />
          <h5>Subscribe for exclusive e-mail offers and discounts</h5>
        </div>

        <div className="newslatter mt-2">
          <input
            type="checkbox"
            name="checkbox"
            checked={newsletter ? true : false}
            onChange={() => setNewsletter(!newsletter)}
          />
          <h5>
            By signing up you agree to the{" "}
            <Link to="/term">Terms of Service </Link> and
            <Link to="/privacy"> Privacy Policy</Link>
          </h5>
        </div>
        {count == 2 ? (
          <p style={{ color: "green", textAlign: "center", fontSize: "20px" }}>
            {error}
          </p>
        ) : (
          <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
            {error}
          </p>
        )}

        {count == 2 || count == 0 || count == 1 ? (
          <button
            type="submit"
            className="d-block custom-signup"
            id="login-btn"
          >
            SignUp
          </button>
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;

// export default SignUp;
