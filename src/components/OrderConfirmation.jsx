import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExportApi from "../api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
const OrderConfirmation = () => {
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [orderId, setOrderId] = useState();
  const [productName, setProductName] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [image, setImage] = useState();
  const [showLoader, setShowLoader] = useState(true);

  // Start Fetching the Order Confirmation Data
  const handleOrderData = (id) => {
    ExportApi.getOrderData(id)
      .then((resp) => {
        if (resp.data.message == "Data fetched successfully") {
          let data = resp.data.Data;
          console.log(data,'Order Confirmation Data');
          setOrderId(data[0]?._id);
          setProductName(data[0]?.productId?.productname);
          if(data[0]?.productId?.type == 1){
            console.log(data[0]?.productId?.new_retail_website_price)
            setTotalPrice(data[0]?.productId?.new_retail_website_price?.toFixed(2))
            setOrderStatus('Confirmed');
          }else{
            setTotalPrice(data[0]?.bidId?.subTotal?.toFixed(2));
            setOrderStatus(data[0]?.deliveryStatusId?.deliveryStatus?.status);
          }
          setImage(data[0]?.productId?.image[0]);
          setShowLoader(false);
        } else {
          setShowLoader(false);
          toast.error("Order Not Created ! Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("tokenuser")) {
        setName(JSON.parse(localStorage.getItem("tokenuser")).firstname);
        handleOrderData(JSON.parse(localStorage.getItem("tokenuser")).id);
      } else if (localStorage.getItem("admin")) {
        setName("admin");
        handleOrderData(JSON.parse(localStorage.getItem("admin")).id);
      } else {
      }
    }, []);
  });

  return (
    <div className="container mt-5">
      <div className="order_confirmation_main_div text-center">
        <span className="fs-2 mt-3">
          <b>Order Confirmation</b>
        </span>
        <br />
        <br />
        <span className="order_confirmation_text">
          ({name}),thank you for your order
        </span>
        <br />
        <br />
        <span className="order_confirmation_text">
          We've received your order and will contact you as soon as your package
          <br />
          is shipped. you can find your purchase information below
        </span>
      </div>
      <div className="order_confirmation_image d-flex justify-content-center">
        <img
          src="https://www.lappymaker.com/images/greentick-unscreen.gif"
          height="300px"
          width="auto"
        />
      </div>
      <div className="order_summary text-center">
        <span className="order_summary_text fs-2">Order Summary</span>
      </div>
      {showLoader ? (
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : (
        <div className="order_confirmation_summary">
          <div className="order_confirmation_left-img">
            <img src={`${imageUrl}${image}`} height="300px" />
          </div>

          <div className="right_parent">
            <div className="order_confirmation_left d-flex align-items-center">
              <span className="right_div_text">
                <b>Order ID:</b>
              </span>
              <span className="right_div_content">{orderId}</span>
            </div>
            <div className="order_confirmation_left d-flex align-items-center">
              <span className="right_div_text">
                <b>Product Title:</b>
              </span>
              <span className="right_div_content">{productName}</span>
            </div>
            <div className="order_confirmation_right d-flex align-items-center">
              <span className="right_div_text">
                <b>Total Price:</b>
              </span>
              <span className="right_div_content">
                {"$" + totalPrice ? "$" + totalPrice : ""}
              </span>
            </div>
            <div className="order_confirmation_right d-flex align-items-center">
              <span className="right_div_text">
                <b>Status:</b>
              </span>
              <span className="right_div_content">{orderStatus}</span>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center mb-4 mt-3">
        <Button
          className="order_home_button border bg-success"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
