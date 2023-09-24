import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Form,
  ButtonGroup,
  Button,
  Table,
  Dropdown,
  Row,
  Modal,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

export default function OrderTable() {
  const [products, setproducts] = useState([]);
  const [products1, setproducts1] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [smShow1, setSmShow1] = useState(false);
  const [tabnameTaxt, setTabnameTaxt] = useState(null);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [FilterOnCModal, setFilterOnCModal] = useState();
  const [filterTabNames, setFilterTabNames] = useState([]);
  const [text, setText] = useState();
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [ActiveIndex, setActiveIndex] = useState(0);
  // const [FilterHedertext, setFilterHedertext] = useState([]);
  const [FilterHedertext, setFilterHedertext] = useState();
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState();
  const [returnCount, setReturnCount] = useState();
  const [recentlyCount, setRecentlyCount] = useState();
  const [shippedOutCount, setShippedOutCount] = useState();
  const [readyCount, setReadyCount] = useState();
  const [readyTestCount, setReadyTestCount] = useState();
  const [shippedCount, setShippedCount] = useState();
  const [waitCount, setWaitCount] = useState();
  const [filterColumnName, setFilterColumnName] = useState();
  const [filterTabData, setFilterTabData] = useState();
  const [tabName, setTabName] = useState();
  const [tagName, setTagName] = useState();
  const [singleTabName, setSingleTabName] = useState();
  const [filterName, setFilterName] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [waitingSellerStatus, setWaitingSellerStatus] = useState(false);
  const [shippingSellerStatus, setShippingSellerStatus] = useState(false);
  const [readyTestStatus, setReadTestStatus] = useState(false);
  const [readyShipmentStatus, setReadyShipmentStatus] = useState(false);
  const [shippedOutStatus, setShippedOutStatus] = useState(false);
  const [recentlyDeliveredStatus, setRecentlyDeliveredStatus] = useState(false);
  const [returnStatus, setReturnStatus] = useState(false);
  const [problemOrderStatus, setProblemOrderStatus] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());

  // Define a state variable ShowCol with initial values for column visibility.
  const [ShowCol, setShowCol] = useState({
    order: true,
    Customer: true,
    productname: true,
    paymentStatus: true,
    fulfilment_status: true,
    date: true,
    Delivery_Method: true,
    tag: true,
  });

