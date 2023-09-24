import React, { useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  Row,
  Table,
  Modal,
  Nav,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import ExportApi from "../../api/ExportApi";
import { toast,ToastContainer } from "react-toastify";
import { jsPDF } from 'jspdf';
export default function OrderDetail() {
  let imageUrl = "https://api.skewws.com/resources/";
  let navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const [hide, setHide] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [orderId, setOrderId] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [image, setImage] = useState([]);
  const [productName, setProductName] = useState();
  const [type, setType] = useState();
  const [sku, setSku] = useState();
  const [date, setDate] = useState();
  const [subTotal, setSubTotal] = useState();
  const [shippingFee, setShippingFee] = useState();
  const [total, setTotal] = useState();
  const [tax, setTax] = useState();
  const [buyerName, setBuyerName] = useState();
  const [buyerEmail, setBuyerEmail] = useState();
  const [validBuyerEmail, setValidBuyerEmail] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerEmail, setSellerEmail] = useState();
  const [billingAddress, setBillingAddress] = useState();
  const [sellerShippingAddress, setSellerShippingAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [phone, setPhone] = useState();
  const [sellerPhone, setSellerPhone] = useState();
  const [processingFee, setProcessingFee] = useState();
  const [sellerProcessingFee, setSellerProcessingFee] = useState();
  const [sellerShippingFee, setSellerShippingFee] = useState();
  const [sellerTotalDue, setSellerTotalDue] = useState();
  const [sellerFee, setSellerFee] = useState();
  const [sellerBillingCity, setSellerBillingCity] = useState();
  const [sellerBillingCountry, setSellerBillingCountry] = useState();
  const [sellerBillingState, setSellerBillingState] = useState();
  const [sellerShippingCity, setSellerShippingCity] = useState();
  const [sellerShippingCountry, setSellerShippingCountry] = useState();
  const [sellerShippingState, setSellerShippingState] = useState();
  const [comment, setComment] = useState();
  const [authentication, setAuthentication] = useState(true);
  const [reason, setReason] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState();
  const [authenticationStatus, setAuthenticationStatus] = useState()
  const [sellerShippingZipCode, setSellerShippingZipCode] = useState()
  const [totalMargin, setTotalMargin] = useState()
  const [trackingDetails, setTrackingDetails] = useState()
  const [emojiStatus, setEmojiStatus] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [showBuyerEmailModel, setShowBuyerEmailModel] = useState(false)
  const[sellerPaymentStatus,setSellerPaymentStatus] = useState()
  //Buyer
  const [buyerShippingAddress, setBuyerShippingAddress] = useState();
  const [buyerBillingAddress, setBuyerBillingAddress] = useState();
  const [buyerCity, setBuyerCity] = useState();
  const [buyerCountry, setBuyerCountry] = useState();
  const [buyerState, setBuyerState] = useState();
  const [buyerBillingCity, setBuyerBillingCity] = useState();
  const [buyerBillingCountry, setBuyerBillingCountry] = useState();
  const [buyerBillingState, setBuyerBillingState] = useState();
  const [buyerZipCode, setBuyerZipCode] = useState();
  const [buyerPhone, setBuyerPhone] = useState();
  const [orderCreateDate, setOrderCreateDate] = useState()

  //Authentication
  const [visualInspection, setVisualInspection] = useState(false);
  const [acousticInspection, setAcousticInspection] = useState(false);
  const [benchMark, setBenchMark] = useState(false);
  const [attachment, setAttachment] = useState(false);
  const [waiveFee, setWaiveFee] = useState(false);
  const [chargeId, setChargeId] = useState()
  const [createShipmentStatus, setCreateShipmentStatus] = useState('pass')
  const [buttonLoader, setButtonLoader] = useState(false)
  const [buttonFailLoader, setButtonFailLoader] = useState(false)
  const [fromStreet, setFromStreet] = useState()
  const [fromCity, setFromCity] = useState()
  const [fromState, setFromState] = useState()
  const [fromPhone, setFromPhone] = useState()
  const [fromZipCode, setFromZipCode] = useState()
  const [toStreet, setToStreet] = useState()
  const [toCity, setToCity] = useState()
  const [toState, setToState] = useState()
  const [toPhone, setToPhone] = useState()
  const [toZipCode, setToZipCode] = useState()
  const [validStreet, setValidStreet] = useState()
  const [validCity, setValidCity] = useState()
  const [validState, setValidState] = useState()
  const [validPhone, setValidPhone] = useState()
  const [validZipCode, setValidZipCode] = useState()
  const [returnStreet, setReturnStreet] = useState()
  const [returnCity, setReturnCity] = useState()
  const [returnState, setReturnState] = useState()
  const [returnPhone, setReturnPhone] = useState()
  const [returnZipCode, setReturnZipCode] = useState()
  const [length, setLength] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [width, setWidth] = useState()
  const [shipmentId, setShipmentId] = useState()
  const [paymentOptions, setPaymentOptions] = useState([])
  const [products1, setproducts1] = useState()
  const [productLength, setProductLength] = useState()
  const [previosButtonStatus, setPreviousButtonStatus] = useState(false)
  const [nextButtonStatus, setNextButtonStatus] = useState(false)
  const [authenticationOrderStatus, setAuthenticationOrderStatus] = useState(false)
  const [shipmentCreateStatus, setShipmentCreateStatus] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showModalLoader, setShowModalLoader] = useState(false)
  const [showCreatePrintLabelLoader, setShowCreatePrintLabelLoader] = useState(false)
  const [returnOrder, setReturnOrder] = useState(false)
  const [message, setMessage] = useState(false)
  const [buyerId, setBuyerId] = useState()
  const[addressButtonLoader,setAddressButtonLoader] = useState(false)
  const [showShipingAddressModel, setShowShipingAddressModel] = useState(false)
  const hideData = (data) => {
    setHide(data);
  };

  //handle checkbox for the UPS services
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value === selectedOption ? '' : value);
  };

  // Start handle Authentication 
  const handleAuthentication = (status, index, data) => {
    if (data == "visual") {
      if (status) {
        reason.splice(index, 0, "Visual Authentication");
        setReason([...reason]);
      } else {
        reason.splice(index, 1);
        setReason([...reason]);
      }
    } else if (data == "Acoustic") {
      if (status) {
        reason.splice(index, 0, "Acoustic Authentication");
        setReason([...reason]);
      } else {
        reason.splice(index, 1);
        setReason([...reason]);
      }
    } else if (data == "benchmark") {
      if (status) {
        reason.splice(index, 0, "benchmark");
        setReason([...reason]);
      } else {
        reason.splice(index, 1);
        setReason([...reason]);
      }
    } else if (data == "attachment") {
      if (status) {
        reason.splice(index, 0, "attachment");
        setReason([...reason]);
      } else {
        reason.splice(index, 1);
        setReason([...reason]);
      }
    }
  };

  //handle Fail Authentication
  const handleFailAuthentication = () => {
    setButtonFailLoader(true)
    // setShowLoader(true)
    ExportApi.FailAuthentication(reason, comment, waiveFee, "fail", params.id)
      .then((resp) => {
        if (resp.data.message == "not  authenticated") {
          setAuthentication(false)
          toast.error(resp.data.message)
          setShow(false);
          setCreateShipmentStatus('fail')
          setAuthenticationOrderStatus(true)
          setButtonFailLoader(false)
          // setShowLoader(false)
          handleDownloadReturnPdf()
          getHandleSingleOrderData()
          window.open(resp.data.Data.postage_label.label_url,'_blank');
        } else {
          console.log(resp.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        // window.dispatchEvent(new Event("Loginout"));
      });
  };

  // window.addEventListener("Loginout", () => {
  //   localStorage.clear();
  //   navigate("/");
  // });
  //handle Pass Authentication

  //download pdf for return order
  const handleDownloadReturnPdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const tableContent = document.getElementById('returnn').innerHTML;
    doc.html(tableContent, {
      callback: () => {
        doc.save('Return.pdf');
      },
    });
  }

  // start Handle Pass Authentication
  const handlePassAuthentication = () => {
    setButtonLoader(true)
    // setShowLoader(true)
    ExportApi.PassAuthentication(
      reason,
      comment,
      waiveFee,
      "pass",
      "Ready For Shipment",
      "Sale Complete",
      params.id
    )
      .then((resp) => {
        if(resp.data.message == "shippment authenticated"){
          setAuthentication(true)
          toast.success(resp.data.message)
          setCreateShipmentStatus('pass')
          setAuthenticationOrderStatus(true)
          setShow(false);
          setButtonLoader(false);
          // setShowLoader(false)
          getHandleSingleOrderData()
        }else{
          toast.success(resp.data.message)
          setButtonLoader(false);
          // setShowLoader(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  // Start Handle Order Tarcking
  const handleOrderTracking = () => {
    ExportApi.getOrderTracking(params.id).then((resp) => {
      let data = resp.data.Data
      setTrackingDetails(data)
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }


  // Start handle Order Data
  const getHandleSingleOrderData = () => {
    ExportApi.getSingleOrderData(params.id)
      .then((resp) => {
        let data = resp.data.Data;
        console.log('Single Order Data', data)
        setOrderId(data._id);
        let status = data.deliveryStatusId.deliveryStatus.length;
        let index = status - 1;
        setOrderStatus(data?.deliveryStatusId?.deliveryStatus?.status);
        setImage(data?.productId?.image[0]);
        setProductName(data?.productId?.productname);
        setType(data?.productId?.type);
        setSku(data?.productId?.sku);
        setDate(data?.createdAt);
        setTotal(data?.bidId?.subTotal);
        setSubTotal(data?.bidId?.bidAmount);
        setShippingFee(data?.bidId?.shippingFee);
        setTax(data?.bidId?.salesTax);
        setProcessingFee(data?.bidId?.processingFee);
        setBuyerName(data?.buyerId?.firstname);
        setBuyerId(data?.buyerId?._id)
        setSellerName(data?.sellerId?.firstname);
        setBuyerEmail(data?.buyerId?.email);
        setSellerEmail(data?.sellerId?.email);
        setSellerProcessingFee(data?.askId?.processingFee);
        setSellerShippingFee(data?.askId?.shippingFee);
        setBuyerShippingAddress(data?.shipping_address?.street);
        setValidStreet(data?.shipping_address?.street)
        setSellerTotalDue(data?.askId?.subTotal);
        setSellerFee(data?.askId?.transactionFee);
        setBuyerCity(data?.shipping_address?.city);
        setValidCity(data?.shipping_address?.city)
        setBuyerCountry(data.buyerId.shipping_address.country);
        setBuyerState(data?.shipping_address?.state);
        setValidState(data?.shipping_address?.state)
        setSellerShippingCity(data.sellerId.shipping_address.city);
        setSellerShippingState(data.sellerId.shipping_address.state);
        setBuyerZipCode(data?.shipping_address?.postal_code);
        setValidZipCode(data?.shipping_address?.postal_code)
        setBillingAddress(data?.sellerId?.billing_address?.street);
        setSellerShippingAddress(data.sellerId.shipping_address.street);
        setSellerShippingCountry(data.sellerId.shipping_address.country);
        setSellerBillingCountry(data?.sellerId?.billing_address?.country);
        setPhone(data.buyerId.phone);
        setSellerPhone(data.sellerId.phone);
        setPaymentStatus(data.payment_details.status);
        setSellerShippingZipCode(data.sellerId.shipping_address.postal_code)
        setTotalMargin(data.bidId.subTotal - data.askId.subTotal)
        setBuyerBillingAddress(data?.buyerId?.billing_address?.street);
        setBuyerBillingCity(data?.buyerId?.billing_address?.city);
        setBuyerBillingCountry(data?.buyerId?.billing_address?.country);
        setBuyerBillingState(data?.buyerId?.billing_address?.state);
        setSellerBillingCity(data?.sellerId?.billing_address?.city);
        setSellerBillingState(data?.sellerId?.billing_address?.state);
        setChargeId(data?.bidId?.chargeId)
        setSellerPaymentStatus(data?.payment_transfer_to_seller)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // start Handle Shipping Label
  const handleShippingLabel = () => {
    // if (selectedOption == "" || selectedOption == null) {
    //   toast.error("Please select shipping option")
    // } else {
    ExportApi.updateShippingStatus(params.id, shipmentId, selectedOption, "Shipped Out")
      .then((resp) => {
        if (resp.data.message == "Buy shipment successfully") {
          toast.success(resp.data.message)
          setShow1(false);
          setShipmentCreateStatus(true)
          DownloadPdf()
          window.open(resp.data.Data.postage_label.label_url,'_blank');
        }else{
          toast.error(resp.data.message)
          setShow1(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  // Start Handle Shipping Fail Label
  // const handleShippingFailLabel = () => {
  //   ExportApi.updateShippingStatus(params.id, "Return ")
  //     .then((resp) => {
  //       setShow1(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //End Handle Shipping Fail Label

  // const handleauthenticatestatus = () => {
  //   ExportApi.getAuthenticateStatus(params.id).then((resp) => {
  //     let data = resp.data.Data;
  //     // setAuthenticationStatus(data?.authStatus[0]?.status)
  //     setLoading(false)
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  //Handle Place with new Buyer
  const handlePlaceBuyerWithNewSeller = () => {
    setShowLoader(true)
    ExportApi.handlewithnewseller(params.id).then((resp) => {
      if (resp.data.message == "new seller assigned successfully") {
        toast.success(resp.data.message)
        setShowLoader(false);
      } else {
        toast.error(resp.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  //handle to initiate refund request
  const handleRefund = () => {
    setShowLoader(true)
    ExportApi.handlebuyerRefund(chargeId).then((resp) => {
      if (resp.data.message == "Payment Send Successfully") {
        toast.success(resp.data.message)
        setShowLoader(false)
      } else {
        let message = `Charge ${chargeId} has already been refunded`
        if (resp.data.message == message) {
          setMessage(true)
          toast.error(resp.data.message)
          setShowLoader(false)
        } else {
          setMessage(false)
          setShowLoader(false)
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //get the order data
  const handleOrderPagination = () => {
    ExportApi.getOrderPaginationData()
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data);
        setProductLength(data?.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //craete shipping label data
  const handleCreateShippingLabel = () => {
    handleShow1()
    setShowModalLoader(true)
    setShowCreatePrintLabelLoader(true)
    ExportApi.getCreateLabelData(params.id).then((resp) => {
      if (resp.data.message == "Label created sucessfully") {
        let data = resp.data.Data
        console.log('Print Ship Label Data',data)
        let rateId = data?.rates.filter(item => item.service == "Ground")
        setFromStreet(data?.from_address?.street1)
        setFromCity(data?.from_address?.city)
        setFromState(data?.from_address?.state)
        setFromZipCode(data?.from_address?.zip)
        setFromPhone(data?.from_address?.phone)
        setToStreet(data?.to_address?.street1)
        setToCity(data?.to_address?.city)
        setToState(data?.to_address?.state)
        setToZipCode(data?.to_address?.zip)
        setToPhone(data?.to_address?.phone)
        setValidStreet(data?.to_address?.street1)
        setValidCity(data?.to_address?.city)
        setValidState(data?.to_address?.state)
        setValidZipCode(data?.to_address?.zip)
        setValidPhone(data?.to_address?.phone)
        setReturnStreet(data?.return_address?.street1)
        setReturnCity(data?.return_address?.city)
        setReturnState(data?.return_address?.state)
        setReturnZipCode(data?.return_address?.zip)
        setReturnPhone(data?.return_address?.phone)
        setLength(data?.parcel?.length)
        setHeight(data?.parcel?.height)
        setWeight(data?.parcel?.weight)
        setWidth(data?.parcel?.width)
        setPaymentOptions(data?.rates)
        setShipmentId(data?.id)
        setSelectedOption(rateId[0].id)
        setOrderCreateDate(data?.created_at)
        setReturnOrder(data?.is_return)
        setShowModalLoader(false)
        setShowCreatePrintLabelLoader(false)
      } else {
        toast.error(resp.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  // console.log(fromZipCode)

  //update the shipping address
  const handleUpdateShippingAddress = () => {
   
    if (
      validStreet.trim() === "" ||
      validCity.trim() === "" ||
      validState.trim() === "" ||
      validZipCode.trim() === ""
    ) {
      toast.error("Address fields cannot be empty or contain only spaces");
      return;
    }
    if (validZipCode && validZipCode.length !== 5) {
      toast.error('Postal Code must be exactly 5 digits');
      return;
    }
    setAddressButtonLoader(true)
    ExportApi.updateOrderShippingAddress(params.id,validStreet,validCity,validState,validZipCode).then((resp) => {
      if(resp.data.Message == "Order Updated Successfully"){
        toast.success(resp.data.Message)
        setShowShipingAddressModel(false)
        setAddressButtonLoader(false)
      }else{
        toast.error(resp.data.Message)
        setShowShipingAddressModel(false)
        setAddressButtonLoader(false)
      }
    })
  }

  //update Buyer Email Address
  const handleEmail = (value) => {
    setValidBuyerEmail(value)
    setIsValidEmail(true);
  }

  //validate the email
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdateEmail = () => {
    if (validBuyerEmail == "" || validBuyerEmail == null) {
      toast.error('Please Enter Email')
    }
    else if (!validateEmail(email)) {
      toast.error('Please Enter Valid Email');
      setLoading(false)
    } else {
      ExportApi.updateEmail(params.id, email).then((resp) => {
        if (resp.data.message == "Data updated sucessfully") {
          toast.success('Email Updated Successfully')
          setShowUserModal(false)
          setBuyerEmail(resp.data.result.email)
        } else {
          toast.error(resp.data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  //to get the previous order
  const handlePreviousOrder = () => {
    setShowLoader(true)
    let index = Math.random() * productLength
    let ProperNumber;
    if (index < 1) {
      ProperNumber = Math.floor(0)
    } else {
      ProperNumber = Math.floor(index - 1)
    }
    let number = products1[ProperNumber]
    let id = number?._id
    navigate("/OrderDetail/" + id)
    setTimeout(() => {
      setShowLoader(false)
    }, 1000)
  }

  //download the pdf for order
  const DownloadPdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const tableContent = document.getElementById('werkk').innerHTML;
    doc.html(tableContent, {
      callback: () => {
        doc.save('Product.pdf');
      },
    });
  };

  //to get the next order
  const handleNextOrder = () => {
    setShowLoader(true)
    let index = Math.random() * productLength
    let ProperNumber;
    if (index < 1) {
      ProperNumber = Math.floor(0)
    } else {
      ProperNumber = Math.floor(index - 1)
    }
    let number = products1[ProperNumber]
    let id = number?._id
    navigate("/OrderDetail/" + id)
    setTimeout(() => {
      setShowLoader(false)
    }, 1000)
  }

  useEffect(() => {
    // handleauthenticatestatus()
    handleOrderTracking()
    handleOrderPagination()
  }, []);

  useEffect(() => {
    getHandleSingleOrderData();
  }, [params.id])

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

  return (
    <div>
      <ToastContainer />
      {/* <button onClick={DownloadPdf}>Download</button> */}
      <div id="werkk" style={{ display: 'none' }}>
        <div className="pdf-content" >
          <div className="pdf-header">
            <span>SKEWWS</span>
          </div>
          <hr />
          <div className="center-text m-30 order-condition">
            <h2>Order: {params.id}</h2>
            <p>{productName}</p>
            <span>Condition: {type == 1 ? "New" : type == 2 ? "2nd Hand" : "Used"}</span>
            <span>SKU: {sku}</span>
          </div>
          <hr />
          <div className="m-30 shipping-instruction center-text">
            <h4>Congratulations on your purchase!</h4>
            <p>This GPU has passed our stringent inspection requirements, testing requirements, and has been verified to meet our quality standards.</p>
            <input type="checkbox" id="vehicle1" name="benchmark passed" value="" checked />
            <label for="benchmark passed"> Benchmark Passed</label><br />
            <input type="checkbox" id="vehicle2" name="inspection passed" value="" checked />
            <label for="inspection passed"> Inspection Passed</label>
          </div>
        </div>
      </div>


      <div id="returnn" style={{ display: 'none' }}>
        <div className="pdf-content" >
          <div className="pdf-header">
            <span>SKEWWS</span>
          </div>
          <hr />
          <div className="center-text m-30 order-condition">
            <h2>Order: {params.id}</h2>
            <p>{productName}</p>
            <span>Condition:  {type == 1 ? "New" : type == 2 ? "2nd Hand" : "Used"}</span>
            <span>SKU: {sku}</span>
          </div>
          <hr />
          <div className="m-30 shipping-instruction">
            <h4>This item has been returned because it did not meet our Quality Standards</h4>
            <p>We don't want any items to fail inspection. When this happens the Buyer is upset because their order is delayed or canceled, the Seller is upset because they are charged a fee and get their item returned, and we are upset because we failed to facilitate a successful transaction.</p>
            <p>So we put together a Pre-Inspection guide for sellers that will greatly reduce the chance of an item not passing. Check it out before listing items for sale!</p>
          </div>
        </div>
      </div>

      {
        showLoader ?
          <div className="loader-icon" style={{ marginBlock: "80px" }}>
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          </div> :
          <div>
            <Header hideData={hideData} />
            <Row className="py-3 mt-5 mb-3">
              <Col lg={6}>
                <div className="d-sm-flex gap-3 align-items-center">
                  <Button
                    variant="outline-secondary"
                    className="bg-none"
                    onClick={() => navigate("/orderView")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#000"
                      className="bi bi-arrow-left-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </Button>
                  <h5 className="fs-2 mb-0">{orderId}</h5>
                  <span className="fw-bold bg-custom-light py-1 px-3 rounded-pill">
                    {paymentStatus}
                  </span>
                  {orderStatus == "Waiting on Seller" ? (
                    <Button className="order_status_waiting border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Shipped From Seller" ? (
                    <Button className="order_status_shipped_seller border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Ready For Test" ? (
                    <Button className="order_status_ready_test border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Ready For Shipment" ? (
                    <Button className="order_status_ready_shipment border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Shipped Out" ? (
                    <Button className="order_status_shipped_out border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Recently Delivered" ? (
                    <Button className="order_status_recently_delivered border text-white">
                      {orderStatus}
                    </Button>
                  ) : orderStatus == "Return" ? (
                    <Button className="order_status_return border text-white">
                      {orderStatus}
                    </Button>
                  ) : (
                    <Button className="order_status_return border text-white">
                      {orderStatus}
                    </Button>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="d-sm-flex gap-3 align-items-center justify-content-end">

                  <Button className="bg-none border-0 text-dark fw-bold" disabled={message} onClick={handleRefund}>
                    Refund
                  </Button>
                  {/* <Button className="bg-none border-0 text-dark fw-bold" disabled>Edit</Button> */}
                  <Dropdown>
                    <Dropdown.Toggle
                      className="border-0 bg-none text-dark fw-bold"
                      id="dropdown-basic"
                    >
                      More action
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-2">
                      <Dropdown.Item href="#" disabled>Manual Payout to Sellout</Dropdown.Item>
                      <Dropdown.Item href="#" disabled>Flag Order</Dropdown.Item>
                      <Dropdown.Item href="#" disabled>Send Payment Request</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={() => handlePlaceBuyerWithNewSeller()}>
                        Place Buyer with new seller
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <ButtonGroup
                    aria-label="Basic example"
                    className="border border-dark"
                  >
                    <Button variant="" className="border-end" onClick={handlePreviousOrder}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          filerule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                      </svg>
                    </Button>
                    <Button variant="" onClick={handleNextOrder}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          filerule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col lg={9}>
                <div className="bg-white border p-5">
                  <h5 className="fw-bold mb-3">Product Info</h5>
                  <Table>
                    <tbody>
                      <tr className="border-0 border-white">
                        <td>
                          <div className="d-flex gap-5">
                            <img
                              src={`${imageUrl}${image}`}
                              style={{ width: "150px", height: "100px" }}
                            />
                            <div>
                              <h6 className="mb-0">{productName}</h6>{" "}
                              <span>
                                {type == 1 ? "New" : type == 2 ? "2nd Hand" : "Used"}
                              </span>
                              <p className="mb-0 fw-bold text-muted">SKU: {sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="fw-bold">{moment(date).format("l")}</td>
                        <td className="fw-bold">${subTotal}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <h5 className="fw-bold  my-3">Payment Info</h5>
                  <Table className="payment-table">
                    <tbody>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Subtotal</td>
                        <td className="fw-500">{"$" + subTotal}</td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Shipping</td>
                        <td className="fw-500">{"$" + shippingFee}</td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Testing Fee</td>
                        <td className="fw-500">$25</td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Processing Fee</td>
                        <td className="fw-500">${processingFee}</td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Taxes (9%)</td>
                        <td className="fw-500">${tax}</td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-bold">Total</td>
                        <td className="fw-bold">
                          ${total}
                          {paymentStatus == "Pending" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-x-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="green"
                              className="bi bi-check-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table className="mt-3 payment-table">
                    <tbody>
                      <tr className="border-0 border-white">
                        <td className="fw-500">9.5% Seller Fee</td>
                        <td className="fw-500">
                          {sellerFee ? "$" + sellerFee : null}
                        </td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Payment Processing Fee 3%</td>
                        <td className="fw-500">
                          {sellerProcessingFee ? "$" + sellerProcessingFee : null}
                        </td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-500">Shipping</td>
                        <td className="fw-500">
                          {sellerShippingFee ? "$" + sellerShippingFee : null}
                        </td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-bold">Total due to seller</td>
                        <td className="fw-bold">
                          {sellerTotalDue ? "$" + sellerTotalDue : null}
                          {sellerPaymentStatus == "Pending" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-x-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="green"
                              className="bi bi-check-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          )}
                        </td>
                      </tr>
                      <tr className="border-0 border-white">
                        <td className="fw-bold">Total Margin</td>
                        <td className="fw-bold">
                          {totalMargin > 0 ? totalMargin.toFixed(2) : null}
                          {sellerPaymentStatus == "Pending" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-x-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="green"
                              className="bi bi-check-circle-fill ms-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="text-end p-3 border  border-top-0">
                  {authenticationOrderStatus || orderStatus == "Waiting on Seller" || orderStatus == "Shipped From Seller" || orderStatus == "Ready For Shipment" || orderStatus == "Shipped Out" || orderStatus == "Return to Seller" ?
                    <Button
                      className="border-0 px-3 m-3 py-2 bg-primary text-white custom_authenticate_pointer"
                      style={{cursor: "pointer"}}
                      onClick={handleShow}
                      disabled
                    >
                      Authenticate
                    </Button> : <Button
                      className="border-0 px-3 m-3 py-2 bg-primary text-white"
                      style={{cursor: "pointer"}}
                      onClick={handleShow}
                    >
                      Authenticate
                    </Button>}


                  {
                    createShipmentStatus == "fail" || orderStatus == "Waiting on Seller" || orderStatus == "Shipped From Seller" || orderStatus == "Ready For Test" || orderStatus == "Shipped Out" || orderStatus == "Return to Seller" || orderStatus == "Out For Delivery" ?
                      <Button
                        className="border-0 px-3 py-2 bg-success text-white"
                        onClick={handleCreateShippingLabel}
                        style={{cursor: "pointer"}}
                        disabled
                      >
                        Create Shipping Label
                      </Button> : <Button
                        className="border-0 px-3 py-2 bg-success text-white"
                        style={{cursor: "pointer"}}
                        onClick={handleCreateShippingLabel}
                        disabled={showCreatePrintLabelLoader}
                      >
                        {showCreatePrintLabelLoader ? 'Please Wait...' : 'Create Shipping Label'}
                      </Button>
                  }


                </div>
                {/* start authentication Popup */}
                <Modal
                  show={show}
                  onHide={handleClose}
                  className="authentication-modal"
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Authentication</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="fw-bold text-danger" style={{ textAlign: "right" }}>
                      Fail ?
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold">Visual Inspection</p>
                      <Form.Check
                        aria-label="option 1"
                        defaultChecked={visualInspection ? true : false}
                        onChange={(e) =>
                          handleAuthentication(e.target.checked, 0, "visual")
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold">Acoustic Inspection</p>
                      <Form.Check
                        aria-label="option 1"
                        defaultChecked={acousticInspection ? true : false}
                        onChange={(e) =>
                          handleAuthentication(e.target.checked, 1, "Acoustic")
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold">Benchmark</p>
                      <Form.Check
                        aria-label="option 1"
                        defaultChecked={benchMark ? true : false}
                        onChange={(e) =>
                          handleAuthentication(e.target.checked, 2, "benchmark")
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold">Other Attachment</p>
                      <Form.Check
                        aria-label="option 1"
                        defaultChecked={attachment ? true : false}
                        onChange={(e) =>
                          handleAuthentication(e.target.checked, 3, "attachment")
                        }
                      />
                    </div>
                    <div className="">
                      <p className="fw-bold mb-2">Comments</p>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="orderdetail align-items-start">

                    <Button variant="success" disabled={buttonLoader} onClick={handlePassAuthentication}>
                      {buttonLoader ? 'Please Wait...' : 'Pass'}
                    </Button>
                    <div className="">
                      {
                        authenticationOrderStatus || orderStatus == "Waiting on Seller" || orderStatus == "Shipped From Seller" ?
                          <Button variant="danger" disabled onClick={handleFailAuthentication}>
                            {buttonFailLoader ? 'Please Wait...' : 'Fail'}
                          </Button> :
                          <Button variant="danger" disabled={buttonFailLoader} onClick={handleFailAuthentication}>
                            {buttonFailLoader ? 'Please Wait...' : 'Fail'}
                          </Button>
                      }
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Check
                          aria-label="option 1"
                          defaultChecked={waiveFee ? true : false}
                          onChange={(e) => setWaiveFee(e.target.checked)}
                        />
                        <p className="fw-bold m-0 ms-2 text-danger">Waive Fee</p>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>
                  {/* end authentication Popup */}


                  {/* start shipping popup */}
                {
                  showModalLoader ? <div className="loader-icon" style={{ marginBlock: "80px" }}>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  </div> :
                    <Modal show={show1} onHide={handleClose1} backdrop="static">
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <h5 className="my-3 ">
                            Ship From
                          </h5>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <div className="px-2">
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                value="Skewws llc"
                              // onChange={(e) => setSellerName(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">
                                Address
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your Address"
                                value={fromStreet}
                              // onChange={(e) => setBillingAddress(e.target.value)}
                              />
                            </Form.Group>
                            <div className="d-sm-flex justify-content-start gap-2">
                              <Form.Group
                                className="mb-2 d-flex align-items-center gap-2"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="fs-6 fw-bold mb-0">
                                  City
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Your City"
                                  value={fromCity}
                                // onChange={(e) => setCity(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-2 d-flex align-items-center gap-2"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="fs-6 fw-bold mb-0 ">
                                  State
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Your State"
                                  value={fromState}
                                // onChange={(e) => setState(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-2 d-flex align-items-center gap-2"
                                controlId="formBasicEmail"
                              >
                                <Form.Label
                                  className="fs-6 fw-bold mb-0
                      "
                                >
                                  Zip Code
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Your Zip Code"
                                  value={fromZipCode}
                                // onChange={(e) => setZipCode(e.target.value)}
                                />
                              </Form.Group>
                            </div>
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">Phone</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter Your Phone No."
                                value={fromPhone}
                              // onChange={(e) => setPhone(e.target.value)}
                              />
                            </Form.Group>
                          </div>
                          <h5 className="my-3 ">
                            Ship To
                          </h5>
                          {
                            setReturnOrder ?
                              <div className="px-2">
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">
                                    Address
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Address"
                                    value={toStreet}
                                  // onChange={(e) => setBuyerShippingAddress(e.target.value)}
                                  />
                                </Form.Group>
                                <div className="d-sm-flex justify-content-between gap-2">
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      City
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your City"
                                      value={toCity}
                                    // onChange={(e) => setBuyerCity(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      State
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your State"
                                      value={toState}
                                    // onChange={(e) => setBuyerState(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      Zip Code
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your Zip Code"
                                      value={toZipCode}
                                    // onChange={(e) => setBuyerZipCode(e.target.value)}
                                    />
                                  </Form.Group>
                                </div>
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">Phone</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Your Phone"
                                    value={toPhone}
                                  // onChange={(e) => setPhone(e.target.value)}
                                  />
                                </Form.Group>
                              </div>
                              : <div className="px-2">
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">
                                    Address
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Address"
                                    value={returnStreet}
                                  // onChange={(e) => setSellerShippingAddress(e.target.value)}
                                  />
                                </Form.Group>
                                <div className="d-sm-flex justify-content-between gap-2">
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      City
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your City"
                                      value={returnCity}
                                    // onChange={(e) => setSellerShippingCity(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      State
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your State"
                                      value={returnState}
                                    // onChange={(e) => setSellerShippingState(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-2 d-flex align-items-center gap-2"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label className="fs-6 fw-bold mb-0">
                                      Zip Code
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your Zip Code"
                                      value={returnZipCode}
                                    // onChange={(e) => setSellerShippingZipCode(e.target.value)}
                                    />
                                  </Form.Group>
                                </div>
                                <Form.Group
                                  className="mb-2 d-flex align-items-center gap-2"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="fs-6 fw-bold mb-0">Phone</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Your Phone"
                                    value={returnPhone}
                                  // onChange={(e) => setSellerPhone(e.target.value)}
                                  />
                                </Form.Group>
                              </div>
                          }
                          <h5 className="my-3 ">
                            Package
                          </h5>

                          <div className="package-form-grid px-2 ">
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">Length</Form.Label>
                              <Form.Control type="text" placeholder="" value={length} />
                            </Form.Group>
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">Width</Form.Label>
                              <Form.Control type="text" placeholder="" value={width} />
                            </Form.Group>
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">
                                Height
                              </Form.Label>
                              <Form.Control type="text" placeholder="" value={height} />
                            </Form.Group>
                            <Form.Group
                              className="mb-2 d-flex align-items-center gap-2"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fs-6 fw-bold mb-0">
                                Weight
                              </Form.Label>
                              <Form.Control type="text" placeholder="" value={weight} />
                            </Form.Group>
                            {/* <Form.Group
                    className="mb-2 d-flex align-items-center gap-2"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="fs-6 fw-bold mb-0">Ibs</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group> */}
                          </div>

                          <Table className="payment-table">
                            <tbody>
                              {paymentOptions.map((option) => (
                                <tr key={option.value} className="border-white">
                                  <td>
                                    <Form.Check
                                      className="fw-bold"
                                      type="checkbox"
                                      label={option.service}
                                      value={option.id}
                                      checked={option.service === "Ground"}
                                    // checked={option.id === selectedOption}
                                    onClick={() => handleCheckboxChange}
                                    />
                                  </td>
                                  <td className="fw-bold">{option.rate}</td>
                                </tr>
                              ))}
                            </tbody>
                            <p className="fw-bold mb-0 px-2">
                              * All Pricing to include Insurance
                            </p>
                          </Table>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        {
                          createShipmentStatus == "fail" || orderStatus == "Waiting on Seller" || orderStatus == "Shipped From Seller" || orderStatus == "Ready For Test" || orderStatus == "Return to Seller" ?
                            <Button
                              variant="success"
                              className="d-block w-100"
                              disabled
                            // onClick={handleShippingFailLabel}
                            >
                              Print Label
                            </Button>
                            : orderStatus == "Waiting on Seller" || orderStatus == "Shipped From Seller" || orderStatus == "Ready For Test" || orderStatus == "Shipped Out" ? <Button
                              variant="success"
                              className="d-block w-100"
                              disabled
                            // onClick={handleShippingFailLabel}
                            >
                              Print Label
                            </Button> : <Button
                              variant="success"
                              className="d-block w-100"
                              disabled={buttonLoader}
                              onClick={handleShippingLabel}
                            >
                              {buttonLoader ? 'Please Wait' : 'Print Label'}
                            </Button>
                        }
                      </Modal.Footer>
                    </Modal>
                }
                {/* end shipping popup */}


                <div className="incomingship p-4 border mt-4">
                  <Accordion className="order-accordian">
                    <Accordion.Item eventKey="0">
                      {
                        trackingDetails?.deliveryStatus.status == "Waiting on Seller" ?
                          <Accordion.Header className="text-black fw-bold">
                            Incoming Shipping(TBD)
                          </Accordion.Header> : trackingDetails?.deliveryStatus.status == "Shipped From Seller" ? <Accordion.Header className="text-black fw-bold">
                            Incoming Shipping(In-Progress)
                          </Accordion.Header> : trackingDetails?.deliveryStatus.status == "Ready For Test" ? <Accordion.Header className="text-black fw-bold">
                            Incoming Shipping(Delivered)
                          </Accordion.Header> : <Accordion.Header className="text-black fw-bold">
                            Incoming Shipping(Delivered)
                          </Accordion.Header>
                      }
                      <Accordion.Body className="py-3 px-0">
                        <h6>UPS Shipment Progress</h6>
                        <Tab.Container
                          id="left-tabs-example"
                          defaultActiveKey="first"
                        >
                          <Row>
                            <Col sm={12}>
                              <Nav variant="pills" className="flex-row tab-overview">
                                <Nav.Item>
                                  <Nav.Link eventKey="first" className="border px-5">
                                    Overview
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="second" className="border px-5">
                                    Detailed View
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Col>
                            <Col sm={12}>
                              <Tab.Content>
                                <Tab.Pane eventKey="first">
                                  <div className="d-flex gap-2">
                                    <div className="shipping-timeline">
                                      <div className="timeline-custom">
                                        {
                                          trackingDetails?.tracking[0]?.trackingLocation?.map((item) => {
                                            return (
                                              <div className="timeline-block timeline-block-right active">
                                                <div className="marker active">
                                                  <i
                                                    className="fa fa-check active"
                                                    aria-hidden="true"
                                                  ></i>
                                                </div>
                                              </div>
                                            )
                                          })
                                        }

                                      </div>
                                    </div>
                                    <Table className="mt-3 payment-table border border-start-0 border-end-0 rounded">
                                      <thead className="border-bottom">
                                        <th className="py-3"></th>
                                        <th className="py-3">Date</th>
                                        <th className="py-3">Location</th>
                                        <th className="py-3"></th>
                                      </thead>
                                      <tbody>

                                        {
                                          trackingDetails?.tracking[0]?.trackingLocation?.map((item) => {
                                            return (
                                              <tr className="border-0 border-white my-3">
                                                <td>{item.message}</td>
                                                <td>{moment(item.datetime).format('lll')}</td>
                                                <td>{item.tracking_location.state ? item.tracking_location.state : ""}</td>
                                                <td>{item.tracking_location.country ? item.tracking_location.country : ""}</td>
                                              </tr>
                                            )
                                          })
                                        }

                                      </tbody>
                                    </Table>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                  {/* <Sonnet /> */}
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                        {/* <div className="d-flex align-items-center gap-4 mt-2">
                    <Button className="border-0 px-3 py-2 bg-primary text-white btn btn-primary">
                      Overview
                    </Button>
                    <Button className="border-0 px-3 ms-2 py-2 bg-success text-white btn btn-primary">
                      Detailed View
                    </Button>
                  </div> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className="incomingship p-4 border mt-4">
                  <Accordion className="order-accordian">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="text-black fw-bold">
                        Outgoing Shipping(TBD)
                      </Accordion.Header>
                      <Accordion.Body className="py-3 px-0">
                        <div className="d-flex align-items-center gap-4 mt-2 border-bottom border-top py-3">
                          <p className="mb-0">Timeline</p>

                          <p className="mb-0 ms-auto">
                            <input className="me-2" type="checkbox" />
                            Show Comments
                          </p>
                        </div>
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
                            <textarea className="w-100 p-2 w-95" placeholder="Leave a Comment">
                            </textarea>
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
                              {/* {
                          emojiStatus ? 
                          <Picker onEmojiClick={onEmojiClick} />:""
                        } */}

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

                            <h4 className="my-2 fw-bold">Today</h4>
                            <div className="d-flex align-tems-center border rounded p-2">
                              <p className="mb-0">Seller Shipped item</p>
                              <p className="mb-0 ms-auto">2 hour ago</p>
                            </div>

                            <div className="d-flex align-tems-center border rounded p-2 mt-2">
                              <p className="mb-0">Buyer paid $50B.68</p>
                              <p className="mb-0 ms-auto">1 day 13 hour ago</p>
                            </div>
                            <div className="d-flex align-tems-center border rounded p-2 mt-2">
                              <p className="mb-0">Buyer paid $50B.68</p>
                              <p className="mb-0 ms-auto">1 day 13 hour ago</p>
                            </div>
                            <div className="d-flex align-tems-center border rounded p-2 mt-2">
                              <p className="mb-0">Buyer paid $50B.68</p>
                              <p className="mb-0 ms-auto">1 day 13 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Col>
              <Col lg={3}>
                <div className="buyer-main-part">
                  <div className="bg-white border p-3">
                    <div className="d-flex justify-content-between mb-3 align-items-center">
                      <h5 className="fw-bold mb-0">Buyer</h5>
                      <Button className="border-0 bg-none">
                        {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill=""
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg> */}
                      </Button>
                    </div>
                    <Accordion className="order-accordian mb-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => navigate("/customerDetail/" + buyerId)}>
                          {buyerName}
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6>1 order</h6>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className="bg-white border p-3 border-top-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-3">CONTACT INFORMATION</h6>
                      {/* <Button className="border-0 bg-none text-primary" onClick={() => setShowBuyerEmailModel(true)} disabled>Edit</Button> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center pe-3">
                      <p className="fw-bold text-primary">{buyerEmail}</p>
                      {/* <Form.Check aria-label="option 1" /> */}
                    </div>
                    <p className="fw-500 mb-3 text-mute">
                      {phone ? phone : "No Phone number"}
                    </p>
                  </div>
                  <div className="bg-white border p-3 border-top-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-3">SHIPPING ADDRESS</h6>
                      <Button className="border-0 bg-none text-primary"  onClick={() => setShowShipingAddressModel(true)}>Edit</Button>
                    </div>
                    <div className="d-flex justify-content-between pe-3">
                      <p className="fw-500">
                        {buyerShippingAddress}
                        <br />
                        {buyerCountry}
                        <br />
                        {buyerState}
                        <br />
                        {buyerCity}
                      </p>
                      {/* <Form.Check aria-label="option 1" /> */}
                    </div>
                    <Button className="fw-500 mb-3 text-primary bg-none border-0 p-0" >
                      View map
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-up-right ms-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          filerule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                        />
                        <path
                          filerule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                        />
                      </svg>
                    </Button>
                  </div>
                  {/* <div className="bg-white border p-3 border-top-0">
              <h6 className="fw-bold mb-3">BILLING ADDRESS</h6>
              <p className="fw-500">
                {buyerBillingAddress}
                <br />
                {buyerBillingCountry}
                <br />
                {buyerBillingState}
                <br />
                {buyerBillingCity}
              </p>
            </div> */}
                </div>

                <div className="buyer-main-part mt-3">
                  <div className="bg-white border p-3">
                    <div className="d-flex justify-content-between mb-3 align-items-center">
                      <h5 className="fw-bold mb-0">Seller 2</h5>
                      <Button className="border-0 bg-none">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill=""
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg> */}
                      </Button>
                    </div>
                    <Accordion className="order-accordian mb-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          {sellerName}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star-fill ms-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6>1 order</h6>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className="bg-white border p-3 border-top-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-3">CONTACT INFORMATION</h6>
                      {/* <Button className="border-0 bg-none text-primary" disabled>Edit</Button> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center pe-3">
                      <p className="fw-bold text-primary">{sellerEmail}</p>
                      {/* <Form.Check aria-label="option 1" /> */}
                    </div>
                    <p className="fw-500 mb-3 text-mute">
                      {sellerPhone ? sellerPhone : "No Phone number"}
                    </p>
                  </div>
                  <div className="bg-white border p-3 border-top-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-3" >BILLING ADDRESS</h6>
                      {/* <Button className="border-0 bg-none text-primary" disabled>Edit</Button> */}
                    </div>
                    <div className="d-flex justify-content-between pe-3">
                      <p className="fw-500">
                        {sellerShippingAddress}
                        <br />
                        {sellerShippingCountry}
                        <br />
                        {sellerShippingState}
                        <br />
                        {sellerShippingCity}
                      </p>
                      {/* <Form.Check aria-label="option 1" /> */}
                    </div>
                    <Button className="fw-500 mb-3 text-primary bg-none border-0 p-0">
                      View map
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-up-right ms-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          filerule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                        />
                        <path
                          filerule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                        />
                      </svg>
                    </Button>
                  </div>
                  {/* <div className="bg-white border p-3 border-top-0">
              <h6 className="fw-bold mb-3">BILLING ADDRESS</h6>
              <p className="fw-500">
                {billingAddress}
                <br />
                {sellerBillingCountry}
                <br />
                {sellerBillingState}
                <br />
                {sellerBillingCity}
              </p>
            </div> */}
                </div>

                <div className="buyer-main-part mt-3">
                  <div className="bg-white border p-3">
                    <Accordion className="order-accordian mb-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="text-primary text-decoration-underline">
                          Seller 1(non performing)
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6>Aylin Sarabia</h6>
                          <p>1 order</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Buyer Email Model Start */}
            <Modal show={showBuyerEmailModel} onHide={() => setShowBuyerEmailModel(false)} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Update Email</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" autoComplete='false' value={validBuyerEmail} placeholder="Enter Your Email" onChange={(e) => handleEmail(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowUserModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateEmail}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* end Buyer email popup */}

            {/* start update address popup */}
            <Modal show={showShipingAddressModel} onHide={() => setShowShipingAddressModel(false)} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5 className="my-3 ">
                    Update Shipping Address
                  </h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" disabled={addressButtonLoader} placeholder="Enter Your Address" value={validStreet} onChange={(e) => setValidStreet(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" disabled={addressButtonLoader} placeholder="Enter Your City" value={validCity} onChange={(e) => setValidCity(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" disabled={addressButtonLoader} placeholder="Enter Your State" value={validState} onChange={(e) => setValidState(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="number" disabled={addressButtonLoader} placeholder="Enter Your Postal Code" value={validZipCode} onChange={(e) => setValidZipCode(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  className="d-block w-100"
                  disabled={addressButtonLoader}
                  onClick={handleUpdateShippingAddress}
                >
                  {addressButtonLoader ? 'Please Wait...':'Save'}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* end update address popup */}

          </div>
      }

    </div>
  );
}
