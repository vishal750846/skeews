// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
//   Modal,
// } from "react-bootstrap";
// import UserBuybaner from "./UserBuybaner";
// import Header from "./header";
// import ExportApi from "../api/ExportApi";
// import { useNavigate } from "react-router-dom";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import OutsideClickHandler from "react-outside-click-handler";
// import Login from "./Login";
// // import UserAskBidList from "./UserAskBidList";
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";
// import { toast } from "react-toastify";

// const UserBuySell = () => {
//   let imageUrl = "https://api.skewws.com/resources/";
//   const htmlString =
//     "<p class='tl_name'><strong>Why batch</strong><p class='inn-text'>If you only want to buy one item but would like to<br/> bid on multiple items to get the best deal this tool<br/> is for you!<p/><br/><strong>How it works</strong><p class='inn-text'>When any item in the batch sells to you, all of <br/> your existing bids on the other items in the batch<br/> will be automatically deactivated. This makes it<br/> safe for you to bid on many items without risking<br/> to purchase more than one item.</p><br/><strong>Instructions</strong><br/><p class='inn-text'>Add items to batch</strong><br/>1. Select the items you would like to add.<br/>2. Click batch.<br/></p><strong>Remove items from batch</strong><br/><p class='inn-text'>1. Unselect the items you would like to remove.</p>";
//   const [productData, setproductData] = useState();
//   const [userId, setUserId] = useState();
//   const [productData1, setproductData1] = useState();
//   const [descriptionindex, setdescriptionindex] = useState();
//   const [ask, setAsk] = useState();
//   const [showModal, setShowModal] = useState(false);
//   const [Bid, setBid] = useState();
//   const [AskBid, setAskBid] = useState();
//   const [currentSortOrder, setCurrentSortOrder] = useState(1);
//   const [currentSortKey, setCurrentSortKey] = useState(null);
//   const [hide, setHide] = useState();
//   const [FilterList, setFilterList] = useState();
//   const [condition1, setcondition1] = useState([]);
//   const [brandShow, setBrandShow] = useState(false);
//   const [chipsetShow, setChipsetShow] = useState(false);
//   const [seriesShow, setSeriesShow] = useState(false);
//   const [chipset, setchipset] = useState([]);
//   const [brand, setbrand] = useState([]);
//   const [modelShow, setModelShow] = useState(false);
//   const [bidStatus, setBidStatus] = useState(false);
//   const [askStatus, setAskStatus] = useState(false);
//   const [loading, setLoading] = useState(0);
//   const [showFilterModel, setShowFilterModel] = useState(false);
//   const [conditionKey, setconditionKey] = useState([]);
//   const [chipsetKey, setchipsetKey] = useState([]);
//   const [brandKey, setbrandKey] = useState([]);
//   const [seriesKey, setseriesKey] = useState([]);
//   const [modalKey, setmodalKey] = useState([]);
//   const [condition, setcondition] = useState([]);
//   const [series, setseries] = useState([]);
//   const [model, setmodel] = useState([]);
//   const [selectedData, setSelectedData] = useState([]);
//   const [selectCheckBox, setSelectCheckBox] = useState(false);
//   const [hideBatchStatus, setHideBatchStatus] = useState(false);
//   const [batchCount, setBatchCount] = useState();
//   const [batchData, setBatchData] = useState([]);
//   const [batchStatus, setBatchStatus] = useState();
//   const [showLoader, setShowLoader] = useState(false);
//   const [showButtonLoader, setShowButtonLoader] = useState(false);
//   const [userType, setUserType] = useState();
//   const navigate = useNavigate();
//   console.log("oooo", productData);
//   //for the Search
//   const hideData = (data) => {
//     setHide(data);
//   };

//   //for the User Buy Sell page Search that takes an event object (e) as a parameter
//   const handleSearch = (e) => {
//     if (e == "") {
//       setproductData([...productData1]);
//     } else {
//       let FilterproductData = productData1.filter(
//         (val) =>
//           val.brand.toLowerCase().includes(e.toLowerCase()) ||
//           val.chipset.toLowerCase().includes(e.toLowerCase()) ||
//           val.model.toLowerCase().includes(e.toLowerCase()) ||
//           val.series.toLowerCase().includes(e.toLowerCase())
//       );
//       setproductData([...FilterproductData]);
//     }
//   };
//   //for the Table Sort that takes a sorting key (key) as a parameter
//   const sortHere = (key) => {
//     const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
//     const sortedProducts = productData.sort((a, b) => {
//       if (a[key] < b[key]) return -1 * sortOrder;
//       if (a[key] > b[key]) return sortOrder;
//       return 0;
//     });
//     setCurrentSortKey(key);
//     setCurrentSortOrder(sortOrder);
//     setproducts1(sortedProducts);
//   };
//   //for getting the ask of product
//   // here askStatus is geted from the useState to make it work like switch,to make working it oppositelty.custom-tooltip_buy-sell
//   const handleViewAsk = () => {
//     setSelectCheckBox(false);
//     if (localStorage.getItem("tokenuser")) {
//       let status = !askStatus;
//       setAskStatus(status);
//       setBidStatus(false);
//       if (status) {
//         HandleGetAskList(JSON.parse(localStorage.getItem("tokenuser")).id);
//       } else {
//         HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//       }
//     } else if (localStorage.getItem("admin")) {
//       let status = !askStatus;
//       setAskStatus(status);
//       setBidStatus(false);
//       if (status) {
//         HandleGetAskList(JSON.parse(localStorage.getItem("admin")).id);
//       } else {
//         HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//       }
//     } else {
//       setShowModal(true);
//     }
//   };

//   //for getting the bid of product
//   // here bidStatus is geted from the useState to make it work like switch,to make working it oppositelty.
//   const handleViewBid = () => {
//     setSelectCheckBox(false);
//     if (localStorage.getItem("tokenuser")) {
//       let status = !bidStatus;
//       setBidStatus(status);
//       setAskStatus(false);
//       if (status) {
//         HandleGetBidList(JSON.parse(localStorage.getItem("tokenuser")).id);
//       } else {
//         HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//       }
//     } else if (localStorage.getItem("admin")) {
//       let status = !bidStatus;
//       setBidStatus(status);
//       setAskStatus(false);
//       if (status) {
//         HandleGetBidList(JSON.parse(localStorage.getItem("admin")).id);
//       } else {
//         HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//       }
//     } else {
//       // setShowModal(true);
//     }
//   };

//   //  user login data that takes an id as a parameter
//   // item is a parameter of the filter function it accepts the Items/Data.
//   // here DataCount is a variable which holds the Array of  object.
//   const HandleGetProductData = (id) => {
//     // setShowLoader(true);
//     setUserId(id);
//     ExportApi.GetAllProductUserid(id)
//       .then((resp) => {
//         if (resp.data.details?.length > 0) {
//           let data = resp.data.details;
//           let BatchStatus = data?.filter((item) => item?.batchStatus == true);
//           setBatchData(BatchStatus);
//           setSelectedData(BatchStatus)
//           setproductData(resp.data.details);
//           setproductData1(resp.data.details);
//           // let BCount = BatchStatus?.length / 2;
//           // if (BCount == 0.5) {
//           //   setBatchCount(BCount);
//           // } else {
//           //   setBatchCount(Math.ceil(BCount) - 1);
//           // }
//           setLoading(1);
//           // setShowLoader(false);
//         } else {
//           setLoading(2);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   console.log(batchCount);

//   // Create a new array called sortedData using the sort() method on the Data array
//   // her a and b are the two parameters,here a takes the new value and B checks the comparing for the sorting.
//   const sortedData = productData?.sort((a, b) => {
//     if (a.batchStatus && !b.batchStatus) {
//       return -1;
//     }
//     if (!a.batchStatus && b.batchStatus) {
//       return 1;
//     }
//     return 0;
//   });

//   // user login data
//   // here response is the data that is geted from the Api
//   const HandleGetProductData1 = () => {
//     ExportApi.GetAllProduct()
//       .then((resp) => {
//         if (resp.data.details?.length > 0) {
//           setproductData(resp.data.details);
//           setproductData1(resp.data.details);
//           // setLoading(1);
//         } else {
//           // setLoading(2);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   // for the View your Bid that takes an asklistid as a parameter
//   // here resp is the data that is geted from the Api
//   // obj is the variable that contains the previous data and new data by the help of the spread operator.
//   const HandleGetAskList = (id) => {
//     // setShowLoader(true);
//     let Data = [];
//     ExportApi.askList(id)
//       .then((resp) => {
//         for (let index = 0; index < resp.data.data?.length; index++) {
//           let obj = {};
//           const element = resp.data.data[index];
//           obj = { ...element, ...element.productId };
//           Data.push(obj);
//         }
//         // setShowLoader(false);
//         setproductData(Data);
//         setproductData1(Data);
//       })
//       .catch((err) => console.log(err));
//   };

//   ///for the view your ask  that takes an BidListId as a parameter
//   // obj is the variable that contains the previous data and new data by the help of the spread operator.
//   const HandleGetBidList = (id) => {
//     // setShowLoader(true);
//     let Data = [];
//     ExportApi.getBidList(id)
//       .then((resp) => {
//         for (let index = 0; index < resp.data.data?.length; index++) {
//           let obj = {};
//           const element = resp.data.data[index];
//           obj = { ...element, ...element.productId };
//           Data.push(obj);
//         }
//         setproductData(Data);
//         setproductData1(Data);
//         // setShowLoader(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   //Define a function called hendleask that takes an askId as a parameter
//   const Handleask = (id) => {
//     ExportApi.getask(id)
//       .then((resp) => {
//         setAsk(resp.data.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   //Define a function called hendleBid that takes an Bidid as a parameter
//   const Handlebid = (id) => {
//     ExportApi.getBid(id)
//       .then((resp) => {
//         setBid(resp.data.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   // here we pass productid as id and i as index
//   const ASKBID = (id, i) => {
//     Handleask(id);
//     Handlebid(id);
//     setAskBid(i);
//   };

//   //for the Single Checkbox that takes an batchStatusData and productId as a parameter ..
//   const handleCheck = (data, id) => {
//     setBatchStatus(data);
//     // let product_id = id;
//     // let index = selectedData.indexOf(product_id);
//     // if (index == -1) {
//     //   selectedData.push(product_id);
//     //   setSelectedData(selectedData);
//     // } else {
//     //   selectedData.splice(index, 1);
//     //   setSelectedData(selectedData);
//     // }
//     // if (data) {
//     //   for (let i = 0; i < productData.length; i++) {
//     //     const element1 = productData[i];
//     //     if (element1?._id.includes(product_id)) {
//     //       productData[i].batchStatus = true;
//     //     }
//     //   }
//     // } else {
//     //   for (let i = 0; i < productData.length; i++) {
//     //     const element1 = productData[i];
//     //     if (element1?._id.includes(product_id)) {
//     //       productData[i].batchStatus = false;
//     //     }
//     //   }
//     // }
//     // setproductData([...productData]);
//     // setSelectedData([...productData]);
//     handleUpdateBatch(data, id);
//   };

//   const handleUpdateBatch = (data, id) => {
//     // setLoading(0)
//     if (userId) {
//       ExportApi.updateBatch(data, id, userId).then((resp) => {
//         // setSelectedData(resp?.data?.Data?.productId)

