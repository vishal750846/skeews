import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../api/ExportApi";
import Login from "./Login";
import { TroubleshootOutlined } from "@mui/icons-material";

export default function Sonnet(props) {
  const prams = useParams();
  const navigate = useNavigate();
  const [Show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [askValue, setAskValue] = useState(0);
  const [Transction, setTransction] = useState(0);
  const [Payment, setPayment] = useState(0);
  const [total, settotal] = useState(0);
  const [Finalchecks, setFinalchecks] = useState();
  const [Finalchecks1, setFinalchecks1] = useState();
  const [FinalchecksError, setFinalchecksError] = useState(false);
  const [Finalchecks1Error, setFinalchecks1Error] = useState(false);
  const [expiration, setExpiration] = useState();
  const [input, setInput] = useState(false);
  const [sellNowStatus, setSellNowStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState();
  const [fullPageLoader, setFullPageLoader] = useState(false);
  const [messageShown, setMessageShown] = useState(false);
  const [askStatus, setAskStatus] = useState(false);
  const [bid, setBid] = useState();

  // Function to create an order with the given product and user ID
  const handleCreateOrder = (productId, userId) => {
    // Display a loading indicator while creating the order.
    setLoading(true);
    // Call an API to create an order.
    ExportApi.createOrder(productId, userId, total)
      .then((resp) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to create a second-hand order with the given product ID, user ID, and askValue
  const handleCreateSecondHandOrder = (productId, userId, askValue) => {
    setLoading(true);
    // Call an API to create a second-hand order.
    ExportApi.CreateSecondHandOrder(productId, userId, askValue, "Sell")
      .then((resp) => {
        if (resp.data.message == "Please Create Ask/Bid") {
          toast.error(resp.data.message);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/order");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to handle user bid
  const handleUserBid = (userid) => {
    if (props.error) {
      toast.error(
        "Shipping Service not available Please Contact to Support Service"
      );
    } else {
      ExportApi.getSingleUserData(userid).then((resp) => {
        let data = resp.data.data;
        if (data?.shipping_address?.street != null) {
          if (data.stripe_account_id) {
            if (prams.buy != undefined) {
              if (props.Data6 == 1) {
                setFullPageLoader(false);
                handleCreateOrder(prams.id, userid);
                navigate("/order");
              } else {
                setFullPageLoader(false);
                handleCreateSecondHandOrder(prams.id, userid, askValue);
              }
            } else {
              if (sellNowStatus) {
                if (props.Data6 == 1) {
                  setFullPageLoader(false);
                  handleCreateOrder(prams.id, userid);
                  navigate("/order");
                } else {
                  setFullPageLoader(false);
                  handleCreateSecondHandOrder(prams.id, userid, askValue);
                  navigate("/order");
                }
              } else {
                setLoading(true);
                ExportApi.ask(
                  prams.id,
                  userid,
                  Transction,
                  Payment,
                  askValue,
                  total,
                  expiration,
                  shippingFee
                )
                  .then((resp) => {
                    if (resp.data.message == "Ask created successfully") {
                      window.dispatchEvent(new Event("List"));
                      toast.success("Ask created successfully");
                      setLoading(false);
                      setFullPageLoader(false);
                    } else {
                      setFullPageLoader(false);
                      toast.error("Ask is not created! Something Went Wrong");
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }
          } else {
            toast.error("Add payouts information to place an order");
            // navigate("/stripeconnectaccount/" + userid);
          }
        } else {
          toast.error("Please complete User information");
          // navigate(`/profile/${userid}`);
        }
      });
    }
  };

  // Function to handle bid submission
  const hendleBid = () => {
    if (askStatus) {
      // Display an error toast if the ask is higher than the higher bid.
      toast.error("Your ask is higher than the higher bid");
    } else {
      setLoading(true);
      if (Finalchecks) {
        setFinalchecksError(false);
        setLoading(false);
        if (Finalchecks1) {
          setFinalchecks1Error(false);
          setLoading(false);
          if (localStorage.getItem("tokenuser")) {
            setLoading(false);
            if (input) {
              setLoading(false);
            } else {
              // Confirm the user's intent to create an order.
              let confirm = window.confirm(
                "Are you sure you want to create an order"
              );
              if (!confirm) {
                // User canceled the operation.
              } else {
                // Call a function to handle user bid with their ID.
                handleUserBid(JSON.parse(localStorage.getItem("tokenuser")).id);
              }
            }
          } else if (localStorage.getItem("admin")) {
            setLoading(false);
            if (input) {
              setLoading(false);
            } else {
              // Confirm the user's intent to create an order.
              let confirm = window.confirm(
                "Are you sure you want to create an order"
              );
              if (!confirm) {
                // User canceled the operation.
              } else {
                // Call a function to handle user bid with their ID.
                handleUserBid(JSON.parse(localStorage.getItem("admin")).id);
              }
            }
          } else {
            setShowModal(true);
          }
        } else {
          setLoading(false);
          setFinalchecks1Error(true);
          toast.error("Complete necessary checkboxes for seamless shopping");
        }
      } else {
        setLoading(false);
        setFinalchecksError(true);
        toast.error("Complete necessary checkboxes for seamless shopping");
      }
    }
  };

  // Function to handle the input of the ask value
  const handlePlaceAskValue = (askValue) => {
    if (Number(askValue) > props.Data) {
      // If askValue is higher than Data, calculate and set various values.
      setAskValue(askValue);
      let transactionaskValue = (askValue / 100) * 9.5;
      setTransction(transactionaskValue.toFixed(2));
      let paymentaskValue = (askValue / 100) * 3;
      setPayment(paymentaskValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * askValue;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shipping);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(askValue) -
        (askValue / 100) * 3 -
        shipping -
        (askValue / 100) * 9.5;
      settotal(totalNumber.toFixed(2));
      setInput(false);
      setAskStatus(false);
    } else if (Number(askValue) < props.Data2) {
      // If askValue is lower than Data2, set askStatus to true (for validation).
      setAskValue(askValue);
      let transactionaskValue = (askValue / 100) * 9.5;
      setTransction(transactionaskValue.toFixed(2));
      let paymentaskValue = (askValue / 100) * 3;
      setPayment(paymentaskValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * askValue;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shipping);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(askValue) -
        (askValue / 100) * 3 -
        shipping -
        (askValue / 100) * 9.5;
      settotal(totalNumber.toFixed(2));
      setInput(false);
      setAskStatus(true);
      return;
    } else {
      // If askValue is within acceptable range, set various values and reset askStatus.
      setInput(false);
      setAskValue(askValue);
      let transactionaskValue = (askValue / 100) * 9.5;
      setTransction(transactionaskValue.toFixed(2));
      let paymentaskValue = (askValue / 100) * 3;
      setPayment(paymentaskValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * askValue;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shipping);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(askValue) -
        (askValue / 100) * 3 -
        shipping -
        (askValue / 100) * 9.5;
      settotal(totalNumber.toFixed(2));
      setAskStatus(false);
    }
  };

  // Function to handle "Sell Now" button click
  const handleSellNow = (price) => {
    // Set various values based on the provided price.
    setSellNowStatus(true);
    setShow(false)
    setAskValue(price);
    let transactionaskValue = (price / 100) * 9.5;
    setTransction(transactionaskValue.toFixed(2));
    let paymentaskValue = (price / 100) * 3;
    setPayment(paymentaskValue.toFixed(2));
    let shippingCost = Number(0.5 / 100) * price;
    let fee = Math.floor(shippingCost);
    let sf = Number(props.shipping);
    let shipping = (fee + sf)?.toFixed(2);
    setShippingFee(shipping);
    let totalNumber =
      Number(price) - (price / 100) * 3 - shipping - (price / 100) * 9.5;
    settotal(totalNumber.toFixed(2));
    // handleReviewAsk();
  };

  // Function to handle the "Back" button click in the review step
  const handleReviewAsk = () => {
    console.log(askValue);
    if (Number(askValue) <= 0) {
      toast.error("Please Input the Ask first");
      return;
    } else {
      if (Number(askValue) < props.Data2) {
        // If askValue is less than Data2, show an error toast.
        toast.error("Your ask is less than the higher bid");
      } else {
        // If askValue is acceptable, toggle the "Show" state and call a prop function.
        setShow(!Show);
        props.handleUserAsk1(!Show);
      }
    }
  };

  // Function to handle validation for a checkbox
  const HandleFinalCheck = (askValue) => {
    if (askValue) {
      setFinalchecks(true);
      setFinalchecksError(false);
    } else {
      setFinalchecks(false);
      setFinalchecksError(true);
    }
  };

  // Another function to handle validation for a different checkbox
  const HandleFinalcheck1 = (askValue) => {
    if (askValue) {
      setFinalchecks1(true);
      setFinalchecks1Error(false);
    } else {
      setFinalchecks1(false);
      setFinalchecks1Error(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      // If there's a "tokenuser" in local storage, handle something (e.g., shipping fee).
      // HandleShippingFee(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      // If there's an "admin" in local storage, handle something else (e.g., shipping fee).
      // HandleShippingFee(JSON.parse(localStorage.getItem("admin")).id);
    }
  }, [askValue, messageShown]);

  useEffect(() => {
    if (prams.buy === "sell") {
      if (props.Data2) {
        // Set ask value based on props and calculate transaction, payment, and shipping fees.
        setAskValue(props.Data2);
        let transactionaskValue = (props.Data2 / 100) * 9.5;
        setTransction(transactionaskValue.toFixed(2));
        let paymentaskValue = (props.Data2 / 100) * 3;
        setPayment(paymentaskValue.toFixed(2));
        let shippingCost = Number(0.5 / 100) * props.Data2;
        let fee = Math.floor(shippingCost);
        let sf = Number(props.shipping);
        let shipping = (fee + sf)?.toFixed(2);
        setShippingFee(shipping);
        let totalNumber =
          Number(props.Data2) -
          (props.Data2 / 100) * 3 -
          Number(shipping) -
          (props.Data2 / 100) * 9.5;
        settotal(totalNumber.toFixed(2));
        setShow(false);
      } else if (props.Data3) {
        // Set ask value based on props and calculate transaction, payment, and shipping fees.
        setAskValue(props.Data3);
        let transactionaskValue = (props.Data3 / 100) * 9.5;
        setTransction(transactionaskValue.toFixed(2));
        let paymentaskValue = (props.Data3 / 100) * 3;
        setPayment(paymentaskValue.toFixed(2));
        let shippingCost = Number(0.5 / 100) * props.Data2;
        let fee = Math.floor(shippingCost);
        let sf = Number(props.shipping);
        let shipping = (fee + sf)?.toFixed(2);
        setShippingFee(shipping);
        let totalNumber =
          Number(props.Data3) -
          (props.Data3 / 100) * 3 -
          Number(shipping) -
          (props.Data3 / 100) * 9.5;
        settotal(totalNumber.toFixed(2));
        setShow(false);
      }
    } else {
      // Handle other cases if needed.
    }
    if (prams.buy === "sell2") {
      // Set ask value based on props and calculate transaction, payment, and shipping fees.
      setAskValue(props.Data2);
      let transactionaskValue = (props.Data2 / 100) * 9.5;
      setTransction(transactionaskValue.toFixed(2));
      let paymentaskValue = (props.Data2 / 100) * 3;
      setPayment(paymentaskValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * props.Data2;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shipping);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(props.Data2) -
        (props.Data2 / 100) * 3 -
        Number(shipping) -
        (props.Data2 / 100) * 9.5;
      settotal(totalNumber.toFixed(2));
      setShow(false);
    } else if (prams.buy === "sell3") {
      // Set ask value based on props and calculate transaction, payment, and shipping fees.
      setAskValue(props.Data2);
      let transactionaskValue = (props.Data2 / 100) * 9.5;
      setTransction(transactionaskValue.toFixed(2));
      let paymentaskValue = (props.Data2 / 100) * 3;
      setPayment(paymentaskValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * props.Data2;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shipping);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(props.Data2) -
        (props.Data2 / 100) * 3 -
        Number(shipping) -
        (props.Data2 / 100) * 9.5;
      settotal(totalNumber.toFixed(2));
      setShow(false);
    }
  }, [props]);

  return (
    <div>
      {fullPageLoader ? (
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : (
        <div>
          {Show ? (
            <>
              {props.Data ? <p>Lowest Ask: $ {props.Data}</p> : ""}
              <div className="d-flex  border rounded p-2 gap-2">
                <div className="quantity-custom">
                  <InputGroup className="mb-3">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="bg-none border-end-0 text-dark"
                    >
                      $
                    </InputGroup.Text>
                    <Form.Control
                      value={askValue}
                      onChange={(e) => {
                        handlePlaceAskValue(e.target.value);
                      }}
                      placeholder=""
                      type="number"
                      className="border-start-0"
                      aria-label="number"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>

                {/* start commented Code for buy Now button
            <div className="ms-auto customsell-btn">
              {props.Data2 ? (
                <Button
                  className="sell-btn border-0 sell-button"
                  onClick={() => handleSellNow(props.Data2)}
                >
                  Sell Now for ${props.Data2}
                </Button>
              ) : props.Data6 == 1 ? (
                <Button
                  className="sell-btn border-0"
                  onClick={() => handleSellNow(props.Data7)}
                >
                  Sell Now for ${props.Data7}
                </Button>
              ) : props.Data6 == 2 ? (
                props.Data3 > 0 ? (
                  <Button
                    className="sell-btn border-0"
                    onClick={() => handleSellNow(props.Data3)}
                  >
                    Sell Now for ${props.Data3}
                  </Button>
                ) : (
                  ""
                )
              ) : props.Data6 == 3 ? (
                props.Data5 > 0 ? (
                  <Button
                    className="sell-btn border-0"
                    onClick={() => handleSellNow(props.Data5)}
                  >
                    Sell Now for ${props.Data5}
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            End Commented Code for buy now Button */}

                <div className="ms-auto customsell-btn">
                  {props.Data2 ? (
                    <Button
                      className="sell-btn border-0 sell-button"
                      onClick={() => handleSellNow(props.Data2)}
                    >
                      Sell Now for ${props.Data2}
                    </Button>
                  ) : props.Data6 == 1 ? (
                    <Button
                      className="sell-btn border-0"
                      onClick={() => handleSellNow(props.Data7)}
                    >
                      Sell Now for ${props.Data7}
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {localStorage.getItem("tokenuser") ? (
                askValue > 0 ? (
                  props.Data >= askValue ? (
                    <h2 className="text-capitalize text-center fs-4 my-4">
                      you are the lowest ask!
                    </h2>
                  ) : props.Data < askValue ? (
                    <h2 className="text-capitalize text-center fs-4 my-4">
                      you are not the lowest ask!
                    </h2>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : localStorage.getItem("admin") ? (
                askValue > 0 ? (
                  props.Data >= askValue ? (
                    <h2 className="text-capitalize text-center fs-4 my-4">
                      you are the lowest ask!
                    </h2>
                  ) : props.Data < askValue ? (
                    <h2 className="text-capitalize text-center fs-4 my-4">
                      you are not the lowest ask!
                    </h2>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Your Ask Price</p>
                <p className="ms-auto mb-0">${askValue}</p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Transaction Fee(9.5%)</p>
                <p className="ms-auto mb-0">${Transction}</p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Payment Proc.(3%)</p>
                <p className="ms-auto mb-0">${Payment}</p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Shipping</p>
                <p className="ms-auto mb-0">
                  {isNaN(shippingFee) ? "TBD" : "$" + shippingFee}
                </p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Discount Code</p>
                <Button
                  className="add-discount-btn text-capitalize ms-auto bg-transparent p-0 border-0 fw-bold"
                  disabled
                >
                  add discount{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 15 15"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </Button>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0">Total</p>
                <p className="ms-auto mb-0">
                  {isNaN(total) ? "" : "$" + total}
                </p>
              </div>
              <p>
                Your ask may appear higher due to local duties
                <br /> and taxes
              </p>
              <div className="border rounded p-2 ask-main">
                <div className="ask-expiration d-flex">
                  <p className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-stopwatch me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                      <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                    </svg>
                    Ask Expiration
                  </p>

                  <div className="ms-auto">
                    <select
                      className="border py-1 px-2"
                      onChange={(e) => setExpiration(e.target.value)}
                    >
                      <option askValue="1">1 day</option>
                      <option askValue="2">2 day</option>
                      <option askValue="3">3 day</option>
                      <option askValue="4">4 day</option>
                      <option askValue="5">5 day</option>
                      <option askValue="10">10 day</option>
                      <option askValue="15">15 day</option>
                      <option askValue="30">30 day</option>
                    </select>
                  </div>
                </div>

                <div className="ask-expiration d-flex mt-3">
                  <p className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-wallet me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                    </svg>
                    Payout method : Active
                  </p>

                  <div className="ms-auto">
                    {localStorage.getItem("tokenuser") ? (
                      <Button
                        className="text-uppercase edit-btn bg-transparent border-0"
                        onClick={() =>
                          navigate(
                            "/stripeconnectaccount/" +
                              JSON.parse(localStorage.getItem("tokenuser")).id
                          )
                        }
                      >
                        edit
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="review-part">
              {prams.buy != undefined ? (
                <h2 className="text-capitalize text-center fs-4 mt-4 mb-2">
                  Place Order
                </h2>
              ) : (
                <h2 className="text-capitalize text-center fs-4 mt-4 mb-2">
                  Place Ask
                </h2>
              )}
              <p className="text-center">
                Please confirm your ask details below
              </p>
              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0 text-capitalize">your sale price</p>
                <p className="ms-auto mb-0">
                  {isNaN(askValue) ? "TBD" : "$" + askValue}
                </p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0 text-capitalize">Transaction Fee(9.5%)</p>
                <p className="ms-auto mb-0">
                  {isNaN(Transction) ? "TBD" : "$" + Transction}
                </p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0 text-capitalize">Payment proc(3%)</p>
                <p className="ms-auto mb-0">
                  {isNaN(Payment) ? "TBD" : "$" + Payment}
                </p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0 text-capitalize">shipping</p>
                <p className="ms-auto mb-0">
                  {isNaN(shippingFee) ? "TBD" : "$" + shippingFee}
                </p>
              </div>

              <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                <p className="mb-0 text-capitalize">total</p>
                <p className="ms-auto mb-0 fw-bold">
                  {isNaN(total) ? "" : "$" + total}
                </p>
              </div>

              {localStorage.getItem("tokenuser") ? (
                askValue > 0 ? (
                  props.Data >= askValue ? (
                    <p>you are the lowest ask!</p>
                  ) : props.Data < askValue ? (
                    <p>you are not the lowest ask!</p>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : localStorage.getItem("admin") ? (
                askValue > 0 ? (
                  props.Data >= askValue ? (
                    <p>you are the lowest ask!</p>
                  ) : props.Data < askValue ? (
                    <p>you are not the lowest ask!</p>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div className="pb-2 mb-3">
                <p className="mb-0 text-capitalize border-bottom pb-2 mb-2">
                  {props.cardBrand} ending in {props.cardExpiry}
                </p>
                <p className="ms-auto mb-0">Payout Method:Active</p>
              </div>

              <div className="pb-2 mb-3 border rounded p-4">
                <h5 className="mb-4">Final checks</h5>

                <p className="d-flex align-items-center mb-0 pb-2 mb-2">
                  <input
                    className="me-2"
                    type="checkbox"
                    onChange={(e) => {
                      HandleFinalCheck(e.target.checked);
                    }}
                  />
                  My seekers are now,unwran with original,undamaged box
                </p>
                <hr />

                <p className="d-flex align-items-center mb-0 pb-2 mb-2">
                  <input
                    className="me-2"
                    type="checkbox"
                    onChange={(e) => {
                      HandleFinalcheck1(e.target.checked);
                    }}
                  />
                  I will ship within 2 business days of avoid penalties
                </p>
                <hr />
              </div>
            </div>
          )}

          <div className="d-flex align-items-center mt-5">
            {Show ? (
              ""
            ) : (
              <Button
                className="text-capitalize border rounded bg-transparent text-black"
                onClick={() => handleReviewAsk()}
              >
                back
              </Button>
            )}
            {Show ? (
              <Button
                className="text-capitalize ms-auto bg-dark text-white border-0"
                onClick={handleReviewAsk}
              >
                review ask
              </Button>
            ) : prams.buy != undefined || sellNowStatus ? (
              <Button
                className="text-capitalize ms-auto bg-dark text-white border-0"
                disabled={isLoading}
                onClick={() => hendleBid()}
              >
                {isLoading ? "Please Wait..." : "Place Order"}
              </Button>
            ) : (
              <Button
                disabled={isLoading}
                className="text-capitalize ms-auto bg-dark text-white border-0"
                onClick={() => hendleBid()}
              >
                {isLoading ? "Please wait..." : "Place Ask"}
              </Button>
            )}
          </div>

          {/* Start Login Model */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>
                <strong>
                  In order to buy and sell, you need to login/sign up
                </strong>
              </h6>
              <Login modal={() => setShowModal(false)} />
            </Modal.Body>
          </Modal>
          {/* End Login Model */}
        </div>
      )}
    </div>
  );
}
