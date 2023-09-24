
import {useLocation, useNavigate } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { toast, ToastContainer } from "react-toastify";
import "./Style.css";
import { Button } from "react-bootstrap";
import React, { useState } from 'react';

function Login(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusUSER, setStatusUSER] = useState(false);
  const [statusAdmin, setStatusAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [stap, setStap] = useState(true);
  const [forgot, setForgot] = useState(false);
  const [signup, setSignup] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignup = () => {
    setStap(false);
    setSignup(true);
    setForgot(false);
  };

  const handleLogin = () => {
    setStap(true);
    setSignup(false);
    setForgot(false);
  };

  const handleForgotPassword = () => {
    setStap(false);
    setSignup(false);
    setForgot(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonLoader(true);
    if (username && password) {
            ExportApi.UserLogin(username, password)
              .then((resp) => {
                if (resp.data.Status == true) {
                  setError(true) 
                  localStorage.setItem(
                    "favourite",
                    JSON.stringify(resp.data.Data.favourite)
                  );
                  console.log('resp',resp)
                  localStorage.setItem("token", JSON.stringify(resp.data.token));
                  if (resp.data.Data.role === "user") {
                    setButtonLoader(false);
                    localStorage.setItem("tokenuser", JSON.stringify(resp.data.Data));
                    let data = resp.data.Data.shipping_address.street;
                    localStorage.setItem("useraddress", JSON.stringify(data));
                    console.log(props.modalClose,resp.data.Data)
                    if (location.pathname == "/") {
                      navigate('/profile/' + resp.data.Data.id)
                      props.modal()
                    } else {
                      navigate(location.href)
                      props.modal()
                    }
                    // return;
                    // {
                    //   props.modalClose ? props.modalClose() : ;
                    // }
                    // window.dispatchEvent(new Event("Login"));
                  } else {
      
                    setButtonLoader(false);
                    localStorage.setItem("admin", JSON.stringify(resp.data.Data));
                    setStatusAdmin(true);
                    // window.dispatchEvent(new Event("Login"));
                    navigate("/productlist");
                  }
                } else {
                  toast.error("Email and Password don't match")
                  // this.setState({ error: "Email and password don't match" });
                 setButtonLoader(false)
                }
              })
              .catch((err) => console.log(err));
          }
  };

  return (
    <div>
      {stap ? (
        <form className="form w-100 p-0 custom-logindata" onSubmit={handleSubmit}>
          {/* {statusUSER && <Navigate to="/buySellManagment/pending" />}
          {statusAdmin && <Navigate to="/productlist" />} */}
          <div className="input-container w-100">
            <label className="label fs-5 mb-2">Username: </label>
            <input
              type="text"
              name="username"
              className="input form-control"
              placeholder="Username"
              value={username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container w-100">
            <label className="label fs-5 mb-2">Password: </label>
            <div className="inner_part_icon">
              <input
                type={passwordStatus ? 'text' : 'password'}
                name="password"
                className="input form-control mb-3"
                placeholder="Password "
                value={password}
                required
                onChange={handleChange}
              />
              {passwordStatus ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill position-absolute eye_icon"
                  viewBox="0 0 16 16"
                  onClick={() => setPasswordStatus(!passwordStatus)}
                >
                  {/* SVG paths */}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  className="bi bi-eye-fill position-absolute eye_icon"
                  viewBox="0 0 16 16"
                  onClick={() => setPasswordStatus(!passwordStatus)}
                >
                  {/* SVG paths */}
                </svg>
              )}
            </div>
          </div>
          <div className="forgot_password">
            <Button
              className="custom-forgot float-right border-0 bg-none text-dark"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
          </div>
          <button
            type="submit"
            className=" d-block  custom-login"
            id="login-btn"
            disabled={buttonLoader}
          >
            {buttonLoader ? 'Please Wait...' : 'Login'}
          </button>
        </form>
      ) : signup ? (
        <Signup modal={props.modal} navigate={props.navigate} />
      ) : forgot ? (
        <ForgotPassword modal={props.modal} />
      ) : null}

      {stap ? (
        <button
          className="d-block mb-3 custom-sign"
          id="login-btn"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      ) : signup ? (
        <button
          className=" d-block mb-3 custom-log"
          id="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default Login;

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       StatusUSER: false,
//       StatusAdmin: false,
//       error: false,
//       stap: true,
//       forgot: false,
//       signup: false,
//       passwordStatus: false,
//       buttonLoader:false,
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }


//   handleChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value,
//     });
//   }

//   handleSignup() {
//     this.setState({ stap: false })
//     this.setState({ signup: true })
//     this.setState({ forgot: false })
//   }
//   handleLogin() {
//     this.setState({ stap: true })
//     this.setState({ signup: false })
//     this.setState({ forgot: false })
//   }
//   handleForgotPassword() {
//     this.setState({ stap: false })
//     this.setState({ signup: false })
//     this.setState({ forgot: true })
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.setState({buttonLoader:true})
//     if (this.state.username && this.state.password) {
//       ExportApi.UserLogin(this.state.username, this.state.password)
//         .then((resp) => {
//           if (resp.data.Status == true) {
//             this.setState({ error: true });
//             localStorage.setItem(
//               "favourite",
//               JSON.stringify(resp.data.Data.favourite)
//             );
//             console.log('resp',resp)
//             localStorage.setItem("token", JSON.stringify(resp.data.token));
//             if (resp.data.Data.role === "user") {
//               this.setState({buttonLoader:false})
//               localStorage.setItem("tokenuser", JSON.stringify(resp.data.Data));
//               let data = resp.data.Data.shipping_address.street;
//               localStorage.setItem("useraddress", JSON.stringify(data));
//               {
//                 this.props.modalClose ? this.props.modalClose() : '';
//               }
//               // window.dispatchEvent(new Event("Login"));
//             } else {

//               this.setState({buttonLoader:false})
//               localStorage.setItem("admin", JSON.stringify(resp.data.Data));
//               this.setState({ StatusAdmin: true });
//               // window.dispatchEvent(new Event("Login"));
//               this.props.navigate("/productlist");
//             }
//           } else {
//             toast.error("Email and Password don't match")
//             // this.setState({ error: "Email and password don't match" });
//             this.setState({buttonLoader:false})
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   }

//   render() {
//     const { username, password } = this.state;
//     return (
//       // <div className="App">
//       <div>
//         {this.state.stap ? (
//           <form
//             className="form w-100 p-0 custom-logindata"
//             onSubmit={this.handleSubmit}
//           >
//             {this.state.StatusUSER && <Navigate to="/buySellManagment/pending" />}
//             {this.state.StatusAdmin && <Navigate to="/productlist" />}
//             <div className="input-container w-100">
//               <label className="label fs-5 mb-2">Username: </label>
//               <input
//                 type="text"
//                 name="username"
//                 className="input form-control"
//                 placeholder="Username"
//                 value={username}
//                 required
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="input-container w-100">
//               <label className="label fs-5 mb-2">Password: </label>
//               <div className="inner_part_icon">
//                 <input
//                   type={this.state.passwordStatus ? "text" : "password"}
//                   name="password"
//                   className="input form-control mb-3"
//                   placeholder="Password "
//                   value={password}
//                   required
//                   onChange={this.handleChange}
//                 />
//                 {this.state.passwordStatus ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     class="bi bi-eye-slash-fill position-absolute eye_icon"
//                     viewBox="0 0 16 16"
//                     onClick={() =>
//                       this.setState({
//                         passwordStatus: !this.state.passwordStatus,
//                       })
//                     }
//                   >
//                     <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
//                     <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="19"
//                     height="19"
//                     fill="currentColor"
//                     class="bi bi-eye-fill position-absolute eye_icon"
//                     viewBox="0 0 16 16"
//                     onClick={() =>
//                       this.setState({
//                         passwordStatus: !this.state.passwordStatus,
//                       })
//                     }
//                   >
//                     <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
//                     <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
//                   </svg>
//                 )}
//               </div>

//               {/* <p style={{ color: "red" }}>{this.state.error}</p> */}
//             </div>
//             <div className="forgot_password">
//               {/* <Link to="/forgot">Forgot Password</Link> */}
//               <Button className="custom-forgot float-right border-0 bg-none text-dark" onClick={() => { this.handleForgotPassword() }}>Forgot Password?</Button>
//             </div>
//             <button
//               type="submit"
//               className=" d-block  custom-login"
//               id="login-btn"
//               disabled={this.state.buttonLoader ? true : false}
//             >
//               {this.state.buttonLoader ? 'Please Wait...':'login'}
//             </button>
//           </form>
//         ) : this.state.signup ? (
//           <Signup modal={this.props.modal} navigate={this.props.navigate} />
//         ) : this.state.forgot ? (
//           <ForgotPassword modal={this.props.modal} />
//         ) : ""}

//         {this.state.stap ? (
//           <button
//             className="d-block mb-3 custom-sign"
//             id="login-btn"
//             onClick={() => {
//               this.handleSignup()
//             }}
//           >
//             SignUp
//           </button>
//         ) : this.state.signup ? (
//           <button
//             className=" d-block mb-3 custom-log"
//             id="login-btn"
//             onClick={() => {
//               this.handleLogin()
//             }}
//           >
//             login
//           </button>
//         ) : ""}
//         <ToastContainer/>
//       </div>
//     );
//   }
// }

// export default Login;