//         // setLoading(1)
//         if (localStorage.getItem("tokenuser")) {
//           HandleGetProductData(
//             JSON.parse(localStorage.getItem("tokenuser")).id
//           );
//           HandleGetFilterListData();
//         } else if (localStorage.getItem("admin")) {
//           HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//           HandleGetFilterListData();
//         }
//       });
//     } else {
//       HandleGetProductData1();
//     }
//   };

//   // select All Functionlaity for the checkbox
//   const handleSelectAll = () => {
//     if (selectedData.length === productData.length) {
//       setSelectedData([]);
//       productData.map((item) => {
//         handleUpdateBatch(false, item._id);
//       })
//       // for (let i = 0; i < productData.length; i++) {
//       //   productData[i].batchStatus = false;
//       //   handleUpdateBatch(false, productData[i]._id);
//       // }
//       // setproductData([...productData]);
//     } else {
//       productData.map((item) => {
//         handleUpdateBatch(true, item._id);
//       });
//       // for (let i = 0; i < productData.length; i++) {
//       //   console.log(productData[i]._id);
//       //   productData[i].batchStatus = true;
//       //   handleUpdateBatch(true, productData[i]._id);
//       // }
//       // setproductData([...productData]);
//     }
//   };
//   //to show the filter Modal
//   const handlefilterModal = () => {
//     setShowFilterModel(true);
//   };

//   //get the data of the filter
//   const HandleGetFilterListData = () => {
//     ExportApi.GetFilterData()
//       .then((resp) => {
//         let chipsetKeyArray = [];
//         let conditionKeyArray = [];
//         let brandKeyArray = [];
//         let modalKeyArray = [];
//         let seriesKeyArray = [];
//         resp?.data.data?.chipset?.map((val, i) => {
//           let key = { [val]: false };
//           chipsetKeyArray.push(key);
//         });
//         setchipsetKey([...chipsetKeyArray]);
//         resp?.data.data?.condition?.map((val) => {
//           if (val == 1) {
//             let key = { ["New-Retail"]: false };
//             conditionKeyArray.push(key);
//           } else if (val == 2) {
//             let key = { ["New-2nd Hand"]: false };
//             conditionKeyArray.push(key);
//           } else {
//             let key = { ["Used"]: false };
//             conditionKeyArray.push(key);
//           }
//         });
//         setconditionKey([...conditionKeyArray]);
//         resp?.data.data?.series?.map((val) => {
//           let key = { [val]: false };
//           seriesKeyArray.push(key);
//         });
//         setseriesKey([...seriesKeyArray]);
//         resp?.data.data?.brands?.map((val) => {
//           let key = { [val]: false };

//           brandKeyArray.push(key);
//         });
//         setbrandKey([...brandKeyArray]);
//         resp?.data.data?.model?.map((val) => {
//           let key = { [val]: false };
//           modalKeyArray.push(key);
//         });
//         setmodalKey([...modalKeyArray]);
//         setFilterList(resp?.data?.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   //search Filter Api
//   const SearchFilterCheck = () => {
//     ExportApi.GetAllProductFilter(condition, chipset, brand, series, model)
//       .then((resp) => {
//         setproductData(resp.data.Data);
//       })
//       .catch((err) => console.log(err));
//   };

//   //chipset Filter
//   const ChipsetFilter = (e, i) => {
//     setSelectCheckBox(false);
//     const { name, checked } = e.target;
//     let index = chipset.indexOf(name);
//     if (checked || index === -1) {
//       chipset.push(name);
//       chipsetKey[i][name] = checked;
//       setchipset([...chipset]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     } else {
//       chipsetKey[i][name] = checked;
//       chipset.splice(index, 1);
//       setchipset([...chipset]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     }
//   };

//   // condition Filter
//   const conditionKeyFilter = (e, i) => {
//     setSelectCheckBox(false);
//     const { name, checked, min } = e.target;
//     let number = parseInt(min);
//     let index = condition.indexOf(number);
//     let index1 = condition1.indexOf(name);
//     if (checked || index === -1 || index1 === -1) {
//       condition.push(number);
//       condition1.push(name);
//       conditionKey[i][name] = checked;
//       setcondition([...condition]);
//       setcondition1([...condition1]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     } else {
//       conditionKey[i][name] = checked;
//       condition.splice(index, 1);
//       setcondition([...condition]);
//       condition1.splice(index1, 1);
//       setcondition1([...condition1]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     }
//   };

//   //modal filter
//   const modalFilter = (e, i) => {
//     setSelectCheckBox(false);
//     const { name, checked } = e.target;
//     let index = chipset.indexOf(name);
//     if (checked) {
//       model.push(name);
//       modalKey[i][name] = checked;
//       setmodel([...model]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     } else {
//       modalKey[i][name] = checked;
//       model.splice(index, 1);
//       setmodel([...model]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     }
//   };

//   //series filter
//   const seriesFilter = (e, i) => {
//     setSelectCheckBox(false);
//     const { name, checked } = e.target;
//     let index = series.indexOf(name);
//     if (checked) {
//       series.push(name);
//       seriesKey[i][name] = checked;
//       setseries([...series]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     } else {
//       seriesKey[i][name] = checked;
//       series.splice(index, 1);
//       setseries([...series]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     }
//   };

//   //Brand Filter
//   const BrandtFilter = (e, i) => {
//     setSelectCheckBox(false);
//     const { name, checked } = e.target;
//     let index = brand.indexOf(name);
//     if (checked) {
//       brand.push(name);
//       brandKey[i][name] = checked;
//       setbrand([...brand]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     } else {
//       brandKey[i][name] = checked;
//       brand.splice(index, 1);
//       setbrand([...brand]);
//       setTimeout(() => {
//         SearchFilterCheck();
//       });
//     }
//   };
//   // show more chipset Result
//   const handlechipsetshowmore = (data) => {
//     if (data == "More") {
//       setChipsetShow(true);
//     } else {
//       setChipsetShow(false);
//     }
//   };

//   // show more brand result
//   const handlebrandshowmore = (data) => {
//     if (data == "More") {
//       setBrandShow(true);
//     } else {
//       setBrandShow(false);
//     }
//   };

//   //show more series result
//   const handleSeriesshowmore = (data) => {
//     if (data == "More") {
//       setSeriesShow(true);
//     } else {
//       setSeriesShow(false);
//     }
//   };

//   //show more model result
//   const handlemodelshowmore = (data) => {
//     if (data == "More") {
//       setModelShow(true);
//     } else {
//       setModelShow(false);
//     }
//   };

//   // clear All Filter
//   const clearAllFilters = () => {
//     if (
//       model?.length > 0 ||
//       series?.length > 0 ||
//       brand?.length > 0 ||
//       chipset?.length > 0 ||
//       condition?.length > 0
//     ) {
//       setmodel([]);
//       setseries([]);
//       setbrand([]);
//       setchipset([]);
//       setcondition([]);
//       setcondition1([]);
//       if (localStorage.getItem("tokenuser")) {
//         HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//         HandleGetFilterListData(
//           JSON.parse(localStorage.getItem("tokenuser")).id
//         );
//       } else if (localStorage.getItem("admin")) {
//         HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//         HandleGetFilterListData(JSON.parse(localStorage.getItem("admin")).id);
//       } else {
//         HandleGetProductData1();
//       }
//       // setLoading(0);
//     } else {
//       // setLoading(1);
//     }
//   };

//   //Condition Filter Close
//   const conditionKeyFilterClose = (i, name) => {
//     let index = -1;
//     for (let i = 0; i < conditionKey.length; i++) {
//       if (Object.keys(conditionKey[i])[0] == name) {
//         index = i;
//       }
//     }
//     conditionKey[index][name] = false;
//     condition1.splice(i, 1);
//     condition.splice(i, 1);
//     setcondition1([...condition1]);
//     setcondition([...condition]);
//     setTimeout(() => {
//       SearchFilterCheck();
//     });
//   };

//   //Chipset Filter Close
//   const ChipsetFilterClose = (id, name) => {
//     let index = -1;
//     for (let i = 0; i < chipsetKey.length; i++) {
//       if (Object.keys(chipsetKey[i])[0] == name) {
//         index = i;
//       }
//     }

//     chipsetKey[index][name] = false;
//     chipset.splice(id, 1);
//     setchipset([...chipset]);
//     setTimeout(() => {
//       SearchFilterCheck();
//     });
//   };

//   //Brand Filter Close
//   const brandtFilterClose = (i, name) => {
//     let index = -1;
//     for (let i = 0; i < brandKey.length; i++) {
//       if (Object.keys(brandKey[i])[0] == name) {
//         index = i;
//       }
//     }
//     brandKey[index][name] = false;
//     brand.splice(i, 1);
//     setbrand([...brand]);
//     setTimeout(() => {
//       SearchFilterCheck();
//     });
//   };

//   //Series Filter Close
//   const seriesFilterCsole = (i, name) => {
//     let index = -1;
//     for (let i = 0; i < seriesKey.length; i++) {
//       if (Object.keys(seriesKey[i])[0] == name) {
//         index = i;
//       }
//     }
//     seriesKey[index][name] = false;
//     series.splice(i, 1);
//     setseries([...series]);
//     setTimeout(() => {
//       SearchFilterCheck();
//     });
//   };

//   //modal Filter Close
//   const modalFilterCsole = (i, name) => {
//     let index = -1;
//     for (let i = 0; i < modalKey.length; i++) {
//       if (Object.keys(modalKey[i])[0] == name) {
//         index = i;
//       }
//     }
//     modalKey[index][name] = false;
//     model.splice(i, 1);
//     setmodel([...model]);
//     setTimeout(() => {
//       SearchFilterCheck();
//     });
//   };

//   // to show the popup of the create batch
//   const handleCreateBatch = () => {
//     if (selectedData?.length > 0) {
//       setShowButtonLoader(true);
//       ExportApi.createBatch(selectedData, userId, "sell")
//         .then((resp) => {
//           if (resp.data.message == "Batch Created Successfully") {
//             toast.success(resp.data.message);
//             setSelectedData([]);
//             setShowButtonLoader(false);
//           } else {
//             toast.error(resp.data.message);
//             setSelectedData([]);
//             setShowButtonLoader(false);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       toast.error("Please Select the Product First");
//       setShowButtonLoader(false);
//     }
//   };

//   const handleHideBatch = () => {
//     setHideBatchStatus(!hideBatchStatus);
//     if (hideBatchStatus) {
//       if (localStorage.getItem("tokenuser")) {
//         HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//         HandleGetFilterListData();
//       } else if (localStorage.getItem("admin")) {
//         HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//         HandleGetFilterListData();
//       } else {
//         HandleGetProductData1();
//         HandleGetFilterListData();
//       }
//     } else {
//       let data = productData?.filter((item) => item.batchStatus != true);
//       setproductData([...data]);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("tokenuser")) {
//       HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//       HandleGetFilterListData();
//     } else if (localStorage.getItem("admin")) {
//       HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//       HandleGetFilterListData();
//     } else {
//       HandleGetProductData1();
//       HandleGetFilterListData();
//     }
//   }, []);

//   window.addEventListener("Login", () => {
//     if (localStorage.getItem("tokenuser")) {
//       setTimeout(() => {
//         HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
//       });
//     } else {
//       setTimeout(() => {
//         HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
//       });
//     }
//   });

