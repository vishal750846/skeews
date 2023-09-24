import React, { useEffect, useState } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Header from "../../src/components/header";
import Footer from "../components/footer";
import Buysell from "../../src/components/buysell";
import Favourite from "../components/favourite";
import { useNavigate, useParams } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Heart from "react-heart";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import Login from "../components/Login";
import { toast } from "react-toastify";

export default function Product() {
  const Params = useParams();
  const navigate = useNavigate();
  const path = window.location.href;
  const [show, setShow] = useState(false);
  const [Data, setData] = useState();
  const [filterBrand, setFilterBrand] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [Compare, setCompare] = useState([]);
  const [CompareData, setCompareData] = useState([]);
  const [askAmount, setAskAmount] = useState();
  const [bidAmount, setBidAmount] = useState();
  const [isLoading, setLoading] = useState(false);
  const [secondHouseAskPrice, setSecondHouseAskPrice] = useState();
  const [secondHouseBidPrice, setSecondHouseBidPrice] = useState();
  const [usedBidPrice, setUsedBidPrice] = useState();
  const [usedAskPrice, setUsedAskPrice] = useState();
  const [productType, setProductType] = useState(0);
  const [websitePrice, setWebsitePrice] = useState();
  const [imageData, setImageData] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState(0);

  // Function to fetch and handle single product data
  const HandleGetSingleProductList = () => {
    // Set loading state to true while data is being fetched
    setLoading(true);

    // Check if there's data in localStorage under the key "Compare"
    if (localStorage.getItem("Compare")) {
      // If data exists, parse it and set the "CompareData" state
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);

      // Fetch single product data by its ID
      ExportApi.GetSingleProductData(Params.id)
        .then((resp) => {
          const data2 = resp.data.Data;

          // Set various states with data from the response
          setSecondHouseAskPrice(data2?.new_second_hand_house_ask);
          setSecondHouseBidPrice(data2?.new_second_hand_house_bid);
          setWebsitePrice(data2?.new_retail_website_price);
          setUsedBidPrice(data2?.used_house_bid);
          setUsedAskPrice(data2?.used_house_ask);
          setProductType(data2?.type);
          // setAskAmount(data2?.lowest_ask);
          // setBidAmount(data2?.highest_bid);
          setData(resp?.data?.Data);

          // Fetch all products
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products based on brand and exclude the current product
              const result2 = data?.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Update the "isCompare" property of filtered products
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                for (let index = 0; index < result2.length; index++) {
                  const element1 = result2[index];

                  if (element?._id.includes(element1?._id)) {
                    data[index].isCompare = true;
                  }
                }
              }

              // Set the "FilterBrand" state with the filtered products
              setTimeout(() => {
                setFilterBrand([...result2]);
              });

              // Set the "Count" state
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      // If no data exists in localStorage under the key "Compare"

      // Fetch single product data by its ID
      ExportApi.GetSingleProductData(Params.id)
        .then((resp) => {
          const data2 = resp.data.Data;

          // Set various states with data from the response
          setSecondHouseAskPrice(data2.new_second_hand_house_ask);
          setSecondHouseBidPrice(data2.new_second_hand_house_bid);
          setWebsitePrice(data2.new_retail_website_price);
          setUsedBidPrice(data2.used_house_bid);
          setUsedAskPrice(data2.used_house_ask);
          setProductType(data2.type);
          setImageData(data2.image);
          setData(resp.data.Data);
          // setAskAmount(data2.lowest_ask);
          // setBidAmount(data2.highest_bid);

          // Set loading state to false since data fetching is complete
          setLoading(false);

          // Fetch all products
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products based on brand and exclude the current product
              const result = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Set the "FilterBrand" state with the filtered products
              setTimeout(() => {
                setFilterBrand(result);
              });

              // Set the "Count" state
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to fetch and handle single product data with user-specific ID
  const HandleGetSingleProductList1 = (id) => {
    // Set loading state to true while data is being fetched
    setLoading(true);

    // Check if there's data in localStorage under the key "Compare"
    if (localStorage.getItem("Compare")) {
      // If data exists, parse it and set the "CompareData" state
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);

      // Fetch single product data by its ID with the user-specific ID
      ExportApi.HandleGetSingleUserProduct(Params.id, id)
        .then((resp) => {
          const data2 = resp.data.Data;

          // Set various states with data from the response
          setSecondHouseAskPrice(data2.new_second_hand_house_ask);
          setSecondHouseBidPrice(data2.new_second_hand_house_bid);
          setWebsitePrice(data2.new_retail_website_price);
          setProductType(data2.type);
          setImageData(data2?.image);
          setUsedBidPrice(data2.used_house_bid);
          setUsedAskPrice(data2.used_house_ask);
          setData(resp.data.Data);
          // setAskAmount(data2.lowest_ask);
          // setBidAmount(data2.highest_bid);

          // Fetch all products
          ExportApi.GetAllProduct()
            .then((res) => {
              const data = res.data.details;

              // Filter products based on brand and exclude the current product
              const result2 = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Update the "isCompare" property of filtered products
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                for (let index = 0; index < result2.length; index++) {
                  const element1 = result2[index];

                  if (element?._id.includes(element1?._id)) {
                    data[index].isCompare = true;
                  }
                }
              }

              // Set the "FilterBrand" state with the filtered products
              setTimeout(() => {
                setFilterBrand([...result2]);
              });

              // Set loading state to false since data fetching is complete
              setLoading(false);

              // Set the "Count" state
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      // If no data exists in localStorage under the key "Compare"

      // Fetch single product data by its ID with the user-specific ID
      ExportApi.HandleGetSingleUserProduct(Params.id, id)
        .then((resp) => {
          const data2 = resp.data.Data;

          // Set various states with data from the response
          setData(data2);
          // setAskAmount(data2.lowest_ask);
          // setBidAmount(data2.highest_bid);
          setDescription(data2.description);
          setSecondHouseAskPrice(data2.new_second_hand_house_ask);
          setSecondHouseBidPrice(data2.new_second_hand_house_bid);
          setWebsitePrice(data2.new_retail_website_price);
          setProductType(data2.type);
          setUsedBidPrice(data2.used_house_bid);
          setUsedAskPrice(data2.used_house_ask);
          setImageData(data2?.image);

          // Fetch all products with the user-specific ID
          ExportApi.GetAllProductUserid(id)
            .then((res) => {
              const data = res.data.details;

              // Filter products based on brand and exclude the current product
              const result = data.filter(
                (item) => item.brand == data2.brand && item._id != data2._id
              );

              // Create a new array with "isCompare" set to false for each item
              let result2 = result.map((item) => {
                return { ...item, isCompare: false };
              });

              // Set the "FilterBrand" state with the filtered products
              setFilterBrand([...result2]);

              // Set loading state to false since data fetching is complete
              setLoading(false);

              // Set the "Count" state
              setCount(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // Start close the Login Modal
  const handleClose = () => {
    // This function is used to close a login modal

    // Set the "show" state to false
    setShow(false);
  };

  // Function to show the login modal
  const handleShow = () => {
    // This function is used to display or show the login modal

    // Set the "show" state to true
    setShow(true);
  };

  // Function to handle favorite button clicks
  // data is a boolean value that indicates whether the item is being added to favorites (true) or removed from favorites
  // id represents the unique identifier of the item for which the favorite button is being clicked
  const HandleFavButton = (data, id) => {
    // Delay the execution of the code inside to ensure the UI updates correctly
    setTimeout(() => {
      // Check if a user is logged in (either as a user or admin)
      if (localStorage.getItem("tokenuser") || localStorage.getItem("admin")) {
        if (data) {
          // If data is truthy (indicating that the item is being added to favorites)

          // Create a copy of the existing data
          let newData = Data;
          // Update the 'isfav' property in the copied data to true
          newData.isfav = data;
          // Update the component's state with the new data
          setData({ ...newData });

          // Call the function to add the item to favorites
          HandleAddtoFav(id);
        } else {
          // If data is falsy (indicating that the item is being removed from favorites)

          // Create a copy of the existing data
          let newData = Data;
          // Update the 'isfav' property in the copied data to false
          newData.isfav = data;
          // Update the component's state with the new data
          setData({ ...newData });

          // Call the function to remove the item from favorites
          HandleRemovetoFav(id);
        }
      } else {
        // If no user is logged in, show the login modal
        handleShow();
      }
    });
  };

  // Function to add an item to favorites
  // The 'id' parameter represents the unique identifier of the item to be added to favorites
const HandleAddtoFav = (id) => {
  // Check if a user is logged in as a regular user (tokenuser)
  if (localStorage.getItem("tokenuser")) {
    // If a regular user is logged in, call the API to add the item to their favorites

    // Retrieve the user's ID from local storage
    const userId = JSON.parse(localStorage.getItem("tokenuser")).id;

    // Call the API to add the item to the user's favorites
    ExportApi.AddtoFevreat(id, userId)
      .then((resp) => {
        // Handle the API response if needed (empty in this example)
      })
      .catch((err) => {
        // Handle any errors that occur during the API call
        console.log(err);
      });
  } else {
    // If no regular user is logged in, assume it's an admin

    // Retrieve the admin's ID from local storage
    const adminId = JSON.parse(localStorage.getItem("admin")).id;

    // Call the API to add the item to the admin's favorites
    ExportApi.AddtoFevreat(id, adminId)
      .then((resp) => {
        // Handle the API response if needed (empty in this example)
      })
      .catch((err) => {
        // Handle any errors that occur during the API call
        console.log(err);
      });
  }
};

 // Function to remove an item from the user's favorites
const HandleRemovetoFav = (id) => {
  // The 'id' parameter represents the unique identifier of the item to be removed from favorites

  // Check if a user is logged in as a regular user (localStorage.getItem("tokenuser"))
  if (localStorage.getItem("tokenuser")) {
    // If a regular user is logged in, call the API to remove the item from their favorites
    ExportApi.RemovetoFevreat(
      id,
      JSON.parse(localStorage.getItem("tokenuser")).id
    )
      .then((resp) => {
        // Handle the API response if needed (empty in this example)
      })
      .catch((err) => console.log(err)); // Handle any errors that occur during the API call
  } else {
    // If no regular user is logged in, assume it's an admin (localStorage.getItem("admin"))

    // Call the API to remove the item from the admin's favorites
    ExportApi.RemovetoFevreat(
      id,
      JSON.parse(localStorage.getItem("admin")).id
    )
      .then((resp) => {
        // Handle the API response if needed (empty in this example)
      })
      .catch((err) => console.log(err)); // Handle any errors that occur during the API call
  }
};

// Function to retrieve related products for comparison
const RelatedProductCompare = () => {
  // Check if a regular user is logged in (localStorage.getItem("tokenuser"))
  if (localStorage.getItem("tokenuser")) {
    // If a regular user is logged in, call the HandleGetSingleProductList1 function
    // with the user's ID obtained from the user token
    HandleGetSingleProductList1(
      JSON.parse(localStorage.getItem("tokenuser")).id
    );
  } 
  // Check if an admin is logged in (localStorage.getItem("admin"))
  else if (localStorage.getItem("admin")) {
    // If an admin is logged in, call the HandleGetSingleProductList1 function
    // with the admin's ID obtained from the admin token
    HandleGetSingleProductList1(JSON.parse(localStorage.getItem("admin")).id);
  } 
  // If no user or admin is logged in
  else {
    // Call the HandleGetSingleProductList function without any specific user ID
    HandleGetSingleProductList();
  }
};

const HandleGetAskList = (id) => {
  ExportApi.handleLowestBid(id).then((resp) => {
    if(resp.data.message == "Data Fetched successfully"){
      setAskAmount(resp.data.data[0]?.askAmount)
    }else{
      setAskAmount()
    }
  })
}

const HandleGetBidList = (id) => {
  ExportApi.handleHighestBid(id).then((resp) => {
    if(resp.data.message == "Data Fetched Successfully"){
      setBidAmount(resp.data.data[0]?.bidAmount)
    }else{
      setBidAmount()
    }
  })
}


 // This useEffect is used to initialize the "Compare" state with data from localStorage.
// It runs once when the component is mounted.
useEffect(() => {
  // Check if there is data in localStorage under the key "Compare"
  if (localStorage.getItem("Compare")) {
    // If data exists in "Compare" key, parse it and set it as the "Compare" state.
    setCompare(JSON.parse(localStorage.getItem("Compare")));
  }
}, []);


// This useEffect is used to fetch and load single product data based on user type (user or admin) and the "Params.id" parameter.
// It runs whenever "Params.id" changes.

useEffect(() => {
  // Check if a regular user is logged in by looking for a user token in localStorage
  if (localStorage.getItem("tokenuser")) {
    // If a regular user is logged in, call the "HandleGetSingleProductList1" function
    // with the user's ID obtained from the user token and the "Params.id" parameter.
    HandleGetSingleProductList1(
      JSON.parse(localStorage.getItem("tokenuser")).id,
      Params.id
    );
    HandleGetAskList(Params.id)
    HandleGetBidList(Params.id)
  } 
  // Check if an admin is logged in by looking for an admin token in localStorage
  else if (localStorage.getItem("admin")) {
    // If an admin is logged in, call the "HandleGetSingleProductList1" function
    // with the admin's ID obtained from the admin token and the "Params.id" parameter.
    HandleGetSingleProductList1(
      JSON.parse(localStorage.getItem("admin")).id,
      Params.id
    );
    HandleGetAskList(Params.id)
    HandleGetBidList(Params.id)
  } 
  // If neither a regular user nor an admin is logged in
  else {
    // Call the "HandleGetSingleProductList" function with the "Params.id" parameter.
    // This likely retrieves generic single product data when no user is authenticated.
    HandleGetSingleProductList(Params.id);
    HandleGetAskList(Params.id)
    HandleGetBidList(Params.id)
  }
}, [Params.id]);


  useEffect(() => {
    // This effect runs once when the component mounts (empty dependency array [])

    // Adding an event listener to the 'window' object
    window.addEventListener("LoginEv", () => {
      // This code block is executed when the "LoginEv" event is triggered

      // Call the handleClose function to close the modal
      handleClose();
    });
  }, []);

// This useEffect is used to scroll the window to the top when the component is mounted.
// It runs once when the component is mounted.

useEffect(() => {
  // Use the window.scrollTo() method to scroll the window to the top.
  // The parameters (0, 0) represent the X and Y coordinates, respectively,
  // where (0, 0) is the top-left corner of the window.
  window.scrollTo(0, 0);
}, []);


// Event listener for the "Login" event
window.addEventListener("Login", () => {
  // This event listener is triggered when the "Login" event occurs.

  // Check if a regular user is logged in
  if (localStorage.getItem("tokenuser")) {
    // If a regular user is logged in, call "HandleGetSingleProductList1" after a short delay
    setTimeout(() => {
      HandleGetSingleProductList1(
        JSON.parse(localStorage.getItem("tokenuser")).id
      );
    });
  } else {
    // If no regular user is logged in, assume it's an admin

    // Call "HandleGetSingleProductList1" for the admin after a short delay
    setTimeout(() => {
      HandleGetSingleProductList1(
        JSON.parse(localStorage.getItem("admin")).id
      );
    });
  }
});

// Event listener for the "Loginout" event
window.addEventListener("Loginout", () => {
  // This event listener is triggered when the "Loginout" event occurs.

  // Call "HandleGetSingleProductList" after a short delay
  setTimeout(() => {
    HandleGetSingleProductList();
  });
});

// useEffect to handle the browser's popstate event (e.g., when the user clicks the back button)
useEffect(() => {
  const handlePopState = () => {
    // This function will be called when the user clicks the back button in the browser.

    // Navigate back (-1) in the browser history
    navigate(-1);
    // You can perform any necessary actions here when the back button is clicked
  };

  // Attach the event listener for the browser's popstate event
  window.addEventListener("popstate", handlePopState);

  // Clean up the event listener when the component unmounts to avoid memory leaks
  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);


  return (
    <>
      <Header />
      <Container className="py-3">
        <Row>
          <Col xs="12" md="6">
            {count == 0 ? (
              ""
            ) : (
              <h1 className="fs-2">{`${Data?.brand}  ${Data?.series} ${Data?.model}`}</h1>
            )}
            <p className="blue-text">
              Condition :
              {Data?.type == 1 ? "New" : Data?.type == 2 ? "2nd Hand" : "Used"}
            </p>
          </Col>

          <Col xs="12" md="6">
            <div className="d-flex align-items-center justify-content-end ">
              <h1 className="fs-5 me-5 mb-0">Trade in Nvidia 1080TI </h1>
              <Heart
                isActive={Data?.isfav}
                onClick={() => HandleFavButton(!Data.isfav, Data._id)}
                animationScale={1.25}
                style={{ marginleft: "1rem", width: "18px" }}
              />
              <button
                className="border-0 bg-transparent p-0"
                onClick={() => setModalShow(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-box-arrow-right ms-2 mb-0"
                  viewBox="0 0 18 18"
                >
                  <path
                    filerule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    filerule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Start Buy Sell Price Component */}
      <Buysell
        prm={Params.id}
        Bid={bidAmount}
        Ask={askAmount}
        type={productType}
        website={websitePrice}
        HouseAskprice={secondHouseAskPrice}
        HouseBidPrice={secondHouseBidPrice}
        Image={imageData}
        count={count}
        usedask={usedAskPrice}
        usedbid={usedBidPrice}
      />

      <Container className="py-3">
        <Col lg={12}>
          <div className="d-flex gap-5">
            <div>
              <h4>Product Description</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: description ? description : "Product Description",
                }}
              ></p>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          {filterBrand?.length > 0 ? (
            <Favourite
              Title={"Related product"}
              filterData={filterBrand}
              RelatedProductCompare={RelatedProductCompare}
            />
          ) : (
            ""
          )}
        </Col>
      </Container>
      <Footer />

      {/* Start  share Modal  */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Share With Your Friends
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "space-around" }}>
          <FacebookShareButton url={path}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={path}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <PinterestShareButton url={path} media={path}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <EmailShareButton url={path}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Modal.Body>
      </Modal>

      {/* Start Login Model */}
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
    </>
  );
}
