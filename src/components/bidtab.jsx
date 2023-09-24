import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Sonnet from "../../src/components/sonnet";
import { toast } from "react-toastify";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import StripeElement from "./StripeElement";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function UncontrolledExample(props) {
  const prams = useParams();
  const navigate = useNavigate();
  const [Show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [value, setvalue] = useState(0);
  const [sales, setSales] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [total, setTotal] = useState(0);
  const [Finalchecks, setFinalchecks] = useState();
  const [Finalchecks1, setFinalchecks1] = useState();
  const [Finalchecks2, setFinalchecks2] = useState();
  const [FinalchecksError, setFinalchecksError] = useState(false);
  const [Finalchecks1Error, setFinalchecks1Error] = useState(false);
  const [Finalchecks1Error1, setFinalchecks1Error1] = useState(false);
  const [input, setInput] = useState(false);
  const [showCardModel, setShowCardModel] = useState(false);
  const [userAsk, setUserAsk] = useState(true);
  const [askAmount, setAskAmount] = useState();
  const [bidAmount, setBidAmount] = useState();
  const [shippingFee, setShippingFee] = useState();
  const [buyNowStatus, setBuyNowStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardBrand, setCardBrand] = useState("");
  const [fullPageLoader, setFullPageLoader] = useState(false);
  const [bidStatus, setBidStatus] = useState(false);

  // let shippingFeeFetched = false;
  //For the Place Order and place Bids for buy Products
  const hendleBid = () => {
    if (localStorage.getItem("tokenuser") || localStorage.getItem("admin")) {
      if (bidStatus) {
        if (props.Ask == undefined) {
          toast.error(
            "You cannot create bid because there is no ask for this product"
          );
        } else {
          toast.error("Your bid is higher than the lower Ask");
        }
      } else {
        setLoading(true);
        if (Finalchecks) {
          setFinalchecksError(false);
          if (Finalchecks1) {
            setFinalchecks1Error(false);
            if (Finalchecks2) {
              setFinalchecks1Error1(false);
              if (localStorage.getItem("tokenuser")) {
                setLoading(false);
                if (input) {
                  setLoading(false);
                } else {
                  let confirm = window.confirm(
                    "Are you sure you want to create order"
                  );
                  if (!confirm) {
                  } else {
                    handleUserAsk(
                      JSON.parse(localStorage.getItem("tokenuser")).id
                    );
                  }
                }
              } else if (localStorage.getItem("admin")) {
                setLoading(false);
                if (input) {
                  setLoading(false);
                } else {
                  let confirm = window.confirm(
                    "Are you sure you want to create order"
                  );
                  if (!confirm) {
                  } else {
                    handleUserAsk(JSON.parse(localStorage.getItem("admin")).id);
                  }
                }
              } else {
                setLoading(false);
                setShowModal(true);
              }
            } else {
              setLoading(false);
              setFinalchecks1Error1(true);
              toast.error(
                "Complete necessary checkboxes for seamless shopping"
              );
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
    } else {
      setLoading(false);
      setShowModal(true);
    }
  };

  //function for creating New Products
  //productId used for the productId
  //userId used for the UserId
  const handleCreateOrder = (productId, userId) => {
    setLoading(true);
    ExportApi.createOrder(productId, userId, total)
      .then((response) => {
        setLoading(false);
        navigate("/order");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function for creating 2nd Hand
  //ProductId used for the ProductId
  //UserId used for the userId
  //Value is the input value of the bid
  const handleCreateSecondHandOrder = (productId, userId, value) => {
    setLoading(true);
    ExportApi.CreateSecondHandOrder(productId, userId, value, "Buy")
      .then((resp) => {
        if (resp.data.message == "Order Created Successfully") {
          toast.error(resp.data.message);
          setLoading(false);
          navigate("/order");
        } else {
          setLoading(false);
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //For the Buy products API's
  //userId used for the userId
  const handleUserAsk = (userid) => {
    if (props.error) {
      toast.error(
        "Shipping Service not available Please Contact to Support Service"
      );
    } else {
      ExportApi.getSingleUserData(userid).then((resp) => {
        let data = resp.data.data;
        if (data?.shipping_address?.street != null) {
          ExportApi.getCardData(userid)
            .then((response) => {
              let data = response.data.data;
              setCardBrand(data.brand);
              setCardExpiry(data.lastFour);
              setFullPageLoader(false);
              if (data.brand) {
                if (prams.buy != undefined) {
                  if (props.type == 1) {
                    handleCreateOrder(prams.id, userid);
                  } else {
                    handleCreateSecondHandOrder(prams.id, userid, value);
                    setFullPageLoader(false);
                  }
                } else {
                  if (buyNowStatus) {
                    if (props.type == 1) {
                      handleCreateOrder(prams.id.userid);
                      // navigate("/order");
                    } else {
                      handleCreateSecondHandOrder(prams.id, userid, value);
                      setFullPageLoader(false);
                    }
                  } else {
                    setLoading(true);
                    let expiration = new Date();
                    ExportApi.Bid(
                      prams.id,
                      userid,
                      value,
                      total,
                      99,
                      processing,
                      sales,
                      expiration,
                      shippingFee
                    )
                      .then((resp) => {
                        if (resp.data.message == "Bid created successfully") {
                          window.dispatchEvent(new Event("List"));
                          toast.success("Bid created successfully");
                          setLoading(false);
                          setFullPageLoader(false);
                          // window.location.reload();
                        } else {
                          if (resp.data.message == "Please add card first") {
                            setShowCardModel(true);
                            setFullPageLoader(false);
                            setLoading(false);
                          } else {
                            toast.error("Bid is not created");
                            setFullPageLoader(false);
                            setLoading(false);
                          }
                        }
                      })
                      .catch((err) => console.log(err));
                  }
                }
              } else {
                if (localStorage.getItem("tokenuser")) {
                  toast.error("Add payment information to place an order");
                  // navigate("/stripeconnectaccount/" + userid);
                } else if (localStorage.getItem("admin")) {
                  toast.error("Please setup your payment detail");
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Please complete User information");
          // setPopup(true);
        }
      });
    }
  };

  // for the Back Button
  const handleback = () => {
    if (
      prams.buy == "buy4" ||
      prams.buy == "buy2" ||
      prams.buy == "buy3" ||
      prams.buy == "buy"
    ) {
      navigate(-1);
    } else {
      setShow(true);
    }
  };

  //for the input value in the bid
  //e used for the getting the input value of the bid
  const handlePlaceBidValue = (e) => {
    if (props.Ask == undefined) {
      setvalue(e.target.value);
      let salesValue = (e.target.value / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (e.target.value / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * e.target.value;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(e.target.value) +
        (e.target.value / 100) * 3 +
        Number(shipping) +
        (e.target.value / 100) * 9.5 +
        25;
      setTotal(totalNumber.toFixed(2));
      setInput(false);
      setBidStatus(true);
      return;
    } else if (Number(e.target.value) > props.Ask) {
      setvalue(e.target.value);
      let salesValue = (e.target.value / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (e.target.value / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * e.target.value;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(e.target.value) +
        (e.target.value / 100) * 3 +
        Number(shipping) +
        (e.target.value / 100) * 9.5 +
        25;
      setTotal(totalNumber.toFixed(2));
      setInput(false);
      setBidStatus(true);
      return;
      // toast.error('Your ask is not higher than the highest bid')
    } else if (Number(e.target.value) <= props.Bid) {
      setvalue(e.target.value);
      let salesValue = (e.target.value / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (e.target.value / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * e.target.value;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(e.target.value) +
        (e.target.value / 100) * 3 +
        Number(shipping) +
        (e.target.value / 100) * 9.5 +
        25;
      setShow(true);
      setTotal(totalNumber.toFixed(2));
      setInput(false);
      setBidStatus(false);
    } else {
      setInput(false);
      setvalue(e.target.value);
      let salesValue = (e.target.value / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (e.target.value / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * e.target.value;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(e.target.value) +
        (e.target.value / 100) * 3 +
        Number(shipping) +
        (e.target.value / 100) * 9.5 +
        25;
      setTotal(totalNumber.toFixed(2));
      setBidStatus(false);
    }
  };

  //Click on the Buy Now Button
  //price used for the ask
  const handleBuyNow = (price) => {
    setBuyNowStatus(true);
    if (price) {
      setvalue(price);
      let salesValue = (price / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (price / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * price;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      console.log(shippingCost);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);

      let totalNumber =
        Number(price) +
        (price / 100) * 3 +
        Number(shipping) +
        (price / 100) * 9.5 +
        25;
      setTotal(totalNumber.toFixed(2));
      setShow(false);
    } else {
      toast.error("You cannot Buy this Time! Please try again later");
    }
  };

  //get the bid list
  const HandleBid = () => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.getBidList(JSON.parse(localStorage.getItem("tokenuser")).id)
        .then((resp) => {
          let data = resp.data.data;
          let result = [];
          for (let index = 0; index < resp.data.data?.length; index++) {
            let obj = {};
            const element = resp.data.data[index];
            obj = { ...element, ...element.productId };
            result.push(obj);
          }
          let data2 = result?.filter((item) => item.productId._id == prams.id);
          if (data2.length > 0) {
            setBidAmount(data2[0].bidAmount);
          }
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  // for the back button in the Ask page
  const handleUserAsk1 = (show) => {
    if (prams.buy == "sell3" || prams.buy == "sell2" || prams.buy == "sell") {
      navigate(-1);
    } else {
      setUserAsk(show);
    }
  };

  //get the ask list
  const handleaskList = () => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.askList(JSON.parse(localStorage.getItem("tokenuser")).id)
        .then((resp) => {
          let data = resp.data.data;
          let result = [];
          for (let index = 0; index < resp.data.data?.length; index++) {
            let obj = {};
            const element = resp.data.data[index];
            obj = { ...element, ...element.productId };
            result.push(obj);
          }
          let data2 = result?.filter((item) => item.productId._id == prams.id);
          if (data2.length > 0) {
            setAskAmount(data2[0].askAmount);
          }
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  //get the card Data
  const handleCardData = (id) => {
    ExportApi.getCardData(id)
      .then((resp) => {
        let data = resp.data.data;
        setCardBrand(data.brand);
        setCardExpiry(data.exp_year);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectToAnotherPage = (id) => {
    navigate(`/profile/${id}`);
  };
  //start validation for the checkbox
  const handleFinalCheck = (value) => {
    if (value) {
      setFinalchecks(true);
      setFinalchecksError(false);
    } else {
      setFinalchecks(false);
      setFinalchecksError(true);
    }
  };
  const handleFinalCheck1 = (value) => {
    if (value) {
      setFinalchecks1(true);
      setFinalchecks1Error(false);
    } else {
      setFinalchecks1(false);
      setFinalchecks1Error(true);
    }
  };

  const handleFinalCheck2 = (value) => {
    if (value) {
      setFinalchecks2(true);
      setFinalchecks1Error1(false);
    } else {
      setFinalchecks2(false);
      setFinalchecks1Error1(true);
    }
  };

  useEffect(() => {}, [sales, processing]);

  useEffect(() => {
    handleaskList();
    HandleBid();
    if (localStorage.getItem("tokenuser")) {
      handleCardData(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      handleCardData(JSON.parse(localStorage.getItem("admin")).id);
    } else {
    }
  }, [HandleBid]);

  useEffect(() => {
    if (prams.buy === "buy") {
      if (props.Ask) {
        let salesValue = (props.Ask / 100) * 9.5;
        let processingValue = (props.Ask / 100) * 3;
        let shippingCost = Number(0.5 / 100) * props.Ask;
        let fee = Math.floor(shippingCost);
        let sf = Number(props.shippingFee);
        let shipping = (fee + sf)?.toFixed(2);
        let totalNumber =
          Number(props.Ask) +
          (props.Ask / 100) * 3 +
          Number(shipping) +
          (props.Ask / 100) * 9.5 +
          25;
        setvalue(props.Ask);
        setSales(salesValue.toFixed(2));
        setProcessing(processingValue.toFixed(2));
        setShippingFee(shipping);
        setTotal(totalNumber.toFixed(2));
        setShow(false);
      } else if (props.second) {
        let salesValue = (props.second / 100) * 9.5;
        let processingValue = (props.second / 100) * 3;
        let shippingCost = Number(0.5 / 100) * props.second;
        let fee = Math.floor(shippingCost);
        let sf = Number(props.shippingFee);
        let shipping = (fee + sf)?.toFixed(2);
        let totalNumber =
          Number(props.second) +
          (props.second / 100) * 3 +
          Number(shipping) +
          (props.second / 100) * 9.5 +
          25;
        setvalue(props.second);
        setSales(salesValue.toFixed(2));
        setProcessing(processingValue.toFixed(2));
        setShippingFee(shipping);
        setTotal(totalNumber.toFixed(2));
        setShow(false);
      }
    }

    if (prams.buy === "buy2") {
      let salesValue = (props.website / 100) * 9.5;
      let processingValue = (props.website / 100) * 3;
      let shippingCost = Number(0.5 / 100) * props.website;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      let total =
        Number(props.website) +
        (props.website / 100) * 3 +
        (props.website / 100) * 9.5 +
        25;
      let finalTotal = total + Number(shipping);
      setvalue(props.website);
      setSales(salesValue.toFixed(2));
      setProcessing(processingValue.toFixed(2));
      setShippingFee(shipping);
      setTotal(finalTotal);
      setShow(false);
    } else if (prams.buy === "buy3" || prams.buy === "buy4") {
      setvalue(props.Ask);
      let salesValue = (props.Ask / 100) * 9.5;
      setSales(salesValue.toFixed(2));
      let processingValue = (props.Ask / 100) * 3;
      setProcessing(processingValue.toFixed(2));
      let shippingCost = Number(0.5 / 100) * props.Ask;
      let fee = Math.floor(shippingCost);
      let sf = Number(props.shippingFee);
      let shipping = (fee + sf)?.toFixed(2);
      setShippingFee(shipping);
      let totalNumber =
        Number(props.Ask) +
        (props.Ask / 100) * 3 +
        Number(shipping) +
        (props.Ask / 100) * 9.5 +
        25;
      setTotal(totalNumber.toFixed(2));
      setShow(false);
    }
  }, [props, props.prams]);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(false);
        if (localStorage.getItem("tokenuser")) {
          redirectToAnotherPage(
            JSON.parse(localStorage.getItem("tokenuser")).id
          );
        } else if (localStorage.getItem("admin")) {
          redirectToAnotherPage(JSON.parse(localStorage.getItem("admin")).id);
        } else {
        }
      }, 2000); // Specify the duration in milliseconds (2 seconds in this example)

      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <>
      {fullPageLoader ? (
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : (
        <Tabs
          // onSelect={handleTabChange}
          defaultActiveKey={
            prams.buy == "buy" ||
            prams.buy == "buy2" ||
            prams.buy == "buy3" ||
            prams.buy == "buy4"
              ? "profile"
              : "home"
          }
          id="uncontrolled-tab-example"
          className="mb-3"
          hidden={
            prams.buy == "buy" ||
            prams.buy == "buy2" ||
            prams.buy == "buy3" ||
            prams.buy == "buy4" ||
            prams.buy == "sell2" ||
            prams.buy == "sell3" ||
            prams.buy == "sell" ||
            Show == false ||
            userAsk == false
              ? true
              : false
          }
        >
          <Tab eventKey="home" title="Place Ask">
            <Sonnet
              Data={props.Ask}
              Data2={props.Bid}
              Data3={props.secondBid}
              Data4={askAmount}
              Data5={props.usedBid}
              Data6={props.type}
              Data7={props.website}
              handleUserAsk1={handleUserAsk1}
              shipping={props.shippingFee}
              cardExpiry={cardExpiry}
              cardBrand={cardBrand}
              error={props.error}
            />
          </Tab>
          <Tab
            eventKey="profile"
            title="Place Bid"
            className="place-bid-active"
          >
            <div>
              {Show ? (
                <>
                  {props?.Bid ? (
                    <p className="d-flex justify-content-end">
                      Highest Bid: ${props?.Bid}
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="d-flex border rounded p-2">
                    <div className="quantity-custom">
                      <InputGroup className="mb-3">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="bg-none border-end-0 text-dark"
                        >
                          $
                        </InputGroup.Text>
                        <Form.Control
                          value={value}
                          onChange={(e) => {
                            handlePlaceBidValue(e);
                          }}
                          placeholder=""
                          type="number"
                          className="border-start-0"
                          aria-label="number"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </div>

                    <div className="ms-auto customsell-btn">
                      {props.Ask ? (
                        <Button
                          className="sell-btn border-0 buy-button ms-2"
                          onClick={() => handleBuyNow(props.Ask)}
                        >
                          Buy Now for ${props.Ask}
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* Start Commented Code for the sell Now Button */}
                    {/* <div className="ms-auto customsell-btn">
                  {props.Ask ? (
                    <Button
                      className="sell-btn border-0 buy-button ms-2"
                      onClick={() => handleBuyNow(props.Ask)}
                    >
                      Buy Now for ${props.Ask}
                    </Button>
                  ) : props.type == 2 ? (
                    props.second > 0 ? (
                      <Button
                        className="sell-btn border-0 buy-button ms-2"
                        onClick={() => handleBuyNow(props.second)}
                      >
                        Buy Now for ${props.second}
                      </Button>
                    ) : (
                      ""
                    )
                  ) : props.type == 3 ? (
                    props.used > 0 ? (
                      <Button
                        className="sell-btn border-0 buy-button ms-2"
                        onClick={() => handleBuyNow(props.used)}
                      >
                        Buy Now for ${props.used}
                      </Button>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div> */}
                    {/* End Commented Code for the Sell Now Button */}
                  </div>
                  {localStorage.getItem("tokenuser") ? (
                    value > 0 ? (
                      props?.Bid <= value ? (
                        <h2 className="text-capitalize text-center fs-4 my-4">
                          you are the highest bid!
                        </h2>
                      ) : props?.Bid > value ? (
                        <h2 className="text-capitalize text-center fs-4 my-4">
                          you are not the highest bid!
                        </h2>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : value > 0 ? (
                    props?.Bid <= value ? (
                      <h2 className="text-capitalize text-center fs-4 my-4">
                        you are the highest bid!
                      </h2>
                    ) : props?.Bid > value ? (
                      <h2 className="text-capitalize text-center fs-4 my-4">
                        you are not the highest bid!
                      </h2>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Your Purchase Price</p>
                    <p className="ms-auto mb-0">${value}</p>
                  </div>

                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Testing Fees</p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0">$0</p>
                    ) : (
                      <p className="ms-auto mb-0">$25.00</p>
                    )}
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Sales Tax</p>
                    {
                      localStorage.getItem('admin') ? 
                      <p className="ms-auto mb-0">$0</p>:<p className="ms-auto mb-0">${sales}</p>
                    }
                  </div>

                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">
                      Processing Fee &nbsp;
                      <ReactTooltip
                        anchorId="order_bid"
                        place="bottom"
                        content="Processing Fee"
                      />
                      <svg
                        id="order_bid"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-question-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                      </svg>
                    </p>
                    {
                      localStorage.getItem('admin') ? 
                      <p className="ms-auto mb-0">$0</p>:<p className="ms-auto mb-0">${processing}</p>
                    }
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Shipping</p>
                    {
                      localStorage.getItem('admin') ? 
                      <p className="ms-auto mb-0">
                     $0
                    </p>: <p className="ms-auto mb-0">
                      {isNaN(shippingFee) ? "TBD" : "$" + shippingFee}
                    </p>
                    }
                   
                  </div>

                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Total</p>
                    {
                      localStorage.getItem('admin') ? 
                      <p className="ms-auto mb-0">
                      {"$" + value}
                    </p>:<p className="ms-auto mb-0">
                      {isNaN(total) ? "" : "$" + total}
                    </p>
                    }
                    
                  </div>
                  <p>
                    "Including duties,taxes and fees based on buyer and server
                    <br /> location
                  </p>
                  <div className="border rounded p-2 ask-main">
                    <div className="ask-expiration d-flex">
                      <p className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-card me-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                        </svg>
                        {cardBrand ? cardBrand : ""} Ending in{" "}
                        {cardExpiry ? cardExpiry : ""}
                      </p>
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
                    </div>
                  </div>
                </>
              ) : (
                <div className="review-part">
                  {prams.buy != undefined ? (
                    <h2 className="text-capitalize text-center fs-4 mt-4 mb-2">
                      review Order
                    </h2>
                  ) : (
                    <h2 className="text-capitalize text-center fs-4 mt-4 mb-2">
                      review Bid
                    </h2>
                  )}
                  <p className="text-center">
                    Please confirm your Purchase details below
                  </p>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0 text-capitalize">your Purchase price</p>
                    <p className="ms-auto mb-0">
                      {isNaN(value) ? "TBD" : "$" + value}
                    </p>
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0 text-capitalize">Sales Tax</p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0">$0</p>
                    ) : (
                      <p className="ms-auto mb-0">
                        {isNaN(sales) ? "TBD" : "$" + sales}
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0">Testing Fees</p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0">$0</p>
                    ) : (
                      <p className="ms-auto mb-0">$25.00</p>
                    )}
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0 text-capitalize">
                      Processing Fee &nbsp;
                      <ReactTooltip
                        anchorId="order_bid"
                        place="bottom"
                        content="Processing Fee"
                      />
                      <svg
                        id="order_bid"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-question-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                      </svg>
                    </p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0">$0</p>
                    ) : (
                      <p className="ms-auto mb-0">${processing}</p>
                    )}
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0 text-capitalize">shipping</p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0">$0</p>
                    ) : (
                      <p className="ms-auto mb-0">
                        {isNaN(shippingFee) ? "TBD" : "$" + shippingFee}
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center  border-bottom pb-2 mb-3">
                    <p className="mb-0 text-capitalize">Total(incl. tax.)</p>
                    {localStorage.getItem("admin") ? (
                      <p className="ms-auto mb-0 fw-bold">
                        {isNaN(value) ? "TBD" : "$" + value}
                      </p>
                    ) : (
                      <p className="ms-auto mb-0 fw-bold">
                        {isNaN(total) ? "TBD" : "$" + total}
                      </p>
                    )}
                  </div>
                  "Including duties,taxes and fees based on buyer and server
                  location
                  <div className="pb-2 mt-3 mb-3">
                    <p className="mb-0 text-capitalize border-bottom pb-2 mb-2">
                      {cardBrand ? cardBrand : ""} Ending in{" "}
                      {cardExpiry ? cardExpiry : ""}
                    </p>
                    <p className="ms-auto mb-0">Payout Method:Active</p>
                  </div>
                  <div className="pb-2 mt-3 mb-3 border rounded p-4">
                    <h5 className="mb-4">Final checks</h5>
                    <p className="d-flex align-items-center mb-0 text-capitalize pb-2 mb-2">
                      <input
                        className="me-2"
                        type="checkbox"
                        onChange={(e) => {
                          handleFinalCheck(e.target.checked);
                        }}
                      />
                      Brand Name
                    </p>
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {/* {!FinalchecksError ? "" : "Complete necessary checkboxes for seamless shopping"} */}
                    </p>
                    <hr />
                    <p className="d-flex align-items-center mb-0 text-capitalize pb-2 mb-2">
                      <input
                        className="me-2"
                        type="checkbox"
                        onChange={(e) => {
                          handleFinalCheck1(e.target.checked);
                        }}
                      />
                      StockX Verified
                    </p>
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {/* {!Finalchecks1Error ? "" : "Complete necessary checkboxes for seamless shopping"} */}
                    </p>
                    <hr />

                    <p className="d-flex align-items-center mb-0 text-capitalize  pb-2 mb-2">
                      <input
                        className="me-2"
                        type="checkbox"
                        onChange={(e) => {
                          handleFinalCheck2(e.target.checked);
                        }}
                      />
                      I acknowledge that the products I am about to purchase
                      will be unsealed and examined for authenticity
                    </p>
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {/* {!Finalchecks1Error1 ? "" : "Complete necessary checkboxes for seamless shopping"} */}
                    </p>
                  </div>
                </div>
              )}

              <div className="d-flex align-items-center mt-5">
                {Show ? (
                  ""
                ) : (
                  <Button
                    className="text-capitalize border rounded bg-transparent text-black"
                    onClick={() => handleback()}
                  >
                    back
                  </Button>
                )}
                {shippingFee == undefined ? (
                  ""
                ) : Show ? (
                  <Button
                    className="text-capitalize ms-auto bg-dark text-white border-0"
                    onClick={() => setShow(false)}
                    disabled={value > 0 ? false : true}
                  >
                    review Bid
                  </Button>
                ) : prams.buy != undefined || buyNowStatus ? (
                  <Button
                    className="text-capitalize ms-auto bg-dark text-white border-0"
                    disabled={isLoading}
                    onClick={() => hendleBid()}
                  >
                    {isLoading ? "Please Wait..." : "Place Order"}
                  </Button>
                ) : (
                  <Button
                    className="text-capitalize ms-auto bg-dark text-white border-0"
                    disabled={isLoading}
                    onClick={() => hendleBid()}
                  >
                    {isLoading ? "Please Wait..." : "Place Bid"}
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

              {/* Start Card Model */}
              <Modal
                show={showCardModel}
                onHide={() => setShowCardModel(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Card Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {localStorage.getItem("tokenuser") ? (
                    <StripeElement
                      id={
                        JSON.parse(localStorage.getItem("tokenuser")).id
                          ? JSON.parse(localStorage.getItem("tokenuser")).id
                          : ""
                      }
                      modalClose={() => setShowCardModel(false)}
                    />
                  ) : localStorage.getItem("admin") ? (
                    <StripeElement
                      id={
                        JSON.parse(localStorage.getItem("admin")).id
                          ? JSON.parse(localStorage.getItem("admin")).id
                          : ""
                      }
                      modalClose={() => setShowCardModel(false)}
                    />
                  ) : (
                    ""
                  )}
                </Modal.Body>
              </Modal>

              <Modal
                show={popup}
                onHide={() => setPopup(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Address Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>please fill your address first</Modal.Body>
              </Modal>
            </div>
          </Tab>
        </Tabs>
      )}
    </>
  );
}

export default UncontrolledExample;