//   window.addEventListener("Loginout", () => {
//     setTimeout(() => {
//       setData();
//     });
//   });

//   console.log(batchData);
//   return (
//     <div>
//       <Header hideData={hideData} />
//       <UserBuybaner />
//       <Container>
//         <Row className="buy-sell-part">
//           <Col lg={12} md={12}>
//             <div className="bg-dark p-3 d-md-flex align-items-center justify-content-between rounded mt-3">
//               <div className="d-flex align-items-center justify-content-between search-box">
//                 <h4 className="mb-0 text-white me-3 fw-bold text-nowrap">
//                   Buy/Sell
//                 </h4>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search GPU"
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Button
//                   className="position-relative px-4 bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize"
//                   onClick={handleCreateBatch}
//                 >
//                   {showButtonLoader ? "Please Wait..." : "Batch"}
//                   <ReactTooltip
//                     className="custom-tooltip_buy-sell"
//                     anchorId="app-compare"
//                     place="bottom"
//                     content=<div
//                       dangerouslySetInnerHTML={{ __html: htmlString }}
//                     />
//                     style={{ textTransform: "none" }}
//                   />
//                   <svg
//                     id="app-compare"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     className="bi bi-question-circle-fill position-absolute top-0 right-0"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
//                   </svg>
//                 </Button>
//                 {hideBatchStatus ? (
//                   <Button
//                     className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
//                     onClick={handleHideBatch}
//                   >
//                     Hide Batch
//                   </Button>
//                 ) : (
//                   <Button
//                     className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
//                     onClick={handleHideBatch}
//                   >
//                     Hide Batch
//                   </Button>
//                 )}
//                 {bidStatus ? (
//                   <Button
//                     className="bg-success text-white border-0 mb-2 mb-xl-0 text-capitalize"
//                     onClick={() => handleViewBid()}
//                   >
//                     view your bids
//                   </Button>
//                 ) : (
//                   <Button
//                     className="bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize"
//                     onClick={() => handleViewBid()}
//                   >
//                     view your bids
//                   </Button>
//                 )}
//                 {askStatus ? (
//                   <Button
//                     className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
//                     onClick={() => handleViewAsk()}
//                   >
//                     view your asks
//                   </Button>
//                 ) : (
//                   <Button
//                     className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
//                     onClick={() => handleViewAsk()}
//                   >
//                     view your asks
//                   </Button>
//                 )}

//                 <Button
//                   className="bg-light text-black border-0 mb-2 mb-xl-0 px-5 text-capitalize"
//                   onClick={() => handlefilterModal()}
//                 >
//                   filter
//                 </Button>
//               </div>
//             </div>
//           </Col>
//           <Col lg={12} className="text-start mt-5"></Col>
//         </Row>
//         {loading == 0 ? (
//           <>
//             <div className="loader-icon" style={{ marginBlock: "80px" }}>
//               <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//             </div>
//           </>
//         ) : loading == 1 ? (
//           <>
//             <div className="text-center text-sm-start">
//               <Button
//                 className="rounded-0 bg-white border text-dark px-5 py-2 fw-bold"
//                 onClick={() => clearAllFilters()}
//               >
//                 Clear all filters
//               </Button>
//               {conditionKey.map((val, i) => {
//                 let key = condition1[i];
//                 let data = conditionKey.filter((item) => item[key] == true);
//                 return (
//                   <>
//                     {data.length != 0 ? (
//                       <span
//                         key={i}
//                         className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
//                       >
//                         {condition1[i]}{" "}
//                         <Button
//                           className="bg-none border-0 py-0 text-dark"
//                           onClick={() =>
//                             conditionKeyFilterClose(i, condition1[i])
//                           }
//                         >
//                           X
//                         </Button>
//                       </span>
//                     ) : null}
//                   </>
//                 );
//               })}
//               {chipsetKey.map((val, i) => {
//                 let key = chipset[i];
//                 let data = chipsetKey.filter((item) => item[key] == true);
//                 return (
//                   <>
//                     {data.length != 0 ? (
//                       <>
//                         <span
//                           key={i}
//                           className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
//                         >
//                           {chipset[i]}
//                           <Button
//                             className="bg-none border-0 py-0 text-dark"
//                             onClick={() => ChipsetFilterClose(i, chipset[i])}
//                           >
//                             X
//                           </Button>
//                         </span>
//                       </>
//                     ) : (
//                       ""
//                     )}
//                   </>
//                 );
//               })}
//               {brandKey?.map((val, i) => {
//                 let key = brand[i];
//                 let data = brandKey.filter((item) => item[key] == true);
//                 return (
//                   <>
//                     {data.length != 0 ? (
//                       <span
//                         key={i}
//                         className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
//                       >
//                         {brand[i]}{" "}
//                         <Button
//                           className="bg-none border-0 py-0 text-dark"
//                           onClick={() => brandtFilterClose(i, brand[i])}
//                         >
//                           X
//                         </Button>
//                       </span>
//                     ) : null}
//                   </>
//                 );
//               })}
//               {seriesKey.map((val, i) => {
//                 let key = series[i];
//                 let data = seriesKey.filter((item) => item[key] == true);
//                 return (
//                   <>
//                     {data.length != 0 ? (
//                       <span
//                         key={i}
//                         className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
//                       >
//                         {series[i]}{" "}
//                         <Button
//                           className="bg-none border-0 py-0 text-dark"
//                           onClick={() => seriesFilterCsole(i, series[i])}
//                         >
//                           X
//                         </Button>
//                       </span>
//                     ) : null}
//                   </>
//                 );
//               })}
//               {modalKey.map((val, i) => {
//                 let key = model[i];
//                 let data = modalKey.filter((item) => item[key] == true);
//                 return (
//                   <>
//                     {data.length != 0 ? (
//                       <span
//                         key={i}
//                         className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
//                       >
//                         {model[i]}{" "}
//                         <Button
//                           className="bg-none border-0 py-0 text-dark"
//                           onClick={() => modalFilterCsole(i, model[i])}
//                         >
//                           X
//                         </Button>
//                       </span>
//                     ) : null}
//                   </>
//                 );
//               })}
//             </div>
//             <div className="table-responsive mb-5">
//               <div className="d-flex gap-2">
//                 {/* {batchData?.map((item, i) => {
//                   return(
//                     i <= 0 ? (
//                       <div className="bg-dark lft-bar-userbuysell text-white mr-1 d-flex align-items-center">
//                         <p className="vertical-text">BATCH</p>
//                       </div>
//                     ) : (
//                       ""
//                     )
//                   )
//                 })} */}
//                 <Table
//                   bordered
//                   striped
//                   className="align-middle graphic-table by-sell-table"
//                 >
//                   <thead>
//                     <tr>
//                       <th></th>
//                       <th className="text-start">
//                         <Form.Check
//                           className="d-inline me-2"
//                           type="checkbox"
//                           checked={selectedData?.length === productData?.length}
//                           onClick={() => handleSelectAll()}
//                         />
//                         <label>Select All</label>
//                       </th>
//                       <th onClick={() => sortHere("chipset")}>
//                         Chipset
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th onClick={() => sortHere("brand")}>
//                         Brand
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th onClick={() => sortHere("series")}>
//                         Series
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th onClick={() => sortHere("model")}>
//                         Model
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th onClick={() => sortHere("new_retail_website_price")}>
//                         Highest Bid
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th onClick={() => sortHere("new_retail_market_price")}>
//                         Lowest Ask
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                       <th>
//                         Your Ask/Bid
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           fill="currentColor"
//                           className="bi bi-chevron-expand"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             filerule="evenodd"
//                             d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
//                           />
//                         </svg>
//                       </th>
//                     </tr>
//                   </thead>
//                   {showLoader ? (
//                     <>
//                       <div
//                         className="loader-icon"
//                         style={{ marginBlock: "80px" }}
//                       >
//                         <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//                       </div>
//                     </>
//                   ) : (
//                     <tbody>
//                       {productData?.length > 0 ? (
//                         productData.map((val, i) => {
//                           return (
//                             <tr key={i}>
//                               {val?.batchStatus ? (
//                                 i === 0 ?
//                                 <td
//                                   rowSpan={selectedData?.length}
//                                   className="fst-part-cont"
//                                 >
//                                   <div className="bg-dark lft-bar text-white mr-1 d-flex align-items-center">
//                                   <p className="vertical-text">BATCH</p>
//                                   </div>
//                                 </td>
//                                 :""
//                               ) : (
//                                 <td></td>
//                               )}
//                               <td>
//                                 <span className="float-end">
//                                   {val?.type == 1
//                                     ? "New"
//                                     : val?.type == 2
//                                     ? "2nd Hand"
//                                     : "Used"}
//                                 </span>
//                                 <div className="d-flex align-items-end justify-content-between mt-4">
//                                   <Form.Check
//                                     className="d-inline"
//                                     type="checkbox"
//                                     checked={val?.batchStatus}
//                                     onClick={(e) =>
//                                       handleCheck(e.target.checked, val._id)
//                                     }
//                                   />
//                                   <img
//                                     src={`${imageUrl}${val?.productId?.image[0]}`}
//                                     style={{ width: "70px" }}
//                                     onClick={() =>
//                                       navigate("/product/" + val?._id)
//                                     }
//                                   />
//                                   {descriptionindex == i ? (
//                                     <Button
//                                       className="bg-none border-0"
//                                       onClick={() => setdescriptionindex()}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="bg-none border-0"
//                                       onClick={() => setdescriptionindex(i)}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   )}
//                                 </div>
//                                 <OutsideClickHandler
//                                   onOutsideClick={() => {
//                                     setdescriptionindex();
//                                   }}
//                                 >
//                                   <div className="tool_tip_custom custom ">
//                                     {descriptionindex == i ? (
//                                       <div className="modal_custom_">
//                                         <div className="inner_customModal_one">
//                                           <h3
//                                             dangerouslySetInnerHTML={{
//                                               __html: val.description,
//                                             }}
//                                           ></h3>
//                                         </div>
//                                       </div>
//                                     ) : null}
//                                   </div>
//                                 </OutsideClickHandler>
//                               </td>