// Function to create a new tab and handle the API request.
  const handleNewTab = () => {
    ExportApi.createFilterTabName(
      tabnameTaxt,
      FilterOnCModal,
      filterTabData,
      "Order"
    )
      .then((resp) => {
        if (resp.data.message == "Data Created successfully") {
          toast.success("Data created successfully");
          setSmShow1(false);
          handleGetAllFilterTabNames();
          setFilterTabNames([]);
          setFilterTabData();
          setFilterOnCModal();
          setTabnameTaxt();
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Define state variable productChecked for managing product selection.
  const [productChecked, setProductChecked] = useState(
    products?.map(() => false)
  );
  let navigate = useNavigate();

  // Function to handle the "Select All" checkbox
  //event is used for the value that checkbox is selected or not
  const handleSelectAll = (event) => {
    let result = event.target.checked;
    if (result) {
      let data = products1.map((item) => {
        return { ...item, isSelected: true };
      });
      setproducts1([...data]);
    } else {
      let data = products1.map((item) => {
        return { ...item, isSelected: false };
      });
      setproducts1([...data]);
    }
  };



  // Sorting functions for Order Id.
  //key used for the order id filter
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = products1.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //sorting function for buyer Name
  //key used for the buyer name filter
  const sortByName = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = products1.sort((a, b) => {
      if (a.buyerId.firstname < b.buyerId.firstname) return -1 * sortOrder;
      if (a.buyerId.firstname > b.buyerId.firstname) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //sorting name for the product name
  //key used for the Product name filter
  const sortByProduct = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = products1.sort((a, b) => {
      if (a.productId.productname < b.productId.productname)
        return -1 * sortOrder;
      if (a.productId.productname > b.productId.productname) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //sorting function for the payment status
  //key used for the Payment Status filter
  const sortByPaymentStatus = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = products1.sort((a, b) => {
      if (a.payment_details.status < b.payment_details.status)
        return -1 * sortOrder;
      if (a.payment_details.status > b.payment_details.status) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //sorting function for the order status
  //key used for the order Status filter
  const sortByStatus = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = products1.sort((a, b) => {
      if (
        a.deliveryStatusId.deliveryStatus.status <
        b.deliveryStatusId.deliveryStatus.status
      )
        return -1 * sortOrder;
      if (
        a.deliveryStatusId.deliveryStatus.status >
        b.deliveryStatusId.deliveryStatus.status
      )
        return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //function is used for the set the current page number
  //e used for the get the current page number
  const handlePageNumber = (e) => {
    setPageNumber(e.target.innerText);
  };

// This useEffect runs when either ActiveIndex or pageNumber changes.
useEffect(() => {
  // Check if the ActiveIndex is 0 (or some specific value).
  if (ActiveIndex == 0) {
    // If the condition is met, call the function handleOrderPagination with the current pageNumber.
    handleOrderPagination(pageNumber);
  }
}, [ActiveIndex, pageNumber]);

 // Function to handle searching and filtering data based on user input.
 //data used the search value we have input in the search box
const HandleSearchData = (data) => {
  // Use the JavaScript filter() method to create a new array (Data) based on search criteria.
  let Data = products.filter(
    (val) =>
      val?.productId?.productname?.toLowerCase().includes(data.toLowerCase()) || // Check if product name includes the search data
      val?.buyerId?.firstname?.toLowerCase().includes(data.toLowerCase()) || // Check if buyer's first name includes the search data
      val?._id.toLowerCase().includes(data.toLowerCase()) || // Check if ID includes the search data
      val?.payment_details?.status.toLowerCase().includes(data.toLowerCase()) || // Check if payment status includes the search data
      val?.deliveryStatusId?.deliveryStatus?.status.toLowerCase().includes(data.toLowerCase()) // Check if delivery status includes the search data
  );
  // Update the state variable products1 with the filtered data to reflect it in the UI.
  setproducts1([...Data]);
};

// Function to handle pagination of orders based on the selected page.
//Page used for the page number
const handleOrderPagination = (page) => {
  setShowLoader(true); // Show a loader while data is being fetched.

  // Make an API request to retrieve order data for the specified page.
  ExportApi.getOrderPaginationData(page)
    .then((resp) => {
      let data = resp.data.Data;
      console.log(data);
      setproducts1(data); // Update the displayed products with the fetched data.
      setproducts(data); // Update the main products state.
      setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
      setShowLoader(false); // Hide the loader when data is received.
    })
    .catch((err) => {
      console.log(err); // Handle errors if the API request fails.
    });
};

 // Function to handle order filtering based on the 'data' parameter.
 //data used for the which button is selected
const handleOrderFilter = (data) => {
  // Toggle the waitingSellerStatus to its opposite value (true to false or false to true).
  setWaitingSellerStatus(!waitingSellerStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setShippingSellerStatus(false);
  setRecentlyDeliveredStatus(false);
  setReadTestStatus(false);
  setReadyShipmentStatus(false);
  setReturnStatus(false);
  setShippedOutStatus(false);
  setProblemOrderStatus(false);

  // Check if waitingSellerStatus is currently true (filter is active).
  if (waitingSellerStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


 // Function to handle order filtering based on the 'data' parameter for shipping status.
  //data used for the which button is selected
const handleOrderShippingFilter = (data) => {
  // Toggle the shippingSellerStatus to its opposite value (true to false or false to true).
  setShippingSellerStatus(!shippingSellerStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setWaitingSellerStatus(false);
  setReturnStatus(false);
  setRecentlyDeliveredStatus(false);
  setReadTestStatus(false);
  setReadyShipmentStatus(false);
  setShippedOutStatus(false);
  setProblemOrderStatus(false);

  // Check if shippingSellerStatus is currently true (filter is active).
  if (shippingSellerStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


 // Function to handle order filtering based on the 'data' parameter for test status.
  //data used for the which button is selected
const handleOrderTestFilter = (data) => {
  // Toggle the readyTestStatus to its opposite value (true to false or false to true).
  setReadTestStatus(!readyTestStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setShippingSellerStatus(false);
  setRecentlyDeliveredStatus(false);
  setReturnStatus(false);
  setWaitingSellerStatus(false);
  setReadyShipmentStatus(false);
  setShippedOutStatus(false);
  setProblemOrderStatus(false);

  // Check if readyTestStatus is currently true (filter is active).
  if (readyTestStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


  // Function to handle order filtering based on the 'data' parameter for shipment status.
   //data used for the which button is selected
const handleOrderShipmentFilter = (data) => {
  // Toggle the readyShipmentStatus to its opposite value (true to false or false to true).
  setReadyShipmentStatus(!readyShipmentStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setShippedOutStatus(false);
  setReturnStatus(false);
  setRecentlyDeliveredStatus(false);
  setReadTestStatus(false);
  setShippingSellerStatus(false);
  setWaitingSellerStatus(false);
  setProblemOrderStatus(false);

  // Check if readyShipmentStatus is currently true (filter is active).
  if (readyShipmentStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


// Function to handle order filtering based on the 'data' parameter for shipped status.
 //data used for the which button is selected
const handleOrderShippedFilter = (data) => {
  // Toggle the shippedOutStatus to its opposite value (true to false or false to true).
  setShippedOutStatus(!shippedOutStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setRecentlyDeliveredStatus(false);
  setReturnStatus(false);
  setReadyShipmentStatus(false);
  setReadTestStatus(false);
  setShippingSellerStatus(false);
  setWaitingSellerStatus(false);
  setProblemOrderStatus(false);

  // Check if shippedOutStatus is currently true (filter is active).
  if (shippedOutStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};



// Function to handle order filtering based on the 'data' parameter for recently delivered status.
 //data used for the which button is selected
const handleOrderRecentlyFilter = (data) => {
  // Toggle the recentlyDeliveredStatus to its opposite value (true to false or false to true).
  setRecentlyDeliveredStatus(!recentlyDeliveredStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setReturnStatus(false);
  setShippedOutStatus(false);
  setReadyShipmentStatus(false);
  setReadTestStatus(false);
  setShippingSellerStatus(false);
  setWaitingSellerStatus(false);
  setProblemOrderStatus(false);

  // Check if recentlyDeliveredStatus is currently true (filter is active).
  if (recentlyDeliveredStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


 // Function to handle order filtering based on the 'data' parameter for return status.
  //data used for the which button is selected
const handleOrderReturnFilter = (data) => {
  // Toggle the returnStatus to its opposite value (true to false or false to true).
  setReturnStatus(!returnStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setRecentlyDeliveredStatus(false);
  setShippedOutStatus(false);
  setReadyShipmentStatus(false);
  setReadTestStatus(false);
  setShippingSellerStatus(false);
  setWaitingSellerStatus(false);
  setProblemOrderStatus(false);

  // Check if returnStatus is currently true (filter is active).
  if (returnStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


 // Function to handle order filtering based on the 'data' parameter for problem order status.
  //data used for the which button is selected
const handleProblemOrderFilter = (data) => {
  // Toggle the problemOrderStatus to its opposite value (true to false or false to true).
  setProblemOrderStatus(!problemOrderStatus);

  // Reset other filter statuses to false to ensure only one filter is active at a time.
  setReturnStatus(false);
  setRecentlyDeliveredStatus(false);
  setShippedOutStatus(false);
  setReadyShipmentStatus(false);
  setReadTestStatus(false);
  setShippingSellerStatus(false);
  setWaitingSellerStatus(false);

  // Check if problemOrderStatus is currently true (filter is active).
  if (problemOrderStatus) {
    // If it's active, call handleOrderPagination(1) to refresh the data for the first page.
    handleOrderPagination(1);
  } else {
    // If it's not active, make an API request to filter the data based on the 'data' parameter and the current page number (pageNumber).
    ExportApi.orderFilter(data, pageNumber)
      .then((resp) => {
        let data = resp.data.Data;
        setproducts1(data); // Update the displayed products with the filtered data.
        setproducts(data); // Update the main products state.
        setTotalPageNumber(resp.data.totalPage); // Set the total number of pages.
        setLoading(false); // Indicate that loading is complete.
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
      });
  }
};


 // Function to handle tab filtering based on the 'id', 'index', and 'name' parameters.
const handleFilterTab = (id, index, name) => {
  // Show a loading indicator while the data is being fetched.
  setShowLoader(true);

  // Set the active index and log it along with the 'name'.
  setActiveIndex(index);
  console.log(index, name);

  // Check if the selected tab name is "All".
  if (name === "All") {
    // If "All" is selected, display all products and hide the loading indicator.
    setproducts1(products);
    setShowLoader(false);
  } else {
    // If a specific tab other than "All" is selected, make an API request to fetch data based on the 'id'.
    ExportApi.getTagName(id)
      .then((resp) => {
        let data = resp.data;
        console.log(data.data);
        // Check if the API response message indicates success.
        if (data.message === "Data fetched successfully") {
          // Set the tag name, displayed products, and filter name based on the API response.
          // console.log(data.data.filterName);
          setTagName(data.data.filterName);
          setproducts1(data.data.result);
          // setTabName(data.data.tabname);
          setFilterName(data?.data?.tabName);
          setShowLoader(false); // Hide the loading indicator.
        } else {
          //toast.error(resp.data.message); // Display an error toast message.
          setTagName(data.data.filterName);
          setproducts1(data.data.result);
          // setTabName(data.data.tabname);
          setFilterName(data?.data?.tabName);
          setShowLoader(false); // Hide the loading indicator.
        }
      })
      .catch((err) => {
        console.log(err); // Handle errors if the API request fails.
        setShowLoader(false); // Hide the loading indicator.
      });
  }
};


 // Function to handle table filtering.
const handleTableFilter = () => {
  // Set the filter header text based on the 'text' state.
  setFilterHedertext(text);

  // Close the small modal (smShow) if it's open.
  setSmShow(false);

  // Reset the 'text' state.
  setText();
};


 // Function to handle fetching and setting order counts.
const handleOrderCount = () => {
  // Make an API request to fetch order counts.
  ExportApi.getOrderCount()
    .then((resp) => {
      let data = resp.data.Data;

      // Set the various order count states based on the API response.
      setWaitCount(data.Wait);
      setShippedCount(data.Shipped);
      setReadyTestCount(data.ReadyTest);
      setReadyCount(data.Ready);
      setShippedOutCount(data.ShippedOut);
      setRecentlyCount(data.Recently);
      setReturnCount(data.Return);
    })
    .catch((err) => {
      console.log(err); // Handle errors if the API request fails.
    });
};

const [showAll , setShowAll] = useState(0);
// Function to handle fetching all filter tab names related to "Order."
const handleGetAllFilterTabNames = () => {
  // Make an API request to fetch all filter tab names for "Order."
  ExportApi.getAllTabName("Order")
    .then((resp) => {
      if (resp.data.message === "Data fetched Successfully") {
        // Extract the filter tab name data from the API response.
        let data = resp.data.data;
        console.log(data);
        // Set the 'tabName' state with the retrieved data.
        let result = data?.filter(
          (item) => item?.tabName != "All"
        );
        if(result.length > 0) setShowAll(result.length)
        setTabName(data);
       

        console.log(data);

        // Set the 'singleTabName' state with the first filter name from the retrieved data.
        setSingleTabName(data[0]?.filterName);
      } else {
        toast.error(resp.data.message); // Display an error toast message if there's an issue with the API response.
      }
    })
    .catch((err) => {
      console.log(err); // Handle errors if the API request fails by logging them to the console.
    });
};

 // Function to handle clearing a specific filter.
 //name used which tab need to clear
 //filter used for which filter is used
const handleClearFilter = (name, filter , data) => {
  // Make an API request to remove the specified filter.
  if(data == "clearallfilters"){
    setActiveIndex(0);
    return
  }
  ExportApi.removeFilter(name, filter)
    .then((resp) => {
      let data = resp.data;

      // Check if the API response message indicates successful removal of the filter.
      if (data.message === "Data removed successfully") {
        // Display a success toast message.
        toast.success(resp.data.message);

        // Update order counts, filter tab names, and set the active index to 0 to reset filters.
        handleOrderCount();
        handleGetAllFilterTabNames();
        setActiveIndex(0);
      } else {
        // Display an error toast message if there's an issue with the API response.
        toast.error(resp.data.message);
      }
    })
    .catch((err) => {
      console.log(err); // Handle errors if the API request fails by logging them to the console.
    });


};



 // Function to handle checking/unchecking a product based on 'data' and 'id' parameters.
 //id used for the specific productId
 //data used for the checkbox is selected or not
const handleCheck = (data, id) => {
  let product_id = id;

  // Check if 'data' is truthy (e.g., checkbox is checked).
  if (data) {
    // Iterate through the 'products1' array to find the product with the matching '_id'.
    for (let i = 0; i < products1.length; i++) {
      const element1 = products1[i];
      if (element1?._id.includes(product_id)) {
        // Set the 'isSelected' property of the found product to true (selected).
        products1[i].isSelected = true;
      }
    }
  } else {
    // If 'data' is falsy (e.g., checkbox is unchecked), perform the opposite operation.
    // Iterate through the 'products1' array to find the product with the matching '_id'.
    for (let i = 0; i < products1.length; i++) {
      const element1 = products1[i];
      if (element1?._id.includes(product_id)) {
        // Set the 'isSelected' property of the found product to false (unselected).
        products1[i].isSelected = false;
      }
    }
  }

  // Update the 'products1' state to reflect the changes.
  setproducts1([...products1]);
};


const changeAddFilter = (name) =>{


let filter_name = name
setFilterOnCModal('');
setFilterTabData('')
  setTimeout(() => {
    setFilterOnCModal(filter_name);
  }, 1000);

}



// This useEffect runs once when the component is mounted.
useEffect(() => {
  // Fetch order counts and filter tab names when the component is mounted.
  handleOrderCount(); // Fetch order counts.
  handleGetAllFilterTabNames(); // Fetch filter tab names.
}, []);

// This useEffect watches for changes in the 'localStorage' item with key "filterTab."
useEffect(() => {
  // Update 'filterTabNames' state with the value stored in 'localStorage' when it changes.
  setFilterTabNames(JSON.parse(localStorage.getItem("filterTab")));
}, [localStorage.getItem("filterTab")]);


  return (
    <div>
      <ToastContainer />

      <div className="order_stats_card d-lg-flex gap-2 justify-content-between mt-5 product_status">
        <div className="bg-lightgrey text-dark text-center border p-2 rounded-4">
          <h5 className="text-dark fw-bold">Incoming</h5>
          <div className="d-sm-flex gap-2 justify-content-between product_status_parent_button">
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  waitingSellerStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderFilter("Waiting on Seller")}
              >
                Waiting for <br />Seller
              </Button>
              {waitCount > 0 ? (
                <span className="numbering">{waitCount}</span>
              ) : (
                ""
              )}
            </div>
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  shippingSellerStatus == true ? "activeOrderButton" : ""
                }`}setFilterTabData
                onClick={() => handleOrderShippingFilter("Shipped From Seller")}
              >
                Shipping for <br />Seller
              </Button>
              {shippedCount > 0 ? (
                <span className="numbering">{shippedCount}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="bg-lightgrey text-dark text-center border p-2 rounded-4 mt-2 mt-sm-0">
          <h5 className="text-dark fw-bold">Processing</h5>
          <div className="d-sm-flex gap-2 justify-content-between product_status_parent_button">
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  readyTestStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderTestFilter("Ready For Test")}
              >
                Ready for <br />Test
              </Button>
              {readyTestCount > 0 ? (
                <span className="numbering_ready">{readyTestCount}</span>
              ) : (
                ""
              )}
            </div>
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  readyShipmentStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderShipmentFilter("Ready For Shipment")}
              >
                Ready for <br />Shipment
              </Button>
              {readyCount > 0 ? (
                <span className="numbering_shipment">{readyCount}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="bg-lightgrey text-dark text-center border p-2 rounded-4 mt-2 mt-sm-0">
          <h5 className="text-dark fw-bold">Outgoing</h5>
          <div className="d-sm-flex gap-2 justify-content-between product_status_parent_button">
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  shippedOutStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderShippedFilter("Shipped Out")}
              >
                Shipped Out
              </Button>
              {shippedOutCount > 0 ? (
                <span className="numbering_out">{shippedOutCount}</span>
              ) : (
                ""
              )}
            </div>
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  recentlyDeliveredStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderRecentlyFilter("Recently Delivered")}
              >
                Recently Delivered
              </Button>
              {recentlyCount > 0 ? (
                <span className="numbering">{recentlyCount}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="bg-lightgrey text-dark text-center border p-2 rounded-4 mt-2 mt-sm-0">
          <h5 className="text-dark fw-bold">Other</h5>
          <div className="d-sm-flex gap-2 justify-content-between product_status_parent_button">
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  returnStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleOrderReturnFilter("Return", 4)}
              >
                Return
              </Button>
              {returnCount > 0 ? (
                <span className="numbering_return">{returnCount}</span>
              ) : (
                ""
              )}
            </div>
            <div className="tb-card rounded mb-2 mb-lg-0">
              <Button
                className={`border w-100 text-dark bg-grey text-center ${
                  problemOrderStatus == true ? "activeOrderButton" : ""
                }`}
                onClick={() => handleProblemOrderFilter("Problem Orders")}
              >
                Problem Orders
              </Button>
              {/* <span className="numbering">0</span> */}
            </div>
          </div>
        </div>
      </div>
      <Row>
        {tabName?.map((val, i) => {
          return (
            showAll == 0 ? 
            val?.tabName != "All" ?
            <h4
              key={i}
              className={i == ActiveIndex ? "activeOne" : ""}
              style={{
                display: "flex",
                width: "fit-content",
                padding: "5px 15px",
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleFilterTab(val?._id, i, val?.tabName)}
            >
              {val?.tabName}
            </h4>
            :
            <></>
          : 
          <h4
          key={i}
          className={i == ActiveIndex ? "activeOne" : ""}
          style={{
            display: "flex",
            width: "fit-content",
            padding: "5px 15px",
            margin: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterTab(val?._id, i, val?.tabName)}
        >
          {val?.tabName}
        </h4>
        );
        })}
        <hr />
      </Row>
      <div className="d-sm-flex mt-5">
        {/* Start Search Filter */}
        <InputGroup className=" mb-2 mb-sm-0">
          <InputGroup.Text id="basic-addon1" className="bg-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            onChange={(e) => HandleSearchData(e.target.value)}
            placeholder="Filter orders"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {/* end Search Filter */}
        <ButtonGroup
          aria-label="Basic example"
          className="border ms-sm-2 mb-2 mb-sm-0"
        >
          {/* Start Filter Orders */}
          <Button
            variant="light"
            className="d-flex align-items-center"
            onClick={() => setSmShow(true)}
          >
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-filter"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </span>
            Filter
          </Button>
          {/* end Filter Orders  */}

          {/* Start Add Dynamic Column in the table */}
          <Dropdown
            variant="light"
            className="border d-flex align-items-center"
          >
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              className="bg-light text-dark border-0"
            >
              <span className="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-layout-three-columns"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1H1.5zM10 15V1H6v14h4zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11v14z" />
                </svg>
              </span>
              Columns
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form.Check
                inline
                label="Order"
                type={"checkbox"}
                checked={ShowCol.order}
                onChange={(e) => {
                  ShowCol.order = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
              <Form.Check
                inline
                label="Customer"
                type={"checkbox"}
                checked={ShowCol.Customer}
                onChange={(e) => {
                  ShowCol.Customer = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
              <Form.Check
                inline
                label="Product Name"
                type={"checkbox"}
                checked={ShowCol.productname}
                onChange={(e) => {
                  ShowCol.productname = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
              <Form.Check
                inline
                label="Payment Status"
                type={"checkbox"}
                checked={ShowCol.paymentStatus}
                onChange={(e) => {
                  ShowCol.paymentStatus = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
              <Form.Check
                inline
                label="Fulfilment Status"
                type={"checkbox"}
                checked={ShowCol?.fulfilment_status}
                onChange={(e) => {
                  ShowCol.fulfilment_status = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
              <Form.Check
                inline
                label="Date"
                name="group1"
                type={"checkbox"}
                checked={ShowCol.date}
                onChange={(e) => {
                  ShowCol.date = e.target.checked;
                  setShowCol({ ...ShowCol });
                }}
              />
            </Dropdown.Menu>
          </Dropdown>

          {filterTabData ? (
            <Button
              type="button"
              onClick={() => setSmShow1(true)}
              variant="light"
            >
              Save
            </Button>
          ) : null}
          {/* End Add Dynamic Column in the Table */}

          {/* Start Sort Order Acc. to the asc. or desc. order */}
          <Button
            variant="light"
            className="d-flex align-items-center"
            onClick={() => sortHere("_id")}
          >
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down-up"
                viewBox="0 0 16 16"
              >
                <path
                  filerule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
            </span>{" "}
            Sort
          </Button>
          {/* End Sort Order Acc. to the asc. or desc. Order */}
        </ButtonGroup>
        {/* <Button className="bg-light border ms-sm-2 mb-2 mb-sm-0" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill=""
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </Button> */}
      </div>
      <div className="d-flex mt-3 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          {ActiveIndex == 0 ? (
            ""
          ) : (
            <div>
              {tabName?.length > 0 ? (
                <Button
                  className="border bg-custom-light text-dark "
                  onClick={() => handleClearFilter(tagName, filterName , "clearallfilters")}
                >
                  Clear All Filters
                </Button>
              ) : (
                ""
              )}

              <span className="bg-custom-light px-2 py-1 rounded text-dark ms-3 ">
                {tagName == undefined ? singleTabName : tagName}
                <Button
                  className="border-0 bg-none p-0"
                  onClick={() => {
                    setFilterHedertext();
                    setproducts1(products);           
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#000"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                    onClick={() => {handleClearFilter(tagName, filterName , "single")
                    setShowAll(showAll-1)
                  }
                  }
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </Button>
              </span>
            </div>
          )}
        </div>
        {/* ) : localStorage.getItem(selectedTab) ? (
          <div className="d-flex gap-2">
            <span className="bg-custom-light px-2 py-1 rounded text-dark">
              {localStorage.getItem(selectedTab)}
              <Button
                className="border-0 bg-none p-0"
                onClick={() => {
                  localStorage.removeItem(selectedTab)
                  window.location.reload()
                  setproducts1(products);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#000"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </Button>
            </span>
          </div>
        ) : <div className="d-flex gap-2"></div>} */}
      </div>

      {showLoader ? (
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : (
        <div>
          <div className="table-responsive mt-5 mb-5 custom_widht_order">
            {ActiveIndex == 0 ? (
              <Table bordered striped className="align-middle graphic-table">
                <thead>
                  <tr>
                    {ShowCol.order ? (
                      <>
                        <th className="text-center">
                          <Form.Check
                            id="checkbox-all"
                            name="checkbox-all"
                            onChange={(e) => handleSelectAll(event)}
                            className="d-inline"
                            type="checkbox"
                          />
                        </th>
                        <th>
                          Order
                          <svg
                            onClick={() => sortHere("_id")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-chevron-expand ms-2"
                            viewBox="0 0 16 16"
                          >
                            <path
                              filerule="evenodd"
                              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                            />
                          </svg>
                        </th>
                      </>
                    ) : null}

                    {ShowCol.date ? (
                      <th>
                        Date
                        <svg
                          onClick={() => sortHere("createdAt")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.Customer ? (
                      <th>
                        Customer
                        <svg
                          onClick={() => sortByName()}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.productname ? (
                      <th>
                        Product Name
                        <svg
                          onClick={() => sortByProduct()}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.paymentStatus ? (
                      <th>
                        Payment status
                        <svg
                          onClick={() => sortByPaymentStatus()}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol?.fulfilment_status ? (
                      <th>
                        Fulfillment status
                        <svg
                          onClick={() => sortByStatus()}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {products1?.length > 0 ? (
                    products1?.map((product, index) => (
                      <tr key={index}>
                        {ShowCol.order ? (
                          <>
                            <td className="text-center">
                              <Form.Check
                                id={`checkbox-${index}`}
                                name={`checkbox-${index}`}
                                checked={product?.isSelected}
                                onChange={(e) => {
                                  handleCheck(e.target.checked, product?._id);
                                }}
                                className="d-inline"
                                type="checkbox"
                              />
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate("/OrderDetail/" + product._id)
                              }
                            >
                              {product._id}
                            </td>
                          </>
                        ) : null}
                        {ShowCol.date ? (
                          <td>{moment(product?.createdAt).format("L")}</td>
                        ) : null}
                        {ShowCol.Customer ? (
                          <td>{product?.buyerId?.firstname}</td>
                        ) : null}
                        {ShowCol.productname ? (
                          <td>{product?.productId?.productname}</td>
                        ) : null}

                        {ShowCol.paymentStatus ? (
                          <td>
                            {" "}
                            <span className="bg-custom-light py-1 px-3 rounded-pill">
                              {product?.payment_details?.status}
                            </span>
                          </td>
                        ) : null}

                        {/* <td>
              
                    Paid
                  </span>
                </td> */}
                        {ShowCol?.fulfilment_status ? (
                          <td>
                            {product?.deliveryStatusId?.deliveryStatus
                              ?.status == "Waiting on Seller" ? (
                              <Button className="order_status_waiting border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Shipped From Seller" ? (
                              <Button className="order_status_shipped_seller border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    .status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Ready For Test" ? (
                              <Button className="order_status_ready_test border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    .status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Ready For Shipment" ? (
                              <Button className="order_status_ready_shipment border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Shipped Out" ? (
                              <Button className="order_status_shipped_out border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Recently Delivered" ? (
                              <Button className="order_status_recently_delivered border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Return" ? (
                              <Button className="order_status_return border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Return to Seller" ? (
                              <Button className="order_status_return border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                              ) : product?.deliveryStatusId?.deliveryStatus
                              ?.status == "Out For Delivery" ? (
                            <Button className="order_status_OutForDelivery border text-white">
                              {
                                product?.deliveryStatusId?.deliveryStatus
                                  ?.status
                              }
                            </Button>
                            ) : (
                              <Button className="order_status_return border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            )}
                          </td>
                        ) : null}
                      </tr>
                    ))
                  ) : (
                    <span>No Data Found</span>
                  )}
                </tbody>
              </Table>
            ) : (
              <Table bordered striped className="align-middle graphic-table">
                <thead>
                  <tr>
                    {ShowCol.order ? (
                      <>
                        <th className="text-center">
                          <Form.Check
                            id="checkbox-all"
                            name="checkbox-all"
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(event)}
                            className="d-inline"
                            type="checkbox"
                          />
                        </th>
                        <th>
                          Order
                          <svg
                            onClick={() => sortHere("_id")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-chevron-expand ms-2"
                            viewBox="0 0 16 16"
                          >
                            <path
                              filerule="evenodd"
                              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                            />
                          </svg>
                        </th>
                      </>
                    ) : null}

                    {ShowCol.date ? (
                      <th>
                        Date
                        <svg
                          onClick={() => sortHere("createdAt")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.Customer ? (
                      <th>
                        Customer
                        <svg
                          onClick={() => sortHere("firstname")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.productname ? (
                      <th>
                        Product Name
                        <svg
                          onClick={() => sortHere("productname")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol.paymentStatus ? (
                      <th>
                        Payment status
                        <svg
                          onClick={() => sortHere("paymentStatus")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                    {ShowCol?.fulfilment_status ? (
                      <th>
                        Fulfillment status
                        <svg
                          onClick={() => sortHere("delivery_status")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chevron-expand ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            filerule="evenodd"
                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                          />
                        </svg>
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {products1?.length > 0 ? (
                    products1?.map((product, index) => (
                      <tr key={index}>
                        {ShowCol.order ? (
                          <>
                            <td className="text-center">
                              <Form.Check
                                id={`checkbox-${index}`}
                                name={`checkbox-${index}`}
                                checked={product?.isSelected}
                                onChange={() => {
                                  const newProductChecked = [...productChecked];
                                  newProductChecked[index] =
                                    !newProductChecked[index];
                                  setProductChecked(newProductChecked);
                                }}
                                className="d-inline"
                                type="checkbox"
                              />
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate("/OrderDetail/" + product._id)
                              }
                            >
                              {product?._id}
                            </td>
                          </>
                        ) : null}
                        {ShowCol.date ? (
                          <td>{moment(product?.createdAt).format("L")}</td>
                        ) : null}
                        {ShowCol.Customer ? (
                          <td>{product?.buyerId?.firstname}</td>
                        ) : null}
                        {ShowCol.productname ? (
                          <td>{product?.productId?.productname}</td>
                        ) : null}

                        {ShowCol.paymentStatus ? (
                          <td>
                            {" "}
                            <span className="bg-custom-light py-1 px-3 rounded-pill">
                              {product?.payment_details?.status}
                            </span>
                          </td>
                        ) : null}

                        {/* <td>
          
                Paid
              </span>
            </td> */}
                        {ShowCol?.fulfilment_status ? (
                          <td>
                            {product?.deliveryStatusId?.deliveryStatus
                              ?.status == "Waiting on Seller" ? (
                              <Button className="order_status_waiting border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Shipped From Seller" ? (
                              <Button className="order_status_shipped_seller border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Ready For Test" ? (
                              <Button className="order_status_ready_test border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Ready For Shipment" ? (
                              <Button className="order_status_ready_shipment border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Shipped Out" ? (
                              <Button className="order_status_shipped_out border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Recently Delivered" ? (
                              <Button className="order_status_recently_delivered border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Return" ? (
                              <Button className="order_status_return border text-white">
                                {
                                  product.deliveryStatusId.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : product?.deliveryStatusId?.deliveryStatus
                                ?.status == "Return to Seller" ? (
                              <Button className="order_status_return border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            ) : (
                              <Button className="order_status_return border text-white">
                                {
                                  product?.deliveryStatusId?.deliveryStatus
                                    ?.status
                                }
                              </Button>
                            )}
                          </td>
                        ) : null}
                      </tr>
                    ))
                  ) : (
                    <span>No Data Found</span>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      )}
      {FilterHedertext ? (
        ""
      ) : (
        products1?.length > 0 ?
        <Stack spacing={2}>
          <Pagination
            className="order_pagination"
            count={totalPageNumber}
            color="primary"
            hidePrevButton
            hideNextButton
            onChange={(e) => handlePageNumber(e)}
          />
        </Stack>:""
      )}

      <Modal
        className="custom_filter"
        show={smShow1}
        onHide={() => {
          setSmShow1(false);
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>Save as new view </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>View name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setTabnameTaxt(e.target.value);
              }}
            />
            <p>New views will be Saved as tabs at the top of this page</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setSmShow1(false);
            }}
            variant="danger"
          >
            Cancel{" "}
          </Button>
          {tabnameTaxt == null ? (
            <Button variant="success" disabled onClick={handleNewTab}>
              Save view
            </Button>
          ) : filterTabData ? (
            <Button variant="success" onClick={handleNewTab}>
              Save view
            </Button>
          ) : (
            <Button variant="success" disabled onClick={handleNewTab}>
              Save view
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        className="custom_filter"
        show={smShow}
        onHide={() => {
          // setFilterHedertext(text);
          setSmShow(false);
          setFilterOnCModal();
          setText();
        }}
      >
        <Modal.Header closeButton> Filter by</Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="mb-3 p-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  changeAddFilter(e.target.value)
                  // setFilterOnCModal(e.target.value);
                }}
              >
                <option value="">Select Filter </option>
                {/* <option value="order"> Order</option> */}
                <option value="Customer">Customer</option>
                <option value="Product Name">Product Name</option>
                <option value="FulFilment Status">FulFilment Status</option>
              </Form.Select>
            </Col>
            {FilterOnCModal ? (
              <Col className="mt-2" xs={4} xl={4}>
                <Dropdown style={{ marginBottom: "90px" }}>
                  <Dropdown.Toggle id="dropdown-basic">
                    {text ? text : "Select Value"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {FilterOnCModal == "Customer" ? (
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setFilterTabData(e.target.value);
                        }}
                      >
                        <option value="">Select Customer </option>
                        {products1?.map((item) => {
                          return (
                            <option value={item?.buyerId?._id}>
                              {item?.buyerId?.firstname}
                            </option>
                          );
                        })}
                      </Form.Select>
                    ) : FilterOnCModal == "Product Name" ? (
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setFilterTabData(e.target.value);
                        }}
                      >
                        <option value="">Select Product Name </option>
                        {products1?.map((item) => {
                          return (
                            <option value={item?.productId?._id}>
                              {item?.productId?.productname}
                            </option>
                          );
                        })}
                      </Form.Select>
                    ) : FilterOnCModal == "FulFilment Status" ? (
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setFilterTabData(e.target.value);
                        }}
                      >
                        <option value="">Select Status </option>
                        <option value="Waiting on Seller">
                          Waiting on Seller
                        </option>
                        <option value="Shipped From Seller">
                          Shipped From Seller
                        </option>
                        <option value="Ready For Test">Ready For Test</option>
                        <option value="Ready For Shipment">
                          Ready For Shipment
                        </option>
                        <option value="Shipped Out">Shipped Out</option>
                        <option value="Recently Delivered">
                          Recently Delivered
                        </option>
                        <option value="Return">Return</option>
                      </Form.Select>
                    ) : (
                      ""
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            ) : null}
            <Col></Col>
          </Row>
          <Modal.Footer className="border_bottom">
            <Button variant="danger" onClick={() => setSmShow(false)}>
              Close
            </Button>
            {FilterOnCModal && filterTabData ? (
              <Button
                variant="success"
                onClick={() => {
                  handleTableFilter();
                }}
              >
                Done
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={() => {
                  handleTableFilter();
                }}
                disabled
              >
                Done
              </Button>
            )}
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
