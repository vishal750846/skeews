import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import Header from "../../src/components/header";
import BannerSlider from "../components/BannerSlider";
import Productlist from "../components/productlist";
import Multiproduct from "../components/multiproduct";
import Gaming from "../components/gaming";
import Favourite from "../components/favourite";
import Footer from "../components/footer";
import ExportApi from "../api/ExportApi";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Home() {
  let imageBaseUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [Data, setData] = useState([]);
  const [DataFavourite, setDataFavourite] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [Compare, setCompare] = useState([]);
  const [CompareData, setCompareData] = useState([]);
  const [bestDealProduct, setBestDealProduct] = useState();
  const [mostPopular, setMostPopular] = useState();
  const[recentlyViewed,setRecentlyViewed] = useState()

  // Function to get and handle data for products
  const HandleGetProductData = () => {
    if (localStorage.getItem("Compare")) {
      // Check if there is data in the "Compare" localStorage
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);
      setData();
      setTimeout(() => {
        // Fetch all product data
        ExportApi.GetAllProduct()
          .then((resp) => {
            let data = resp.data.details;
            // Iterate through products and mark them as "isCompare" if they are in the compare list
            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              for (let index = 0; index < data.length; index++) {
                const element1 = data[index];

                if (element?._id.includes(element1?._id)) {
                  data[index].isCompare = true;
                } else {
                  data[index].isCompare = false;
                }
              }
            }
            setTimeout(() => {
              setData([...data]);
            });
          })
          .catch((err) => console.log(err));
      });
    } else {
      setData();
      setTimeout(() => {
        // Fetch all product data
        ExportApi.GetAllProduct()
          .then((resp) => {
            let data = resp.data.details;
            setData(data);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  // Function to get product data for compare
  //The given userId is for the specific user
  const HandleGetProductData1 = (userId) => {
    if (localStorage.getItem("Compare")) {
      // Check if there is data in the "Compare" localStorage
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);
      HandleGetfavouriteList(userId);
      setTimeout(() => {
        // Fetch all product data
        ExportApi.GetAllProduct()
          .then((resp) => {
            let data = resp.data.details;
            // Iterate through products and mark them as "isCompare" if they are in the compare list
            for (let i = 0; i < result.length; i++) {
              const element = result[i];

              for (let index = 0; index < data.length; index++) {
                const element1 = data[index];

                if (element?._id.includes(element1?._id)) {
                  data[index].isCompare = true;
                }
              }
            }
            setTimeout(() => {
              setData([...data]);
            });
          })
          .catch((err) => console.log(err));
      });
    } else {
      HandleGetfavouriteList(userId);
      setTimeout(() => {
        // Fetch product data for the given user ID
        ExportApi.GetAllProductUserid(userId)
          .then((resp) => {
            setTimeout(() => {
              let Data = resp.data.details;
              setData([...resp.data.details]);
            }, 1000);
          })
          .catch((err) => console.log(err));
      });
    }
  };



  // Function to add a product to the favorite list
  //The given id is for the specific user
  const addFavorite = (productid) => {
    console.log(productid)
    setData([...productid]);
    if (localStorage.getItem("tokenuser")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
    } else {
    }
  };

  // Function to clear all functionality of the Compare popup
  const HandleClearCompareList = () => {
    localStorage.removeItem("Compare");
    localStorage.removeItem("FavouriteProducts");
    // HandleGetProductData();
    HandleGetBestDealProducts();
    HandleMostPopularProducts();
    setCompare([]);
    setModalShow(false);
    if (localStorage.getItem("tokenuser")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("tokenuser")).id);
      HandleGetProductData1(JSON.parse(localStorage.getItem("tokenuser")).id);
      // HandleRecentlyViewedProducts(JSON.parse(localStorage.getItem("tokenuser")).id)
    } else if (localStorage.getItem("admin")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
      HandleGetProductData1(JSON.parse(localStorage.getItem("admin")).id);
      // HandleRecentlyViewedProducts(JSON.parse(localStorage.getItem("admin")).id)
    }
  };

  // Function to remove a specific product from the Compare popup
  //the given id is the product id which we remove from the compare popup
  const handleCloseButton = (productId) => {
    let result = Compare.filter((item) => item._id != productId);
    localStorage.setItem("Compare", JSON.stringify(result));
    let data2 = JSON.parse(localStorage.getItem("Compare"));
    if (data2?.length == 0) {
      setModalShow(false);
    }
    setCompare(data2)

    // console.log(result)
    // let data = Data;
    // let Dataindex = DataFavourite?.favourite?.find((val, i) => {
    //   if (val._id == productId) {
    //     DataFavourite.favourite[i].isCompare = false;
    //     setDataFavourite({ ...DataFavourite });
    //     localStorage.setItem(
    //       "FavouriteProducts",
    //       JSON.stringify(DataFavourite)
    //     );
    //   }
    // });
    // for (let i = 0; i < data.length; i++) {
    //   let element = data[i];
    //   if (element?._id.includes(id)) {
    //     data[i].isCompare = false;
    //   }
    // }
    // let data2 = JSON.parse(localStorage.getItem("Compare"));
    // if (data2?.length == 1) {
    //   setModalShow(false);
    // }
    // setData([...data]);
    // setCompare(result);
  };

  // Function to add or remove a product in the Compare popup
  // e used for checked functionality of the checkbox
  // val used for the product data
  // i used for checked index
  // data2 used for which component compare is checked
  const handleCompare = (e, val, i, type) => {
    let data = Compare;
    let index = Compare.indexOf(val._id);
    if (e) {
      val.isCompare = true;
      if (type == "Favourite") {
        DataFavourite.favourite[i].isCompare = true;
        setDataFavourite({ ...DataFavourite });
        localStorage.setItem(
          "FavouriteProducts",
          JSON.stringify(DataFavourite)
        );
      }
      if (Compare.length <= 10 && index === -1) {
        Compare.push(val);
        setCompare([...Compare]);
        setTimeout(() => {
          setModalShow(e);
          localStorage.setItem("Compare", JSON.stringify(Compare));
        });
      }
    } else {
      let data;
      Compare.filter((vall, i) => {
        if (vall._id == val._id) {
          data = i;
        }
      });
      // val.isCompare = false;
      // bestDealProduct[i].isCompare = true;
      // setBestDealProduct([...bestDealProduct])
      // Data[i].isCompare = false;
      // setData([...Data]);
      Compare.splice(data, 1);
      if (Compare?.length > 0) {
        setCompare([...Compare]);
        setModalShow(true);
        localStorage.setItem("Compare", JSON.stringify(Compare));
      } else {
        HandleClearCompareList();
      }
    }
  };

    // Function to get data from the favorite list for a specific user
  //The given UserId is for the specific user
  const HandleGetfavouriteList = (UserId) => {
    if (localStorage.getItem("Compare")) {
      // Check if there is data in the "Compare" localStorage
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);
      ExportApi.favouriteList(UserId)
        .then((resp) => {
          let data = resp.data.data;
          if (data.favourite[0] != undefined) {
            // Iterate through products and mark them as "isCompare" if they are in the compare list
            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              for (let index = 0; index < data.length; index++) {
                const element1 = data[index];

                if (element?._id.includes(element1?._id)) {
                  data[index].isCompare = true;
                }
              }
            }
            setDataFavourite({ ...data });
          } else {
            setDataFavourite(null);
          }
        })
        .catch((err) => console.log(err));
    } else {
      ExportApi.favouriteList(UserId)
        .then((resp) => {
          setTimeout(() => {
            if (resp.data.data.favourite[0] == undefined) {
              setDataFavourite(null);
            } else {
              setDataFavourite(resp.data.data);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to fetch user data based on user ID for authentication
  //id used for the specific user id
  const handleSingleUserData = (userId) => {
    ExportApi.getSingleUserData(userId)
      .then((resp) => {
        if (resp.data.message == "user not found") {
          // If the user is not found, dispatch the "Loginout" event
          window.dispatchEvent(new Event("Loginout"));
        } else {
          // Handle the case when user data is found
        }
      })
      .catch((err) => console.log(err));
  };

  //start get the best deal Product
  // const HandleGetBestDealProducts = () => {
  //   const compareData = JSON.parse(localStorage.getItem("Compare"));
  //   ExportApi.getBestDealProducts().then((resp) => {
  //     if (resp.data.message == "Data fetched successfully") {
  //       let response = resp.data.data;
  //       response?.map((item) => {
  //         item["isCompare"] = false;
  //         compareData?.map((val) => {
  //           if (val?._id === item?._id) {
  //             item["isCompare"] = true;
  //           }
  //         });
  //       });
  //       setBestDealProduct(response);
  //     }
  //   });
  // };

  //function to get the Top Performer Product
  const HandleTopPerformerProducts = () => {
    // ExportApi.getBestDealProducts().then((resp) => {
    //   if (resp.data.message == "Data fetched successfully") {
    //     setBestDealProduct(resp.data.data);
    //   }
    // });
  };

  //function to get the Top Performer Product
  // const HandleMostPopularProducts = () => {
  //   const compareData = JSON.parse(localStorage.getItem("Compare"));
  //   ExportApi.getMostPopularProducts().then((resp) => {
  //     if (resp.data.message == "Data fetched successfully") {
  //       let response = resp.data.data;
  //       response?.map((item) => {
  //         item["isCompare"] = false;
  //         compareData?.map((val) => {
  //           if (val?._id === item?._id) {
  //             item["isCompare"] = true;
  //           }
  //         });
  //       });
  //       setMostPopular(response);
  //     }
  //   });
  // };

  // const HandleRecentlyViewedProducts = (id) => {
  //   const compareData = JSON.parse(localStorage.getItem("Compare"));
  //   ExportApi.getRecentlyViewedProducts(id).then((resp) => {
  //     if (resp.data.message == "Data fetched successfully") {
  //       let response = resp.data.data;
  //       response?.map((item) => {
  //         item["isCompare"] = false;
  //         compareData?.map((val) => {
  //           if (val?._id === item?._id) {
  //             item["isCompare"] = true;
  //           }
  //         });
  //       });
  //       setRecentlyViewed(response);
  //     }
  //   });
  // }

  // Function to get data from localStorage for the Compare popup
  useEffect(() => {
    if (localStorage.getItem("Compare")) {
      setCompare(JSON.parse(localStorage.getItem("Compare")));
    }
  }, []);

  // Effect to handle user data and product data based on authentication and tokens
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      HandleGetProductData1(JSON.parse(localStorage.getItem("tokenuser")).id);
      setToken(JSON.parse(localStorage.getItem("tokenuser")));
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
      // HandleRecentlyViewedProducts(JSON.parse(localStorage.getItem("tokenuser")).id)
    } else if (localStorage.getItem("admin")) {
      HandleGetProductData1(JSON.parse(localStorage.getItem("admin")).id);
      setToken(JSON.parse(localStorage.getItem("admin")));
      handleSingleUserData(JSON.parse(localStorage.getItem("admin")).id);
      // HandleRecentlyViewedProducts(JSON.parse(localStorage.getItem("admin")).id)
    } else {
      HandleGetProductData();
    }
  }, []);

  // updateRecenltyViewedProductById/:id

  // Effect to fetch the best deal products
  useEffect(() => {
    // HandleGetBestDealProducts();
    // HandleTopPerformerProducts();
    // HandleMostPopularProducts();
    // HandleRecentlyViewedProducts()
  }, [localStorage.getItem('Compare')]);

  // Effect to get data from the favorite list based on authentication and tokens
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
    } else {
      // Handle the case when neither a user token nor an admin token is present
    }
  }, []);

  // Adding an event listener to the 'window' object for "Login" event
  window.addEventListener("Login", () => {
    // This code block is executed when the "Login" event is triggered

    // Check if a user token exists in localStorage
    if (localStorage.getItem("tokenuser")) {
      // If a user token exists, set it as the token
      setToken(JSON.parse(localStorage.getItem("tokenuser")));

      // After a short delay, fetch user-specific data and favorite list
      setTimeout(() => {
        // Fetch user-specific data using the user's ID from the token
        HandleGetProductData1(JSON.parse(localStorage.getItem("tokenuser")).id);

        // Fetch the user's favorite list
        HandleGetfavouriteList();
      });
    } else {
      // If no user token exists, assume it's an admin and set the admin token
      setToken(JSON.parse(localStorage.getItem("admin")));

      // After a short delay, fetch admin-specific data and favorite list
      setTimeout(() => {
        // Fetch admin-specific data using the admin's ID from the token
        HandleGetProductData1(JSON.parse(localStorage.getItem("admin")).id);

        // Fetch the admin's favorite list
        HandleGetfavouriteList();
      });
    }
  });

  // Adding an event listener to the 'window' object for "Loginout" event
  window.addEventListener("Loginout", () => {
    // This code block is executed when the "Loginout" event is triggered

    // Clear the localStorage
    localStorage.clear();

    // Navigate to the root path ("/")
    navigate("/");
  });


  console.log(DataFavourite,'DataFav')
  return (
    <div>
      <Header />
      <>
        <BannerSlider />
        {Data ? (
          <Productlist
            addFavorite={addFavorite}
            Data={Data}
            bestDealProduct={bestDealProduct}
            mostPopular={mostPopular}
            recentlyViewed={recentlyViewed}
            handleCompare={handleCompare}
          />
        ) : (
          <div className="loader-icon" style={{ marginBlock: "80px" }}>
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          </div>
        )}
        <Multiproduct />
        <Gaming />
        {token && DataFavourite && (
          <Favourite
            data={DataFavourite}
            Title="your favourite"
            handleCompare={handleCompare}
            HandleGetProductData1={HandleGetProductData1}
          />
        )}
        <Footer />
      </>

      {/* Start Compare Popup */}
      <Modal
        show={modalShow}
        className="compare-modal custom-model"
        aria-labelledby="contained-modal-title-vcenter"
        data-backdrop="false"
        centered
      >
        <div className="d-flex flex-coloumn">
          <Modal.Body className="">
            <div className="model-custom-inner">
              {Compare.map((Compare, i) => {
                return (
                  <div
                    key={i}
                    className="inner-pro-cont border p-3 position-relative"
                    id="modal-inner-cont"
                  >
                    <button
                      className="close-box"
                      onClick={() => handleCloseButton(Compare._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                    <div className="d-flex gap-2">
                      <div>
                        {Compare?.chipset == "Nvidia" ? (
                          <p className="up-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : Compare?.chipset == "AMD" ? (
                          <p className="chipset-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : Compare?.chipset == "AYU" ? (
                          <p className="up-down-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : (
                          <p className="chipset-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        )}
                        <LazyLoadImage
                          src={`${imageBaseUrl}${Compare?.image[0]}`}
                          effect="blur"
                        />
                      </div>
                      <div className="custom-model-body text-start">
                        <p className=" w-full mb-0">
                          {Compare?.brand}
                          <div className="w-25 text-end"></div>
                        </p>
                        <p className="mb-0">{Compare?.model}</p>
                        <p className="mb-0">{Compare?.category?.name}</p>
                        <div className="bl-text">
                          <p className="mb-0">
                            Condition:{" "}
                            {Compare?.type == 1
                              ? "New"
                              : Compare?.type == 2
                              ? "2nd Hand"
                              : "Used"}{" "}
                            .{" "}
                          </p>
                          <p className="mb-0">{Compare?.condition} </p>
                        </div>
                        <h2 className=" fw-bold">
                        {Compare?.new_retail_website_price > 0
                            ? "$" + Compare?.new_retail_website_price
                            : "TBD"}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center mt-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#b8b8b8"
                className="bi bi-dash-circle position-absolute end-0 top-0 me-5 mt-3"
                viewBox="0 0 16 16"
                onClick={() => setModalShow(false)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </div>

            <Button
              varient="primary"
              className="px-4"
              onClick={() => navigate("/compareBuySell")}
            >
              Compare
            </Button>
            <Button
              className="px-4 bg-transparent text-blue border-0"
              onClick={() => {
                HandleClearCompareList();
              }}
            >
              Clear All
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Start Compare Button */}
      {Compare[0]?._id && (
        <div className="main_compare_box compare_product_menu">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="compare_product_button">
                  <Button
                    varient="primary"
                    className="px-4"
                    onClick={() => setModalShow(true)}
                  >
                    Compare
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