//                               <td>{val.chipset}</td>
//                               <td>{val.brand}</td>
//                               <td>{val.series}</td>
//                               <td>{val.model}</td>
//                               {val?.userType == "admin" ? (
//                                 <td>
//                                   {val?.type == 1 ? (
//                                     " Retail Only"
//                                   ) : val?.type == 2 ? (
//                                     val?.highest_bid > 0 ? (
//                                       <Button
//                                         className="border bg-danger"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/sell2"
//                                           )
//                                         }
//                                       >
//                                         Sell Now - {"$" + val?.highest_bid}
//                                       </Button>
//                                     ) : (
//                                       <Button
//                                         className="border bg-danger"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/sell2"
//                                           )
//                                         }
//                                       >
//                                         Sell Now - TBD
//                                       </Button>
//                                     )
//                                   ) : val?.highest_bid > 0 ? (
//                                     <Button
//                                       className="border bg-danger"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/sell3"
//                                         )
//                                       }
//                                     >
//                                       Sell Now - {"$" + val?.highest_bid}
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="border bg-danger"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/sell3"
//                                         )
//                                       }
//                                     >
//                                       Sell Now - TBD
//                                     </Button>
//                                   )}
//                                 </td>
//                               ) : (
//                                 <td>
//                                   {val?.type == 1 ? (
//                                     " Retail Only"
//                                   ) : val?.type == 2 ? (
//                                     val?.highest_bid > 0 ? (
//                                       <Button
//                                         className="border bg-danger"
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/sell2"
//                                           )
//                                         }
//                                       >
//                                         Sell Now - {"$" + val?.highest_bid}
//                                       </Button>
//                                     ) : (
//                                       <Button
//                                         className="border bg-danger"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/sell2"
//                                           )
//                                         }
//                                       >
//                                         Sell Now - TBD
//                                       </Button>
//                                     )
//                                   ) : val?.highest_bid > 0 ? (
//                                     <Button
//                                       className="border bg-danger"
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/sell3"
//                                         )
//                                       }
//                                     >
//                                       Sell Now - {"$" + val?.highest_bid}
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="border bg-danger"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/sell3"
//                                         )
//                                       }
//                                     >
//                                       Sell Now - TBD
//                                     </Button>
//                                   )}
//                                 </td>
//                               )}
//                               {val?.userType == "user" ? (
//                                 <td className="d-flex align-items-center py-5">
//                                   {val?.type == 1 ? (
//                                     <Button
//                                       className="border bg-success"
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy2"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - ${val?.new_retail_website_price}
//                                     </Button>
//                                   ) : val?.type == 2 ? (
//                                     val?.lowest_ask > 0 ? (
//                                       <Button
//                                         className="border bg-success"
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/buy3"
//                                           )
//                                         }
//                                       >
//                                         Buy Now - {"$" + val?.lowest_ask}
//                                       </Button>
//                                     ) : (
//                                       <Button
//                                         className="border bg-success"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/buy3"
//                                           )
//                                         }
//                                       >
//                                         Buy Now - TBD
//                                       </Button>
//                                     )
//                                   ) : val?.lowest_ask > 0 ? (
//                                     <Button
//                                       className="border bg-success"
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy4"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - {"$" + val?.lowest_ask}
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="border bg-success"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy4"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - TBD
//                                     </Button>
//                                   )}
//                                   {AskBid == i ? (
//                                     <Button
//                                       className="bg-none border-0 mt-2"
//                                       onClick={() => setAskBid()}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="bg-none border-0 mt-2"
//                                       onClick={() => ASKBID(val?._id, i)}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   )}

//                                   <OutsideClickHandler
//                                     onOutsideClick={() => {
//                                       setAskBid();
//                                     }}
//                                   >
//                                     {AskBid == i ? (
//                                       <div className="big-modal">
//                                         <div
//                                           className="overlay"
//                                           onClick={() => setAskBid()}
//                                         >
//                                           <div
//                                             className="modal_custom"
//                                             id="bid_ask_outer"
//                                           >
//                                             <div
//                                               className="inner_customModal custom-tab-mode"
//                                               id="bid_ask_model"
//                                             >
//                                               <tr>
//                                                 <td>
//                                                   <Table
//                                                     responsive="sm"
//                                                     striped
//                                                     bordered
//                                                     hover
//                                                   >
//                                                     <thead>
//                                                       <tr>
//                                                         <th>Quantity</th>
//                                                         <th>Bid</th>
//                                                       </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                       {loading == 0 ? (
//                                                         <>
//                                                           <div
//                                                             className="loader-icon"
//                                                             style={{
//                                                               marginBlock:
//                                                                 "80px",
//                                                             }}
//                                                           >
//                                                             <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//                                                           </div>
//                                                         </>
//                                                       ) : loading == 1 ? (
//                                                         <>
//                                                           {Bid?.length > 0
//                                                             ? Bid.map(
//                                                                 (val, i) => {
//                                                                   return (
//                                                                     <tr key={i}>
//                                                                       <td>
//                                                                         $
//                                                                         {
//                                                                           val?.bidAmount
//                                                                         }
//                                                                       </td>
//                                                                       <td>
//                                                                         {" "}
//                                                                         1
//                                                                       </td>
//                                                                     </tr>
//                                                                   );
//                                                                 }
//                                                               )
//                                                             : null}
//                                                         </>
//                                                       ) : (
//                                                         <>
//                                                           <tr>
//                                                             <td>$13</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$18</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$138</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$188</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$28</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$738</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                         </>
//                                                       )}
//                                                     </tbody>
//                                                   </Table>
//                                                 </td>
//                                                 <td>
//                                                   <Table
//                                                     responsive="sm"
//                                                     striped
//                                                     bordered
//                                                     hover
//                                                   >
//                                                     <thead>
//                                                       <tr>
//                                                         <th>Quantity</th>
//                                                         <th>Ask</th>
//                                                       </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                       {loading == 0 ? (
//                                                         <>
//                                                           <div
//                                                             className="loader-icon"
//                                                             style={{
//                                                               marginBlock:
//                                                                 "80px",
//                                                             }}
//                                                           >
//                                                             <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//                                                           </div>
//                                                         </>
//                                                       ) : loading == 1 ? (
//                                                         <>
//                                                           {ask?.length > 0
//                                                             ? ask.map(
//                                                                 (val, i) => {
//                                                                   return (
//                                                                     <tr key={i}>
//                                                                       <td>
//                                                                         $
//                                                                         {
//                                                                           val.askAmount
//                                                                         }
//                                                                       </td>
//                                                                       <td>
//                                                                         {" "}
//                                                                         1
//                                                                       </td>
//                                                                     </tr>
//                                                                   );
//                                                                 }
//                                                               )
//                                                             : null}
//                                                         </>
//                                                       ) : (
//                                                         <>
//                                                           <tr>
//                                                             <td>$618</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$218</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$138</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$188</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$28</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$738</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                         </>
//                                                       )}
//                                                     </tbody>
//                                                   </Table>
//                                                 </td>
//                                               </tr>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     ) : null}
//                                   </OutsideClickHandler>
//                                 </td>
//                               ) : (
//                                 <td className="d-flex align-items-center py-5">
//                                   {val?.type == 1 ? (
//                                     <Button
//                                       className="border bg-success"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy2"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - ${val?.new_retail_website_price}
//                                     </Button>
//                                   ) : val?.type == 2 ? (
//                                     val?.lowest_ask > 0 ? (
//                                       <Button
//                                         className="border bg-success"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/buy3"
//                                           )
//                                         }
//                                       >
//                                         Buy Now - {"$" + val?.lowest_ask}
//                                       </Button>
//                                     ) : (
//                                       <Button
//                                         className="border bg-success"
//                                         disabled
//                                         onClick={() =>
//                                           navigate(
//                                             "/bidask/" + val?._id + "/buy3"
//                                           )
//                                         }
//                                       >
//                                         Buy Now - $0
//                                       </Button>
//                                     )
//                                   ) : val?.lowest_ask > 0 ? (
//                                     <Button
//                                       className="border bg-success"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy4"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - {"$" + val?.lowest_ask}
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="border bg-success"
//                                       disabled
//                                       onClick={() =>
//                                         navigate(
//                                           "/bidask/" + val?._id + "/buy4"
//                                         )
//                                       }
//                                     >
//                                       Buy Now - $0
//                                     </Button>
//                                   )}
//                                   {AskBid == i ? (
//                                     <Button
//                                       className="bg-none border-0 mt-2"
//                                       disabled
//                                       onClick={() => setAskBid()}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       className="bg-none border-0 mt-2"
//                                       onClick={() => ASKBID(val?._id, i)}
//                                     >
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="#0000ff"
//                                         className="bi bi-chevron-down"
//                                         viewBox="0 0 16 16"
//                                       >
//                                         <path
//                                           filerule="evenodd"
//                                           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
//                                         />
//                                       </svg>
//                                     </Button>
//                                   )}

//                                   <OutsideClickHandler
//                                     onOutsideClick={() => {
//                                       setAskBid();
//                                     }}
//                                   >
//                                     {AskBid == i ? (
//                                       <div className="big-modal">
//                                         <div
//                                           className="overlay"
//                                           onClick={() => setAskBid()}
//                                         >
//                                           <div
//                                             className="modal_custom"
//                                             id="bid_ask_outer"
//                                           >
//                                             <div
//                                               className="inner_customModal custom-tab-mode"
//                                               id="bid_ask_model"
//                                             >
//                                               <tr>
//                                                 <td>
//                                                   <Table
//                                                     responsive="sm"
//                                                     striped
//                                                     bordered
//                                                     hover
//                                                   >
//                                                     <thead>
//                                                       <tr>
//                                                         <th>Quantity</th>
//                                                         <th>Bid</th>
//                                                       </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                       {loading == 0 ? (
//                                                         <>
//                                                           <div
//                                                             className="loader-icon"
//                                                             style={{
//                                                               marginBlock:
//                                                                 "80px",
//                                                             }}
//                                                           >
//                                                             <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//                                                           </div>
//                                                         </>
//                                                       ) : loading == 1 ? (
//                                                         <>
//                                                           {Bid?.length > 0
//                                                             ? Bid.map(
//                                                                 (val, i) => {
//                                                                   return (
//                                                                     <tr key={i}>
//                                                                       <td>
//                                                                         $
//                                                                         {
//                                                                           val?.bidAmount
//                                                                         }
//                                                                       </td>
//                                                                       <td>
//                                                                         {" "}
//                                                                         1
//                                                                       </td>
//                                                                     </tr>
//                                                                   );
//                                                                 }
//                                                               )
//                                                             : null}
//                                                         </>
//                                                       ) : (
//                                                         <>
//                                                           <tr>
//                                                             <td>$13</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$18</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$138</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$188</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$28</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$738</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                         </>
//                                                       )}
//                                                     </tbody>
//                                                   </Table>
//                                                 </td>
//                                                 <td>
//                                                   <Table
//                                                     responsive="sm"
//                                                     striped
//                                                     bordered
//                                                     hover
//                                                   >
//                                                     <thead>
//                                                       <tr>
//                                                         <th>Quantity</th>
//                                                         <th>Ask</th>
//                                                       </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                       {loading == 0 ? (
//                                                         <>
//                                                           <div
//                                                             className="loader-icon"
//                                                             style={{
//                                                               marginBlock:
//                                                                 "80px",
//                                                             }}
//                                                           >
//                                                             <i className="fa-solid fa-spinner fa-spin-pulse"></i>
//                                                           </div>
//                                                         </>
//                                                       ) : loading == 1 ? (
//                                                         <>
//                                                           {ask?.length > 0
//                                                             ? ask.map(
//                                                                 (val, i) => {
//                                                                   return (
//                                                                     <tr key={i}>
//                                                                       <td>
//                                                                         $
//                                                                         {
//                                                                           val.askAmount
//                                                                         }
//                                                                       </td>
//                                                                       <td>
//                                                                         {" "}
//                                                                         1
//                                                                       </td>
//                                                                     </tr>
//                                                                   );
//                                                                 }
//                                                               )
//                                                             : null}
//                                                         </>
//                                                       ) : (
//                                                         <>
//                                                           <tr>
//                                                             <td>$618</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$218</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$138</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$188</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$28</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                           <tr>
//                                                             <td>$738</td>
//                                                             <td> 1</td>
//                                                           </tr>
//                                                         </>
//                                                       )}
//                                                     </tbody>
//                                                   </Table>
//                                                 </td>
//                                               </tr>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     ) : null}
//                                   </OutsideClickHandler>
//                                 </td>
//                               )}

