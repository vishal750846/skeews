import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import InputMask from "react-input-mask";
import states from "states-us";
const NewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [street, setStreet] = useState();
  const [subscribe, setSubscribe] = useState();
  const [validEmail, setValidEmail] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [showNameModal, setShowNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [latestPhoneNumber, setLatestPhoneNumber] = useState();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [buttonPasswordLoader, setButtonPasswordLoader] = useState(false);
  const [buttonAddressLoader, setButtonAddressLoader] = useState(false);
  const [buttonPhoneLoader, setButtonPhoneLoader] = useState(false);
  const [validFirstName, setValidFirstName] = useState("");
  const [validLastName, setValidLastName] = useState("");
  const [validStreet, setValidStreet] = useState();
  const [validCity, setValidCity] = useState();
  const [validState, setValidState] = useState();
  const [validcountry, setValidCountry] = useState();
  const [validPostalCode, setValidPostalCode] = useState();
  const [validPhoneNumber, setValidPhoneNumber] = useState();

  console.log(states)

  //get the single user Data
  const handleSingleUserData = () => {
    ExportApi.getSingleUserData(id)
      .then((resp) => {
        if (resp.data.message == "user not found") {
          window.dispatchEvent(new Event("Loginout"));
        } else {
          let Data = resp.data.data;
          let number = Data?.phone;
          let numberString = number == null ? null : number?.toString();
          let maskedResponse = "";
          if (numberString == null) {
            maskedResponse = null;
          } else {
            maskedResponse = `(${numberString.slice(0, 3)})${numberString.slice(
              3,
              6
            )}-${numberString.slice(6)}`;
          }
          console.log(maskedResponse);
          setFirstName(Data?.firstname);
          setValidFirstName(Data?.firstname);
          setLastName(Data?.lastname);
          setValidLastName(Data?.lastname);
          setEmail(Data?.email);
          setSubscribe(Data?.subscribe);
          setLoading(false);
          setLatestPhoneNumber(maskedResponse);
          setValidPhoneNumber(maskedResponse);
          setStreet(Data?.shipping_address?.street);
          setValidStreet(Data?.shipping_address?.street);
          setCity(Data?.shipping_address?.city);
          setValidCity(Data?.shipping_address?.city);
          setState(Data?.shipping_address?.state);
          setValidState(Data?.shipping_address?.state);
          setCountry(Data?.shipping_address?.country);
          setValidCountry(Data?.shipping_address?.country);
          setPostalCode(Data?.shipping_address?.postal_code);
          setValidPostalCode(Data?.shipping_address?.postal_code);
        }
      })
      .catch((err) => console.log(err));
  };

  //update the user name
  const handleUpdateName = () => {
    if (validFirstName.trim() === "" || validLastName.trim() === "") {
      toast.error("Name fields cannot be empty or contain only spaces");
      return;
    }
    setButtonLoader(true);
    ExportApi.updateSingleUserName(id, validFirstName, validLastName)
      .then((resp) => {
        toast.success("Name Updated Successfully");
        setShowNameModal(false);
        setButtonLoader(false);
        handleSingleUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update the phone Number
  const handleUpdatePhone = () => {
    setButtonPhoneLoader(true);
    if (!validPhoneNumber) {
      toast.error("Field Required");
      setButtonPhoneLoader(false);
      return;
    }
    let data = validPhoneNumber.replace(/\D/g, "");
    const isValidNumber = /^[1-9][0-9]*$/.test(data);
    if (isValidNumber) {
      if (data?.length > 9 && data?.length < 11) {
        ExportApi.updateSingleUserPhone(id, data)
          .then((resp) => {
            toast.success("Phone Updated Successfully");
            setShowPhoneModal(false);
            handleSingleUserData();
            setLatestPhoneNumber(resp.data.result.phone);
            setButtonPhoneLoader(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.error("Enter Valid Mobile Number");
        setButtonPhoneLoader(false);
      }
    } else {
      toast.error("Number Cannot be started with zero");
      setButtonPhoneLoader(false);
    }
  };

  //update the address
  const handleUpdateAddress = () => {
    setButtonAddressLoader(true);

    if (
      !validStreet?.trim() ||
      !validCity?.trim() ||
      !validState?.trim() ||
      !validcountry?.trim()
    ) {
      toast.error("Address fields cannot be empty or not contain spaces");
      setButtonAddressLoader(false);
      return;
    }

    const postalCodeRegex = /^\d{5}(-\d{4})?$/; // Postal code can be 5 digits or 5 digits followed by - and 4 more digits

    if (!postalCodeRegex.test(validPostalCode)) {
      toast.error(
        'Postal Code must be 5 digits or in the format "12345" or "12345-6789"'
      );
      setButtonAddressLoader(false);
      return;
    }
    ExportApi.updateSingleUserData(
      id,
      validStreet,
      validCity,
      validState,
      validcountry,
      validPostalCode
    )
      .then((resp) => {
        let Data = resp?.data?.result;
        setPostalCode(Data?.shipping_address?.postal_code);
        setCountry(Data?.shipping_address?.country);
        setState(Data?.shipping_address?.state);
        setCity(Data?.shipping_address?.city);
        setStreet(Data?.shipping_address?.street);
        localStorage.setItem("useraddress", JSON.stringify(validStreet));
        toast.success("Address Updated Successfully");
        setShowAddressModal(false);
        setButtonAddressLoader(false);
        handleSingleUserData();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for the subscribe
  const handleSubscribe = (data) => {
    setSubscribe(data);
    ExportApi.handleSubscribe(id, data)
      .then((resp) => {
        let data = resp.data;
        handleSingleUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update the password
  const handleUpdatePassword = () => {
    if (errorMessage || errorMessage1) {
      toast.error("Please fill the Password with the format");
      return;
    }

    if (!newPassword || !oldPassword || !confirmPassword) {
      toast.error("Please Fill all password fields");
      return;
    }

    if (
      newPassword.trim() === "" ||
      oldPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast.error("Password fields cannot be empty or contain only spaces");
      return;
    }

    setButtonPasswordLoader(true);
    if (newPassword == confirmPassword) {
      ExportApi.updatePassword(id, newPassword, oldPassword)
        .then((resp) => {
          if (resp.data.message == "Password Not Matched") {
            toast.error("Old Password Not Matched");
            setButtonPasswordLoader(false);
          } else {
            toast.success("Password Updated Successfully");
            setShowPasswordModal(false);
            setButtonPasswordLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Password Not Matched");
      setButtonPasswordLoader(false);
    }
  };

  //validation for the password
  const handleNewPassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      setErrorMessage("");
      setNewPassword(value);
    } else {
      setErrorMessage(
        "Passsword Contains min. 1 lowercase 1 uppercase 1 number 1 special character"
      );
    }
  };

  //validation for the confirm password
  const handleConfirmPassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      setErrorMessage1("");
      setConfirmPassword(value);
    } else {
      setErrorMessage1(
        "Passsword Contains min. 1 lowercase 1 uppercase 1 number 1 special character"
      );
    }
  };

  // validation for the number
  const handleValidPhoneNumber = (value) => {
    setValidPhoneNumber(value);
  };

  useEffect(() => {
    handleSingleUserData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      </div>
    );
  }

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });
  return (
    <div>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <div className="profile_box">
            <h2 className="fs-1 fw-300 mb-5 mt-3">Profile</h2>
            <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
              <p className="fs-5 fw-bold m-0 w-25">Name:</p>
              <p className="fs-5 fw-bold m-0 w-75">{`${firstName} ${lastName}`}</p>
              <Button
                className="bg-transparent border-0 text-dark fs-5"
                onClick={() => setShowNameModal(true)}
              >
                Edit
              </Button>
            </div>
            <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
              <p className="fs-5 fw-bold m-0 w-25">Email Address:</p>
              <p className="fs-5 fw-bold m-0 w-75 break-email">{email}</p>
              {/* <Button className='bg-transparent border-0 text-dark fs-5' onClick={() => setShowEmailModal(true)}>Edit</Button> */}
            </div>
            <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
              <p className="fs-5 fw-bold m-0 w-25">Password:</p>
              <p className="fs-5 fw-bold m-0 w-75">*********</p>
              <Button
                className="bg-transparent border-0 text-dark fs-5"
                onClick={() => setShowPasswordModal(true)}
              >
                Edit
              </Button>
            </div>
            <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
              <p className="fs-5 fw-bold m-0 w-25">Phone:</p>
              <p className="fs-5 fw-bold m-0 w-75">{latestPhoneNumber}</p>
              <Button
                className="bg-transparent border-0 text-dark fs-5"
                onClick={() => setShowPhoneModal(true)}
              >
                Edit
              </Button>
            </div>
            <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
              <p className="fs-5 fw-bold m-0 w-25">Shipping Address:</p>
              <p className="fs-5 fw-bold m-0 w-75">
                {street ? street + "." : ""} {city ? city + "," : ""}{" "}
                {state ? state : ""} {postalCode ? postalCode + "," : ""}
                {country ? country : ""}
              </p>
              <Button
                className="bg-transparent border-0 text-dark fs-5"
                onClick={() => setShowAddressModal(true)}
              >
                Edit
              </Button>
            </div>
            <div className="Custom_check_box d-flex justify-content-start align-items-center  mt-3">
              <Form>
                <div key="default-checkbox" className="mb-3">
                  <Form.Check
                    className="fs-5 fw-bold mt-3"
                    type="checkbox"
                    checked={subscribe ? true : false}
                    onChange={(e) => handleSubscribe(e.target.checked)}
                    label="Subscribe For Exclusive E-mail offers and discounts"
                  />
                </div>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={6}></Col>
      </Row>
      {/* Start Name Modal */}
      <Modal
        show={showNameModal}
        onHide={() => setShowNameModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your First Name"
              value={validFirstName}
              onChange={(e) => setValidFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Last Name"
              value={validLastName}
              onChange={(e) => setValidLastName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={buttonLoader}
            onClick={handleUpdateName}
          >
            {buttonLoader ? "Please Wait" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Name Modal */}

      {/* Start Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => handleNewPassword(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => handleConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {errorMessage1 === "" ? null : (
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errorMessage1}
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={buttonPasswordLoader}
            onClick={handleUpdatePassword}
          >
            {buttonPasswordLoader ? "Please Wait..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end Password Modal */}

      {/* Start Phone Modal */}
      <Modal
        show={showPhoneModal}
        onHide={() => setShowPhoneModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <InputMask
              className="form-control"
              mask="(999) 999-9999"
              placeholder="(123) 456-7890"
              type="tel"
              value={validPhoneNumber}
              onChange={(e) => handleValidPhoneNumber(e.target.value)}
            />
            {/* <Form.Control type="number" placeholder="Enter Your Phone" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            {/* <p style={{ color: "red" }}>{phone?.length == 10 ? '' : 'Invalid mobile number'}</p> */}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={buttonPhoneLoader}
            onClick={handleUpdatePhone}
          >
            {buttonPhoneLoader ? "Please Wait" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Phone Modal */}

      {/* Start Shipping Address */}
      <Modal
        show={showAddressModal}
        onHide={() => setShowAddressModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              value={validStreet}
              onChange={(e) => setValidStreet(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your City"
              value={validCity}
              onChange={(e) => setValidCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            {/* <Form.Control type="text" placeholder="Enter Your State" value={validState} onChange={(e) => setValidState(e.target.value)} /> */}
            <Form.Select aria-label="Default select example" onChange={(e) => setValidState(e.target.value) }>
              {
                validState ? 
                <option selected>{validState}</option> : 
                <option selected>Select State</option>
              }
              {
                states?.map((item) => {
                  return(
                    <option value={item?.abbreviation}>{item?.name}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Country"
              value={validcountry}
              onChange={(e) => setValidCountry(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Postal Code"
              value={validPostalCode}
              onChange={(e) => setValidPostalCode(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddressModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={buttonAddressLoader}
            onClick={handleUpdateAddress}
          >
            {buttonAddressLoader ? "Please Wait..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Shipping Address */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default NewProfile;
