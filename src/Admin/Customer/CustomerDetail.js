import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DropdownBasicExample from "./DropdownBasicExample";
import { useParams } from "react-router-dom";
import ExportApi from "../../api/ExportApi";
import { useState } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

export default function Customerdetails() {
  // Initialize state variables
  let navigate = useNavigate();
  let params = useParams();
  let imageUrl = "https://api.skewws.com/resources/";
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [totalSpent, setTotalSpent] = useState();
  const [totalSold, setTotalSold] = useState();
  const [totalSale, setTotalSale] = useState();
  const [totalPurchase, setTotalPurchase] = useState();
  const [lastOrder, setLastOrder] = useState();
  const [lastSale, setLastSale] = useState();
  const [accountCreated, setAccountCreated] = useState();
  const [activeOrderData, setActiveOrderData] = useState();
  const [activeBidData, setActiveBidData] = useState();
  const [activeAskData, setActiveAskData] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState();
  const [postalCode, setPostalCode] = useState();
  const [bidAskListHistory, setBidAskListHistory] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [validEmail, setValidEmail] = useState();
  const[buttonLoader,setButtonLoader] = useState(false)
  const[validStreet,setValidStreet] = useState()
  const[validCity,setValidCity] = useState()
  const[validState,setValidState] = useState()
  const[validCountry,setValidCountry] = useState()
  const[validPostalCode,setValidPostalCode] = useState()
  // Function to fetch and handle user data
  const handleUserData = () => {
    // Make an API call to get user data
    ExportApi.getSingleCustomerAllData(params.id)
      .then((resp) => {
        // Extract data from API response and update state variables
        let data = resp.data.data[0];
        setFirstName(data?._id?.firstname);
        setTotalSpent(data?.totalSpent);
        setTotalSold(data?.totalSold);
        setTotalSale(data?.salesCount);
        setTotalPurchase(data?.purchaseCount);
        // setLastSale(data.)
        setLastOrder(data?.purchaselist[0]?.createdAt);
        setActiveOrderData(data?.activeOrders);
        setActiveBidData(data?.bidList);
        setActiveAskData(data?.askList);
        setOrderHistoryData(data?.purchaselist);
        setBidAskListHistory(data?.bidAskHisytory);
        // ... (update other state variables)
      })
      .catch((err) => {
        console.log(err);
        // Handle error or perform actions on error
      });
  };

  // Function to handle user details
  const handleUserDetails = () => {
    // Make an API call to get user personal details
    ExportApi.getSingleUserData(params.id)
      .then((resp) => {
        // Extract personal details from API response and update state variables
        let Data = resp.data.data;
        setLastName(Data?.lastname);
        setValidEmail(Data?.email);
        setPhone(Data?.phone);
        setStreet(Data?.shipping_address?.street);
        setCity(Data?.shipping_address?.city);
        setState(Data?.shipping_address?.state);
        setCountry(Data?.shipping_address?.country);
        setPostalCode(Data?.shipping_address?.postal_code);
        // ... (update other personal details)
      })
      .catch((err) => console.log(err));
  };

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to update email
  const handleUpdateEmail = () => {
    setButtonLoader(true);
    if (email == "" || email == null) {
      toast.error("Please Enter Email");
      setButtonLoader(false);
    } else if (!validateEmail(email)) {
      setIsValidEmail(false);
      toast.error("Please Enter Valid Email");
      setButtonLoader(false);
    } else {
      // Make an API call to update email
      ExportApi.updateEmail(params.id, email)
        .then((resp) => {
          if (resp.data.message == "Data updated sucessfully") {
            toast.success("Email Updated Successfully");
            // ... (update relevant state variables)
          } else {
            toast.error(resp.data.message);
            // ... (perform actions on update failure)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Function to update address
  const handleUpdateAddress = () => {
    setButtonLoader(true);
    // Check for empty or spaces in address fields
    if (
      validStreet.trim() === "" ||
      validCity.trim() === "" ||
      validState.trim() === "" ||
      validCountry.trim() === ""
    ) {
      toast.error("Address fields cannot be empty or contain only spaces");
      setButtonLoader(false);
      return;
    }
    // Validate postal code format
    const postalCodeRegex = /^\d{5}-\d{4}$/;
    if (!postalCodeRegex.test(validPostalCode)) {
      toast.error('Postal Code must be in the format "12345-6789"');
      setButtonLoader(false);
      return;
    }
    // Make an API call to update user address
    ExportApi.updateSingleUserData(
      params.id,
      street,
      city,
      state,
      country,
      postalCode
    )
      .then((resp) => {
        toast.success("Address Updated Successfully");
        // ... (perform actions on successful address update)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch user data and details on component mount
  useEffect(() => {
    handleUserData();
    handleUserDetails();
  }, []);

  // Event listener to clear local storage and navigate to login page
  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  return (
    <div>
      <ToastContainer />
      <div className="customer-topbar d-flex align-items-center py-2 border-bottom">
        <div className="d-flex align-items-center">
          <Button
            className="ms-2 bg-transparent p-0 border-0"
            onClick={() => navigate("/customerMain")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              //   className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
              className="text-black"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </Button>
          {firstName} {lastName}
          <Button className="bg-transparent p-0 border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-black ms-2"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </Button>
          <Link className="ms-3" to="#">
            Issue With payment processing
          </Link>
        </div>
        <div className="ms-auto">
          <DropdownBasicExample />
        </div>
      </div>

      <Row>
        <Col xs="12" md="9">
          <Table className="mt-3">
            <tr>
              <th>Status</th>
              <th>History</th>
              <th></th>
            </tr>
            <tbody>
              <tr className="border-0 border-white">
                <td className="py-2 px-0">
                  Active Buyer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#198754"
                    className="bi bi-check-circle-fill ms-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </td>
                <td className="py-2 px-0">Account Created</td>
                <td className="py-2 px-0">1/2/22</td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0">
                  Active Seller{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#198754"
                    className="bi bi-check-circle-fill ms-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </td>
                <td className="py-2 px-0">Last Order</td>
                <td className="py-2 px-0">{moment(lastOrder).format("l")}</td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0">
                  Subscription{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#198754"
                    className="bi bi-check-circle-fill ms-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </td>
                <td className="py-2 px-0">Last Sale</td>
                <td className="py-2 px-0">1/5/23</td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0">Positive Rating 8(88.9%)</td>
                <td className="py-2 px-0">Purchases</td>
                <td className="py-2 px-0">{totalPurchase}</td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0">
                  Negative Rating <span className="negativepoint">1</span>
                </td>
                <td className="py-2 px-0">Sales</td>
                <td className="py-2 px-0">{totalSale}</td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0"></td>
                <td className="py-2 px-0">Total Spent</td>
                <td className="py-2 px-0">
                  <span className="spent">{"$" + totalSpent?.toFixed(2)}</span>
                </td>
              </tr>

              <tr className="border-0 border-white">
                <td className="py-2 px-0"></td>
                <td className="py-2 px-0">Total Sold</td>
                <td className="py-2 px-0">
                  <span className="sold">{"$" + totalSold?.toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-5">
              <p className="mb-0">Customer Notes</p>
              <p className="mb-0">Returns</p>
              <p className="mb-0">0</p>
            </div>
            <div>
              <input
                className="w-50 border rounded p-2"
                type="text"
                placeholder="Add a Note"
              />
            </div>
          </div>

          <div className="mt-4 active-order">
            <p className="border-bottom py-2 fw-bold">Active order</p>

            <div className="inner-custom-data">
              {activeOrderData?.map((item) => {
                return (
                  <>
                    <p
                      className="fw-500"
                      onClick={() => navigate("/OrderDetail/" + item?._id)}
                    >
                      {item?._id}
                    </p>
                    <div className="d-flex align-items-center gap-4 w-75 justify-content-between ">
                      {item?.productId?.map((data) => {
                        return (
                          <div className="d-flex align-items-center">
                            <img
                              src={`${imageUrl}${data?.image[0]}`}
                              height="70px"
                            />
                            <div>
                              <p className="mb-0">{data?.productname}</p>
                              <p className="text-black-50">sku:{data?.sku}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div>{moment(item?.createdAt).format("l")}</div>
                      <div>
                        <span className="spent fw-bold">$250</span>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* {
                bidAskListHistory[0]?.map((item) => {
                  return (
                    <>
                      <p className="fw-500">{item?._id}</p>
                      <div className="d-flex align-items-center gap-4 w-75 justify-content-between ">
                        {
                          item?.productId?.map((data) => {
                            return (
                              <div className="d-flex align-items-center">
                                <img src={`${imageUrl}${data?.image[0]}`} height="70px" />
                                <div>
                                  <p className="mb-0">{data?.productname}</p>
                                  <p className="text-black-50">sku:{data?.sku}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                        <div>2/4/22</div>
                        <div>
                          <span className="spent fw-bold">${item?.bidAmount}</span>
                        </div>
                      </div>
                    </>
                  )
                })
              } */}
            </div>

            <p className="border-bottom py-2 fw-bold mt-5">Active Bids/Ask</p>
            <div className="inner-custom-data">
              {activeBidData?.map((item) => {
                return (
                  <div className="d-flex align-items-center gap-4 w-75 justify-content-between">
                    {item?.productId?.map((data) => {
                      return (
                        <div className="d-flex align-items-center">
                          {/* <img src={`${imageUrl}${data.image[0]}`} height="100px" /> */}
                          <div>
                            <p>{data.productname}</p>
                            <div className="d-flex align-item-center gap-5">
                              <p>Sku:{data.sku}</p>
                              <p>
                                Condition:
                                {data.type == 1
                                  ? "New"
                                  : data.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div>{moment(item?.createdAt).format("l")}</div>
                    <div>
                      <span className="spent fw-bold text-success">
                        {"$" + item?.bidAmount}
                      </span>
                    </div>
                  </div>
                );
              })}
              {activeAskData?.map((item) => {
                return (
                  <div className="d-flex align-items-center gap-4 w-75 justify-content-between">
                    {item?.productId?.map((data) => {
                      return (
                        <div className="d-flex align-items-center">
                          <div>
                            <p>{data.productname}</p>
                            <div className="d-flex align-item-center gap-5">
                              <p>Sku:{data.sku}</p>
                              <p>
                                Condition:
                                {data.type == 1
                                  ? "New"
                                  : data.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div>{moment(item?.createdAt).format("l")}</div>
                    <div>
                      <span className="spent fw-bold text-danger">
                        {"$" + item?.askAmount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <Accordion defaultActiveKey="1">
              <Accordion.Item>
                <Accordion.Header>
                  <b>Order History</b>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="mt-4 active-order">
                    <div className="inner-custom-data">
                      {orderHistoryData?.map((item) => {
                        return (
                          <>
                            <p>{item?._id}</p>
                            <div className="d-flex align-items-center gap-4 justify-content-between pe-sm-5">
                              {/* Perform OnClick event and redirect to the Single Order Page */}
                              {item?.productId?.map((data) => {
                                return (
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={`${imageUrl}${data.image[0]}`}
                                      height="70px"
                                    />
                                    <div>
                                      <p className="mb-0">{data.productname}</p>
                                      <p className="mb-0">
                                        {data.type == 1
                                          ? "New"
                                          : data.type == 2
                                          ? "2nd Hand"
                                          : "Used"}
                                      </p>
                                      <div>
                                        <p className="text-black-50">
                                          sku:{data?.sku}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              <div>{moment(item?.createdAt).format("l")}</div>
                              <div>
                                {item?.bidId?.map((data) => {
                                  return (
                                    <span className="spent fw-bold">
                                      {data?.subTotal
                                        ? "$" + data?.subTotal
                                        : ""}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      })}
                      {/* <div className="d-flex align-items-center gap-4 mt-4 w-75 justify-content-between">
                        <div className="d-flex align-items-center">
                          <img src={Ls2} height="100px" />
                          <div>
                            <p>MSI RTX 3080TI Gaming X Trio</p>
                            <p className="mb-0">Used</p>
                            <p className="text-black-50">sku:c23</p>
                          </div>
                        </div>
                        <div>2/4/22</div>
                        <div>
                          <span className="sold fw-bold">$250</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-4 mt-4 w-75 justify-content-between">
                        <div className="d-flex align-items-center">
                          <img src={Ls2} height="100px" />
                          <div>
                            <p>MSI RTX 3080TI Gaming X Trio</p>
                            <p className="mb-0">Used</p>
                            <p className="text-black-50">sku:c23</p>
                          </div>
                        </div>
                        <div>2/4/22</div>
                        <div>
                          <span className="spent fw-bold">$250</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="mt-5 askbid-cont">
            {/* <h4 className="mb-2">Bid Ask/History</h4> */}
            <Accordion defaultActiveKey="1">
              <Accordion.Item>
                <Accordion.Header>
                  <b>Bid/Ask History</b>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="mt-4 active-order">
                    <div className="inner-custom-data">
                      {bidAskListHistory[0]?.map((item) => {
                        return (
                          <div className="d-flex align-items-center gap-4 w-75 justify-content-between">
                            {item?.productId?.map((data) => {
                              return (
                                <div className="d-flex align-items-center">
                                  <div>
                                    <p>{data?.productname}</p>
                                    <div className="d-flex align-item-center gap-5">
                                      <p>Sku:{data?.sku}</p>
                                      <p>
                                        Condition:
                                        {data?.type == 1
                                          ? "New"
                                          : data?.type == 2
                                          ? "2nd Hand"
                                          : "Used"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div>{moment(item?.createdAt).format("l")}</div>
                            <div>
                              <span className="spent fw-bold text-success">
                                {"$" + item?.bidAmount}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      {bidAskListHistory[1]?.map((item) => {
                        return (
                          <div className="d-flex align-items-center gap-4 w-75 justify-content-between">
                            {item?.productId?.map((data) => {
                              return (
                                <div className="d-flex align-items-center">
                                  <div>
                                    <p>{data?.productname}</p>
                                    <div className="d-flex align-item-center gap-5">
                                      <p>Sku:{data?.sku}</p>
                                      <p>
                                        Condition:
                                        {data?.type == 1
                                          ? "New"
                                          : data?.type == 2
                                          ? "2nd Hand"
                                          : "Used"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div>{moment(item?.createdAt).format("l")}</div>
                            <div>
                              <span className="spent fw-bold text-danger">
                                {"$" + item?.askAmount}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="bg-custom-light p-3 my-3 rounded">
            <div className="py-2 d-flex justify-content-between align-items-center">
              <h6>Timeline</h6>
              <Form.Check type="checkbox" label="Show Comments" />
            </div>
            <hr />
            <div className="d-flex py-3 gap-4">
              <div className="leave-comment">
                <div className="timeline-custom">
                  <div className="timeline-block timeline-block-right">
                    <div className="">
                      <div className="message-user">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" />
                      </div>
                    </div>
                  </div>

                  <div className="timeline-block timeline-block-left">
                    <div className="marker active"></div>
                  </div>

                  <div className="timeline-block timeline-block-right active">
                    <div className="marker active"></div>
                  </div>
                  <div className="timeline-block timeline-block-right active">
                    <div className="marker active"></div>
                  </div>
                  <div className="timeline-block timeline-block-right active">
                    <div className="marker active"></div>
                  </div>
                </div>
              </div>
              <div className="w-100 position-relative">
                <textarea className="w-100 p-2 w-95"></textarea>
                <div className="iconlist d-flex align-items-center gap-2 position-absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-at"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-hash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-file-earmark-code"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                    <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
                  </svg>

                  <Button className="px-4 border-0 bg-secondary text-white">
                    Post
                  </Button>
                </div>
                <p className="text-end mb-0">
                  Only you and other staff can see comments
                </p>

                <h4 className="my-2 fw-bold">March</h4>
                <div className="d-flex align-tems-center p-2 mb-3">
                  <p className="mb-0">
                    Order confirmation email for order #1003 sent to this
                    customer(tester@example.com)
                  </p>
                  <p className="mb-0 ms-auto">6:09AM</p>
                </div>

                <div className="d-flex align-tems-center p-2 mt-2 mb-3">
                  <p className="mb-0">
                    You Created Order #1003 for the customer from draft order
                    #D3
                  </p>
                  <p className="mb-0 ms-auto">6:09AM</p>
                </div>
                <div className="d-flex align-tems-center mt-2 p-2 mb-3">
                  <p className="mb-0">
                    You added the email tester@example.com to this Customer
                  </p>
                  <p className="mb-0 ms-auto">4:36AM</p>
                </div>
                <div className="d-flex align-tems-center mt-2 p-2 mb-3">
                  <p className="mb-0">You addded the phone +12345678901</p>
                  <p className="mb-0 ms-auto">4:36AM</p>
                </div>
                <div className="d-flex align-tems-center mt-2 p-2 mb-3">
                  <p className="mb-0">You created this customer </p>
                  <p className="mb-0 ms-auto">4:36AM</p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs="12" md="3">
          <div className="overview-part mt-4">
            <div className="border-bottom pb-3">
              <div className="d-flex align-items-center">
                <h4 className="text-capitalize fs-6">customer overview</h4>
                {/* <Button className="ms-auto bg-success border-0 py-2 px-4" onClick={() => setShowUserModal(true)}>
                  Edit
                </Button> */}
              </div>
              <Link to="#">{validEmail}</Link>
              <p>{phone}</p>
            </div>

            <div className="border-bottom pb-3 mt-4">
              <div className="d-flex align-items-center">
                <h4 className="text-capitalize fs-6">DEFAULT ADDRESS</h4>
                <Button
                  className="ms-auto bg-success border-0 py-2 px-4"
                  onClick={() => setShowAddressModal(true)}
                >
                  Manage
                </Button>
              </div>

              <p>
                {firstName} {lastName}
                <br /> {street}
                <br />
                {city} {state} {postalCode}
                <br />
                {country}
              </p>
              <div className="tags">
                <Link to="#" onClick={() => setShowAddressModal(true)}>
                  Add new address
                </Link>
                <div className="tag-input-part">
                  <div className="d-flex align-items-center">
                    <p>Tags</p>
                    <Link to="#" className="ms-auto">
                      View all tags
                    </Link>
                  </div>
                  <input
                    className="w-100 form-control"
                    type="text"
                    placeholder="VIP,Sale,Shopper etc."
                  />
                </div>
              </div>
            </div>

            <div className="border-bottom pb-3 mt-4 tag-input-part rounded">
              <h5 className="fs-6">Support History</h5>
              <div className="support-history">
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">Shipping Inquery</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">New Account</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">Billing Inquery</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
              </div>
            </div>

            <div className="border-bottom pb-3 mt-4 tag-input-part rounded">
              <h5 className="fs-6">Negative Rating History</h5>
              <div className="support-history">
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">Failed to ship item</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
              </div>
            </div>

            <div className="border-bottom pb-3 mt-4 tag-input-part rounded">
              <h5 className="fs-6">IP History</h5>
              <div className="support-history">
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">xxx xxx xxx</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">xxx xxx xxx</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">xxx xxx xxx</p>
                  <p className="mb-0 ms-auto">1/12/2022</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* for the update email popup */}
      <Modal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="false"
              placeholder="Enter Your Email"
              onChange={(e) => handleEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={buttonLoader}
            onClick={handleUpdateEmail}
          >
            {buttonLoader ? "is Loading" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* for the update address */}
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
            <Form.Control
              type="text"
              placeholder="Enter Your State"
              value={validState}
              onChange={(e) => setValidState(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Country"
              value={validCountry}
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
            disabled={buttonLoader}
            onClick={handleUpdateAddress}
          >
            {buttonLoader ? "is Loading" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