//                               <td>
//                                 {val?.type === 1 ? (
//                                   "Retail Only"
//                                 ) : val?.bidPrice == null ||
//                                   val?.askPrice == null ? (
//                                   <Button
//                                     className="border bg-none text-dark border-dark"
//                                     onClick={() => {
//                                       navigate("/bidask/" + val?._id);
//                                     }}
//                                   >
//                                     Place Bid/Ask
//                                   </Button>
//                                 ) : (
//                                   <>
//                                     <Button className="border bg-danger">
//                                       {"$" + val?.bidPrice}
//                                     </Button>
//                                     <Button className="border bg-success">
//                                       {"$" + val?.askPrice}
//                                     </Button>
//                                   </>
//                                 )}
//                               </td>
//                             </tr>

//                           );
//                         })
//                       ) : (
//                         <span>No Product Found</span>
//                       )}
//                     </tbody>
//                   )}
//                 </Table>
//               </div>
//             </div>
//           </>
//         ) : (
//           <span>
//             <b>NO Data Found</b>
//           </span>
//         )}
//       </Container>

//       {/* start Filter Model */}
//       <Modal
//         show={showFilterModel}
//         onHide={() => setShowFilterModel(false)}
//         backdrop="static"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Product Filter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mt-sm-5 mt-3 border mb-sm-5">
//             <div className="sidebar-accordian p-3">
//               <div>
//                 <span>
//                   <b>Condition</b>
//                 </span>
//                 {FilterList?.condition?.map((val, i) => {
//                   return (
//                     <Form.Group className="mb-2" controlId={val} key={i}>
//                       <Form.Check
//                         type="checkbox"
//                         checked={
//                           localStorage.getItem("condition")
//                             ? JSON.parse(localStorage.getItem("condition"))[i][
//                                 val == 1
//                                   ? "New-Retail"
//                                   : val == 2
//                                   ? "New-2nd Hand"
//                                   : "Used"
//                               ]
//                             : conditionKey[i][
//                                 val == 1
//                                   ? "New-Retail"
//                                   : val == 2
//                                   ? "New-2nd Hand"
//                                   : "Used"
//                               ]
//                         }
//                         onChange={(e) => conditionKeyFilter(e, i)}
//                         name={
//                           val == 1
//                             ? "New-Retail"
//                             : val == 2
//                             ? "New-2nd Hand"
//                             : "Used"
//                         }
//                         min={val}
//                         label={
//                           val == 1
//                             ? "New-Retail"
//                             : val == 2
//                             ? "New-2nd Hand"
//                             : "Used"
//                         }
//                       />
//                     </Form.Group>
//                   );
//                 })}
//                 {conditionKey?.length > 5 ? (
//                   <Button className="bg-none mb-3 border-0 p-0 text-dark">
//                     <span className="d-inline me-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-plus-square-fill"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                       </svg>
//                     </span>{" "}
//                     Show More
//                   </Button>
//                 ) : null}
//               </div>

//               <div>
//                 <span>
//                   <b>Chipset</b>
//                 </span>
//                 {chipsetShow
//                   ? FilterList?.chipset?.map((val, i) => {
//                       return (
//                         <>
//                           <Form.Group className="mb-2" controlId={val} key={i}>
//                             <Form.Check
//                               type="checkbox"
//                               checked={
//                                 localStorage.getItem("chipset")
//                                   ? JSON.parse(localStorage.getItem("chipset"))[
//                                       i
//                                     ][val]
//                                   : chipsetKey[i][val]
//                               }
//                               onChange={(e) => ChipsetFilter(e, i)}
//                               name={val}
//                               label={val}
//                             />
//                           </Form.Group>
//                         </>
//                       );
//                     })
//                   : FilterList?.chipset?.map((val, i) => {
//                       return (
//                         <>
//                           {i < 3 ? (
//                             <Form.Group
//                               className="mb-2"
//                               controlId={val}
//                               key={i}
//                             >
//                               <Form.Check
//                                 type="checkbox"
//                                 checked={
//                                   localStorage.getItem("chipset")
//                                     ? JSON.parse(
//                                         localStorage.getItem("chipset")
//                                       )[i][val]
//                                     : chipsetKey[i][val]
//                                 }
//                                 onChange={(e) => ChipsetFilter(e, i)}
//                                 name={val}
//                                 label={val}
//                               />
//                             </Form.Group>
//                           ) : null}
//                         </>
//                       );
//                     })}
//                 {chipsetShow ? (
//                   FilterList?.chipset?.length > 3 ? (
//                     <Button
//                       className="bg-none mb-3 border-0 p-0 text-dark"
//                       onClick={() => handlechipsetshowmore("Less")}
//                     >
//                       <span className="d-inline me-1">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="currentColor"
//                           className="bi bi-plus-square-fill"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                         </svg>
//                       </span>{" "}
//                       Show Less
//                     </Button>
//                   ) : null
//                 ) : FilterList?.chipset?.length > 3 ? (
//                   <Button
//                     className="bg-none mb-3 border-0 p-0 text-dark"
//                     onClick={() => handlechipsetshowmore("More")}
//                   >
//                     <span className="d-inline me-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-plus-square-fill"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                       </svg>
//                     </span>{" "}
//                     Show More
//                   </Button>
//                 ) : null}
//               </div>

//               <div>
//                 <span>
//                   <b>Brand</b>
//                 </span>
//                 {brandShow
//                   ? FilterList?.brands?.map((val, i) => {
//                       return (
//                         <>
//                           <Form.Group className="mb-2" controlId={val} key={i}>
//                             <Form.Check
//                               type="checkbox"
//                               checked={
//                                 localStorage.getItem("brand")
//                                   ? JSON.parse(localStorage.getItem("brand"))[
//                                       i
//                                     ][val]
//                                   : brandKey[i][val]
//                               }
//                               onChange={(e) => BrandtFilter(e, i)}
//                               name={val}
//                               label={val}
//                             />
//                           </Form.Group>
//                         </>
//                       );
//                     })
//                   : FilterList?.brands?.map((val, i) => {
//                       return (
//                         <>
//                           {i < 3 ? (
//                             <Form.Group
//                               className="mb-2"
//                               controlId={val}
//                               key={i}
//                             >
//                               <Form.Check
//                                 type="checkbox"
//                                 checked={
//                                   localStorage.getItem("brand")
//                                     ? JSON.parse(localStorage.getItem("brand"))[
//                                         i
//                                       ][val]
//                                     : brandKey[i][val]
//                                 }
//                                 onChange={(e) => BrandtFilter(e, i)}
//                                 name={val}
//                                 label={val}
//                               />
//                             </Form.Group>
//                           ) : null}
//                         </>
//                       );
//                     })}
//                 {brandShow ? (
//                   FilterList?.brands?.length > 3 ? (
//                     <Button
//                       className="bg-none mb-3 border-0 p-0 text-dark"
//                       onClick={() => handlebrandshowmore("Less")}
//                     >
//                       <span className="d-inline me-1">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="currentColor"
//                           className="bi bi-plus-square-fill"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                         </svg>
//                       </span>{" "}
//                       Show Less
//                     </Button>
//                   ) : null
//                 ) : FilterList?.brands?.length > 3 ? (
//                   <Button
//                     className="bg-none mb-3 border-0 p-0 text-dark"
//                     onClick={() => handlebrandshowmore("More")}
//                   >
//                     <span className="d-inline me-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-plus-square-fill"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                       </svg>
//                     </span>{" "}
//                     Show More
//                   </Button>
//                 ) : null}
//               </div>

//               <div>
//                 <span>
//                   <b>Series</b>
//                 </span>
//                 {seriesShow
//                   ? FilterList?.series?.map((val, i) => {
//                       return (
//                         <>
//                           <Form.Group className="mb-2" controlId={val} key={i}>
//                             <Form.Check
//                               type="checkbox"
//                               checked={
//                                 localStorage.getItem("series")
//                                   ? JSON.parse(localStorage.getItem("series"))[
//                                       i
//                                     ][val]
//                                   : seriesKey[i][val]
//                               }
//                               onChange={(e) => seriesFilter(e, i)}
//                               name={val}
//                               label={val}
//                             />
//                           </Form.Group>
//                         </>
//                       );
//                     })
//                   : FilterList?.series?.map((val, i) => {
//                       return (
//                         <>
//                           {i < 3 ? (
//                             <Form.Group
//                               className="mb-2"
//                               controlId={val}
//                               key={i}
//                             >
//                               <Form.Check
//                                 type="checkbox"
//                                 checked={
//                                   localStorage.getItem("series")
//                                     ? JSON.parse(
//                                         localStorage.getItem("series")
//                                       )[i][val]
//                                     : seriesKey[i][val]
//                                 }
//                                 onChange={(e) => seriesFilter(e, i)}
//                                 name={val}
//                                 label={val}
//                               />
//                             </Form.Group>
//                           ) : null}
//                         </>
//                       );
//                     })}
//                 {seriesShow ? (
//                   FilterList?.series?.length > 3 ? (
//                     <Button
//                       className="bg-none mb-3 border-0 p-0 text-dark"
//                       onClick={() => handleSeriesshowmore("Less")}
//                     >
//                       <span className="d-inline me-1">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="currentColor"
//                           className="bi bi-plus-square-fill"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                         </svg>
//                       </span>{" "}
//                       Show Less
//                     </Button>
//                   ) : null
//                 ) : FilterList?.series?.length > 3 ? (
//                   <Button
//                     className="bg-none mb-3 border-0 p-0 text-dark"
//                     onClick={() => handleSeriesshowmore("More")}
//                   >
//                     <span className="d-inline me-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-plus-square-fill"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                       </svg>
//                     </span>{" "}
//                     Show More
//                   </Button>
//                 ) : null}
//               </div>

//               <div>
//                 <span>
//                   <b>Model</b>
//                 </span>
//                 {modelShow
//                   ? FilterList?.model?.map((val, i) => {
//                       return (
//                         <>
//                           <Form.Group className="mb-2" controlId={val} key={i}>
//                             <Form.Check
//                               type="checkbox"
//                               checked={
//                                 localStorage.getItem("model")
//                                   ? JSON.parse(localStorage.getItem("model"))[
//                                       i
//                                     ][val]
//                                   : modalKey[i][val]
//                               }
//                               onChange={(e) => modalFilter(e, i)}
//                               name={val}
//                               label={val}
//                             />
//                           </Form.Group>
//                         </>
//                       );
//                     })
//                   : FilterList?.model?.map((val, i) => {
//                       return (
//                         <>
//                           {i < 3 ? (
//                             <Form.Group
//                               className="mb-2"
//                               controlId={val}
//                               key={i}
//                             >
//                               <Form.Check
//                                 type="checkbox"
//                                 checked={
//                                   localStorage.getItem("model")
//                                     ? JSON.parse(localStorage.getItem("model"))[
//                                         i
//                                       ][val]
//                                     : modalKey[i][val]
//                                 }
//                                 onChange={(e) => modalFilter(e, i)}
//                                 name={val}
//                                 label={val}
//                               />
//                             </Form.Group>
//                           ) : null}
//                         </>
//                       );
//                     })}
//                 {modelShow ? (
//                   FilterList?.model?.length > 5 ? (
//                     <Button
//                       className="bg-none mb-3 border-0 p-0 text-dark"
//                       onClick={() => handlemodelshowmore("Less")}
//                     >
//                       <span className="d-inline me-1">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="currentColor"
//                           className="bi bi-plus-square-fill"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                         </svg>
//                       </span>{" "}
//                       Show Less
//                     </Button>
//                   ) : null
//                 ) : FilterList?.model?.length > 5 ? (
//                   <Button
//                     className="bg-none mb-3 border-0 p-0 text-dark"
//                     onClick={() => handlemodelshowmore("More")}
//                   >
//                     <span className="d-inline me-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-plus-square-fill"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
//                       </svg>
//                     </span>{" "}
//                     Show More
//                   </Button>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* Start Login Model */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Login</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Login modal={() => setShowModal(false)} />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default UserBuySell;

