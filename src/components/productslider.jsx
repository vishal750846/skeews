import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import ExportApi from "../api/ExportApi";
export default function Productslider(props) {
  const params = useParams();
  const [ImageData, setImageData] = useState(props.Data);
  const [updatedData, setUpdatedData] = useState();
  const [CompareData, setCompareData] = useState([]);
  let imageUrl = "https://api.skewws.com/resources/";

  // Slider settings for a carousel/slider component
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  // Settings for another carousel/slider component
  const Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  // Function to handle updating image data
  const handleImage = (data) => {
    // Set the updated image data in the component's state
    setUpdatedData(data);
  };

  // Function to get data for the Single Product Page
  const HandleSingleProductData = () => {
    if (localStorage.getItem("Compare")) {
      // If there is data in localStorage under the key "Compare"
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);

      // Fetch single product data using the "params.id" parameter
      ExportApi.GetSingleProductData(params.id)
        .then((resp) => {
          const data2 = resp.data.Data;
          setImageData(resp.data.Data.image);

          // Fetch all product data
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products that have the same brand but a different ID
              const result2 = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Update product data to mark items that are in comparison
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                for (let index = 0; index < result2.length; index++) {
                  const element1 = result2[index];

                  if (element?._id.includes(element1?._id)) {
                    data[index].isCompare = true;
                  }
                }
              }

              // Set filtered product data in the component's state
              setTimeout(() => {
                setFilterBrand([...result2]);
              });

              // Set a count or flag, possibly for rendering purposes
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      // If there is no data in "Compare" key in localStorage

      // Fetch single product data using the "params.id" parameter
      ExportApi.GetSingleProductData(params.id)
        .then((resp) => {
          const data2 = resp.data.Data;
          setImageData(data2.image);

          // Fetch all product data
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products that have the same brand but a different ID
              const result = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Set filtered product data in the component's state
              setTimeout(() => {
                setFilterBrand(result);
              });

              // Set a count or flag, possibly for rendering purposes
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to get data for the Single Product Page (variant for specific user ID)
  const HandleSingleProductData1 = (id) => {
    if (localStorage.getItem("Compare")) {
      // If there is data in localStorage under the key "Compare"
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);

      // Fetch single user-specific product data using the "params.id" and "id" parameters
      ExportApi.HandleGetSingleUserProduct(params.id, id)
        .then((resp) => {
          const data2 = resp.data.Data;
          setImageData(data2?.image);

          // Fetch all product data
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products that have the same brand but a different ID
              const result2 = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Update product data to mark items that are in comparison
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                for (let index = 0; index < result2.length; index++) {
                  const element1 = result2[index];

                  if (element?._id.includes(element1?._id)) {
                    data[index].isCompare = true;
                  }
                }
              }

              // Set filtered product data in the component's state
              setTimeout(() => {
                setFilterBrand([...result2]);
              });

              // Set a count or flag, possibly for rendering purposes
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      // If there is no data in "Compare" key in localStorage

      // Fetch single user-specific product data using the "params.id" and "id" parameters
      ExportApi.HandleGetSingleUserProduct(params.id, id)
        .then((resp) => {
          const data2 = resp.data.Data;
          setImageData(data2?.image);

          // Fetch all user-specific product data
          ExportApi.GetAllProductUserid(id)
            .then((res) => {
              const data = res.data.details;

              // Filter products that have the same brand but a different ID
              const result = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Create a modified result with an "isCompare" flag set to false
              let result2 = result.map((item) => {
                return { ...item, isCompare: false };
              });

              // Set filtered product data in the component's state
              // setFilterBrand([...result2]);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // useEffect to fetch and load product data based on user type (user or admin)
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      // If a regular user is logged in, call "HandleSingleProductData1" with the user's ID
      HandleSingleProductData1(
        JSON.parse(localStorage.getItem("tokenuser")).id
      );
    } else if (localStorage.getItem("admin")) {
      // If an admin is logged in, call "HandleSingleProductData1" with the admin's ID
      HandleSingleProductData1(JSON.parse(localStorage.getItem("admin")).id);
    } else {
      // If no user is logged in, call "HandleSingleProductData"
      HandleSingleProductData();
    }
  }, [params.id]);

  return (
    <div>
      <div className="sliderimg-part">
        {updatedData ? (
          <img
            className="mx-auto d-block product-main-img"
            src={`${imageUrl}${updatedData}`}
            effect="blur"
            height="300px"
            width="300px"
          />
        ) : (
          <img
            className="mx-auto d-block product-main-img"
            src={`${imageUrl}${ImageData[0]}`}
            effect="blur"
            height="300px"
            width="300px"
          />
        )}
      </div>
      <div className="position-relative product_page_slider">
        {ImageData?.length > 4 ? (
          <Slider {...sliderSettings}>
            {ImageData.map((item, i) => {
              return (
                <LazyLoadImage
                  key={i}
                  className="mx-auto d-block border"
                  src={`${imageUrl}${item}`}
                  effect="blur"
                  height="100px"
                  width="100px"
                  onClick={() => handleImage(item)}
                />
              );
            })}
          </Slider>
        ) : ImageData.length > 1 ? (
          <Slider className="minimum_images" {...Settings}>
            {ImageData.map((item, i) => {
              return (
                <LazyLoadImage
                  key={i}
                  className="mx-auto d-block border"
                  src={`${imageUrl}${item}`}
                  effect="blur"
                  height="100px"
                  width="100px"
                  onClick={() => handleImage(item)}
                />
              );
            })}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
