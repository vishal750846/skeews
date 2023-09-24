import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap";
import Login from "./Login";
import Header from "./header";
import OutsideClickHandler from "react-outside-click-handler";
import { ToastContainer } from "react-toastify";
import ExportApi from "../api/ExportApi";

export default function navbar() {
  const navigate = useNavigate();
  const [closeIcon, setCloseIcon] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [show, setShow] = useState(false);
  const [DropList, setDropList] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("tokenuser"));
  const [token1, setToken1] = useState(localStorage.getItem("admin"));
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("tokenuser"))?.id);

  const divRef = useRef(null);
  let imageUrl = "https://api.skewws.com/resources/";
  const [Data, setData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  // This useEffect sets up event listeners for "Login" and "Loginout" events when the component mounts.
  // It listens for these events and performs actions accordingly.
  useEffect(() => {
    // Listen for "Login" event
    window.addEventListener("Login", () => {
      // Set the user token from localStorage
      setToken(localStorage.getItem("tokenuser"));
      setToken1(localStorage.getItem("admin"));
      setUserId(JSON.parse(localStorage.getItem("tokenuser")).id)
      // Hide a component or perform other actions
      setShow(false);
    });

    // Listen for "Loginout" event
    window.addEventListener("Loginout", () => {
      // Set a state variable to control a dropdown list
      setDropList(false);
      // Clear localStorage data
      localStorage.clear();
      // Clear tokens and navigate to the root path
      setToken();
      setToken1();
      setUserId()
      navigate("/");
    });
  }, []);

  // Function to handle cancel icon click
  const handleCancelIcon = () => {
    // Clear search-related state variables
    handleSearchClear();
    setSearchValue("");
    setCloseIcon(false);
  };

  // Function to handle closing a component or dialog
  const handleClose = () => setShow(false);

  // Function to handle showing a component or dialog
  const handleShow = () => {
    // Check if a user token exists in localStorage
    if (!localStorage.getItem("tokenuser")) {
      // Show the component if no user token is found
      setShow(true);
    } else {
      // Otherwise, hide the component, set the user token, user ID, and show a dropdown list
      setShow(false);
      setToken(localStorage.getItem("tokenuser"));
      setUserId(JSON.parse(localStorage.getItem("tokenuser")).id);
      setDropList(true);
    }
  };

  // Function to handle search input and perform search-related actions
  const handleSearch = (e) => {
    // Set the search value based on user input
    setSearchValue(e);

    // Check if the search input has a length greater than 0
    if (e?.length > 0) {
      if (e == "") {
        // If the input is empty, clear the data
        setData([]);
      } else {
        // Show a close icon, set a state variable, and fetch search results
        setCloseIcon(true);
        setShowPopUp(true);
        ExportApi.GetAllProductSerch(e)
          .then((resp) => {
            if (resp.data.Data) {
              // Update data with search results
              setData([...resp.data.Data]);
            } else {
              // If no results are found, clear the data
              setData([]);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      // If the search input is empty, clear the data and hide the close icon
      setCloseIcon(false);
      setData([]);
    }
  };

  // This useEffect listens for changes in the searchValue state variable
  // and triggers the handleSearch function when the searchValue changes.
  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  // Function to clear search-related data and reset the search input
  const handleSearchClear = (e) => {
    setSearchValue("");
    setData([]);
  };

  return (
    <div>
      <ToastContainer />
      <Navbar className="px-4" expand="lg">
        <Navbar.Brand href="#home">
          <div className="logo-part">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup className="">
            <InputGroup.Text id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search For GPU"
              aria-label="Username"
              type="text"
              value={searchValue}
              aria-describedby="basic-addon1"
              autoComplete="false"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setSearchValue(e.target.value);
                  setCloseIcon(true);
                  setShowPopUp(true);
                } else {
                  setSearchValue(e.target.value);
                  setCloseIcon(false);
                  setShowPopUp(false);
                }
              }}
            />
            {closeIcon ? (
              <div className="custom_svgCross">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#000"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    handleCancelIcon();
                    setShowPopUp(false);
                    setSearchValue("");
                  }}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            ) : (
              ""
            )}
            <OutsideClickHandler
              onOutsideClick={() => {
                setShowPopUp(false);
              }}
            >
              {showPopUp
                ? searchValue && (
                    <div className="">
                      <div
                        className="search-list-custom header-list"
                        ref={divRef}
                      >
                        {Data?.length > 0 ? (
                          <>
                            <ListGroup
                              as="ul"
                              className={showPopUp ? "" : "hide"}
                            >
                              {Data.map((val, i) => {
                                return (
                                  <ListGroup.Item
                                    as="li"
                                    key={i}
                                    className=""
                                    onClick={() => {
                                      navigate(`/product/${val._id}`);
                                      setShowPopUp(false);
                                      setSearchValue("");
                                      setData();
                                    }}
                                  >
                                    <div className="d-flex align-items-center gap-5">
                                      <img src={`${imageUrl}${val.image[0]}`} />
                                      <div className="custom-list">
                                        <p className="mb-0">{val.brand}</p>
                                        <h3>{val.chipset}</h3>
                                        <h5>{val.model}</h5>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </>
                        ) : (
                          <div>
                            <p className="text-center fs-2">
                              <b>No Data Found</b>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                : ""}
            </OutsideClickHandler>
          </InputGroup>
          <div className="header_right_content">
            <Link to="/userBuySell" className="text-dark mx-2 fs-5 fw-500">
              Buy sell
            </Link>
            <Link
              to="/categories/63ff36fb23ad0386e761641f"
              className="text-dark mx-2 fs-5 fw-500"
            >
              Browse
            </Link>
            <Link to="#link" className="text-dark mx-2 fs-5 fw-500">
              About
            </Link>
            <Link to="#link" className="text-dark mx-2 fs-5 fw-500">
              Help
            </Link>
            <button className="text-dark mx-2 fs-5 fw-500  custom-header">
              {" "}
              <div className="d-flex align-items-center gap-2 lg:ms-3 ">
                <Button className="bg-transparent border-0 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </Button>
                {token || token1 ? (
                  <>
                    <Button
                      className="bg-transparent border-0 p-0"
                      onClick={() => setDropList(!DropList)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          filerule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-transparent border-0 p-0"
                    onClick={() => handleShow()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        filerule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </Button>
                )}
              </div>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setDropList(false);
                }}
              >
                {DropList ? (
                  <div className="dropdown">
                    <div className="inner_drop">
                    {token || userId ? <Link to={`/profile/${userId}`}>Profile</Link> : <Link to="#">Profile</Link>}
                      {token ? (
                        <Link to="/buySellManagment/selling">Dashboard</Link>
                      ) : null}
                      {token1 ? <Link to="/Productlist">Dashboard</Link> : null}
                      {token || token1 ? (
                        <p
                          onClick={() => {
                            navigate("/");
                            window.dispatchEvent(new Event("Loginout"));
                          }}
                        >
                          Log Out
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </OutsideClickHandler>
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      {/* Login PopUp Start */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Login navigate={navigate} modal={handleClose} />
        </Modal.Body>
      </Modal>
      {/* Login Popup End */}

      <div className={showPopUp ? "addOverlay" : ""}></div>
    </div>
  );
}
