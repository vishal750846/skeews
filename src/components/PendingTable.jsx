import React from "react";
import { useEffect } from "react";
import { Table, Form, Modal, Button, Row, Col } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
const PendingTable = () => {
  const navigate = useNavigate();
  let imageUrl = "https://api.skewws.com/resources/";
  const [Data, setData] = useState();
  const [Data2, setData2] = useState();
  const [show, setShow] = useState();
  const [userId, setUserId] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerAddress, setSellerAddress] = useState();
  const [sellerPhone, setSellerPhone] = useState();
  const [sellerZipCode, setSellerZipCode] = useState();
  const [sellerState, setSellerState] = useState();
  const [sellerCity, setSellerCity] = useState();
  const [orderId, setOrderId] = useState();
  const [buyerName, setBuyerName] = useState("Skewws llc");
  const [buyerAddress, setBuyerAddress] = useState(
    "CHANDLER J GILBERT 2089 BAKER ST  LONDON W1U 6RN  ENGLAND"
  );
  const [buyerPhone, setBuyerPhone] = useState("01632960000");
  const [buyerZipCode, setBuyerZipCode] = useState("99999");
  const [buyerCity, setBuyerCity] = useState("Hougang");
  const [selectData, setSelectData] = useState();
  const [buyerState, setBuyerState] = useState("Central Region");
  const [orderCreateDate, setOrderCreateDate] = useState();
  const [buyerBid, setBuyerBid] = useState();
  const [buyerSalesTax, setBuyerSalesTax] = useState();
  const [buyerSubTotal, setBuyerSubTotal] = useState();
  const [buyerProductName, setBuyerProductName] = useState();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [buyerSku, setBuyerSku] = useState();
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

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
  const [res, setres] = useState();
  const [chipset, setchipset] = useState([]);
  const [condition, setcondition] = useState([]);
  const [brand, setbrand] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [buyerProductCondition, setBuyerProductCondition] = useState();






  const [descriptionindex, setdescriptionindex] = useState();

  const [descriptionindex1, setdescriptionindex1] = useState();
  



  //  Sorting Table Data
  const sortHere = (key) => {
    console.log("Order Sorting", key);
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    console.log(sortOrder);
    const sortedProducts = Data2.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
    setData2(sortedProducts);
  };

  const handleShippingModal = () => {
    setButtonLoader(true);
    if (selectData) {
      setShow(true);
      handleshippingData();
    } else {
      toast.error("Please Select Product First");
    }
  };

  const handleshippingData = () => {
    setButtonLoader(true);
    ExportApi.getShippingData(orderId)
      .then((resp) => {
        let data = resp.data.Data;
        console.log("data", data);
        setSellerName(data.sellerId.firstname);
        setSellerAddress(data.sellerId.shipping_address.street);
        setSellerCity(data.sellerId.shipping_address.city);
        setSellerState(data.sellerId.shipping_address.state);
        setSellerZipCode(data.sellerId.shipping_address.postal_code);
        setSellerPhone(data.sellerId.phone);
        setBuyerBid(data.bidId.bidAmount);
        setBuyerSalesTax(data.bidId.salesTax);
        setBuyerSubTotal(data.bidId.subTotal);
        setBuyerProductName(data.productId.productname);
        setButtonLoader(false);
        setBuyerSku(data?.productId?.sku);
        setBuyerProductCondition(data?.productId?.type);
        // setBuyerCondition(data?.productId)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ,"Pending Inspection","Shipped Out"
  const handleShippingLabel = () => {
    setButtonLoader(true);
    ExportApi.updateShippingLabelData(
      userId,
      orderId,
      "Shipped From Seller",
      "Pending Inspection",
      "Shipped Out"
    )
      .then((resp) => {
        if (resp.data.message == "Label created") {
          toast.success("Shipped From Seller Successfully");
          setButtonLoader(false);
          handleClose();
          window.open(resp.data.Data.postage_label.label_url, "_blank");
          DownloadPdf();
          if (localStorage.getItem("tokenuser")) {
            handlePendingData(JSON.parse(localStorage.getItem("tokenuser")).id);
          } else if (localStorage.getItem("admin")) {
            handlePendingData(JSON.parse(localStorage.getItem("admin")).id);
          } else {
            console.log("No Data Found");
          }
        } else {
          toast.error(resp.data.message);
          handleClose();
          setButtonLoader(false);
          if (localStorage.getItem("tokenuser")) {
            handlePendingData(JSON.parse(localStorage.getItem("tokenuser")).id);
          } else if (localStorage.getItem("admin")) {
            handlePendingData(JSON.parse(localStorage.getItem("admin")).id);
          } else {
            console.log("No Data Found");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DownloadPdf = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const tableContent = document.getElementById("werkk").innerHTML;
    doc.html(tableContent, {
      callback: () => {
        doc.save("Product.pdf");
      },
    });
  };

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const handlePendingData = (id) => {
    setUserId(id);
    ExportApi.getPendingData(id)
      .then((resp) => {
        let data = resp.data.Data;
        console.log(data);
        let SellerPendingData = data?.sellerOrderlist?.filter(
          (item) =>
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Ready to Ship" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Shipped Out" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Failed to Ship" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Authentication Failed" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Item Returned" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Order Cancelled"
        );

        setData(SellerPendingData);
        let BuyerPendingData = data?.buyerOrderlist?.filter(
          (item) =>
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Waiting on Seller" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Pending Inspection" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Shipped Out" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Placed with New Seller" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Delivered" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Refunded" ||
            item?.deliveryStatusId?.deliveryStatusForBuyer?.status ==
              "Payment Failed"
        );
        console.log(BuyerPendingData);
        setData2(BuyerPendingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  //for the Single Checkbox
  const handleCheck = (data, id, orderid) => {
    setOrderId(orderid);
    console.log(Data);
    let product_id = orderid;
    let result = Data.filter((item) => item?._id == product_id);
    console.log(result);
    setSelectData(result[0].productId?._id);
    // console.log(result)
    // if (data) {
    //   for (let i = 0; i < Data.length; i++) {
    //     const element1 = Data[i];
    //     if (element1?._id.includes(product_id)) {
    //       Data[i].isSelected = true;
    //     }
    //   }
    // } else {
    //   for (let i = 0; i < Data.length; i++) {
    //     const element1 = Data[i];
    //     if (element1?._id.includes(product_id)) {
    //       Data[i].isSelected = false;
    //     }
    //   }
    // }

    // setData([...Data]);
  };
  // console.log(Data)
const [handleShipStatusButtonColor , setHandleShipStatusButtonColor] = useState(false);
const [unfilteredData , setUnfilteredData] = useState('');
const [noDataBuyer , setNoDataBuyer] = useState('');
  const handleshipStatus = () => {
    // ExportApi.getShipStatusData("shipped from seller")
    //   .then((resp) => {
    //     setData(resp.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log(Data);
    // return
    if (!handleShipStatusButtonColor) {
    setUnfilteredData(Data); 
    setNoDataBuyer(Data2); 

    let filteredData = Data?.filter((item) => item.deliveryStatusId?.deliveryStatusForSeller
    ?.status == "Ready to Ship");
    setData(filteredData);
    setData2([]);
    }else{
      setData(unfilteredData);
      setData2(noDataBuyer);
    }
          // 👇️ toggle isActive state on click
          setHandleShipStatusButtonColor(current => !current);
  };

  // const handleDownload = () => {
  //   const doc = new jsPDF('p', 'pt', 'a4');
  //   const tableContent = document.getElementById('werkk', 100, 100, 'align - center : inside container', { align: 'left', width: 100 }).innerText;
  //   doc.html(tableContent, {
  //     callback: () => {
  //       doc.save('Product.pdf');
  //     },
  //   });
  // };

  const getPackageBuyerAddress = () => {
    ExportApi.getPackageData()
      .then((resp) => {
        let data = resp.data.result[0].shipping_address;
        setBuyerAddress(data.street);
        setBuyerCity(data.city);
        setBuyerState(data.state);
        setBuyerZipCode(data.postal_code);
        setOrderCreateDate(data?.createdAt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //open Filter Modal
  const handleFilter = () => {
    setShowFilterModal(true);
  };

  // clear All Filter
  const clearAllFilters = () => {
    setmodel([]);
    setseries([]);
    setbrand([]);
    setchipset([]);
    setcondition([]);
    setcondition1([]);
    if (localStorage.getItem("tokenuser")) {
      handlePendingData(JSON.parse(localStorage.getItem("tokenuser")).id);
      GetData1();
    } else if (localStorage.getItem("admin")) {
      handlePendingData(JSON.parse(localStorage.getItem("admin")).id);
      GetData1();
    } else {
      console.log("No Data Found");
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

  //Chipset Filter
  const ChipsetFilter = (e, i) => {
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked || index === -1) {
      chipset.push(name);
      chipsetKey[i][name] = checked;
      setchipset([...chipset]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    } else {
      chipsetKey[i][name] = checked;
      chipset.splice(index, 1);
      setchipset([...chipset]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    }
  };

  // condition Filter
  const conditionKeyFilter = (e, i) => {
    const { name, checked, min } = e.target;

    console.log(e.target);
    let number = parseInt(min);
    let index = condition.indexOf(number);
    let index1 = condition1.indexOf(name);
    if (checked || index === -1 || index1 === -1) {
      condition.push(number);
      condition1.push(name);
      conditionKey[i][name] = checked;
      setcondition([...condition]);
      setcondition1([...condition1]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
      console.log("insideIF");
    } else {
      conditionKey[i][name] = checked;
      condition.splice(index, 1);
      setcondition([...condition]);
      condition1.splice(index1, 1);
      setcondition1([...condition1]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
      console.log("inelse");
    }
  };

  //Modal Filter
  const modalFilter = (e, i) => {
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked) {
      model.push(name);
      modalKey[i][name] = checked;
      setmodel([...model]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    } else {
      modalKey[i][name] = checked;
      model.splice(index, 1);
      setmodel([...model]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    }
  };

  //Series Modal
  const seriesFilter = (e, i) => {
    const { name, checked } = e.target;
    let index = series.indexOf(name);
    if (checked) {
      series.push(name);
      seriesKey[i][name] = checked;
      setseries([...series]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    } else {
      seriesKey[i][name] = checked;
      series.splice(index, 1);
      setseries([...series]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    }
  };

  //Brand Filter
  const BrandtFilter = (e, i) => {
    const { name, checked } = e.target;
    let index = brand.indexOf(name);
    if (checked) {
      brand.push(name);
      brandKey[i][name] = checked;
      setbrand([...brand]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    } else {
      brandKey[i][name] = checked;
      brand.splice(index, 1);
      setbrand([...brand]);
      // setTimeout(() => {
      //   SearchFilterCheck();
      // });
    }
  };

  //get Filter Data
  const GetData1 = () => {
    ExportApi.GetFilterData()
      .then((resp) => {
        let chipsetKeyArray = [];
        let conditionKeyArray = [];
        let brandKeyArray = [];
        let modalKeyArray = [];
        let seriesKeyArray = [];
        setres(resp?.data.data);
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
        // setLoading(false);
        setFilterList(resp?.data?.data);
        console.log(FilterList);
      })
      .catch((err) => console.log(err));
  };

  //filter Api
  const SearchFilterCheck = () => {
    console.log(Data);
    console.log(condition);
    if (condition?.length > 0) {
      let result = Data?.filter((item) => condition.includes(item.productId.type ));
      setData(result);
      let result2 = Data2?.filter((item) => item.productId.type == condition)
      setData2(result2);
    } else if (brand?.length > 0) {
      let result = Data?.filter((item) => item.productId.brand == brand);
      setData(result);
      let result2 = Data?.filter((item) => item.productId.brand == brand);
      setData2(result2);
    } else if (series?.length > 0) {
      let result = Data?.filter((item) => item.productId.series == series);
      setData(result);
      let result2 = Data2?.filter((item) => item.productId.series == series);
      setData2(result2);
    } else if (model?.length > 0) {
      let result = Data?.filter((item) => item.productId.model == model);
      setData(result);
      let result2 = Data2?.filter((item) => item.productId.model == model);
      setData2(result2);
    } else if (chipset?.length > 0) {
      let result = Data?.filter((item) => item.productId.chipset == chipset);
      setData(result);
      let result2 = Data2?.filter((item) => item.productId.chipset == chipset);
      setData2(result2);
    } else {
      if (localStorage.getItem("tokenuser")) {
        handlePendingData(JSON.parse(localStorage.getItem("tokenuser")).id);
        GetData1();
      } else if (localStorage.getItem("admin")) {
        handlePendingData(JSON.parse(localStorage.getItem("admin")).id);
        GetData1();
      } else {
        console.log("No Data Found");
      }
    }
  };

  const handleSingleUserData = (id) => {
    ExportApi.getSingleUserData(id)
      .then((resp) => {
        if (resp.data.message == "user not found") {
          window.dispatchEvent(new Event("Loginout"));
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      handlePendingData(JSON.parse(localStorage.getItem("tokenuser")).id);
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
      GetData1();
    } else if (localStorage.getItem("admin")) {
      handlePendingData(JSON.parse(localStorage.getItem("admin")).id);
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
      GetData1();
    } else {
      console.log("No Data Found");
    }
  }, []);

  useEffect(() => {
    getPackageBuyerAddress();
  }, []);


  const filterData = () =>{
     SearchFilterCheck();
  }

  return (
    <div>
      {/* <button onClick={handleDownload}>Download</button> */}
      {/* <div id="werkk" style={{ display: 'none'}}>
         <div className="pdf-content">
          <div>
            <img src={logo} style={{ width: '100px' }} />
          </div>
          <hr />
           <div className="product-detail-table">
             <table>
              <thead>
                <tr>
                  <th>#</th>

                  <th>Shipping Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="mb-0">Order ID: {orderId}</p>
                    <span>Order Date:{moment(orderCreateDate).format('l')}</span>
                  </td>
                  <td><p className="mb-0">{buyerName}</p>
                    {buyerAddress}, {buyerCity}, {buyerState},  {buyerZipCode} </td>
                </tr>
              </tbody>
            </table>  
          </div> 

          <div className="product-price-table mt-5" >
             <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{buyerProductName} </td>
                  <td></td>
                  <td>1</td>
                  <td>{buyerBid}</td>
                  <td>{buyerSalesTax}</td>
                  <td>{buyerSubTotal}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                <td></td>
                <td>Total</td>
                  <td>1</td>
                  <td>{buyerBid}</td>
                  <td>{buyerSalesTax}</td>
                  <td>{buyerSubTotal}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><b>Grand Total</b></td>
                  <td></td>
                  <td><b>USD {buyerSubTotal}</b></td>
                </tr>
              </tfoot>
            </table> 
          </div>   
         </div> 
      </div> */}

      <div id="werkk" style={{ display: "none" }}>
        <div className="pdf-content">
          <div className="pdf-header">
            <span>SKEWWS</span>
          </div>
          <hr />
          <div className="center-text m-30">
            <h2>Ship by {moment(orderCreateDate).format("ll")}</h2>
          </div>
          <hr />
          <div className="center-text m-30 order-condition">
            <h2>Order: {orderId}</h2>
            <p>{buyerProductName}</p>
            <span>
              Condition:{" "}
              {buyerProductCondition?.type == 1
                ? "New"
                : buyerProductCondition?.type == 2
                ? "2nd Hand"
                : "Used"}
            </span>
            <span>SKU: {buyerSku}</span>
          </div>
          <hr />
          <div className="m-30 shipping-instruction">
            <h4>Shipping Instructions:</h4>
            <ul className="list-style-number">
              <li>
                Ship your item right away to avoid fees and possibility to earn
                future discounts!
              </li>
              <li>
                Package your GPU
                <ul className="list-style-circle">
                  <li>
                    If you are shipping a GPU without a box
                    <ul className="list-style-number">
                      <li>
                        Wrap the GPU with Bubble wrap so there are no exposed
                        surfaces and all surfaces are covered. Wrap thickness
                        should be about 1in on all sides. Place tape to secure
                        the wrap.
                      </li>
                      <li>
                        Place the wrapped GPU into an appropriately sized box.
                        Box should be sized so the wrapped GPU fits in without
                        force but is not loose in the box. Add packing peanuts
                        or other packaging material so the GPU cannot move
                        around in the box.
                      </li>
                    </ul>
                  </li>
                  <li>
                    If you are shipping a GPU with a box
                    <ul className="list-style-number">
                      <li>Place the GPU box inside a larger shipping box.</li>
                      <li>
                        Add wrap, packing peanuts, or other shipping material to
                        make sure the GPU box is not loose to move around inside
                        the shipping box.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Place this invoice inside the box with the product.</li>
              <li>
                Properly tape and secure the shipping box using the H-method.
                Make sure to use shipping tape and not other forms of tape
                designed for other purposes.
              </li>
              <li>
                Tape shipping label on the exterior of the shipping box. You can
                also use a Carrier packet if available.
              </li>
              <li>
                Deliver the package to the shipping carrier.
                <ul className="list-style-number">
                  <li>
                    For UPS, you can drop off at a UPS location or schedule a
                    UPS pickup.
                  </li>
                  <li>
                    Make sure to check the carrier on your shipping label
                    matches your drop off carrier!
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              We are not responsible for items not being packaged properly. We
              are here to help, but it is on you to use your best judgment and
              get it done!
            </p>
          </div>
        </div>
      </div>

      <Row>
        <Col lg={12} className="mt-sm-5 mt-2">
          <div className="text-sm-end text-center">
            <Button
              className={`${handleShipStatusButtonColor ? 'bg-success' : 'bg-none'} ${handleShipStatusButtonColor ? 'text-white' : 'text-black'} border border-2 mb-2 mb-sm-0`}
              onClick={handleshipStatus}
              // disabled
            >
              Ready to ship
            </Button>
            <Button
              className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
              onClick={handleShippingModal}
            >
              Print shipping label
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </div>
        </Col>
        <Col
          lg={12}
          className="product_list_table table-responsive mt-sm-5 mt-2"
        >
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

            <Table
              bordered
              striped
              className="align-middle text-center managment-table"
            >
              <thead>
                <tr>
                  <th className="text-start"></th>

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
                  <th onClick={() => sortHere("status")}>
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
                  <th onClick={() => sortHere("subTotal")}>
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
                {Data2?.length > 0 ? (
                  Data2?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                        <div className="d-flex align-items-end position-relative">
                          <img
                            src={`${imageUrl}${item.productId?.image[0]}`}
                            style={{ width: "70px" }}
                            onClick={() =>
                              navigate(`/product/${item.productId._id}`)
                            }
                          />
                          <div className="position-relative ms-1">
                           <span className="d-block text-center">
                                {item.productId?.type == 1
                                  ? "New"
                                  : item.productId?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                          {descriptionindex == index ? (
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
                                onClick={() => setdescriptionindex(index)}
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
                             {descriptionindex == index ? (
                            <div className="modal_custom_ pending-mod">
                              <div className="inner_customModal_one">
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: item?.productId?.description,
                                  }}
                                ></h6>
                              </div>
                            </div>
                          ) : null}
                          </div>
                          </div>
                        </td>
                        <td>{item.productId.chipset}</td>
                        <td>{item.productId.brand}</td>
                        <td>{item.productId.series}</td>
                        <td>{item.productId.model}</td>
                        <td>{item._id}</td>
                        <td>
                          {item?.deliveryStatusId.deliveryStatusForBuyer
                            ?.status == "Waiting on Seller" ? (
                            <Button className="order_status_waiting border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Payment Failed" ? (
                            <Button className="order_status_shipped_seller border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Pending Inspection" ? (
                            <Button className="order_status_ready_test border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Ready For Shipment" ? (
                            <Button className="order_status_ready_shipment border text-white">
                              {item?.deliveryStatusId.deliveryStatus?.status}
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Shipped Out" ? (
                            <Button className="order_status_shipped_out border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Delivered" ? (
                            <Button className="order_status_recently_delivered border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Placed with New Seller" ? (
                            <Button className="order_status_return border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Refunded" ? (
                            <Button className="order_status_return border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{moment(item?.createdAt).format("l")}</td>
                        <td>{"$" + item.bidId.subTotal}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span>No Buyer Data Found</span>
                )}
                <br />
                {Data?.length > 0 ? (
                  Data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div>
                          <div className="d-flex align-items-end justify-content-between">
                            {item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Ready to Ship" ? (
                              <Form.Check
                                className="d-inline"
                                type="checkbox"
                                checked={item?._id == orderId}
                                onChange={(e) =>
                                  handleCheck(
                                    e.target.checked,
                                    item.productId?._id,
                                    item._id
                                  )
                                }
                              />
                            ) : (
                              ""
                            )}
                            <img
                              src={`${imageUrl}${item.productId?.image[0]}`}
                              style={{ width: "100px" }}
                              onClick={() =>
                                navigate(`/product/${item.productId._id}`)
                              }
                            />
                            <span className="float-end">
                                {item?.type == 1
                                  ? "New"
                                  : item?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              {descriptionindex1 == index ? (
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
                                className="bg-none border-0"
                                onClick={() => setdescriptionindex1(index)}
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
                             {descriptionindex1 == index ? (
                            <div className="modal_custom_ pending-mod">
                              <div className="inner_customModal_one">
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: item?.productId?.description,
                                  }}
                                ></h6>
                              </div>
                            </div>
                          ) : null}
                          </div>
                          </div>
                          
                        </td>
                        <td>{item.productId.chipset}</td>
                        <td>{item.productId.brand}</td>
                        <td>{item.productId.series}</td>
                        <td>{item.productId.model}</td>
                        <td>{item._id}</td>
                        <td>
                          {item?.deliveryStatusId?.deliveryStatusForSeller
                            ?.status == "Ready to Ship" ? (
                            <Button className="order_status_waiting border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Shipped Out" ? (
                            <Button className="order_status_shipped_seller border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Order Cancelled" ? (
                            <Button className="order_status_ready_test border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Failed to Ship" ? (
                            <Button className="order_status_ready_shipment border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Sale Complete" ? (
                            <Button className="order_status_shipped_out border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Authentication Failed" ? (
                            <Button className="order_status_recently_delivered border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId?.deliveryStatusForSeller
                              ?.status == "Item Returned" ? (
                            <Button className="order_status_return border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : (
                            <Button className="order_status_return border text-white">
                              {
                                item?.deliveryStatusId?.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          )}
                        </td>
                        <td>{moment(item.createdAt).format("l")}</td>
                        <td>{"$" + item.askId.subTotal}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span>No Seller Data Found</span>
                )}
              </tbody>
            </Table>
          </>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="my-3 ">
              Ship From
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="px-2">
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  // value={buyerName}
                  value={sellerName}
                  // onChange={(e) => setSellerName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Address"
                  // value={buyerAddress}
                  value={sellerAddress}
                  // onChange={(e) => setSellerAddress(e.target.value)}
                />
              </Form.Group>
              <div className="d-sm-flex justify-content-start gap-2">
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="fs-6 fw-bold mb-0">City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your City"
                    // value={buyerCity}
                    value={sellerCity}
                    // onChange={(e) => setSellerCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="fs-6 fw-bold mb-0 ">State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your State"
                    // value={buyerState}
                    value={sellerState}
                    // onChange={(e) => setSellerState(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label
                    className="fs-6 fw-bold mb-0
                      "
                  >
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Zip Code"
                    // value={buyerZipCode}
                    value={sellerZipCode}
                    // onChange={(e) => setSellerZipCode(e.target.value)}
                  />
                </Form.Group>
              </div>
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Phone No."
                  // value={buyerPhone}
                  value={sellerPhone}
                  // onChange={(e) => setSellerPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <h5 className="my-3 ">
              Ship To
            </h5>
            <div className="px-2">
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  // value={sellerName}
                  value={buyerName}
                  // onChange={(e) => setBuyerName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Address"
                  // value={sellerAddress}
                  value={buyerAddress}
                  // onChange={(e) => setBuyerAddress(e.target.value)}
                />
              </Form.Group>
              <div className="d-sm-flex justify-content-between gap-2">
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="fs-6 fw-bold mb-0">City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your City"
                    // value={sellerAddress}
                    value={buyerCity}
                    // onChange={(e) => setBuyerCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="fs-6 fw-bold mb-0">State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your State"
                    // value={sellerState}
                    value={buyerState}
                    // onChange={(e) => setBuyerState(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2 d-flex align-items-center gap-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="fs-6 fw-bold mb-0">
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Zip Code"
                    // value={sellerZipCode}
                    value={buyerZipCode}
                    // onChange={(e) => setBuyerZipCode(e.target.value)}
                  />
                </Form.Group>
              </div>
              <Form.Group
                className="mb-2 d-flex align-items-center gap-2"
                controlId="formBasicEmail"
              >
                <Form.Label className="fs-6 fw-bold mb-0">Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Phone"
                  // value={sellerPhone}
                  value={buyerPhone}
                  // onChange={(e) => setBuyerPhone(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="d-block w-100"
            onClick={handleShippingLabel}
            disabled={buttonLoader}
          >
            {buttonLoader ? "Please wait" : "Print Label"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* start Filter Model */}
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
                          {i < 6 ? (
                            <Form.Group
                              className="mb-2"
                              controlId={val}
                              key={i}
                            >
                              <Form.Check
                                type="checkbox"
                                checked={brandKey[i][val]}
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
          <Button variant="primary" onClick={() => {
            filterData()
            setShowFilterModal(false)}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Filter Model */}
    </div>
  );
};

export default PendingTable;
