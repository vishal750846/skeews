import React, { useState, useEffect } from "react";
import { Button, Col, Row, Modal, Form, Table } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export default function SellingTab() {

  const htmlString = "<p>Spread = Lowest Ask - Your Bid</p>";

  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [askList, setAskList] = useState();
  const [askList1, setAskList1] = useState();
  const [allAskList, setAllAskList] = useState();
  const [loading, setLoading] = useState(0);
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [descriptionindex, setdescriptionindex] = useState();
  const [descriptionindex1, setdescriptionindex1] = useState();
  const [asklistStatus, setAskListStatus] = useState(false);
  const [previousAskList, setPreviousAskList] = useState([]);

  const [quantity, setQuantity] = useState();
  const [expiration, setExpiration] = useState('');

  const [selectedRow, setSelectedRow] = useState(null);

  const editRow = (id) => {
    setSelectedRow(id)
  }

  // const [updateData , setUpdateData] = useState({
  //   id : 0,
  //   expiration : 0,
  //   qty : 0
  // });


  const updateQuantity = (fieldValue , id) => {
    console.log(fieldValue + id);
    setQuantity(fieldValue)
    // setExpiration(e.target.value , val?._id)
  }

  const updateExpiration = (fieldValue , id) =>{
    console.log(fieldValue + id);
    setExpiration(fieldValue)
  }

  const updateAskData = (id , quantity , expiration) => {
    console.log(id +"ddd"+quantity+"dddd"+expiration);
    setLoading(0)
    ExportApi.updateExpirationAndQuantity(id, quantity , expiration)
      .then((resp) => {   
        // console.log(resp);    
        // HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id)
        // setSelectedRow(null)
        // setQuantity()
        // setExpiration()
        // return
        setLoading(2)
        if (resp.status == 201) {
            // console.log(resp);
            // return
          HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id)
          setSelectedRow(null)
          setQuantity()
          setExpiration()
        } else {
          setLoading(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  const redirectToProductPage = (id , page) =>{
    if(page=="product"){
      navigate("/product/"+id)
    }else{
      navigate("/bidask/"+id)
    }
 
  }

  // Function to get the data of the ask list based on the provided ID
  const HandleGetAskList = (id) => {
    ExportApi.askList(id)
      .then((resp) => {
        if (resp.data.message == "Ask list found") {
          setAllAskList(resp.data.data);
          console.log(resp.data.data);
          if (!asklistStatus) {
            // Button is selected, apply filter and store previousAskList
            let result = resp.data.data?.filter((item) => item.askStatus === true);
            console.log(result);
            setAskList(result);
          } else {
            let result = resp.data.data?.filter((item) => item.askStatus === false);
            console.log(result);
            setAskList(result);
          }
          setSelectCheckBox(false);
          setLoading(1);
        } else {
          setLoading(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function for handling the "Select All" functionality for multiple checkboxes
  //e used for the check checkbox is select or not
  const handleSelectAll = (e) => {
    const result = e.target.checked;
    console.log(result);
    setSelectCheckBox(result);

    if (result) {
      // Select all items
      const data = askList?.map((item) => {
        return { ...item, isSelected: true };
      });
      const filterData = askList?.map((item) => item._id);
      setSelectedData(filterData);
      setAskList([...data]);
    } else {
      // Deselect all items
      const data = askList?.map((item) => {
        return { ...item, isSelected: false };
      });
      setSelectedData([]); // Clear selected data
      setAskList([...data]);
    }
  };

  // Function to handle individual checkbox selection
  //data used for the check checkbox is selected or not
  //id used for the which checkbox is selected
  const handleCheck = (data, id) => {
    const product_id = id;
    const updatedList = askList?.map((item) => {
      if (item._id === product_id) {
        item.isSelected = data; // Update the isSelected property
      }
      return item;
    });
    // Check if all items are selected or not
    const allSelected = updatedList?.every((item) => item.isSelected);
    setAskList([...updatedList]);
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

  // Function to filter data based on various criteria
  const SearchFilterCheck = () => {
    if (condition?.length > 0) {
      // Filter by condition
      let result = askList?.filter(
        (item) => item?.productId?.type == condition
      );
      setAskList(result);
    } else if (brand?.length > 0) {
      // Filter by brand
      let result = askList?.filter((item) => item?.productId?.brand == brand);
      setAskList(result);
    } else if (series?.length > 0) {
      // Filter by series
      let result = askList?.filter((item) => item?.productId?.series == series);
      setAskList(result);
    } else if (model?.length > 0) {
      // Filter by model
      let result = askList?.filter((item) => item?.productId?.model == model);
      setAskList(result);
    } else if (chipset?.length > 0) {
      // Filter by chipset
      let result = askList?.filter(
        (item) => item?.productId?.chipset == chipset
      );
      setAskList(result);
    } else {
      if (localStorage.getItem("tokenuser")) {
        HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id);
        HandleGetFilterListData();
      } else if (localStorage.getItem("admin")) {
        HandleGetAskList(JSON.parse(localStorage.getItem("admin")).id);
        HandleGetFilterListData();
      } else {
        // Handle the case when no filters are applied
      }
    }
  };


  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);

    //sort data Here
  //key used for the get the name of the variable for sorting
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = askList.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
    // console.log(key);
    // setAskList(sortedProducts)
  };

  // Function to get filter data
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
    setShowFilterModal(true);
  };

  // Function to clear all applied filters
  const clearAllFilters = () => {
    setSelectCheckBox(false);
    setmodel([]);
    setseries([]);
    setbrand([]);
    setchipset([]);
    setcondition([]);
    setcondition1([]);
    if (localStorage.getItem("tokenuser")) {
      HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id);
      HandleGetFilterListData();
    } else if (localStorage.getItem("admin")) {
      HandleGetAskList(JSON.parse(localStorage.getItem("admin")).id);
      HandleGetFilterListData();
    } else {
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

  //Product Delete
  const handleDeleteProduct = () => {
    if (selectedData?.length > 0) {
      console.log(selectedData);
      let confirm = window.confirm("Are you sure you want to delete");
      if (confirm) {
        ExportApi.deleteSellingTabProduct(selectedData).then((resp) => {
          if (resp.data.message == "Data Removed Sucessfully") {
            toast.success(resp.data.message);
            HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id);
            window.location.reload();
          } else {
            toast.error(resp.data.message);
          }
        });
      } else {
      }
    } else {
      toast.error("Please Select a Product First");
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

  // Function to show more or less series results
  //data used for to show less or more data
  const handlemodelshowmore = (data) => {
    if (data == "More") {
      setModelShow(true);
    } else {
      setModelShow(false);
    }
  };
  // Function to show more or less series results
  //data used for to show less or more data
  const handlechipsetshowmore = (data) => {
    if (data == "More") {
      setChipsetShow(true);
    } else {
      setChipsetShow(false);
    }
  };

  //function to show inactive ask
  const handleShowInactiveAskList = () => {
    if (!asklistStatus) {
      // Button is selected, apply filter and store previousAskList
      let result = allAskList?.filter((item) => item.askStatus === false);
      //setPreviousAskList(askList); // Store the previous askList
      console.log(result);
      setAskList(result);
    } else {
      let result = allAskList?.filter((item) => item.askStatus === true);
      // Button is deselected, restore previousAskList
      // setAskList(previousAskList);
      setAskList(result);
      console.log(result);
    }
    // Toggle the button status
    setAskListStatus(!asklistStatus);
  };



  // Function to show more or less series results
  //data used for to show less or more data
  const handleSeriesshowmore = (data) => {
    if (data == "More") {
      setSeriesShow(true);
    } else {
      setSeriesShow(false);
    }
  };

  // Function to show more or less series results
  //data used for to show less or more data
  const handlebrandshowmore = (data) => {
    if (data == "More") {
      setBrandShow(true);
    } else {
      setBrandShow(false);
    }
  };

  // Adding an event listener to the 'window' object for the "Loginout" event
  window.addEventListener("Loginout", () => {
    // This code block is executed when the "Loginout" event is triggered

    // Clear the localStorage (removes user/admin tokens)
    localStorage.clear();

    // Navigate to the root path ("/")
    navigate("/");
  });

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id);
      HandleGetFilterListData();
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      HandleGetAskList(JSON.parse(localStorage.getItem("admin")).id);
      HandleGetFilterListData();
      handleSingleUserData(JSON.parse(localStorage.getItem("admin")).id);
    } else {
    }
  }, []);

  const updateAsksStatus = (selectData , status) => {
    if (selectedData.length > 0) {  
    ExportApi.updateAskList(selectData , status)
    .then((resp) => {
      console.log(resp?.data);
      // console.log(JSON.parse(localStorage.getItem("tokenuser")));

      HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser"))?.id);
      setSelectedData([]);
      // setTimeout(() => {
      //   handleShowInactiveAskList()
      // }, 1000);

      // if (resp.data.message == "Ask list found") {
      //   setAllAskList(resp.data.data);
      //   let result = resp.data.data?.filter((item) => item.askStatus === true);
      //   setAskList(result);
      //   setLoading(1);
      // } else {
      //   setLoading(2);
      // }
    }) .catch((err) => {
      console.log(err);
    });
  }else {
    toast.error("Please Select a Product First");
  }
  }


  const duplicateAskList = (selectData , status) => {
    if (selectedData.length > 0) {  
      const resultArray = allAskList.filter((item) => selectedData.includes(item._id));

        
    ExportApi.duplicateBidsAsks(resultArray , "ask")
    .then((resp) => {
      console.log(resp?.data);
      // console.log(JSON.parse(localStorage.getItem("tokenuser")));
      HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser"))?.id);
      // setTimeout(() => {
      //   handleShowInactiveAskList()
      // }, 1000);

      // if (resp.data.message == "Ask list found") {
      //   setAllAskList(resp.data.data);
      //   let result = resp.data.data?.filter((item) => item.askStatus === true);
      //   setAskList(result);
      //   setLoading(1);
      // } else {
      //   setLoading(2);
      // }
    })
    .catch((err) => {
      console.log(err);
    });
 
  }else {
    toast.error("Please Select a Product First");
  }
  return

  }

  return (
    <div>
      <Row>
        <Col lg={12} className="mt-sm-3 mt-1">
          <div className="text-sm-end text-center">
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={()=>duplicateAskList(selectedData , true)}
            >
              Duplicate
            </Button>
            <Button
              className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={()=>updateAsksStatus(selectedData , true)}
              disabled={!asklistStatus}
            >
              Make Active
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={()=>updateAsksStatus(selectedData , false)}
              disabled={asklistStatus}
            >
              Make Inactive
            </Button>
            {asklistStatus ? (
              <Button
                className="bg-success text-white border border-2 mx-2 mb-2 mb-sm-0"
                onClick={()=>handleShowInactiveAskList()}
              >
                Show Inactive
              </Button>
            ) : (
              <Button
                className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
                onClick={()=>handleShowInactiveAskList()}
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
          {/*Start Clear All Filters */}
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
          {/* End Clear All Filter  */}
        </Col>

        {/* Start Table Component */}
        <Col lg={12} className="mt-sm-5 mt-3">
          {/* <AccountManagementTable
            Data={askList}
            Data2={loading}
            handleSelectAll={handleSelectAll}
            handleCheck={handleCheck}
            selectCheckBox={selectCheckBox}
          /> */}
          <div className="product_list_table table-responsive mb-sm-5 mb-3">
            {loading == 0 ? (
              <div className="loader-icon" style={{ marginBlock: "80px" }}>
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </div>
            ) : loading == 1 ? (
              <Table
                bordered
                striped
                className="align-middle text-center managment-table"
              >
                <thead>
                  <tr>
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

                    <th onClick={() => sortHere("model")}>Qty
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
                      Highest Bid{" "}
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
                       
                        <th>Your Ask 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16"><path filerule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>
                        </th>
                  </tr>
                </thead>
                <tbody>
                  {askList.length > 0 ? askList?.map((val, i) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex align-items-end justify-content-between position-relative">
                            <Form.Check
                              className="d-inline"
                              type="checkbox"
                              checked={val?.isSelected}
                              onChange={(e) =>
                                handleCheck(e.target.checked, val?._id)
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
                             
                              <div className="position-relative ms-1">
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
                                  className="bi bi-chevron-down "
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
                            <div className="modal_custom_ selling-mod">
                              <div className="inner_customModal_one">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: val.productId.description,
                                  }}
                                ></span>
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
                        <td>
                        <div className="d-flex flex-column edit">
                        
                        {val?._id == selectedRow ? (
                          <span onClick={()=> updateAskData(val._id , quantity == '' ? val?.quantity : quantity , expiration == '' ? val?.expiration : expiration)}>Save</span>
                        ) : (
                          <svg onClick={()=> editRow(val._id)} width="15" stroke-width="1.5" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                        )  }
                        <input type="number" 
                        className='table-qty' 
                        placeholder={val?.quantity ? val?.quantity : 0} 
                        value={quantity !== null && val?._id == selectedRow ? quantity : (val?.quantity ? val?.quantity : 0)}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          updateQuantity(newQuantity, val?._id);
                        }}
                        disabled={val?._id == selectedRow ? false : true  }
                        />
                        </div>
                        </td>
                        
                        <td>
                            <input type="number" 
                            className='table-qty'
                            placeholder={`${val?.expirationTime ? val?.expirationTime : '0'} Days`} 
                            value={expiration  !== null && val?._id == selectedRow ? expiration : (val?.expirationTime ? val?.expirationTime : 0)}
                            onChange={(e) => {
                              const newExpirationTime = parseInt(e.target.value);
                              updateExpiration(newExpirationTime, val?._id);
                            }}
                            disabled={val?._id == selectedRow ? false : true }
                            />
                        </td>
                        <td>{val?.productId?.lowest_ask -val?.productId?.highest_bid}</td>
                        <td>
                            <button onClick={()=> redirectToProductPage(val?.productId?._id , "product")} className='btn btn-success p-2 border border-dark'>{val?.productId?.highest_bid ? "Buy Now - $" + val?.productId?.highest_bid : 'Not Found'}</button>
                        </td>
                        <td>
                            <span onClick={()=> redirectToProductPage(val?.productId?._id , "ask")} className='border border-dark p-1 rounded-1 ask'>{val?.askAmount ? val?.askAmount : 'Not Found'}</span>
                            {descriptionindex1 == i ? (
                              <Button
                                className="bg-none border-0"
                                onClick={() => setdescriptionindex1()}
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
                                className="bg-none border-0 arrow-btn"
                                onClick={() => setdescriptionindex1(i)}
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

                  
                        </td>
                        {descriptionindex1 == i ? (
                            <div className="modal_custom_ selling-mod1">
                              <div className="inner_customModal_one">
                              <div class="inner_customModal custom-tab-mode" id="bid_ask_model"><tr><td><div class="table-responsive-sm"><table class="table table-striped table-bordered table-hover"><thead><tr><th>Quantity</th><th>Bid</th></tr></thead><tbody><tr><td>$2500</td><td> 1</td></tr></tbody></table></div></td><td><div class="table-responsive-sm"><table class="table table-striped table-bordered table-hover"><thead><tr><th>Quantity</th><th>Ask</th></tr></thead><tbody><tr><td>$618</td><td> 1</td></tr><tr><td>$218</td><td> 1</td></tr><tr><td>$138</td><td> 1</td></tr><tr><td>$188</td><td> 1</td></tr><tr><td>$28</td><td> 1</td></tr><tr><td>$738</td><td> 1</td></tr></tbody></table></div></td></tr></div>
                              </div>
                            </div>
                          ) : null}
                          {/* {val?.askStatus ? (
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
                        <td>{"$" + val?.askAmount}</td> */}
                      </tr>
                    );
                  }) : (
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
                <thead>
                  <tr>
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
                    <th onClick={() => sortHere("expiration")}>
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
                    <th onClick={() => sortHere("askAmount")}>
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
                </thead>
                <tbody>
                  <tr>No Data Found</tr>
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>

      {/* Start Filter Modal */}
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
    </div>
  );
}
