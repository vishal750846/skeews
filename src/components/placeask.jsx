// Import React and necessary dependencies
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap"; // Import components from react-bootstrap
import Tablepart from "../../src/components/tablepart"; // Import the Tablepart component
import Bidtab from "../../src/components/bidtab"; // Import the Bidtab component
import ExportApi from "../api/ExportApi"; // Import an API utility
import StokChart from "./StokChart"; // Import the StokChart component
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage for lazy-loading images
import "react-lazy-load-image-component/src/effects/blur.css"; // Import a CSS effect
import { toast, ToastContainer } from "react-toastify"; // Import toast notifications
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom for routing

// Define and export the Placeask component
export default function Placeask(props) {
  let imageUrl = "https://api.skewws.com/resources/"; // Define the base URL for images
  const params = useParams(); // Get route parameters
  const [Data, setData] = useState([]); // State for product data
  const [ask, setAsk] = useState([]); // State for ask data
  const [Bid, setBid] = useState([]); // State for bid data
  const [bidAmount, setBidAmount] = useState(); // State for bid amount
  const [askAmount, setAskAmount] = useState(); // State for ask amount
  const [count, setCount] = useState(0); // State for counting asks
  const [secondHouseAskPrice, setSecondHouseAskPrice] = useState(); // State for second-hand ask price
  const [secondHouseBidPrice, setSecondHouseBidPrice] = useState(); // State for second-hand bid price
  const [websitePrice, setWebsitePrice] = useState(); // State for website price
  const [usedPrice, setUsedPrice] = useState(); // State for used price
  const [productType, setProductType] = useState(); // State for product type
  const [usedBidPrice, setUsedBidPrice] = useState(); // State for used bid price
  const [count1, setCount1] = useState(0); // State for counting bids
  const [userId, setUserId] = useState(0); // State for user ID
  const [image, setImage] = useState([]); // State for product image
  const [currentSortOrder, setCurrentSortOrder] = useState(1); // State for sorting order
  const [currentSortKey, setCurrentSortKey] = useState(null); // State for sorting key
  const [shippingFee, setShippingFee] = useState(); // State for shipping fee
  const [isLoading, setLoading] = useState(false); // State for loading indicator
  const [shippingFeeError, setShippingFeeError] = useState(false); // State for shipping fee error

  // Function to fetch product data
  const handleSearch = () => {
    setLoading(true); // Set loading state to true
    ExportApi.GetSingleProductData(props.prams)
      .then((resp) => {
        setData(resp.data.Data);
        setSecondHouseBidPrice(resp.data.Data.new_second_hand_house_bid);
        setSecondHouseAskPrice(resp.data.Data.new_second_hand_house_ask);
        setWebsitePrice(resp.data.Data.new_retail_website_price);
        setUsedPrice(resp.data.Data.used_house_ask);
        setUsedBidPrice(resp.data.Data.used_house_bid);
        setProductType(resp.data.Data.type);
        setImage(resp.data.Data.image[0]);
        setLoading(false); // Set loading state to false
      })
      .catch((err) => console.log(err));
  };

  // Function to fetch ask data
  const handleAsk = () => {
    ExportApi.getask(props.prams)
      .then((resp) => {
        if (resp.data.data?.length > 0) {
          setAsk(resp.data.data);
          setAskAmount(resp.data.data[0].askAmount);
          setCount(1);
        } else {
          setCount(2);
          setAsk([]);
        }
      })
      .catch((err) => console.log(err));
  };

  // Function to sort ask table
  const sortAskHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = ask.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  // Function to fetch bid data
  const handleBid = () => {
    ExportApi.getBid(props.prams)
      .then((resp) => {
        if (resp.data.data?.length > 0) {
          setCount1(1);
          setBid(resp.data.data);
          setBidAmount(resp.data.data[0].bidAmount);
        } else {
          setCount1(2);
          setBid([]);
        }
      })
      .catch((err) => console.log(err));
  };

  // Function to sort bid table
  //key used for the column name which we have to sort
  const sortBidHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = Bid.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  // Function to handle shipping fee
  const HandleShippingFee = async (userId) => {
    const shippingFeeResult = await ExportApi.getshippingFee(userId);
    if (shippingFeeResult.data.message === "Data fetched successfully") {
      setShippingFee(Number(shippingFeeResult?.data?.Data?.shippingFee));
      setShippingFeeError(false);
    } else if (params.buy === "buy" || params.buy === "sell" || params.buy === undefined) {
      toast.error(shippingFeeResult?.data?.message);
      setShippingFeeError(true);
    }
  };

  console.log(params.buy)

  // Effect to fetch data when the component mounts
  useEffect(() => {
    handleSearch();
    handleAsk();
    handleBid();
  }, []);

  // Effect to listen for custom events and refresh data
  useEffect(() => {
    window.addEventListener("List", () => {
      handleSearch();
      handleAsk();
      handleBid();
    });
  }, []);

  // Effect to get user ID and handle shipping fee
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      setUserId(JSON.parse(localStorage.getItem("tokenuser")).id);
      HandleShippingFee(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      setUserId(JSON.parse(localStorage.getItem("admin")).id);
      HandleShippingFee(JSON.parse(localStorage.getItem("admin")).id);
    } else {
    }
  }, [localStorage.getItem("tokenuser"), localStorage.getItem("admin")]);

  // Conditional rendering for loading indicator
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

  // Render the main content of the component
  return (
    <div className="ask-part">
      <Container className="py-5">
        <Row>
          <Col xs="12" lg="8">
            {/* Render product information */}
            <h1>{`${Data?.brand}  ${Data?.series} ${Data?.model}`}</h1>
            <p className="condition">
              Condition :
              <span>
                {Data?.type == 1
                  ? "New"
                  : Data?.type == 2
                  ? "2nd Hand"
                  : "Used"}
              </span>
            </p>
            <div className="inner-bid-cont d-flex align-items-start gap-4 mt-5">
              <div className="bid_product_image">
                {/* Lazy-load the product image */}
                <LazyLoadImage src={`${imageUrl}${image}`} effect="blur" />
              </div>
              {Data?.type == 1 ? (
                ""
              ) : (
                <>
                  <div className="bid-table">
                    {count1 > 1 ? (
                      ""
                    ) : (
                      <p className="bidask_label text-center">Bids</p>
                    )}
                    <Table responsive="sm" striped bordered hover>
                      <thead>
                        {count1 > 1 ? (
                          ""
                        ) : (
                          <tr>
                            <th onClick={() => sortBidHere("bidAmount")}>
                              Bid{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-chevron-expand"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  filerule="evenodd"
                                  d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                                />
                              </svg>
                            </th>
                            <th>Quantity</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {count1 == 0 ? (
                          <tr>
                            <td>
                              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                            </td>
                          </tr>
                        ) : count1 == 1 ? (
                          <>
                            {Bid?.length > 0 || secondHouseBidPrice ? (
                              Bid.map((val) => {
                                return val?.userId == userId ? (
                                  <>
                                    <tr style={{ backgroundColor: "#75b299" }}>
                                      <td>${val?.bidAmount}</td>
                                      <td> 1</td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td>${val?.bidAmount}</td>
                                      <td> 1</td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : null}
                          </>
                        ) : (
                          <span className="no_bid">
                            There is no Bid for this product
                          </span>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <div className="bid-table">
                    {/* Render the Tablepart component for asks */}
                    <Tablepart
                      h1={"Quantity"}
                      h2={"Ask"}
                      data={ask}
                      amount={secondHouseAskPrice}
                      count={count}
                      sortAskHere={sortAskHere}
                    />
                  </div>
                </>
              )}
            </div>
            {/* Render the StokChart component */}
            <StokChart />
          </Col>
          <Col xs="12" lg="4">
            {/* Render the Bidtab component */}
            <Bidtab
              Bid={bidAmount}
              Ask={askAmount}
              website={websitePrice}
              used={usedPrice}
              second={secondHouseAskPrice}
              secondBid={secondHouseBidPrice}
              usedBid={usedBidPrice}
              type={productType}
              shippingFee={shippingFee}
              error={shippingFeeError}
            />
          </Col>
        </Row>
      </Container>
      {/* Render the ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
}
