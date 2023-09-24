import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Heart from "react-heart";
import { useNavigate } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Login from "./Login";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { BaseApi } from "../api/BaseApi";
export default function ProductList(props) {
  const htmlString =
    "<p>These are the best value, meaning highest performance per dollar</p>";
  const topperformer = "<p>These are the highest performing cards</p>";
  const mostpopular = "<p>These are getting a lot of action</p>";
  const recentlyviewed = "<p>Your recently viewed cards</p>";
  const navigate = useNavigate();
  let imageUrl = "https://api.skewws.com/resources/";
  // State variables
  const [Data, setData] = useState(); // Holds product data
  const [show, setShow] = useState(false); // Controls the visibility of the login modal
  const [token, setToken] = useState(localStorage.getItem("token")); // Holds user token
  const [bestDealProducts, setBestDealProducts] = useState();
  const [mostPopularProducts, setMostPopularProducts] = useState();
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState();
  const [favProductList, setFavProductList] = useState([]);
  const [DataFavourite, setDataFavourite] = useState([]);
  // Function to close the modal
  const handleClose = () => {
    setToken(localStorage.getItem("token"));
    setShow(false);
  };

  // Function to open the modal
  const handleShow = () => setShow(true);

  const HandleBestDealFav = (data, id, i) => {
    if (token) {
      // If user is logged in
      if (data) {
        let newData = [...bestDealProducts];
        newData[i].isfav = data;
        setBestDealProducts(newData);

        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleAddtoFavBestDeal(id);
      } else {
        let newData = [...bestDealProducts];
        newData[i].isfav = data;
        setBestDealProducts(newData);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleRemovetoFavBestDeal(id);
      }
    } else {
      // If user is not logged in, show login modal
      handleShow();
    }
  };

  // Function to handle favorite button click
  //data used for check fav. is true or not
  //id used for the specific product id
  //index used for index
  const HandleRecentlyViewedFav = (data, id, i) => {
    if (token) {
      // If user is logged in
      if (data) {
        let newData = [...recentlyViewedProducts];
        newData[i].isfav = data;
        setRecentlyViewedProducts(recentlyViewedProducts);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleAddRecentlyFav(id);
      } else {
        let newData = [...recentlyViewedProducts];
        newData[i].isfav = data;
        setRecentlyViewedProducts(recentlyViewedProducts);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleRemovetoRecentlyFav(id);
      }
    } else {
      // If user is not logged in, show login modal
      handleShow();
    }
  };

  // Function to handle favorite button click
  //data used for check fav. is true or not
  //id used for the specific product id
  //index used for index
  const HandleMostPopularFav = (data, id, i) => {
    if (token) {
      // If user is logged in
      if (data) {
        let newData = [...mostPopularProducts];
        newData[i].isfav = data;
        setMostPopularProducts(mostPopularProducts);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleAddMostPopularFav(id);
      } else {
        let newData = [...mostPopularProducts];
        newData[i].isfav = data;
        setMostPopularProducts(mostPopularProducts);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleRemovetoMostPopularFav(id);
      }
    } else {
      // If user is not logged in, show login modal
      handleShow();
    }
  };

  // Function to handle favorite button click
  //data used for check fav. is true or not
  //id used for the specific product id
  //index used for index
  const HandleFavButton = (data, id, i) => {
    if (token) {
      // If user is logged in
      if (data) {
        let newData = [...Data];
        newData[i].isfav = data;
        setData(newData);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleAddtoFav(id);
      } else {
        let newData = [...Data];
        newData[i].isfav = data;
        setData(newData);
        setTimeout(() => {
          props.addFavorite(newData);
        }, 1000);
        HandleRemovetoFav(id);
      }
    } else {
      // If user is not logged in, show login modal
      handleShow();
    }
  };

  // Function to add product to favorites
  const HandleAddMostPopularFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.AddtoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.AddtoFevreat(id, JSON.parse(localStorage.getItem("admin")).id)
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to add product to favorites
  const HandleAddRecentlyFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.AddtoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.AddtoFevreat(id, JSON.parse(localStorage.getItem("admin")).id)
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to add product to favorites
  const HandleAddtoFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.AddtoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.AddtoFevreat(id, JSON.parse(localStorage.getItem("admin")).id)
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to add product to favorites
  const HandleAddtoFavBestDeal = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.AddtoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.AddtoFevreat(id, JSON.parse(localStorage.getItem("admin")).id)
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to remove product from favorites
  //id used for  specific product Id
  const HandleRemovetoMostPopularFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("admin")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to remove product from favorites
  //id used for  specific product Id
  const HandleRemovetoFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("admin")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to remove product from favorites
  //id used for  specific product Id
  const HandleRemovetoFavBestDeal = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("admin")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };

  // Function to remove product from favorites
  //id used for  specific product Id
  const HandleRemovetoRecentlyFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("admin")).id
      )
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  };
  const HandleRecentlyViewedProduct = (productId) => {
    HandleMostPopularProduct(productId);
    if (localStorage.getItem("tokenuser")) {
      let userId = JSON.parse(localStorage.getItem("tokenuser")).id;
      ExportApi.updateRecentlyViewedProduct(userId, productId).then(
        (resp) => {}
      );
    } else if (localStorage.getItem("admin")) {
      let UserId = JSON.parse(localStorage.getItem("admin")).id;
      ExportApi.updateRecentlyViewedProduct(UserId, productId).then(
        (resp) => {}
      );
    }
  };

  const HandleMostPopularProduct = (id) => {
    ExportApi.updateMostPopularProduct(id);
  };

  useEffect(() => {
    // Close the modal when the "LoginEv" event occurs
    window.addEventListener("LoginEv", () => {
      // Call the handleClose function to close the modal
      handleClose();
    });
    // Set the "Data" state with the value from props
    // setData(props.Data);
    // Set the "bestDealProducts" state with the value from props
    // setBestDealProducts(props.bestDealProduct);
    // setMostPopularProducts(props.mostPopular);
    // setRecentlyViewedProducts(props.recentlyViewed);
  }, [props]);

  // ///////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      const adminData = localStorage.getItem("admin");
      const userData = localStorage.getItem("tokenuser");
      const adminObject = JSON.parse(adminData);
      const userObject = JSON.parse(userData);
      const requestBody = adminObject
        ? { id: adminObject.id }
        : userObject
        ? { id: userObject.id }
        : {};

      const fetchData = () => {
        const compareData = JSON.parse(localStorage.getItem("Compare"));
        BaseApi.post("product/getProductList", requestBody)
          .then((response) => {
            const {
              bestDeal,
              mostViewedProduct,
              recentlyViewed,
              topproformer,
            } = response.data;
            topproformer?.map((item) => {
              item["isCompare"] = false;
              compareData?.map((val) => {
                if (val?._id === item?._id) {
                  item["isCompare"] = true;
                }
              });
            });
            setData(topproformer);
            bestDeal?.map((item) => {
              item["isCompare"] = false;
              compareData?.map((val) => {
                if (val?._id === item?._id) {
                  item["isCompare"] = true;
                }
              });
            });
            setBestDealProducts(bestDeal);
            mostViewedProduct?.map((item) => {
              item["isCompare"] = false;
              compareData?.map((val) => {
                if (val?._id === item?._id) {
                  item["isCompare"] = true;
                }
              });
            });
            setMostPopularProducts(mostViewedProduct);
            recentlyViewed?.map((item) => {
              item["isCompare"] = false;
              compareData?.map((val) => {
                if (val?._id === item?._id) {
                  item["isCompare"] = true;
                }
              });
            });
            setRecentlyViewedProducts(recentlyViewed);
          })
          .catch((error) => {});
      };
      fetchData();

      const eventListener = () => {
        fetchData();
      };

      document.addEventListener("triggerProductListEffect", eventListener);

      // Remove the event listener when the component unmounts
      return () => {
        document.removeEventListener("triggerProductListEffect", eventListener);
      };
    },
    [localStorage.getItem("Compare")],
    bestDealProducts,
    mostPopularProducts,
    recentlyViewedProducts,
    Data
  );

  console.log("Best Deal List Data", bestDealProducts);
  console.log("Most Popular Data", mostPopularProducts);
  console.log("Recently View List Data", recentlyViewedProducts);
  console.log("Top Performer List Data", Data);

  const HandleAddToFavProductList = (data, productid, ProductData) => {
    if (token) {
      // If user is logged in
      if (data) {
        let id = productid;
        //Best Deal Products
        const found = bestDealProducts.find((Element) => Element._id == id);
        if (found) {
          found.isfav = data;
          let productId = found._id;
          const index = bestDealProducts.findIndex((x) => x._id == productId);
          bestDealProducts[index] = found;
          setBestDealProducts(bestDealProducts);
        }

        //Top Performer
        const topPerformer = Data.find((Element) => Element._id == id);
        if (topPerformer) {
          topPerformer.isfav = data;
          let productId1 = topPerformer._id;
          const index1 = Data.findIndex((x) => x._id == productId1);
          Data[index1] = topPerformer;
          setData(Data);
        }
        //Most Popular
        const mostPopular = mostPopularProducts.find(
          (Element) => Element._id == id
        );
        if (mostPopular) {
          mostPopular.isfav = data;
          let productId2 = mostPopular._id;
          const index2 = mostPopularProducts.findIndex(
            (x) => x._id == productId2
          );
          mostPopularProducts[index2] = mostPopular;
          setMostPopularProducts(mostPopularProducts);
        }

        //Recent view
        const RecentView = recentlyViewedProducts.find(
          (Element) => Element._id == id
        );
        if (RecentView) {
          RecentView.isfav = data;
          let productId3 = RecentView._id;
          const index3 = recentlyViewedProducts.findIndex(
            (x) => x._id == productId3
          );
          recentlyViewedProducts[index3] = RecentView;
          setMostPopularProducts(recentlyViewedProducts);
        }

        props.addFavorite(id);
        HandleAddtoFav(id);
      } else {
        let id = productid;
        //Best Deal Products
        const found = bestDealProducts.find((Element) => Element._id == id);
        if (found) {
          found.isfav = data;
          let productId = found._id;
          const index = bestDealProducts.findIndex((x) => x._id == productId);
          bestDealProducts[index] = found;
          setBestDealProducts(bestDealProducts);
        }

        //Top Performer
        const topPerformer = Data.find((Element) => Element._id == id);
        if (topPerformer) {
          topPerformer.isfav = data;
          let productId1 = topPerformer._id;
          const index1 = Data.findIndex((x) => x._id == productId1);
          Data[index1] = topPerformer;
          setData(Data);
        }
        //Most Popular
        const mostPopular = mostPopularProducts.find(
          (Element) => Element._id == id
        );
        if (mostPopular) {
          mostPopular.isfav = data;
          let productId2 = mostPopular._id;
          const index2 = mostPopularProducts.findIndex(
            (x) => x._id == productId2
          );
          mostPopularProducts[index2] = mostPopular;
          setMostPopularProducts(mostPopularProducts);
        }

        //Recent view
        const RecentView = recentlyViewedProducts.find(
          (Element) => Element._id == id
        );
        if (RecentView) {
          RecentView.isfav = data;
          let productId3 = RecentView._id;
          const index3 = recentlyViewedProducts.findIndex(
            (x) => x._id == productId3
          );
          recentlyViewedProducts[index3] = RecentView;
          setMostPopularProducts(recentlyViewedProducts);
        }
        props.addFavorite(id);
        HandleRemovetoFav(id);
      }
    } else {
      // If user is not logged in, show login modal
      handleShow();
    }
  };

  // useEffect(() => {

  // },[])

  return (
    <div className="product_all_view py-5">
      {/* Start Best Deals */}
      {
        bestDealProducts?.length > 0 ? 
      <Container>
        <h1 className="fs-4 mb-3">
          Best Deals{" "}
          <ReactTooltip
            className="custom-tooltip_buy-sell text-captilize"
            anchorId="app-best-deal"
            place="bottom"
            content=<div dangerouslySetInnerHTML={{ __html: htmlString }} />
          />
          <span className="question_mark ms-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="app-best-deal"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-question-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
            </svg>
          </span>
        </h1>

        <Row>
          {bestDealProducts?.map((val, i) => {
            return (
              <Col xs="12" sm="2" className="mb-3" key={i}>
                {i <= 5 ? (
                  <div
                    className="product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative"
                    onClick={() => HandleRecentlyViewedProduct(val?._id)}
                  >
                    <div onClick={() => navigate(`/product/${val._id}`)}>
                      {val?.chipset == "Nvidia" ? (
                        <p className="up-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AMD" ? (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AYU" ? (
                        <p className="up-down-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      )}
                      <div
                        className="text-center image_parent"
                        onClick={() => navigate(`/product/${val?._id}`)}
                      >
                        <LazyLoadImage
                          src={`${imageUrl}${val?.image[0]}`}
                          onClick={() => navigate(`/product/${val?._id}`)}
                          effect="blur"
                        />{" "}
                      </div>
                    </div>
                    <div className="combine_details">
                      <div
                        className="d-flex align-items-center justify-content-between w-full mb-0"
                        onClick={() => navigate(`/product/${val?._id}`)}
                      >
                        <p>{val?.brand}</p>
                        <div className="w-25 text-end"></div>
                      </div>
                      <div onClick={() => navigate(`/product/${val?._id}`)}>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.series}
                        </p>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val._id}`)}
                        >
                          {val?.model}
                        </p>

                        <div
                          className="bl-text"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            Condition:{" "}
                            {val?.type == 1
                              ? "New-Retail"
                              : val?.type == 2
                              ? " New-2nd Hand"
                              : "Used"}
                          </p>
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.condition}
                          </p>
                        </div>
                        <h2
                          className="text-center fw-bold mt-3"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.new_retail_website_price > 0
                            ? "$" + val?.new_retail_website_price
                            : "TBD"}
                          {/* {val?.type == 1
                                  ? "$" + val?.new_retail_website_price
                                  : val?.type == 2
                                  ? val.new_second_hand_house_ask
                                    ? "$" + val?.new_second_hand_house_ask
                                    : ""
                                  : val.used_house_ask
                                  ? "$" + val?.used_house_ask
                                  : ""} */}
                        </h2>
                      </div>
                      <div className="compar_mar text-end">
                        <label className="form-check-label">Compare</label>
                        <input
                          type="checkbox"
                          checked={val?.isCompare ? true : false}
                          className="form-check-input ms-2"
                          onClick={(e) => {
                            props.handleCompare(
                              e.target.checked,
                              val,
                              i,
                              "ProductList"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <Heart
                      className="hear-icon"
                      isActive={val?.isfav ? true : false}
                      onClick={() =>
                        HandleAddToFavProductList(!val?.isfav, val?._id, val)
                      }
                      // onClick={() =>
                      //   HandleBestDealFav(!val?.isfav, val?._id, i)
                      // }
                      animationScale={1.25}
                      style={{ width: "20px" }}
                    />
                  </div>
                ) : null}
              </Col>
            );
          })}
        </Row>
        {/* Login Modal Start */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login modal={() => handleClose()} />
          </Modal.Body>
        </Modal>
        {/* End Login Modal */}
      </Container>:""
      }
      {/* End Best Deals */}

      {/* Start Top Performer */}
      {
        Data?.length > 0 ? 
      <Container>
        <h1 className="fs-4 mb-3">
          Top Performer
          <ReactTooltip
            className="custom-tooltip_buy-sell text-captilize"
            anchorId="app-top-performer"
            place="bottom"
            content=<div dangerouslySetInnerHTML={{ __html: topperformer }} />
          />
          <span className="question_mark ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="app-top-performer"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-question-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
            </svg>
          </span>
        </h1>

        <Row>
          {Data?.map((val, i) => {
            return (
              <Col xs="12" sm="2" className="mb-3" key={i}>
                {i <= 5 ? (
                  <div
                    className="product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative"
                    onClick={() => HandleRecentlyViewedProduct(val?._id)}
                  >
                    <div onClick={() => navigate(`/product/${val?._id}`)}>
                      {val?.chipset == "Nvidia" ? (
                        <p className="up-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AMD" ? (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AYU" ? (
                        <p className="up-down-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      )}
                      <div className="text-center image_parent">
                        <LazyLoadImage
                          src={`${imageUrl}${val?.image[0]}`}
                          onClick={() => navigate(`/product/${val?._id}`)}
                          effect="blur"
                        />{" "}
                      </div>
                    </div>
                    <div className="combine_details">
                      <div
                        className="d-flex align-items-center justify-content-between w-full mb-0"
                        onClick={() => navigate(`/product/${val?._id}`)}
                      >
                        <p>{val?.brand}</p>
                        <div className="w-25 text-end"></div>
                      </div>
                      <div onClick={() => navigate(`/product/${val?._id}`)}>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.series}
                        </p>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val._id}`)}
                        >
                          {val?.model}
                        </p>

                        <div
                          className="bl-text"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            Condition:{" "}
                            {val?.type == 1
                              ? "New-Retail"
                              : val?.type == 2
                              ? " New-2nd Hand"
                              : "Used"}
                          </p>
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.condition}
                          </p>
                        </div>
                        <h2
                          className="text-center fw-bold mt-3"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.new_retail_website_price > 0
                            ? "$" + val?.new_retail_website_price
                            : "TBD"}
                          {/* {val?.type == 1
                                  ? "$" + val?.new_retail_website_price
                                  : val?.type == 2
                                  ? val.new_second_hand_house_ask
                                    ? "$" + val?.new_second_hand_house_ask
                                    : ""
                                  : val.used_house_ask
                                  ? "$" + val?.used_house_ask
                                  : ""} */}
                        </h2>
                      </div>
                      <div className="compar_mar text-end">
                        <label className="form-check-label">Compare</label>
                        <input
                          type="checkbox"
                          checked={val?.isCompare}
                          className="form-check-input ms-2"
                          onChange={(e) => {
                            props.handleCompare(e.target.checked, val, i);
                          }}
                        />
                      </div>
                    </div>
                    <Heart
                      className="hear-icon"
                      isActive={val?.isfav ? true : false}
                      onClick={() =>
                        HandleAddToFavProductList(!val?.isfav, val?._id)
                      }
                      // onClick={() => HandleFavButton(!val?.isfav, val?._id, i)}
                      animationScale={1.25}
                      style={{ width: "20px" }}
                    />
                  </div>
                ) : null}
              </Col>
            );
          })}
        </Row>
        {/* Start Login Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login modal={() => handleClose()} />
          </Modal.Body>
        </Modal>
        {/* end Login Modal */}
      </Container>:""
      }
      {/* End Top Performer */}

      {/* Start Most Popular */}
      {
        mostPopularProducts?.length > 0 ? 
      <Container>
        <h1 className="fs-4 mb-3">
          Most Popular
          <ReactTooltip
            className="custom-tooltip_buy-sell text-captilize"
            anchorId="app-most-popular"
            place="bottom"
            content=<div dangerouslySetInnerHTML={{ __html: mostpopular }} />
          />
          <span className="question_mark ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="app-most-popular"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-question-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
            </svg>
          </span>
        </h1>

        <Row>
          {mostPopularProducts?.map((val, i) => {
            return (
              <Col xs="12" sm="2" className="mb-3" key={i}>
                {i <= 5 ? (
                  <div
                    className="product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative"
                    onClick={() => HandleRecentlyViewedProduct(val?._id)}
                  >
                    <div onClick={() => navigate(`/product/${val?._id}`)}>
                      {val?.chipset == "Nvidia" ? (
                        <p className="up-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AMD" ? (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : val?.chipset == "AYU" ? (
                        <p className="up-down-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      ) : (
                        <p className="chipset-text position-absolute fw-bold">
                          {val?.chipset}
                        </p>
                      )}
                      <div className="text-center image_parent">
                        <LazyLoadImage
                          src={`${imageUrl}${val?.image[0]}`}
                          onClick={() => navigate(`/product/${val?._id}`)}
                          effect="blur"
                        />{" "}
                      </div>
                    </div>
                    <div className="combine_details">
                      <div
                        className="d-flex align-items-center justify-content-between w-full mb-0"
                        onClick={() => navigate(`/product/${val?._id}`)}
                      >
                        <p>{val?.brand}</p>
                        <div className="w-25 text-end"></div>
                      </div>
                      <div onClick={() => navigate(`/product/${val?._id}`)}>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.series}
                        </p>
                        <p
                          className="mb-0"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.model}
                        </p>

                        <div
                          className="bl-text"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            Condition:{" "}
                            {val?.type == 1
                              ? "New-Retail"
                              : val?.type == 2
                              ? " New-2nd Hand"
                              : "Used"}
                          </p>
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.condition}{" "}
                          </p>
                        </div>
                        <h2
                          className="text-center fw-bold mt-3"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          {val?.new_retail_website_price > 0
                            ? "$" + val?.new_retail_website_price
                            : "TBD"}
                          {/* {val?.type == 1
                                  ? "$" + val?.new_retail_website_price
                                  : val?.type == 2
                                  ? val.new_second_hand_house_ask
                                    ? "$" + val?.new_second_hand_house_ask
                                    : ""
                                  : val.used_house_ask
                                  ? "$" + val?.used_house_ask
                                  : ""} */}
                        </h2>
                      </div>
                      <div className="compar_mar text-end">
                        <label className="form-check-label">Compare</label>
                        <input
                          type="checkbox"
                          checked={val?.isCompare}
                          className="form-check-input ms-2"
                          onChange={(e) => {
                            props.handleCompare(e.target.checked, val, i);
                          }}
                        />
                      </div>
                    </div>
                    <Heart
                      className="hear-icon"
                      isActive={val?.isfav ? true : false}
                      onClick={() =>
                        HandleAddToFavProductList(!val?.isfav, val?._id)
                      }
                      // onClick={() =>
                      //   HandleMostPopularFav(!val?.isfav, val?._id, i)
                      // }
                      animationScale={1.25}
                      style={{ width: "20px" }}
                    />
                  </div>
                ) : null}
              </Col>
            );
          })}
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login modal={() => handleClose()} />
          </Modal.Body>
          {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
        </Modal>
      </Container>:""
      }

      {/* Start Recently Viewed */}
      {recentlyViewedProducts?.length > 0 ? (
        <Container>
          <h1 className="fs-4 mb-3">
            Recently Viewed
            <ReactTooltip
              className="custom-tooltip_buy-sell text-captilize"
              anchorId="app-recently-viewed"
              place="bottom"
              content=<div
                dangerouslySetInnerHTML={{ __html: recentlyviewed }}
              />
            />
            <span className="question_mark ms-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="app-recently-viewed"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-question-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
            </span>
          </h1>

          <Row>
            {recentlyViewedProducts?.map((val, i) => {
              return (
                <Col xs="12" sm="2" className="mb-3" key={i}>
                  {i <= 5 ? (
                    <div
                      className="product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative"
                      onClick={() => HandleRecentlyViewedProduct(val?._id)}
                    >
                      <div onClick={() => navigate(`/product/${val?._id}`)}>
                        {val?.chipset == "Nvidia" ? (
                          <p className="up-text position-absolute fw-bold">
                            {val?.chipset}
                          </p>
                        ) : val?.chipset == "AMD" ? (
                          <p className="chipset-text position-absolute fw-bold">
                            {val?.chipset}
                          </p>
                        ) : val?.chipset == "AYU" ? (
                          <p className="up-down-text position-absolute fw-bold">
                            {val?.chipset}
                          </p>
                        ) : (
                          <p className="chipset-text position-absolute fw-bold">
                            {val?.chipset}
                          </p>
                        )}
                        <div className="text-center image_parent">
                          <LazyLoadImage
                            src={`${imageUrl}${val?.image[0]}`}
                            onClick={() => navigate(`/product/${val?._id}`)}
                            effect="blur"
                          />{" "}
                        </div>
                      </div>
                      <div className="combine_details">
                        <div
                          className="d-flex align-items-center justify-content-between w-full mb-0"
                          onClick={() => navigate(`/product/${val?._id}`)}
                        >
                          <p>{val?.brand}</p>
                          <div className="w-25 text-end"></div>
                        </div>
                        <div onClick={() => navigate(`/product/${val?._id}`)}>
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.series}
                          </p>
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.model}
                          </p>

                          <div
                            className="bl-text"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            <p
                              className="mb-0"
                              onClick={() => navigate(`/product/${val?._id}`)}
                            >
                              Condition:{" "}
                              {val?.type == 1
                                ? "New-Retail"
                                : val?.type == 2
                                ? " New-2nd Hand"
                                : "Used"}
                            </p>
                            <p
                              className="mb-0"
                              onClick={() => navigate(`/product/${val?._id}`)}
                            >
                              {val?.condition}{" "}
                            </p>
                          </div>
                          <h2
                            className="text-center fw-bold mt-3"
                            onClick={() => navigate(`/product/${val?._id}`)}
                          >
                            {val?.new_retail_website_price > 0
                              ? "$" + val?.new_retail_website_price
                              : "TBD"}
                            {/* {val?.type == 1
                                  ? "$" + val?.new_retail_website_price
                                  : val?.type == 2
                                  ? val.new_second_hand_house_ask
                                    ? "$" + val?.new_second_hand_house_ask
                                    : ""
                                  : val.used_house_ask
                                  ? "$" + val?.used_house_ask
                                  : ""} */}
                          </h2>
                        </div>
                        <div className="compar_mar text-end">
                          <label className="form-check-label">Compare</label>
                          <input
                            type="checkbox"
                            checked={val?.isCompare}
                            className="form-check-input ms-2"
                            onChange={(e) => {
                              props.handleCompare(e.target.checked, val, i);
                            }}
                          />
                        </div>
                      </div>
                      <Heart
                        className="hear-icon"
                        isActive={val?.isfav ? true : false}
                        onClick={() =>
                          HandleAddToFavProductList(!val?.isfav, val?._id)
                        }
                        // onClick={() =>
                        //   HandleRecentlyViewedFav(!val?.isfav, val?._id, i)
                        // }
                        animationScale={1.25}
                        style={{ width: "20px" }}
                      />
                    </div>
                  ) : null}
                </Col>
              );
            })}
          </Row>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Login modal={() => handleClose()} />
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}