import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import UserBuybaner from "./UserBuybaner";
import Header from "./header";
import ExportApi from "../api/ExportApi";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import OutsideClickHandler from "react-outside-click-handler";
import Login from "./Login";
// import UserAskBidList from "./UserAskBidList";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";

const UserBuySell = () => {
  let imageUrl = "https://api.skewws.com/resources/";
  const htmlString =
    "<p class='tl_name'><strong>Why batch</strong><p class='inn-text'>If you only want to buy one item but would like to<br/> bid on multiple items to get the best deal this tool<br/> is for you!<p/><br/><strong>How it works</strong><p class='inn-text'>When any item in the batch sells to you, all of <br/> your existing bids on the other items in the batch<br/> will be automatically deactivated. This makes it<br/> safe for you to bid on many items without risking<br/> to purchase more than one item.</p><br/><strong>Instructions</strong><br/><p class='inn-text'>Add items to batch</strong><br/>1. Select the items you would like to add.<br/>2. Click batch.<br/></p><strong>Remove items from batch</strong><br/><p class='inn-text'>1. Unselect the items you would like to remove.</p>";
  const [productData, setproductData] = useState();
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();
  const [productData1, setproductData1] = useState();
  const [descriptionindex, setdescriptionindex] = useState();
  const [ask, setAsk] = useState();
  const [showModal, setShowModal] = useState(false);
  const [Bid, setBid] = useState();
  const [AskBid, setAskBid] = useState();
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [hide, setHide] = useState();
  const [FilterList, setFilterList] = useState();
  const [condition1, setcondition1] = useState([]);
  const [brandShow, setBrandShow] = useState(false);
  const [chipsetShow, setChipsetShow] = useState(false);
  const [seriesShow, setSeriesShow] = useState(false);
  const [chipset, setchipset] = useState([]);
  const [brand, setbrand] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [bidStatus, setBidStatus] = useState(false);
  const [askStatus, setAskStatus] = useState(false);
  const [loading, setLoading] = useState(0);
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [conditionKey, setconditionKey] = useState([]);
  const [chipsetKey, setchipsetKey] = useState([]);
  const [brandKey, setbrandKey] = useState([]);
  const [seriesKey, setseriesKey] = useState([]);
  const [modalKey, setmodalKey] = useState([]);
  const [condition, setcondition] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [hideBatchStatus, setHideBatchStatus] = useState(false);
  const [batchCount, setBatchCount] = useState();
  const [batchData, setBatchData] = useState([]);
  const [batchStatus, setBatchStatus] = useState();
  const [askLoading, setAskLoading] = useState(0);
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const navigate = useNavigate();
  console.log("oooo", productData);
  //for the Search
  const hideData = (data) => {
    setHide(data);
  };

  //for the User Buy Sell page Search that takes an event object (e) as a parameter
  const handleSearch = (e) => {
    if (e == "") {
      setproductData([...productData1]);
    } else {
      let FilterproductData = productData1.filter(
        (val) =>
          val.brand.toLowerCase().includes(e.toLowerCase()) ||
          val.chipset.toLowerCase().includes(e.toLowerCase()) ||
          val.model.toLowerCase().includes(e.toLowerCase()) ||
          val.series.toLowerCase().includes(e.toLowerCase())
      );
      setproductData([...FilterproductData]);
    }
  };
  //for the Table Sort that takes a sorting key (key) as a parameter
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = productData.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
    setproducts1(sortedProducts);
  };
  //for getting the ask of product
  // here askStatus is geted from the useState to make it work like switch,to make working it oppositelty.custom-tooltip_buy-sell
  const handleViewAsk = () => {
    setSelectCheckBox(false);
    if (userType == "user") {
      let status = !askStatus;
      setAskStatus(status);
      setBidStatus(false);
      if (status) {
        HandleGetAskList(userId);
      } else {
        HandleGetProductData(userId);
      }
    } else if (userType == "admin") {
      let status = !askStatus;
      setAskStatus(status);
      setBidStatus(false);
      if (status) {
        HandleGetAskList(JSON.parse(userId));
      } else {
        HandleGetProductData(userId);
      }
    } else {
      setShowModal(true);
    }
  };

  //for getting the bid of product
  // here bidStatus is geted from the useState to make it work like switch,to make working it oppositelty.
  const handleViewBid = () => {
    setSelectCheckBox(false);
    if (userType == "user") {
      let status = !bidStatus;
      setBidStatus(status);
      setAskStatus(false);
      if (status) {
        HandleGetBidList(userId);
      } else {
        HandleGetProductData(userId);
      }
    } else if (userType == "admin") {
      let status = !bidStatus;
      setBidStatus(status);
      setAskStatus(false);
      if (status) {
        HandleGetBidList(userId);
      } else {
        HandleGetProductData(userId);
      }
    } else {
      // setShowModal(true);
    }
  };

  //  user login data that takes an id as a parameter
  // item is a parameter of the filter function it accepts the Items/Data.
  // here DataCount is a variable which holds the Array of  object.
  const HandleGetProductData = (id) => {
    // setShowLoader(true)
    ExportApi.GetAllProductUserid(id)
      .then((resp) => {
        if (resp.data.details?.length > 0) {
          let data = resp.data.details;
          let BatchStatus = data?.filter((item) => item?.batchStatus == true);
          setBatchData(BatchStatus);
          setSelectedData(BatchStatus);
          setproductData(resp.data.details);
          setproductData1(resp.data.details);
          // let BCount = BatchStatus?.length / 2;
          // if (BCount == 0.5) {
          //   setBatchCount(BCount);
          // } else {
          //   setBatchCount(Math.ceil(BCount) - 1);
          // }
          setLoading(1);
          // setShowLoader(false);
        } else {
          setLoading(2);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(batchCount);

  // Create a new array called sortedData using the sort() method on the Data array
  // her a and b are the two parameters,here a takes the new value and B checks the comparing for the sorting.
  const sortedData = productData?.sort((a, b) => {
    if (a.batchStatus && !b.batchStatus) {
      return -1;
    }
    if (!a.batchStatus && b.batchStatus) {
      return 1;
    }
    return 0;
  });

  // user login data
  // here response is the data that is geted from the Api
  const HandleGetProductData1 = () => {
    ExportApi.GetAllProduct()
      .then((resp) => {
        if (resp.data.details?.length > 0) {
          setproductData(resp.data.details);
          setproductData1(resp.data.details);
          setLoading(1);
        } else {
          setLoading(2);
        }
      })
      .catch((err) => console.log(err));
  };

  // for the View your Bid that takes an asklistid as a parameter
  // here resp is the data that is geted from the Api
  // obj is the variable that contains the previous data and new data by the help of the spread operator.
  const HandleGetAskList = (id) => {
    // setShowLoader(true);
    let Data = [];
    ExportApi.askList(id)
      .then((resp) => {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Data.push(obj);
        }
        // setShowLoader(false);
        setproductData(Data);
        setproductData1(Data);
      })
      .catch((err) => console.log(err));
  };

  ///for the view your ask  that takes an BidListId as a parameter
  // obj is the variable that contains the previous data and new data by the help of the spread operator.
  const HandleGetBidList = (id) => {
    // setShowLoader(true);
    let Data = [];
    ExportApi.getBidList(id)
      .then((resp) => {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Data.push(obj);
        }
        setproductData(Data);
        setproductData1(Data);
        // setShowLoader(false);
      })
      .catch((err) => console.log(err));
  };

  //Define a function called hendleask that takes an askId as a parameter
  const Handleask = (id) => {
    setAskLoading(0);
    ExportApi.getask(id)
      .then((resp) => {
        setAsk(resp.data.data);
        setAskLoading(1);
      })
      .catch((err) => console.log(err));
  };

  //Define a function called hendleBid that takes an Bidid as a parameter
  const Handlebid = (id) => {
    setAskLoading(0);
    ExportApi.getBid(id)
      .then((resp) => {
        setBid(resp.data.data);
        setAskLoading(1);
      })
      .catch((err) => console.log(err));
  };

  // here we pass productid as id and i as index
  const ASKBID = (id, i) => {
    Handleask(id);
    Handlebid(id);
    setAskBid(i);
  };

  //for the Single Checkbox that takes an batchStatusData and productId as a parameter ..
  const handleCheck = (data, id) => {
    if (!userId) {
      toast.error("Please login first");
    }
    
    setBatchStatus(data);
    // const result = productData.filter((item) => item.batchStatus == true);
    // if (result?.length > 0) {
    //   handleUpdateBatch(data, id);
    // } else {
      let productId = id;
      
      // setSelectedData(selectedData);
      const result1 = productData.find((Element) => Element._id == productId);
      if (result1.batchStatus) {
        console.log('hjhjhhjhhj')
        result1["batchStatus"] = false;
        const index = selectedData.findIndex((x) => x._id == result1._id)
        selectedData.splice(index,1)
        setSelectedData(selectedData)
        
      }else{
        
        result1["batchStatus"] = true;
        console.log('result1',result1)
        const index = productData.findIndex((x) => x._id == result1._id);
        productData[index] = result1;
        console.log('productData',productData)
        selectedData.push(result1._id);
        setSelectedData([...selectedData]);
        // let productId1 = result1._id;
        
      }
      // productData.map((item) => {
      //   item["batchStatus"] = true;
      //   return { ...item };
      // });
    // }
  };

  const handleUpdateBatch = (data, id) => {
    // setLoading(0)
    if (userId) {
      ExportApi.updateBatch(data, id, userId).then((resp) => {
        // setSelectedData(resp?.data?.Data?.productId)
        // setproductData()
        // setLoading(1)
        if (userType == "user") {
          HandleGetProductData(userId);
          HandleGetFilterListData();
        } else if (userType == "admin") {
          HandleGetProductData(userId);
          HandleGetFilterListData();
        }
      });
    } else {
      HandleGetProductData1();
    }
  };

  // select All Functionlaity for the checkbox

  // select All Functionlaity for the checkbox
  const handleSelectAll = () => {
    if (!userId) {
      toast.error("Please login first");
    }
    const result = productData.filter((item) => item.batchStatus == true);
    if (result?.length > 0) {
      if (selectedData.length === productData.length) {
        setSelectedData([]);
        productData.map((item) => {
          handleUpdateBatch(false, item._id);
        });
      } else {
        productData.map((item) => {
          handleUpdateBatch(true, item._id);
        });
      }
    } else {
      const filterData = productData?.map((item) => item._id);
      setSelectedData(filterData);
      productData.map((item) => {
        item["batchStatus"] = true;
        return { ...item };
      });
    }
  };

  // const handleSelectAll = () => {

  //   if (selectedData.length === productData.length) {
  //     setSelectedData([]);
  //     productData.map((item) => {
  //       handleUpdateBatch(false, item._id);
  //     });
  //     // for (let i = 0; i < productData.length; i++) {
  //     //   productData[i].batchStatus = false;
  //     //   handleUpdateBatch(false, productData[i]._id);
  //     // }
  //     // setproductData([...productData]);
  //   } else {
  //     const filterData = productData?.map((item) => item._id);
  //     setSelectedData(filterData);
  //     productData.map((item) => {
  //       handleUpdateBatch(true, item._id);
  //     });
  //     // for (let i = 0; i < productData.length; i++) {
  //     //   console.log(productData[i]._id);
  //     //   productData[i].batchStatus = true;
  //     //   handleUpdateBatch(true, productData[i]._id);
  //     // }
  //     // setproductData([...productData]);
  //   }
  // };

  //to show the filter Modal
  const handlefilterModal = () => {
    setShowFilterModel(true);
  };

  //get the data of the filter
  const HandleGetFilterListData = () => {
    ExportApi.GetFilterData()
      .then((resp) => {
        let chipsetKeyArray = [];
        let conditionKeyArray = [];
        let brandKeyArray = [];
        let modalKeyArray = [];
        let seriesKeyArray = [];
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
        setFilterList(resp?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  //search Filter Api
  const SearchFilterCheck = () => {
    ExportApi.GetAllProductFilter(condition, chipset, brand, series, model)
      .then((resp) => {
        setproductData(resp.data.Data);
      })
      .catch((err) => console.log(err));
  };

  //chipset Filter
  const ChipsetFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked || index === -1) {
      chipset.push(name);
      chipsetKey[i][name] = checked;
      setchipset([...chipset]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      chipsetKey[i][name] = checked;
      chipset.splice(index, 1);
      setchipset([...chipset]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  // condition Filter
  const conditionKeyFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked, min } = e.target;
    let number = parseInt(min);
    let index = condition.indexOf(number);
    let index1 = condition1.indexOf(name);
    if (checked || index === -1 || index1 === -1) {
      condition.push(number);
      condition1.push(name);
      conditionKey[i][name] = checked;
      setcondition([...condition]);
      setcondition1([...condition1]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      conditionKey[i][name] = checked;
      condition.splice(index, 1);
      setcondition([...condition]);
      condition1.splice(index1, 1);
      setcondition1([...condition1]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  //modal filter
  const modalFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked) {
      model.push(name);
      modalKey[i][name] = checked;
      setmodel([...model]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      modalKey[i][name] = checked;
      model.splice(index, 1);
      setmodel([...model]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  //series filter
  const seriesFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = series.indexOf(name);
    if (checked) {
      series.push(name);
      seriesKey[i][name] = checked;
      setseries([...series]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      seriesKey[i][name] = checked;
      series.splice(index, 1);
      setseries([...series]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };

  //Brand Filter
  const BrandtFilter = (e, i) => {
    setSelectCheckBox(false);
    const { name, checked } = e.target;
    let index = brand.indexOf(name);
    if (checked) {
      brand.push(name);
      brandKey[i][name] = checked;
      setbrand([...brand]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    } else {
      brandKey[i][name] = checked;
      brand.splice(index, 1);
      setbrand([...brand]);
      setTimeout(() => {
        SearchFilterCheck();
      });
    }
  };
  // show more chipset Result
  const handlechipsetshowmore = (data) => {
    if (data == "More") {
      setChipsetShow(true);
    } else {
      setChipsetShow(false);
    }
  };

  // show more brand result
  const handlebrandshowmore = (data) => {
    if (data == "More") {
      setBrandShow(true);
    } else {
      setBrandShow(false);
    }
  };

  //show more series result
  const handleSeriesshowmore = (data) => {
    if (data == "More") {
      setSeriesShow(true);
    } else {
      setSeriesShow(false);
    }
  };

  //show more model result
  const handlemodelshowmore = (data) => {
    if (data == "More") {
      setModelShow(true);
    } else {
      setModelShow(false);
    }
  };

  // clear All Filter
  const clearAllFilters = () => {
    if (
      model?.length > 0 ||
      series?.length > 0 ||
      brand?.length > 0 ||
      chipset?.length > 0 ||
      condition?.length > 0
    ) {
      setmodel([]);
      setseries([]);
      setbrand([]);
      setchipset([]);
      setcondition([]);
      setcondition1([]);
      if (userType == "user") {
        HandleGetProductData(userId);
        HandleGetFilterListData(userId);
      } else if (userType == "admin") {
        HandleGetProductData(userId);
        HandleGetFilterListData(userId);
      } else {
        HandleGetProductData1();
      }
      // setLoading(0);
    } else {
      // setLoading(1);
    }
  };

  //Condition Filter Close
  const conditionKeyFilterClose = (i, name) => {
    let index = -1;
    for (let i = 0; i < conditionKey.length; i++) {
      if (Object.keys(conditionKey[i])[0] == name) {
        index = i;
      }
    }
    conditionKey[index][name] = false;
    condition1.splice(i, 1);
    condition.splice(i, 1);
    setcondition1([...condition1]);
    setcondition([...condition]);
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  //Chipset Filter Close
  const ChipsetFilterClose = (id, name) => {
    let index = -1;
    for (let i = 0; i < chipsetKey.length; i++) {
      if (Object.keys(chipsetKey[i])[0] == name) {
        index = i;
      }
    }

    chipsetKey[index][name] = false;
    chipset.splice(id, 1);
    setchipset([...chipset]);
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  //Brand Filter Close
  const brandtFilterClose = (i, name) => {
    let index = -1;
    for (let i = 0; i < brandKey.length; i++) {
      if (Object.keys(brandKey[i])[0] == name) {
        index = i;
      }
    }
    brandKey[index][name] = false;
    brand.splice(i, 1);
    setbrand([...brand]);
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  //Series Filter Close
  const seriesFilterCsole = (i, name) => {
    let index = -1;
    for (let i = 0; i < seriesKey.length; i++) {
      if (Object.keys(seriesKey[i])[0] == name) {
        index = i;
      }
    }
    seriesKey[index][name] = false;
    series.splice(i, 1);
    setseries([...series]);
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  //modal Filter Close
  const modalFilterCsole = (i, name) => {
    let index = -1;
    for (let i = 0; i < modalKey.length; i++) {
      if (Object.keys(modalKey[i])[0] == name) {
        index = i;
      }
    }
    modalKey[index][name] = false;
    model.splice(i, 1);
    setmodel([...model]);
    setTimeout(() => {
      SearchFilterCheck();
    });
  };

  // to show the popup of the create batch
  const handleCreateBatch = () => {
    if (selectedData?.length > 0) {
      setShowButtonLoader(true);
      ExportApi.createBatch(selectedData, userId, "sell")
        .then((resp) => {
          if (resp.data.message == "Batch Created Successfully") {
            toast.success(resp.data.message);
            setSelectedData([]);
            setShowButtonLoader(false);
          } else {
            toast.error(resp.data.message);
            setSelectedData([]);
            setShowButtonLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Select the Product First");
      setShowButtonLoader(false);
    }
  };

  const handleHideBatch = () => {
    setHideBatchStatus(!hideBatchStatus);
    if (hideBatchStatus) {
      if (userType == "user") {
        HandleGetProductData(userId);
        HandleGetFilterListData();
      } else if (userType == "admin") {
        HandleGetProductData(userId);
        HandleGetFilterListData();
      } else {
        userdata;
        HandleGetProductData1();
        HandleGetFilterListData();
      }
    } else {
      let data = productData?.filter((item) => item.batchStatus != true);
      setproductData([...data]);
    }
  };

  useEffect(() => {
    let userdata;
    if (localStorage.getItem("tokenuser")) {
      userdata = JSON.parse(localStorage.getItem("tokenuser"));
      setUserId(userdata.id);
      setUserType(userdata.role);
      HandleGetProductData(userdata.id);
      HandleGetFilterListData();
    } else if (localStorage.getItem("admin")) {
      userdata = JSON.parse(localStorage.getItem("admin"));
      setUserId(userdata.id);
      setUserType(userdata.role);
      HandleGetProductData(userdata.id);
      HandleGetFilterListData();
    } else {
      HandleGetProductData1();
      HandleGetFilterListData();
    }
  }, [localStorage.getItem("tokenuser"), localStorage.getItem("admin")]);

  window.addEventListener("Login", () => {
    if (localStorage.getItem("tokenuser")) {
      setTimeout(() => {
        HandleGetProductData(JSON.parse(localStorage.getItem("tokenuser")).id);
      });
    } else {
      setTimeout(() => {
        HandleGetProductData(JSON.parse(localStorage.getItem("admin")).id);
      });
    }
  });

  window.addEventListener("Loginout", () => {
    setTimeout(() => {
      setData();
    });
  });

  console.log(askLoading);
  return (
    <div>
      <Header hideData={hideData} />
      <UserBuybaner />
      <Container>
        <Row className="buy-sell-part">
          <Col lg={12} md={12}>
            <div className="bg-dark p-3 d-md-flex align-items-center justify-content-between rounded mt-3">
              <div className="d-flex align-items-center justify-content-between search-box">
                <h4 className="mb-0 text-white me-3 fw-bold text-nowrap">
                  Buy/Sell
                </h4>
                <Form.Control
                  type="search"
                  placeholder="Search GPU"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="position-relative px-4 bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize"
                  onClick={handleCreateBatch}
                >
                  {showButtonLoader ? "Please Wait..." : "Batch"}
                  <ReactTooltip
                    className="custom-tooltip_buy-sell"
                    anchorId="app-compare"
                    place="bottom"
                    content=<div
                      dangerouslySetInnerHTML={{ __html: htmlString }}
                    />
                    style={{ textTransform: "none" }}
                  />
                  <svg
                    id="app-compare"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-question-circle-fill position-absolute top-0 right-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                  </svg>
                </Button>
                {hideBatchStatus ? (
                  <Button
                    className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={handleHideBatch}
                  >
                    Hide Batch
                  </Button>
                ) : (
                  <Button
                    className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={handleHideBatch}
                  >
                    Hide Batch
                  </Button>
                )}
                {bidStatus ? (
                  <Button
                    className="bg-success text-white border-0 mb-2 mb-xl-0 text-capitalize"
                    onClick={() => handleViewBid()}
                  >
                    view your bids
                  </Button>
                ) : (
                  <Button
                    className="bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize"
                    onClick={() => handleViewBid()}
                  >
                    view your bids
                  </Button>
                )}
                {askStatus ? (
                  <Button
                    className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={() => handleViewAsk()}
                  >
                    view your asks
                  </Button>
                ) : (
                  <Button
                    className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={() => handleViewAsk()}
                  >
                    view your asks
                  </Button>
                )}

                <Button
                  className="bg-light text-black border-0 mb-2 mb-xl-0 px-5 text-capitalize"
                  onClick={() => handlefilterModal()}
                >
                  filter
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={12} className="text-start mt-5"></Col>
        </Row>
        {loading == 0 ? (
          <>
            <div className="loader-icon" style={{ marginBlock: "80px" }}>
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
          </>
        ) : loading == 1 ? (
          <>
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
                          onClick={() => brandtFilterClose(i, brand[i])}
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
                          onClick={() => seriesFilterCsole(i, series[i])}
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
                          onClick={() => modalFilterCsole(i, model[i])}
                        >
                          X
                        </Button>
                      </span>
                    ) : null}
                  </>
                );
              })}
            </div>
            <div className="table-responsive mb-5">
              <div className="d-flex gap-2">
                {/* {batchData?.map((item, i) => {
                  return(
                    i <= 0 ? (
                      <div className="bg-dark lft-bar-userbuysell text-white mr-1 d-flex align-items-center">
                        <p className="vertical-text">BATCH</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                })} */}
                <Table
                  bordered
                  striped
                  className="align-middle graphic-table by-sell-table"
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-start">
                        <Form.Check
                          className="d-inline me-2"
                          type="checkbox"
                          checked={selectedData?.length === productData?.length}
                          onClick={() => handleSelectAll()}
                        />
                        <label>Select All</label>
                      </th>
                      <th onClick={() => sortHere("chipset")}>
                        Chipset
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
                        Brand
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
                        Series
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
                        Model
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
                      <th onClick={() => sortHere("new_retail_website_price")}>
                        Highest Bid
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
                      <th onClick={() => sortHere("new_retail_market_price")}>
                        Lowest Ask
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
                      <th>
                        Your Ask/Bid
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
                    {productData?.length > 0 ? (
                      productData.map((val, i) => {
                        return (
                          <tr key={i}>
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
                            <td>
                              <span className="float-end">
                                {val?.type == 1
                                  ? "New"
                                  : val?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              <div className="d-flex align-items-end justify-content-between mt-4">
                                <Form.Check
                                  className="d-inline"
                                  type="checkbox"
                                  checked={userId ? val?.batchStatus : false}
                                  onClick={(e) =>
                                    handleCheck(e.target.checked, val?._id)
                                  }
                                />
                                <img
                                  src={`${imageUrl}${val?.productId?.image[0]}`}
                                  style={{ width: "70px" }}
                                  onClick={() =>
                                    navigate("/product/" + val?._id)
                                  }
                                />
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
                              </div>
                              <OutsideClickHandler
                                onOutsideClick={() => {
                                  setdescriptionindex();
                                }}
                              >
                                <div className="tool_tip_custom custom ">
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h3
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h3>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </OutsideClickHandler>
                            </td>

                            <td>{val.chipset}</td>
                            <td>{val.brand}</td>
                            <td>{val.series}</td>
                            <td>{val.model}</td>
                            <td>
                              {val?.type == 1 ? (
                                " Retail Only"
                              ) : val?.type == 2 ? (
                                val?.highest_bid > 0 ? (
                                  <Button
                                    className="border bg-danger"
                                    onClick={() =>
                                      navigate("/bidask/" + val?._id + "/sell2")
                                    }
                                  >
                                    Sell Now - {"$" + val?.highest_bid}
                                  </Button>
                                ) : (
                                  <Button
                                    className="border bg-danger"
                                    disabled
                                    onClick={() =>
                                      navigate("/bidask/" + val?._id + "/sell2")
                                    }
                                  >
                                    Sell Now - TBD
                                  </Button>
                                )
                              ) : val?.highest_bid > 0 ? (
                                <Button
                                  className="border bg-danger"
                                  onClick={() =>
                                    navigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now - {"$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    navigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now - TBD
                                </Button>
                              )}
                            </td>
                            <td className="d-flex align-items-center py-5">
                              {val?.type == 1 ? (
                                <Button
                                  className="border bg-success"
                                  onClick={() =>
                                    navigate("/bidask/" + val?._id + "/buy2")
                                  }
                                >
                                  Buy Now - ${val?.new_retail_website_price}
                                </Button>
                              ) : val?.type == 2 ? (
                                val?.lowest_ask > 0 ? (
                                  <Button
                                    className="border bg-success"
                                    onClick={() =>
                                      navigate("/bidask/" + val?._id + "/buy3")
                                    }
                                  >
                                    Buy Now - {"$" + val?.lowest_ask}
                                  </Button>
                                ) : (
                                  <Button
                                    className="border bg-success"
                                    disabled
                                    onClick={() =>
                                      navigate("/bidask/" + val?._id + "/buy3")
                                    }
                                  >
                                    Buy Now - TBD
                                  </Button>
                                )
                              ) : val?.lowest_ask > 0 ? (
                                <Button
                                  className="border bg-success"
                                  onClick={() =>
                                    navigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now - {"$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    navigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now - TBD
                                </Button>
                              )}
                              {AskBid == i ? (
                                <Button
                                  className="bg-none border-0 mt-2"
                                  onClick={() => setAskBid()}
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
                                  className="bg-none border-0 mt-2"
                                  onClick={() => ASKBID(val?._id, i)}
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

                              <OutsideClickHandler
                                onOutsideClick={() => {
                                  setAskBid();
                                }}
                              >
                                {AskBid == i ? (
                                  <div className="big-modal">
                                    <div
                                      className="overlay"
                                      onClick={() => setAskBid()}
                                    >
                                      <div
                                        className="modal_custom"
                                        id="bid_ask_outer"
                                      >
                                        <div
                                          className="inner_customModal custom-tab-mode"
                                          id="bid_ask_model"
                                        >
                                          <tr>
                                            <td>
                                              <Table
                                                responsive="sm"
                                                striped
                                                bordered
                                                hover
                                              >
                                                <thead>
                                                  <tr>
                                                    <th>Quantity</th>
                                                    <th>Bid</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {askLoading == 0 ? (
                                                    <>
                                                      <div
                                                        className="loader-icon"
                                                        style={{
                                                          marginBlock: "80px",
                                                        }}
                                                      >
                                                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                                                      </div>
                                                    </>
                                                  ) : askLoading == 1 ? (
                                                    <>
                                                      {Bid?.length > 0
                                                        ? Bid.map((val, i) => {
                                                            return (
                                                              <tr key={i}>
                                                                <td>
                                                                  $
                                                                  {
                                                                    val?.bidAmount
                                                                  }
                                                                </td>
                                                                <td> 1</td>
                                                              </tr>
                                                            );
                                                          })
                                                        : null}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <tr>
                                                        <td>$13</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$18</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$138</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$188</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$28</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$738</td>
                                                        <td> 1</td>
                                                      </tr>
                                                    </>
                                                  )}
                                                </tbody>
                                              </Table>
                                            </td>
                                            <td>
                                              <Table
                                                responsive="sm"
                                                striped
                                                bordered
                                                hover
                                              >
                                                <thead>
                                                  <tr>
                                                    <th>Quantity</th>
                                                    <th>Ask</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {askLoading == 0 ? (
                                                    <>
                                                      <div
                                                        className="loader-icon"
                                                        style={{
                                                          marginBlock: "80px",
                                                        }}
                                                      >
                                                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                                                      </div>
                                                    </>
                                                  ) : askLoading == 1 ? (
                                                    <>
                                                      {ask?.length > 0
                                                        ? ask.map((val, i) => {
                                                            return (
                                                              <tr key={i}>
                                                                <td>
                                                                  $
                                                                  {
                                                                    val.askAmount
                                                                  }
                                                                </td>
                                                                <td> 1</td>
                                                              </tr>
                                                            );
                                                          })
                                                        : null}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <tr>
                                                        <td>$618</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$218</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$138</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$188</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$28</td>
                                                        <td> 1</td>
                                                      </tr>
                                                      <tr>
                                                        <td>$738</td>
                                                        <td> 1</td>
                                                      </tr>
                                                    </>
                                                  )}
                                                </tbody>
                                              </Table>
                                            </td>
                                          </tr>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </OutsideClickHandler>
                            </td>
                            <td>
                              {val?.type === 1 ? (
                                "Retail Only"
                              ) : val?.bidPrice == null ||
                                val?.askPrice == null ? (
                                <Button
                                  className="border bg-none text-dark border-dark"
                                  onClick={() => {
                                    navigate("/bidask/" + val?._id);
                                  }}
                                >
                                  Place Bid/Ask
                                </Button>
                              ) : (
                                <>
                                  <Button className="border bg-danger">
                                    {"$" + val?.bidPrice}
                                  </Button>
                                  <Button className="border bg-success">
                                    {"$" + val?.askPrice}
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <span>No Product Found</span>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        ) : (
          <span>
            <b>NO Data Found</b>
          </span>
        )}
      </Container>

      {/* start Filter Model */}
      <Modal
        show={showFilterModel}
        onHide={() => setShowFilterModel(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-sm-5 mt-3 border mb-sm-5">
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
                          localStorage.getItem("condition")
                            ? JSON.parse(localStorage.getItem("condition"))[i][
                                val == 1
                                  ? "New-Retail"
                                  : val == 2
                                  ? "New-2nd Hand"
                                  : "Used"
                              ]
                            : conditionKey[i][
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
                {conditionKey?.length > 5 ? (
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
                              checked={
                                localStorage.getItem("chipset")
                                  ? JSON.parse(localStorage.getItem("chipset"))[
                                      i
                                    ][val]
                                  : chipsetKey[i][val]
                              }
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
                          {i < 3 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={
                                  localStorage.getItem("chipset")
                                    ? JSON.parse(
                                        localStorage.getItem("chipset")
                                      )[i][val]
                                    : chipsetKey[i][val]
                                }
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
                  FilterList?.chipset?.length > 3 ? (
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
                ) : FilterList?.chipset?.length > 3 ? (
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
                              checked={
                                localStorage.getItem("brand")
                                  ? JSON.parse(localStorage.getItem("brand"))[
                                      i
                                    ][val]
                                  : brandKey[i][val]
                              }
                              onChange={(e) => BrandtFilter(e, i)}
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
                          {i < 3 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={
                                  localStorage.getItem("brand")
                                    ? JSON.parse(localStorage.getItem("brand"))[
                                        i
                                      ][val]
                                    : brandKey[i][val]
                                }
                                onChange={(e) => BrandtFilter(e, i)}
                                name={val}
                                label={val}
                              />
                            </Form.Group>
                          ) : null}
                        </>
                      );
                    })}
                {brandShow ? (
                  FilterList?.brands?.length > 3 ? (
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
                ) : FilterList?.brands?.length > 3 ? (
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
                              checked={
                                localStorage.getItem("series")
                                  ? JSON.parse(localStorage.getItem("series"))[
                                      i
                                    ][val]
                                  : seriesKey[i][val]
                              }
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
                          {i < 3 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={
                                  localStorage.getItem("series")
                                    ? JSON.parse(
                                        localStorage.getItem("series")
                                      )[i][val]
                                    : seriesKey[i][val]
                                }
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
                  FilterList?.series?.length > 3 ? (
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
                ) : FilterList?.series?.length > 3 ? (
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
                              checked={
                                localStorage.getItem("model")
                                  ? JSON.parse(localStorage.getItem("model"))[
                                      i
                                    ][val]
                                  : modalKey[i][val]
                              }
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
                          {i < 3 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={
                                  localStorage.getItem("model")
                                    ? JSON.parse(localStorage.getItem("model"))[
                                        i
                                      ][val]
                                    : modalKey[i][val]
                                }
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
                  FilterList?.model?.length > 5 ? (
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
                ) : FilterList?.model?.length > 5 ? (
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
      </Modal>

      {/* Start Login Model */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login modal={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserBuySell;
