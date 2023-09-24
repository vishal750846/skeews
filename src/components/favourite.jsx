import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Heart from "react-heart";
import { useNavigate } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Favourite(props) {
  let navigate = useNavigate();
  let imageUrl = "https://api.skewws.com/resources/";
  const [first, setfirst] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [Compare, setCompare] = useState([]);

  // Function for handling the Compare functionality
  //e used for checking the checkbox is selected or not
  //val used for get the product data
  //i used  for the index
  const handleCompare = (e, val, i) => {
    if (e) {
      val.isCompare = true;
      first[i].isCompare = true;
      setfirst([...first]);
      if (Compare?.length <= 10) {
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
      val.isCompare = false;
      first[i].isCompare = false;
      setfirst([...first]);
      Compare.splice(data, 1);
      setCompare([...Compare]);
      setModalShow(false);
      localStorage.setItem("Compare", JSON.stringify(Compare));
    }
  };

  // Function for handling the Favorite button
  //data used for check that fav. is true or false
  //id used for the specific product
  //i used for the index
  const HandleFavButton = (data, id, i) => {
    console.log(data,id,i)
    if (data) {
      let newData = [...first];
      newData[i].isfav = data;
      setfirst([...newData]);
      HandleAddtoFav(id);
    } else {
      let newData = [...first];
      newData[i].isfav = data;
      setfirst([...newData]);
      HandleRemovetoFav(id);
    }

    // Dispatch a custom event to notify productlist.jsx to trigger its useEffect
    // const event = new Event("triggerProductListEffect");
    // document.dispatchEvent(event);
  };

  // Function to add a product to the Favorite List
  //id used for the specific product to add in the Favorite List
  const HandleAddtoFav = (id) => {
    console.log('productId',id)
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

  // Function to remove a product from the Favorite List
  //id used for the specified product to remove from the Favorite List
  const HandleRemovetoFav = (id) => {
    if (localStorage.getItem("tokenuser")) {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("tokenuser")).id
      )
        .then((resp) => {
          props.HandleGetProductData1(
            JSON.parse(localStorage.getItem("tokenuser")).id
          );
        })
        .catch((err) => console.log(err));
    } else {
      ExportApi.RemovetoFevreat(
        id,
        JSON.parse(localStorage.getItem("admin")).id
      )
        .then((resp) => {
          props.HandleGetProductData1(
            JSON.parse(localStorage.getItem("admin")).id
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // Function for handling Compare functionality for related products
  //e used for checking the checkbox is selected or not
  //val used for get the product data
  //i used  for the index
  const handleRelatedProductCompare = (e, val, i) => {
    if (props.filterData) {
      handleCompare(e, val, i);
    } else {
      props.handleCompare(e, val, i, "Favourite");
    }
  };

  // Function to remove a specific product from the Compare popup
  //the given id is the product id which we remove from the compare popup
  const handleCloseButton = (id) => {
    let result = Compare.filter((item) => item._id != id);
    let data = first;
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      if (element?._id.includes(id)) {
        data[i].isCompare = false;
      }
    }
    let data2 = JSON.parse(localStorage.getItem("Compare"));
    if (data2?.length == 1) {
      setModalShow(false);
    }
    setfirst([...data]);
    setCompare(result);
    localStorage.setItem("Compare", JSON.stringify(result));
  };
  // Effects for initial data loading and updates
  useEffect(() => {
    if (localStorage.getItem("Compare")) {
      setCompare(JSON.parse(localStorage.getItem("Compare")));
    }
  }, []);

  useEffect(() => {
    if (props.filterData) {
      let data1 = props.filterData;
      let data2 = data1;
      let result = JSON.parse(localStorage.getItem("Compare"));
      for (let i = 0; i < result?.length; i++) {
        const element = result[i];
        for (let index = 0; index < data2.length; index++) {
          const element1 = data2[index];

          if (element?._id.includes(element1?._id)) {
            data2[index].isCompare = true;
          }
          setfirst(data2);
        }
      }
      setfirst(data2);
    } else {
      let data1 = props.data?.favourite;
      if (data1) {
        for (let index = 0; index < props.data?.favourite.length; index++) {
          data1[index].isfav = true;
          let data2 = data1;
          let result = JSON.parse(localStorage.getItem("Compare"));
          for (let i = 0; i < result?.length; i++) {
            const element = result[i];
            for (let index = 0; index < data2.length; index++) {
              const element1 = data2[index];

              if (element?._id.includes(element1?._id)) {
                data2[index].isCompare = true;
              }
            }
          }
          setfirst(data2);
        }
      } else {
        setfirst(data1);
      }
    }
  }, [props.data]);

  return (
    <div className="product_all_view py-4">
      <Container>
        <h1 className="fs-4 mb-3 text-capitalize">{props.Title}</h1>

        <Row>
          {first?.map((val, i) => {
            return (
              <Col xs="12" sm="2" className="mb-3" key={i}>
                {i <= 5 ? (
                  <div
                    className="product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative">
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
                        onClick={() => navigate(`/product/${val._id}`)}
                      >
                        <LazyLoadImage
                          src={`${imageUrl}${val?.image[0]}`}
                          onClick={() => navigate(`/product/${val._id}`)}
                          effect="blur"
                        />{" "}
                      </div>
                    </div>
                    <div className="combine_details">
                      <div
                        className="d-flex align-items-center justify-content-between w-full mb-0"
                        onClick={() => navigate(`/product/${val._id}`)}
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
                          onClick={() => navigate(`/product/${val._id}`)}
                        >
                          <p
                            className="mb-0"
                            onClick={() => navigate(`/product/${val._id}`)}
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
                            onClick={() => navigate(`/product/${val._id}`)}
                          >
                            {val?.condition}
                          </p>
                        </div>
                        <h2
                          className="text-center fw-bold mt-3"
                          onClick={() => navigate(`/product/${val._id}`)}
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
                        HandleFavButton(!val?.isfav, val?._id, i)
                      }
                      animationScale={1.25}
                      style={{ width: "20px" }}
                    />
                  </div>
                ) : null}
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Start Open Compare Modal  */}
      {props.filterData && (
        <Modal
          show={modalShow}
          className="compare-modal custom-model"
          aria-labelledby="contained-modal-title-vcenter"
          data-backdrop="false"
          centered
        >
          <div className="d-flex flex-coloumn">
            <Modal.Body>
              <div className="model-custom-inner">
                {Compare.map((Compare, i) => {
                  return (
                    <div
                      className="inner-pro-cont border p-3 position-relative"
                      id="modal-inner-cont"
                      key={i}
                    >
                      <button
                        className="close-box"
                        onClick={() => handleCloseButton(Compare._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fillRule="currentColor"
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
                            src={`${imageUrl}${Compare?.image[0]}`}
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
                                : "Used"}
                            </p>
                            <p className="mb-0">{Compare?.condition} </p>
                          </div>
                          <h2 className=" fw-bold">
                            {Compare?.type == 1
                              ? "$" + Compare?.new_retail_website_price
                              : Compare?.type == 2
                              ? Compare.new_second_hand_house_ask
                                ? "$" + Compare?.new_second_hand_house_ask
                                : ""
                              : Compare.used_house_ask
                              ? "$" + Compare?.used_house_ask
                              : ""}
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
                  fillRule="#b8b8b8"
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
              {props.Title == "Related product" ? (
                <Button
                  className="px-4 bg-transparent text-blue border-0"
                  onClick={() => {
                    setfirst();
                    setCompare([]);
                    setModalShow(false);
                    localStorage.removeItem("Compare");
                    localStorage.removeItem("FavouriteProducts");
                    props.RelatedProductCompare();
                  }}
                >
                  Clear All
                </Button>
              ) : (
                <Button
                  className="px-4 bg-transparent text-blue border-0"
                  onClick={() => {
                    setfirst();
                    setCompare([]);
                    setModalShow(false);
                    setTimeout(() => {
                      setfirst([...props.filterData]);
                    }, 1000);
                    localStorage.removeItem("Compare");
                  }}
                >
                  Clear All
                </Button>
              )}
            </Modal.Footer>
          </div>
        </Modal>
      )}
      {/* End Open Compare Modal */}

      {/* Start Compare Button */}
      {props.filterData && Compare[0]?._id && (
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
      {/* End Compare Button */}
    </div>
  );
}
