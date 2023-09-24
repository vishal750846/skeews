import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../src/images/Image3.png";
import image2 from "../../src/images/Image2.png";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ExportApi from "../api/ExportApi";
import { toast } from "react-toastify";

export default function SimpleSlider() {
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [mainBannerData, setMainBannerData] = useState();
  const [miniLeftBanner, setMiniLeftBanner] = useState();
  const [miniRightBanner, setMiniRightBanner] = useState();
  const [visitCount, setVisitCount] = useState(0);
  const [customSpeedSlider, setCustomSpeedSlider] = useState();
  const [miniBannerCount, setMiniBannerCount] = useState(0);
  const [miniBannerCountRight, setMiniBannerCountRight] = useState(0);
  const [mainBannerCount, setMainBannerCount] = useState(0);
  const [bannerId, setBannerId] = useState();
  const [miniLeftId, setMiniLeftId] = useState();
  const [miniRightId, setMiniRightId] = useState();
  const [mainBannerId, setMainBannerId] = useState([]);

  // Function to get all banner data
  //data used for getting the banner data
  const handlegetAllBannerList = (data) => {
    ExportApi.getBannerAllList(data).then((resp) => {
      if (resp.data.message === "Data Fetched Successfully") {
        // Extract banner data from the response
        let data = resp.data.data;

        // Filter data for mini left banner
        let MiniFilterBannerData = data?.filter((item) => {
          return (
            item?.add === true &&
            item?.active === true &&
            item?.category_type == "Mini Banner left"
          );
        });
        setMiniLeftBanner(MiniFilterBannerData);
        setMiniBannerCount(MiniFilterBannerData[0]?.imageCount);

        // Filter data for mini right banner
        let MiniRightFilterBannerData = data?.filter((item) => {
          return (
            item?.add === true &&
            item?.active === true &&
            item?.category_type == "Mini Banner right"
          );
        });
        setMiniRightBanner(MiniRightFilterBannerData);
        setMiniBannerCountRight(MiniRightFilterBannerData[0]?.imageCount);

        // Filter data for main banner
        let filterData = data?.filter((item) => {
          return (
            item?.add === true &&
            item?.active === true &&
            item?.category_type == "Main Banner"
          );
        });

        // Extract required data for main banner
        let data2 = filterData?.map((item) => {
          return item?.imageName;
        });
        let data4 = filterData?.map((item) => {
          return item?._id;
        });
        let data6 = filterData?.map((item) => {
          return item?.rate;
        });
        let data7 = filterData?.map((item) => {
          return item?.image_link;
        });
        let data8 = filterData?.map((item) => {
          return item?.sort_order;
        });

        // Set state with main banner data
        let data3 = filterData?.map((item) => ({
          ...item,
          imageName: data2,
          _id: data4,
          rate: data6,
          image_link: data7,
          sort_order: data8,
        }));
        let data5 = data3[0];
        const dataArray = [data5];
        setCustomSpeedSlider(dataArray[0].bannerTime);
        setMainBannerId(dataArray[0]._id);
        setMainBannerData(dataArray);
      } else {
        toast.error(resp.data.message);
      }
    });
  };

  // Function to handle when a user rates/clicks on an image in the main banner
  //id specified the image id in the main banner list
  // image specified the image Link in the main banner list
  const HandleImageClickthroughRate = async (id, image) => {
    setBannerId(id); // Set the currently clicked banner image's ID
    const isFound = mainBannerId.find((element) => element === id); // Check if the image's ID is in the mainBannerId array
    let bannerCount = await handleMainBannerSpecificImageCount(isFound);
    let count = Number(bannerCount) + 1; // Increment the image's count
    setMainBannerCount(count); // Update the count in state
    ExportApi.updateBannerCountRate(id, visitCount, count).then((resp) => {
      if (resp.data.message === "Data Updated Successfully") {
        // Redirect to the clicked image's link
        window.location.href = `${image}`;
      } else {
        toast.error(resp.data.message); // Show error message if data update fails
      }
    });
  };

  // Function to get the count of a specific image in the main banner
  //Here id is the specific image id which image we have clicked
  const handleMainBannerSpecificImageCount = (id) => {
    return new Promise((resolve, reject) => {
      ExportApi.getMainBannerImageCount(id)
        .then((resp) => {
          if (resp.data.message === "Data Fetched Successfully") {
            resolve(resp.data.data);
            // Resolve with the specific image's count
          } else {
            reject(new Error("Failed to fetch data")); // Reject with an error if data fetch fails
          }
        })
        .catch((error) => {
          reject(error); // Reject with the caught error
        });
    });
  };

  // Function to handle when a user clicks on an image in the mini left banner
  const HandleMiniLeftBannerClickthroughRate = (id) => {
    setMiniLeftId(id); // Set the currently clicked mini left banner image's ID
    navigate("/categories/63ff36fb23ad0386e761641f/AMD"); // Navigate to a specific category
    let count = Number(miniBannerCount) + 1; // Increment the mini left banner image's count
    setMiniBannerCount(Number(miniBannerCount) + 1); // Update the count in state
    ExportApi.updateBannerCountRate(id, visitCount, count).then((resp) => {
      if (resp.data.message === "Data Updated Successfully") {
        // Success message or action if data update is successful
      } else {
        toast.error(resp.data.message); // Show error message if data update fails
      }
    });
  };

  // Function to handle when a user clicks on an image in the mini right banner
  //Here id is the image id of the mini right banner
  const HandleMiniRightBannerClickthroughRate = (id) => {
    setMiniRightId(id); // Set the currently clicked mini right banner image's ID
    navigate("/categories/63ff36fb23ad0386e761641f/Nvidia"); // Navigate to a specific category
    let count = Number(miniBannerCountRight) + 1; // Increment the mini right banner image's count
    setMiniBannerCountRight(Number(miniBannerCountRight) + 1); // Update the count in state
    ExportApi.updateBannerCountRate(id, visitCount, count).then((resp) => {
      if (resp.data.message === "Data Updated Successfully") {
        // Success message or action if data update is successful
      } else {
        toast.error(resp.data.message); // Show error message if data update fails
      }
    });
  };
  // Function to get the current page visit count
  const handlePageVisitCount = (data) => {
    ExportApi.getBannerAllList(data).then((resp) => {
      if (resp.data.message === "Data Fetched Successfully") {
        let data = resp.data.data;
        let count = data[0]?.pageCount;
        let updatedVisitCount = count + 1;
        setVisitCount(updatedVisitCount);
        handleUpdatePageVisitCount(updatedVisitCount);
      }
    });
  };

  // Function to update the page visit count
  const handleUpdatePageVisitCount = (page) => {
    ExportApi.updateVisitPageCount(page).then((resp) => {
      if (resp.data.message == "Data Updated Successfully") {
        // Success message or action if data update is successful
      }
    });
  };

  // Effect to fetch banner data when counts change
  useEffect(() => {
    handlegetAllBannerList("Main Banner");
  }, [mainBannerCount, miniBannerCount, miniBannerCountRight]);

  // Effect to track visit count and update localStorage
  useEffect(() => {
    handlePageVisitCount("Main Banner");
  }, []);

  // Settings for the slider
  var settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: Number(customSpeedSlider),
  };

  return (
    <div className="outer_banner">
      <Container>
        <div>
          <Row className="banner_custom_slide">
            <Col lg={6} md={6} className="banner_same left mt-4 pe-sm-1">
              <div className="filter_link">
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RX 5000")
                  }
                >
                  RX 5000 Series
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RX 6000")
                  }
                >
                  RX 6000 Series
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RX 7000")
                  }
                >
                  RX 7000 Series
                </p>
              </div>
              {miniLeftBanner?.map((item) => (
                <img
                  src={`${imageUrl}${item?.imageName}`}
                  onClick={() =>
                    HandleMiniLeftBannerClickthroughRate(item?._id)
                  }
                />
              ))}
              <p className="filter_text mb-0">AMD</p>
            </Col>
            <Col lg={6} md={6} className="banner_same right mt-4 ps-sm-1">
              <div className="filter_link">
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RTX 20")
                  }
                >
                  RTX 20 Series
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RTX 30")
                  }
                >
                  RTX 30 Series
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/63ff36fb23ad0386e761641f/RTX 40")
                  }
                >
                  RTX 40 Series
                </p>
              </div>
              {miniRightBanner?.map((item) => (
                <img
                  src={`${imageUrl}${item?.imageName}`}
                  onClick={() =>
                    HandleMiniRightBannerClickthroughRate(item?._id)
                  }
                />
              ))}
              <p className="filter_text mb-0">Nvidia</p>
            </Col>
            {mainBannerData?.map((item, index) => {
              return (
                <Col md={12} lg={12} className="banner_second mt-0" key={index}>
                  <Slider {...settings}>
                    {item != null ? (
                      item?.imageName.map((data, imgIndex) => (
                        <div className="dd mt-0" key={imgIndex}>
                          <img
                            src={`${imageUrl}${data}`}
                            style={{ backgroundSize: "Cover" }}
                            onClick={() =>
                              HandleImageClickthroughRate(
                                item?._id[imgIndex],
                                item?.image_link[imgIndex]
                              )
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="dd">
                          <img
                            src={image1}
                            height="300px"
                            width="100%"
                            onClick={() =>
                              navigate("/product/64b62ae0adaa23ec114372b6")
                            }
                          />
                        </div>
                        <div className="dd">
                          <img
                            src={image2}
                            height="100%"
                            width="100%"
                            onClick={() =>
                              navigate("/product/64b62ae0adaa23ec114372b6")
                            }
                          />
                        </div>
                      </>
                    )}
                  </Slider>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
}
