import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table, Modal } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export default function BuyingTab() {
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [bidData, setBidData] = useState();
  const [allBidData, setAllBidData] = useState();
  const [descriptionindex, setdescriptionindex] = useState();
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [loader, setLoader] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  //Filter State
  const [conditionKey, setconditionKey] = useState([]);
  const [chipsetKey, setchipsetKey] = useState([]);
  const [brandKey, setbrandKey] = useState([]);
  const [seriesKey, setseriesKey] = useState([]);
  const [modalKey, setmodalKey] = useState([]);
  const [FilterList, setFilterList] = useState();
  const [chipsetShow, setChipsetShow] = useState(false);
  const [seriesShow, setSeriesShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [condition1, setcondition1] = useState([]);
  const [brandShow, setBrandShow] = useState(false);
  const [chipset, setchipset] = useState([]);
  const [condition, setcondition] = useState([]);
  const [brand, setbrand] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [batchCount, setBatchCount] = useState();
  const [batchStatus, setBatchStatus] = useState();
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [batchData, setBatchData] = useState([]);
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();
  const [hideBatchStatus, setHideBatchStatus] = useState(false);
  const [bidlistStatus, setBidListStatus] = useState(false);
  const [previousBidList, setPreviousBidList] = useState([]);

  const [alreadyCreatedBatch , setAlreadyCreatedBatch] = useState(false);

  const [quantity, setQuantity] = useState();
  const [expiration, setExpiration] = useState();
  
  const htmlString =
    "<p class='tl_name'><strong>Why batch</strong><p class='inn-text'>If you only want to buy one item but would like to<br/> bid on multiple items to get the best deal this tool<br/> is for you!<p/><br/><strong>How it works</strong><p class='inn-text'>When any item in the batch sells to you, all of <br/> your existing bids on the other items in the batch<br/> will be automatically deactivated. This makes it<br/> safe for you to bid on many items without risking<br/> to purchase more than one item.</p><br/><strong>Instructions</strong><br/><p class='inn-text'>Add items to batch</strong><br/>1. Select the items you would like to add.<br/>2. Click batch.<br/></p><strong>Remove items from batch</strong><br/><p class='inn-text'>1. Unselect the items you would like to remove.</p>";
  // Function to get the data of the bid list based on a user ID
  const handleGetBidList = (id) => {
    setUserId(id);
    // Call the API to fetch bid list data for the specified user ID
    ExportApi.getBidList(id)
      .then((resp) => {
        if (resp.data.message == "Bid found") {
          let data = resp.data.data;
          // If bids are found, set the bid data and loader state accordingly
          console.log("Bid List Page", resp.data.data);
          setAllBidData(data);
          let bidStatus = data?.filter((item) => item?.bidStatus == true);
          let BatchStatus = data?.filter((item) => item?.batchStatus == true);
          console.log(BatchStatus, "Batch Status True");
          // setSelectedData(BatchStatus);
          setBatchData(BatchStatus);
          setBidData(bidStatus);
          // let BCount = BatchStatus?.length / 2;
          // console.log(BCount);
          // if (BCount == 0.5) {
          //   setBatchCount(BCount);
          // } else {
          //   setBatchCount(Math.ceil(BCount) - 1);
          // }
          setLoader(1);
        } else {
          // If no bids are found, set the loader state accordingly
          setLoader(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });

      ExportApi.checkBatchStatus(id)
      .then((resp) => {    
        if (resp?.data?.statusCode == 200) {
          setAlreadyCreatedBatch(resp?.data.data.batch) 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortedData = bidData?.sort((a, b) => {
    if (a.batchStatus && !b.batchStatus) {
      return -1;
    }
    if (!a.batchStatus && b.batchStatus) {
      return 1;
    }
    return 0;
  });

  // console.log(batchCount)

  // to show the popup of the create batch
  const handleCreateBatch = () => {
    setShowButtonLoader(true);
    ExportApi.createBatch(selectedData, userId, "sell")
      .then((resp) => {
        if (resp.data.message == "Batch Created Successfully") {
          toast.success(resp.data.message);
          setSelectedData([]);
          setShowButtonLoader(false);
          handleGetBidList(userId);
          HandleGetFilterListData();
        } else {
          toast.error(resp.data.message);
          setSelectedData([]);
          setShowButtonLoader(false);
          handleGetBidList(userId);
          HandleGetFilterListData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function for handling the "Select All" functionality for checkboxes
  //e used for the to check checkbox is selected or not
  // const handleSelectAll = (e) => {
  //   // Determine whether the "Select All" checkbox is checked or not
  //   let result = e.target.checked;
  //   setSelectCheckBox(result);

  //   if (result) {
  //     // If checked, mark all items in the bid data as selected
  //     let data = bidData?.map((item) => {
  //       return { ...item, isSelected: true };
  //     });
  //     const filterData = bidData?.map((item) => item._id);
  //     setSelectedData(filterData);
  //     setBidData([...data]);
  //   } else {
  //     // If unchecked, mark all items in the bid data as unselected
  //     let data = bidData?.map((item) => {
  //       return { ...item, isSelected: false };
  //     });
  //     setSelectedData([]); // Deselect all items
  //     setBidData([...data]);
  //   }
  // };
// console.log(allBidData);
  //function to show inactive ask
  const handleShowInactiveBidList = () => {
    if (!bidlistStatus) {
      // Button is selected, apply filter and store previousAskList
      let result = allBidData?.filter((item) => item.bidStatus === false);
     // setPreviousBidList(bidData); // Store the previous askList
      setBidData(result);
    } else {
      let result = allBidData?.filter((item) => item.bidStatus === true);
      // Button is deselected, restore previousAskList
      setBidData(result);
    }
    // Toggle the button status
    setBidListStatus(!bidlistStatus);
  };

  // select All Functionlaity for the checkbox
  // const handleSelectAll = () => {
  //   const result = bidData.filter((item) => item.batchStatus == true);
  //   if (result?.length > 0) {
  //     if (selectedData.length === bidData.length) {
  //       setSelectedData([]);
  //       bidData.map((item) => {
  //         handleUpdateBatch(false, item?.productId?._id);
  //       });
  //     } else {
  //       bidData.map((item) => {
  //         handleUpdateBatch(true, item?.productId?._id);
  //       });
  //     }
  //   } else {
  //     const filterData = bidData?.map((item) => handleUpdateBatch(true, item?.productId?._id));
  //     // setSelectedData(filterData);
  //     // handleUpdateBatch(true, filterData);
  //     bidData.map((item) => {
  //       item["batchStatus"] = true;
  //       return { ...item };
  //     });
  //   }
  // };


  const handleSelectAll = (e) => {
    const result = e.target.checked;
    console.log(result);
    setSelectCheckBox(result);

    if (result) {
      // Select all items
      const data = bidData?.map((item) => {
        return { ...item, isSelected: true };
      });
      const filterData = bidData?.map((item) => item._id);
      setSelectedData(filterData);
      setBidData([...data]);
    } else {
      // Deselect all items
      const data = bidData?.map((item) => {
        return { ...item, isSelected: false };
      });
      setSelectedData([]); // Clear selected data
      setBidData([...data]);
    }
  };


  const updateBatchButtonClick = () => {
    console.log(selectedData);
    selectedData.map((item)=> handleUpdateBatch(true ,item))
  }

  // console.log(selectedData)

  
  // Function to handle individual checkbox selection
  //data used for the check checkbox is selected or not
  //id used for the which checkbox is selected
  const handleCheck = (data, id) => {
    const product_id = id;
    const updatedList = bidData?.map((item) => {
      if (item._id === product_id) {
        item.isSelected = data; // Update the isSelected property
      }
      return item;
    });
    // Check if all items are selected or not
    const allSelected = updatedList?.every((item) => item.isSelected);
    setBidData([...updatedList]);
    if (allSelected) {
      setSelectCheckBox(true); // Check the "Select All" checkbox
      setSelectedData(updatedList.map((item) => item._id));
    } else {
      setSelectCheckBox(false); // Uncheck the "Select All" checkbox
      setSelectedData(
        updatedList.filter((item) => item.isSelected).map((item) => item._id)
      );
    }
  };

  console.log(selectedData?.length)



  const handleUpdateBatch = (data, id) => {
    // setLoader(0)
    // console.log(data);
    // console.log(id)
    // return

    if (userId) {
      ExportApi.updateBatch(data, id, userId).then((resp) => {
        handleGetBidList(userId);
        HandleGetFilterListData();
      });
    }
  };

  //sort data Here
  //key used for the get the name of the variable for sorting
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = bidData.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  // Function for filtering bid data based on selected conditions, brands, series, etc.
  const SearchFilterCheck = () => {
    if (condition?.length > 0) {
      // Filter bid data based on condition
      let result = bidData?.filter(
        (item) => item?.productId?.type == condition
      );
      setBidData(result);
    } else if (brand?.length > 0) {
      // Filter bid data based on brand
      let result = bidData?.filter((item) => item?.productId?.brand == brand);
      setBidData(result);
    } else if (series?.length > 0) {
      // Filter bid data based on series
      let result = bidData?.filter((item) => item?.productId?.series == series);
      setBidData(result);
    } else if (model?.length > 0) {
      // Filter bid data based on model
      let result = bidData?.filter((item) => item?.productId?.model == model);
      setBidData(result);
    } else if (chipset?.length > 0) {
      // Filter bid data based on chipset
      let result = bidData?.filter(
        (item) => item?.productId?.chipset == chipset
      );
      setBidData(result);
    } else {
      // If no specific filters are applied, fetch bid data based on user type (user or admin)
      if (localStorage.getItem("tokenuser")) {
        handleGetBidList(JSON.parse(localStorage.getItem("tokenuser")).id);
        HandleGetFilterListData();
      } else if (localStorage.getItem("admin")) {
        handleGetBidList(JSON.parse(localStorage.getItem("admin")).id);
        HandleGetFilterListData();
      } else {
        console.log("No Data Found");
      }
    }
  };

  // Function to get filter-related data
  const HandleGetFilterListData = () => {
    // Fetch filter-related data from an API
    ExportApi.GetFilterData()
      .then((resp) => {
        // Initialize arrays to hold filter-related data
        let chipsetKeyArray = [];
        let conditionKeyArray = [];
        let brandKeyArray = [];
        let modalKeyArray = [];
        let seriesKeyArray = [];

        // Process and prepare data for various filter options
        resp?.data.data?.chipset?.map((val, i) => {
          let key = { [val]: false };
          chipsetKeyArray.push(key);
        });
        setchipsetKey([...chipsetKeyArray]);

        resp?.data.data?.condition?.map((val) => {
          if (val == 1) {
            let key = { ["New-Retail"]: false };
            conditionKeyArray.push(key);
          } else if (val == 2) {
            let key = { ["New-2nd Hand"]: false };
            conditionKeyArray.push(key);
          } else {
            let key = { ["Used"]: false };
            conditionKeyArray.push(key);
          }
        });
        setconditionKey([...conditionKeyArray]);

        resp?.data.data?.series?.map((val) => {
          let key = { [val]: false };
          seriesKeyArray.push(key);
        });
        setseriesKey([...seriesKeyArray]);

        resp?.data.data?.brands?.map((val) => {
          let key = { [val]: false };
          brandKeyArray.push(key);
        });
        setbrandKey([...brandKeyArray]);

        resp?.data.data?.model?.map((val) => {
          let key = { [val]: false };
          modalKeyArray.push(key);
        });
        setmodalKey([...modalKeyArray]);

        // Set the filter-related data in the component's state
        setFilterList(resp?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  // Function to open the filter modal
  const handleFilter = () => {
    // Set the state to show the filter modal
    setShowFilterModal(true);
  };

  // Function to clear all applied filters
  const clearAllFilters = () => {
    // Clear all filter arrays and reset filter-related data
    setmodel([]);
    setseries([]);
    setbrand([]);
    setchipset([]);
    setcondition([]);
    setcondition1([]);

    // Fetch bid list data based on user type (user or admin) and reset filters
    if (localStorage.getItem("tokenuser")) {
      handleGetBidList(JSON.parse(localStorage.getItem("tokenuser")).id);
      HandleGetFilterListData();
    } else if (localStorage.getItem("admin")) {
      handleGetBidList(JSON.parse(localStorage.getItem("admin")).id);
      HandleGetFilterListData();
    } else {
      console.log("No Data Found");
    }
  };

  // Function to close a specific condition filter
  //i used for the indexing
  //name used for the which condition filter is implemented
  const conditionKeyFilterClose = (i, name) => {
    setSelectCheckBox(false);

    // Find the index of the condition filter to be closed
    let index = -1;
    for (let i = 0; i < conditionKey.length; i++) {
      if (Object.keys(conditionKey[i])[0] == name) {
        index = i;
      }
    }

    // Remove the condition filter from the arrays and update the UI
    conditionKey[index][name] = false;
    condition1.splice(i, 1);
    condition.splice(i, 1);

    setcondition1([...condition1]);
    setcondition([...condition]);

    // Trigger the filter check function
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // Function to close a specific chipset filter
  //id used for the indexing
  //name used for the which condition filter is implemented
  const ChipsetFilterClose = (id, name) => {
    setSelectCheckBox(false);

    // Find the index of the chipset filter to be closed
    let index = -1;
    for (let i = 0; i < chipsetKey.length; i++) {
      if (Object.keys(chipsetKey[i])[0] == name) {
        index = i;
      }
    }

    // Remove the chipset filter from the array and update the UI
    chipsetKey[index][name] = false;
    chipset.splice(id, 1);

    setchipset([...chipset]);

    // Trigger the filter check function
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // Function to close a specific brand filter
  //i used for the indexing
  //name used for the which brand filter is implemented
  const brandFilterClose = (i, name) => {
    setSelectCheckBox(false);

    // Find the index of the brand filter to be closed
    let index = -1;
    for (let i = 0; i < brandKey.length; i++) {
      if (Object.keys(brandKey[i])[0] == name) {
        index = i;
      }
    }

    // Remove the brand filter from the array and update the UI
    brandKey[index][name] = false;
    brand.splice(i, 1);

    setbrand([...brand]);

    // Trigger the filter check function
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // Function to close a specific series filter
  //i used for the indexing
  //name used for the which series filter is implemented
  const seriesFilterClose = (i, name) => {
    setSelectCheckBox(false);

    // Find the index of the series filter to be closed
    let index = -1;
    for (let i = 0; i < seriesKey.length; i++) {
      if (Object.keys(seriesKey[i])[0] == name) {
        index = i;
      }
    }

    // Remove the series filter from the array and update the UI
    seriesKey[index][name] = false;
    series.splice(i, 1);

    setseries([...series]);

    // Trigger the filter check function
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // Function to close a specific modal filter
  //i used for the indexing
  //name used for the which modal filter is implemented
  const modalFilterClose = (i, name) => {
    setSelectCheckBox(false);

    // Find the index of the modal filter to be closed
    let index = -1;
    for (let i = 0; i < modalKey.length; i++) {
      if (Object.keys(modalKey[i])[0] == name) {
        index = i;
      }
    }

    // Remove the modal filter from the array and update the UI
    modalKey[index][name] = false;
    model.splice(i, 1);

    setmodel([...model]);

    // Trigger the filter check function
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // Function to handle the chipset filter
  //i used for the indexing
  //name used for the which chipset filter is implemented
  const ChipsetFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);

    if (checked || index === -1) {
      // If checked or not found in the array, add it to the chipset filter
      chipset.push(name);
      chipsetKey[i][name] = checked;

      setchipset([...chipset]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      // If unchecked, remove it from the chipset filter
      chipsetKey[i][name] = checked;
      chipset.splice(index, 1);

      setchipset([...chipset]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };
  // Function to handle the condition filter
  //i used for the indexing
  //name used for the which condition filter is implemented
  const conditionKeyFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked, min } = e.target;
    let number = parseInt(min);
    let index = condition.indexOf(number);
    let index1 = condition1.indexOf(name);

    if (checked || index === -1 || index1 === -1) {
      // If checked or not found in the array, add it to the condition filter
      condition.push(number);
      condition1.push(name);
      conditionKey[i][name] = checked;

      setcondition([...condition]);
      setcondition1([...condition1]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      // If unchecked, remove it from the condition filter
      conditionKey[i][name] = checked;
      condition.splice(index, 1);
      condition1.splice(index1, 1);

      setcondition([...condition]);
      setcondition1([...condition1]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  // Function to handle the modal filter
  //i used for the indexing
  //name used for the which modal filter is implemented
  const modalFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);

    if (checked) {
      // If checked, add it to the modal filter
      model.push(name);
      modalKey[i][name] = checked;

      setmodel([...model]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      // If unchecked, remove it from the modal filter
      modalKey[i][name] = checked;
      model.splice(index, 1);

      setmodel([...model]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  // Function to handle series filter
  //i used for the indexing
  //name used for the which series filter is implemented
  const seriesFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = series.indexOf(name);

    if (checked) {
      // If checked, add it to the series filter
      series.push(name);
      seriesKey[i][name] = checked;

      setseries([...series]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      // If unchecked, remove it from the series filter
      seriesKey[i][name] = checked;
      series.splice(index, 1);

      setseries([...series]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };
  // Function to handle brand filter
  //i used for the indexing
  //name used for the which brand filter is implemented
  const BrandFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = brand.indexOf(name);

    if (checked) {
      // If checked, add it to the brand filter
      brand.push(name);
      brandKey[i][name] = checked;

      setbrand([...brand]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      // If unchecked, remove it from the brand filter
      brandKey[i][name] = checked;
      brand.splice(index, 1);

      setbrand([...brand]);

      // Trigger the filter check function
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  // Function to show more or less chipset results
  //data used for to show more or less result
  const handlechipsetshowmore = (data) => {
    if (data == "More") {
      setChipsetShow(true);
    } else {
      setChipsetShow(false);
    }
  };
  // Function to show more or less brand results
  //data used for to show more or less result
  const handlebrandshowmore = (data) => {
    if (data == "More") {
      setBrandShow(true);
    } else {
      setBrandShow(false);
    }
  };
  // Function to show more or less series results
  //data used for to show more or less result
  const handleSeriesshowmore = (data) => {
    if (data == "More") {
      setSeriesShow(true);
    } else {
      setSeriesShow(false);
    }
  };
  // Function to show more or less series results
  //data used for to show more or less result
  const handlemodelshowmore = (data) => {
    if (data == "More") {
      setModelShow(true);
    } else {
      setModelShow(false);
    }
  };

  const handleHideBatch = () => {
    setHideBatchStatus(!hideBatchStatus);
    if (hideBatchStatus) {
      if (localStorage.getItem("tokenuser")) {
        handleGetBidList(JSON.parse(localStorage.getItem("tokenuser")).id);
        HandleGetFilterListData();
      } else if (localStorage.getItem("admin")) {
        handleGetBidList(JSON.parse(localStorage.getItem("admin")).id);
        HandleGetFilterListData();
      }
    } else {
      let data = bidData?.filter((item) => item.batchStatus != true);
      setBidData([...data]);
    }
  };

  // Function to fetch user data based on user ID for authentication
  //id used for the specific user id
  const handleSingleUserData = (id) => {
    ExportApi.getSingleUserData(id)
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

  // Adding an event listener to the 'window' object for the "Loginout" event
  window.addEventListener("Loginout", () => {
    // This code block is executed when the "Loginout" event is triggered

    // Clear the localStorage (removes user/admin tokens)
    localStorage.clear();

    // Navigate to the root path ("/")
    navigate("/");
  });

  // useEffect hook to run when the component mounts
  useEffect(() => {
    // This effect runs once when the component mounts (empty dependency array [])
    let userdata;
    if (localStorage.getItem("tokenuser")) {
      // Check if a user token exists in localStorage

      userdata = JSON.parse(localStorage.getItem("tokenuser"));
      setUserId(userdata.id);
      setUserType(userdata.role);
      // Fetch bid list data for the logged-in user
      handleGetBidList(userdata.id);

      // Fetch filter list data
      HandleGetFilterListData();

      // Fetch user data for the logged-in user
      handleSingleUserData(userdata.id);
    } else if (localStorage.getItem("admin")) {
      // If no user token exists but an admin token exists in localStorage
      userdata = JSON.parse(localStorage.getItem("admin"));
      setUserId(userdata.id);
      setUserType(userdata.role);
      // Fetch bid list data for the admin
      handleGetBidList(userdata.id);

      // Fetch filter list data
      HandleGetFilterListData();

      // Fetch user data for the logged-in user (Note: should it be admin instead of tokenuser?)
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else {
      // If neither a user token nor an admin token exists in localStorage

      // Log a message indicating that no data was found
      console.log("No Data Found");
    }
  }, [localStorage.getItem("tokenuser"), localStorage.getItem("admin")]);

  const updateBidsStatus = () => {
    console.log("ddd");
  }

  return (
    <div>
      <Row>
        <Col lg={12} className="sm-5 mt-1">
          <div className="text-sm-end text-center">
            {alreadyCreatedBatch ? 
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={updateBatchButtonClick}
            >
              {showButtonLoader ? "Please Wait..." : "Update Batch"}
              <ReactTooltip
                className="custom-tooltip_buy-sell"
                anchorId="app-batch-buying-tab"
                place="bottom"
                content=<div dangerouslySetInnerHTML={{ __html: htmlString }} />
                style={{ textTransform: "none" }}
              />
              <svg
                id="app-batch-buying-tab"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-question-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
            </Button>
            :
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={handleCreateBatch}
            >
              {showButtonLoader ? "Please Wait..." : "Batch"}
              <ReactTooltip
                className="custom-tooltip_buy-sell"
                anchorId="app-batch-buying-tab"
                place="bottom"
                content=<div dangerouslySetInnerHTML={{ __html: htmlString }} />
                style={{ textTransform: "none" }}
              />
              <svg
                id="app-batch-buying-tab"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-question-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
            </Button>
            }
            {hideBatchStatus ? (
              <Button
                className="bg-success text-white border border-2 mb-2 mb-sm-0"
                onClick={handleHideBatch}
              >
                Hide Batch
              </Button>
            ) : (
              <Button
                className="bg-none text-black border border-2 mb-2 mb-sm-0"
                onClick={handleHideBatch}
              >
                Hide Batch
              </Button>
            )}
            <Button
              className="bg-none text-black border border-2 ms-2 mb-2 mb-sm-0"
              disabled
            >
              Duplicate
            </Button>
            <Button
              className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
              disabled
            >
              Delete
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={updateBidsStatus}
            >
              Make Active
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={updateBidsStatus}
            >
              Make Inactive
            </Button>
            {bidlistStatus ? (
              <Button
                className="bg-success text-white border border-2 mx-2 mb-2 mb-sm-0"
                onClick={handleShowInactiveBidList}
              >
                Show Inactive
              </Button>
            ) : (
              <Button
                className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
                onClick={handleShowInactiveBidList}
              >
                Show Inactive
              </Button>
            )}
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </div>
          {/* Start Clear All Filter */}
          <div className="text-center text-sm-start">
            <Button
              className="rounded-0 bg-white border text-dark px-5 py-2 fw-bold"
              onClick={() => clearAllFilters()}
            >
              Clear all filters
            </Button>
            {conditionKey.map((val, i) => {
              let key = condition1[i];
              let data = conditionKey.filter((item) => item[key] == true);
              return (
                <>
                  {data.length != 0 ? (
                    <span
                      key={i}
                      className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                    >
                      {condition1[i]}{" "}
                      <Button
                        className="bg-none border-0 py-0 text-dark"
                        onClick={() =>
                          conditionKeyFilterClose(i, condition1[i])
                        }
                      >
                        X
                      </Button>
                    </span>
                  ) : null}
                </>
              );
            })}
            {chipsetKey.map((val, i) => {
              let key = chipset[i];
              let data = chipsetKey.filter((item) => item[key] == true);
              return (
                <>
                  {data.length != 0 ? (
                    <>
                      <span
                        key={i}
                        className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                      >
                        {chipset[i]}
                        <Button
                          className="bg-none border-0 py-0 text-dark"
                          onClick={() => ChipsetFilterClose(i, chipset[i])}
                        >
                          X
                        </Button>
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
            {brandKey?.map((val, i) => {
              let key = brand[i];
              let data = brandKey.filter((item) => item[key] == true);
              return (
                <>
                  {data.length != 0 ? (
                    <span
                      key={i}
                      className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                    >
                      {brand[i]}{" "}
                      <Button
                        className="bg-none border-0 py-0 text-dark"
                        onClick={() => brandFilterClose(i, brand[i])}
                      >
                        X
                      </Button>
                    </span>
                  ) : null}
                </>
              );
            })}
            {seriesKey.map((val, i) => {
              let key = series[i];
              let data = seriesKey.filter((item) => item[key] == true);
              return (
                <>
                  {data.length != 0 ? (
                    <span
                      key={i}
                      className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                    >
                      {series[i]}{" "}
                      <Button
                        className="bg-none border-0 py-0 text-dark"
                        onClick={() => seriesFilterClose(i, series[i])}
                      >
                        X
                      </Button>
                    </span>
                  ) : null}
                </>
              );
            })}
            {modalKey.map((val, i) => {
              let key = model[i];
              let data = modalKey.filter((item) => item[key] == true);
              return (
                <>
                  {data.length != 0 ? (
                    <span
                      key={i}
                      className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                    >
                      {model[i]}{" "}
                      <Button
                        className="bg-none border-0 py-0 text-dark"
                        onClick={() => modalFilterClose(i, model[i])}
                      >
                        X
                      </Button>
                    </span>
                  ) : null}
                </>
              );
            })}
          </div>
        </Col>
        <Col
          lg={12}
          className="product_list_table table-responsive mt-sm-5 mt-3"
        >
          {loader == 0 ? (
            <div className="loader-icon" style={{ marginBlock: "80px" }}>
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
          ) : loader == 1 ? (
            <Table
              bordered
              striped
              className="align-middle text-center managment-table"
            >
              <thead>
                <tr>
                  <th></th>
                  <th className="text-start">
                    <Form.Check
                      className="d-inline"
                      type="checkbox"
                      checked={selectCheckBox}
                      onChange={(e) => handleSelectAll(e)}
                    />{" "}
                    <label>Select All</label>
                  </th>
                  <th onClick={() => sortHere("chipset")}>
                    Chipset{" "}
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
                  <th onClick={() => sortHere("brand")}>
                    Brand{" "}
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
                  <th onClick={() => sortHere("series")}>
                    Series{" "}
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
                  <th onClick={() => sortHere("model")}>
                    Model{" "}
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
                  <th onClick={() => sortHere("expiration")}>
                      Expiration{" "}
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
                    <th>Spread 
                    <ReactTooltip
                            className="custom-tooltip"
                            anchorId={`app-batch-spread-tab`}
                            place="bottom"
                            content=<div
                                dangerouslySetInnerHTML={{ __html: htmlString }}
                            />
                        />
                        <svg
                            id={`app-batch-spread-tab`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-question-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                        </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"><path filerule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path>
                            </svg>
                        </th>
                        <th onClick={() => sortHere("askAmount")}>
                      Lowest Ask{" "}
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
                    {/* <th>Highest Bid 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"><path filerule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>
                        </th> */}
                       
                        <th onClick={() => sortHere("bidAmount")}>Your Bid 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"><path filerule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>
                        </th>

                  {/* <th onClick={() => sortHere("_id")}>
                    ProductId{" "}
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
                  </th> */}
                  {/* <th onClick={() => sortHere("expire")}>
                    Status{" "}
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
                  <th onClick={() => sortHere("createdAt")}>
                    Created At{" "}
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
                  <th onClick={() => sortHere("bidAmount")}>
                    Price{" "}
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
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {bidData?.length > 0 ? (
                  bidData?.map((val, i) => {
                    return (
                      <tr>
                        {val?.batchStatus ? (
                          i === 0 ? (
                            <td
                              rowSpan={selectedData?.length}
                              className="fst-part-cont"
                            >
                              <div className="bg-dark lft-bar text-white mr-1 d-flex align-items-center">
                                <p className="vertical-text">BATCH</p>
                              </div>
                            </td>
                          ) : (
                            ""
                          )
                        ) : (
                          <td></td>
                        )}

                        {/* {val?.batchStatus ? (
                          <td className="fst-part-cont">
                            <div className="bg-dark lft-bar text-white mr-1 d-flex align-items-center">
                              {i == batchCount ? (
                                <p className="vertical-text">BATCH</p>
                              ) : batchCount == 0.5 ? (
                                <p className="vertical-text">BATCH</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                        ) : (
                          <td></td>
                        )} */}
                        <td>
                          <div className="d-flex align-items-end justify-content-between">
                            <Form.Check
                              className="d-inline"
                              type="checkbox"
                              checked={val?.isSelected}
                              onChange={(e) =>
                                handleCheck(
                                  e.target.checked,
                                  val?.productId?._id
                                )
                              }
                            />{" "}
                            <img
                              src={`${imageUrl}${val?.productId?.image[0]}`}
                              style={{ width: "100px" }}
                              onClick={() =>
                                navigate(
                                  `/product/${
                                    val?.productId?._id
                                      ? val?.productId?._id
                                      : val?.productId
                                  }`
                                )
                              }
                            />
                            <div class="position-relative ms-1">
                            <span className="d-block text-center">
                                {val.productId?.type == 1
                                  ? "New"
                                  : val.productId?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                            {descriptionindex == i ? (
                              <Button
                                className="bg-none border-0"
                                onClick={() => setdescriptionindex()}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#0000ff"
                                  className="bi bi-chevron-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    filerule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </Button>
                            ) : (
                              <Button
                                className="bg-none border-0"
                                onClick={() => setdescriptionindex(i)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#0000ff"
                                  className="bi bi-chevron-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    filerule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </Button>
                            )}
                               {descriptionindex == i ? (
                            <div className="modal_custom_">
                              <div className="inner_customModal_one">
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: val?.productId?.description,
                                  }}
                                ></h6>
                              </div>
                            </div>
                          ) : null}
                          </div>
                          </div>
                     
                        </td>
                        <td>{val?.productId?.chipset}</td>
                        <td>{val?.productId?.brand}</td>
                        <td>{val?.productId?.series}</td>
                        <td>{val?.productId?.model}</td>
                        <td><input type="number" className='table-qty' placeholder={val?.productId?.quantity ? product?.productId?.quantity : 0} value={quantity !== null ? quantity : (val?.productId?.quantity ? product?.productId?.quantity : 0)} onChange={(e) => setQuantity(e.target.value)} /></td>
                        
                        <td>
                            <input type="number" className='table-qty' placeholder={val?.productId?.expiration ? product?.productId?.expiration : '0'} value={expiration !== null ? expiration : (val?.productId?.expiration ? val?.productId?.expiration : 0)} onChange={(e) => setExpiration(e.target.value)} />
                        </td>
                        <td>{val?.productId?.spread ? val?.productId?.spread : 'Not Found'}</td>
                        <td>
                            <button className='btn btn-success p-2 border border-dark'>{val?.productId?.lowest_ask ? "Buy Now - $" + val?.productId?.lowest_ask : 'Not Found'}</button>
                        </td>
                        <td>
                            <span className='border border-dark p-1 rounded-1'>{val?.productId?.highest_bid ? val?.productId?.highest_bid : 'Not Found'}</span>
                        </td>
                        {/* <td>{val?.productId?._id}</td>
                        <td>
                          {val?.bidStatus ? (
                            <Button className="text-white btn btn-success">
                              Active
                            </Button>
                          ) : (
                            <Button className="text-white btn btn-danger">
                              Inactive
                            </Button>
                          )}
                        </td>
                        <td>{moment(val?.createdAt).format("L")}</td>
                        <td>{"$" + val?.bidAmount}</td> */}
                      </tr>
                    );
                  })
                ) : (
                  <span>No Data Found</span>
                )}
              </tbody>
            </Table>
          ) : (
            <Table
              bordered
              striped
              className="align-middle text-center managment-table"
            >
              {/* <thead>
                <tr>
                  <th className="text-start">
                    <Form.Check
                      className="d-inline"
                      type="checkbox"
                      checked={selectedData?.length === bidData?.length}
                      onChange={(e) => handleSelectAll(e)}
                    />{" "}
                    <label>Select All</label>
                  </th>
                  <th onClick={() => sortHere("chipset")}>
                    Chipset{" "}
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
                  <th onClick={() => sortHere("brand")}>
                    Brand{" "}
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
                  <th onClick={() => sortHere("series")}>
                    Series{" "}
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
                  <th onClick={() => sortHere("model")}>
                    Model{" "}
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

                  <th onClick={() => sortHere("_id")}>
                    Order No.{" "}
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
                  <th onClick={() => sortHere("expire")}>
                    Status{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      setSelectCheckBox
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
                  <th onClick={() => sortHere("createdAt")}>
                    Order Date{" "}
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
                  <th onClick={() => sortHere("bidAmount")}>
                    Price{" "}
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
                </tr>
              </thead> */}
              <tbody>
                <tr>No Data Found</tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* Start filter Modal */}
      <Modal
        className="custom-mode"
        contentClassName="custom-modal-content"
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border mb-sm-5">
            <div className="sidebar-accordian p-3">
              <div>
                <span>
                  <b>Condition</b>
                </span>
                {FilterList?.condition?.map((val, i) => {
                  return (
                    <Form.Group className="mb-2" controlId={val} key={i}>
                      <Form.Check
                        type="checkbox"
                        checked={
                          conditionKey[i][
                            val == 1
                              ? "New-Retail"
                              : val == 2
                              ? "New-2nd Hand"
                              : "Used"
                          ]
                        }
                        onChange={(e) => conditionKeyFilter(e, i)}
                        name={
                          val == 1
                            ? "New-Retail"
                            : val == 2
                            ? "New-2nd Hand"
                            : "Used"
                        }
                        min={val}
                        label={
                          val == 1
                            ? "New-Retail"
                            : val == 2
                            ? "New-2nd Hand"
                            : "Used"
                        }
                      />
                    </Form.Group>
                  );
                })}
                {conditionKey?.length > 6 ? (
                  <Button className="bg-none mb-3 border-0 p-0 text-dark">
                    <span className="d-inline me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg>
                    </span>{" "}
                    Show More
                  </Button>
                ) : null}
              </div>

              <div>
                <span>
                  <b>Chipset</b>
                </span>
                {chipsetShow
                  ? FilterList?.chipset?.map((val, i) => {
                      return (
                        <>
                          <Form.Group className="mb-2" controlId={val} key={i}>
                            <Form.Check
                              type="checkbox"
                              checked={chipsetKey[i][val]}
                              onChange={(e) => ChipsetFilter(e, i)}
                              name={val}
                              label={val}
                            />
                          </Form.Group>
                        </>
                      );
                    })
                  : FilterList?.chipset?.map((val, i) => {
                      return (
                        <>
                          {i < 6 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={chipsetKey[i][val]}
                                onChange={(e) => ChipsetFilter(e, i)}
                                name={val}
                                label={val}
                              />
                            </Form.Group>
                          ) : null}
                        </>
                      );
                    })}
                {chipsetShow ? (
                  FilterList?.chipset?.length > 6 ? (
                    <Button
                      className="bg-none mb-3 border-0 p-0 text-dark"
                      onClick={() => handlechipsetshowmore("Less")}
                    >
                      <span className="d-inline me-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                      </span>{" "}
                      Show Less
                    </Button>
                  ) : null
                ) : FilterList?.chipset?.length > 6 ? (
                  <Button
                    className="bg-none mb-3 border-0 p-0 text-dark"
                    onClick={() => handlechipsetshowmore("More")}
                  >
                    <span className="d-inline me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg>
                    </span>{" "}
                    Show More
                  </Button>
                ) : null}
              </div>

              <div>
                <span>
                  <b>Brand</b>
                </span>
                {brandShow
                  ? FilterList?.brands?.map((val, i) => {
                      return (
                        <>
                          <Form.Group className="mb-2" controlId={val} key={i}>
                            <Form.Check
                              type="checkbox"
                              checked={brandKey[i][val]}
                              onChange={(e) => BrandFilter(e, i)}
                              name={val}
                              label={val}
                            />
                          </Form.Group>
                        </>
                      );
                    })
                  : FilterList?.brands?.map((val, i) => {
                      return (
                        <>
                          {i < 6 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={brandKey[i][val]}
                                onChange={(e) => BrandFilter(e, i)}
                                name={val}
                                label={val}
                              />
                            </Form.Group>
                          ) : null}
                        </>
                      );
                    })}
                {brandShow ? (
                  FilterList?.brands?.length > 6 ? (
                    <Button
                      className="bg-none mb-3 border-0 p-0 text-dark"
                      onClick={() => handlebrandshowmore("Less")}
                    >
                      <span className="d-inline me-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                      </span>{" "}
                      Show Less
                    </Button>
                  ) : null
                ) : FilterList?.brands?.length > 6 ? (
                  <Button
                    className="bg-none mb-3 border-0 p-0 text-dark"
                    onClick={() => handlebrandshowmore("More")}
                  >
                    <span className="d-inline me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg>
                    </span>{" "}
                    Show More
                  </Button>
                ) : null}
              </div>

              <div>
                <span>
                  <b>Series</b>
                </span>
                {seriesShow
                  ? FilterList?.series?.map((val, i) => {
                      return (
                        <>
                          <Form.Group className="mb-2" controlId={val} key={i}>
                            <Form.Check
                              type="checkbox"
                              checked={seriesKey[i][val]}
                              onChange={(e) => seriesFilter(e, i)}
                              name={val}
                              label={val}
                            />
                          </Form.Group>
                        </>
                      );
                    })
                  : FilterList?.series?.map((val, i) => {
                      return (
                        <>
                          {i < 6 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={seriesKey[i][val]}
                                onChange={(e) => seriesFilter(e, i)}
                                name={val}
                                label={val}
                              />
                            </Form.Group>
                          ) : null}
                        </>
                      );
                    })}
                {seriesShow ? (
                  FilterList?.series?.length > 6 ? (
                    <Button
                      className="bg-none mb-3 border-0 p-0 text-dark"
                      onClick={() => handleSeriesshowmore("Less")}
                    >
                      <span className="d-inline me-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                      </span>{" "}
                      Show Less
                    </Button>
                  ) : null
                ) : FilterList?.series?.length > 6 ? (
                  <Button
                    className="bg-none mb-3 border-0 p-0 text-dark"
                    onClick={() => handleSeriesshowmore("More")}
                  >
                    <span className="d-inline me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg>
                    </span>{" "}
                    Show More
                  </Button>
                ) : null}
              </div>

              <div>
                <span>
                  <b>Model</b>
                </span>
                {modelShow
                  ? FilterList?.model?.map((val, i) => {
                      return (
                        <>
                          <Form.Group className="mb-2" controlId={val} key={i}>
                            <Form.Check
                              type="checkbox"
                              checked={modalKey[i][val]}
                              onChange={(e) => modalFilter(e, i)}
                              name={val}
                              label={val}
                            />
                          </Form.Group>
                        </>
                      );
                    })
                  : FilterList?.model?.map((val, i) => {
                      return (
                        <>
                          {i < 6 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={modalKey[i][val]}
                                onChange={(e) => modalFilter(e, i)}
                                name={val}
                                label={val}
                              />
                            </Form.Group>
                          ) : null}
                        </>
                      );
                    })}
                {modelShow ? (
                  FilterList?.model?.length > 6 ? (
                    <Button
                      className="bg-none mb-3 border-0 p-0 text-dark"
                      onClick={() => handlemodelshowmore("Less")}
                    >
                      <span className="d-inline me-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                      </span>{" "}
                      Show Less
                    </Button>
                  ) : null
                ) : FilterList?.model?.length > 6 ? (
                  <Button
                    className="bg-none mb-3 border-0 p-0 text-dark"
                    onClick={() => handlemodelshowmore("More")}
                  >
                    <span className="d-inline me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg>
                    </span>{" "}
                    Show More
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowFilterModal(false)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}
