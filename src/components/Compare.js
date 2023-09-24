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
import Ls2 from "../../src/images/ls2.png";
import Header from "./header";
import ExportApi from "../api/ExportApi";
import { useNavigate } from "react-router-dom";
import UserAskBidList from "./UserAskBidList";
const UserBuySell = () => {
  const navigat = useNavigate();
  const [Data, setData] = useState();
  const [Data1, setData1] = useState();
  const [descriptionindex, setdescriptionindex] = useState();
  const [AskBid, setAskBid] = useState();
  const [ask, setAsk] = useState();
  const [Bid, setBid] = useState();
  const [hide, setHide] = useState();
  const [bidStatus, setBidStatus] = useState(false);
  const [askStatus, setAskStatus] = useState(false);
  // filter State
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [conditionKey, setconditionKey] = useState([]);
  const [chipsetKey, setchipsetKey] = useState([]);
  const [brandKey, setbrandKey] = useState([]);
  const [seriesKey, setseriesKey] = useState([]);
  const [modalKey, setmodalKey] = useState([]);
  const [condition, setcondition] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [res, setres] = useState();
  const [FilterList, setFilterList] = useState();
  const [condition1, setcondition1] = useState([]);
  const [brandShow, setBrandShow] = useState(false);
  const [chipsetShow, setChipsetShow] = useState(false);
  const [seriesShow, setSeriesShow] = useState(false);
  const [chipset, setchipset] = useState([]);
  const [brand, setbrand] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const[selectedData,setSelectedData] = useState()

  const hideData = (data) => {
    setHide(data);
  };
  const handleSrech = (e) => {
    if (e == "") {
      setData([...Data1]);
    } else {
      let Filterdata = Data1.filter((val) =>
        val.brand.toLowerCase().includes(e)
      );
      setData([...Filterdata]);
    }
  };
  const ASKBID = (id, i) => {
    hendleask(id);
    hendlebid(id);
    setAskBid(i);
  };

  const hendleask = (id) => {
    ExportApi.getask(id)
      .then((resp) => {
        setAsk(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const hendlebid = (id) => {
    ExportApi.getBid(id)
      .then((resp) => {
        setBid(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleask = () => {
    if (localStorage.getItem("tokenuser")) {
      let status = !askStatus;
      setAskStatus(status);
      setBidStatus(false);
      if (status) {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      } else {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      }
    } else if (localStorage.getItem("admin")) {
      let status = !askStatus;
      setAskStatus(status);
      setBidStatus(false);
      if (status) {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      } else {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      }
    } else {
      setShowModal(true);
    }
  };
  const handleClear = () => {
    if (localStorage.getItem("tokenuser")) {
      handleGetEventlistChange(
        JSON.parse(localStorage.getItem("tokenuser")).id
      );
    } else if (localStorage.getItem("admin")) {
      handleGetEventlistChange(JSON.parse(localStorage.getItem("admin")).id);
    }
  };
  const handleBid = () => {
    if (localStorage.getItem("tokenuser")) {
      let status = !bidStatus;
      setBidStatus(status);
      setAskStatus(false);
      if (status) {
        for (let index = 0; index < Data?.length; index++) {
          let obj = {};
          const element = Data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      } else {
        for (let index = 0; index < Data?.length; index++) {
          let obj = {};
          const element = Data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      }
    } else if (localStorage.getItem("admin")) {
      let status = !bidStatus;
      setBidStatus(status);
      setAskStatus(false);
      if (status) {
        for (let index = 0; index < Data?.length; index++) {
          let obj = {};
          const element = Data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      } else {
        for (let index = 0; index < Data?.length; index++) {
          let obj = {};
          const element = Data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      }
    } else {
    }
  };

  const handleGetEventlistChange = (id) => {
    ExportApi.GetAllProductUserid(id)
      .then((resp) => {
        setData(resp.data.details);
        setData1(resp.data.details);
      })
      .catch((err) => console.log(err));
  };
  // for the View Your Bid
  const handleGetEventlistChangeAskList = (id) => {
    let Ayyay = [];
    ExportApi.askList(id)
      .then((resp) => {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      })
      .catch((err) => console.log(err));
  };

  //for the view your ask
  const handleGetEventlistChangeBidList = (id) => {
    let Ayyay = [];
    ExportApi.getBidList(id)
      .then((resp) => {
        for (let index = 0; index < resp.data.data?.length; index++) {
          let obj = {};
          const element = resp.data.data[index];
          obj = { ...element, ...element.productId };
          Ayyay.push(obj);
        }
        setData(Ayyay);
        setData1(Ayyay);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (localStorage.getItem("Compare")) {
      setData(JSON.parse(localStorage.getItem("Compare")));
      setData1(JSON.parse(localStorage.getItem("Compare")));
      GetData1();
    }
  }, []);
  const CompareOrg = () => {
    if (localStorage.getItem("Compare")) {
      setData(JSON.parse(localStorage.getItem("Compare")));
      setData1(JSON.parse(localStorage.getItem("Compare")));
    }
  };

  //to show the filter Modal
  const handlefilterModal = () => {
    setShowFilterModel(true);
  };

  //get the data of the filter
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
        setFilterList(resp?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  //search Filter Api
  const SearchFilterCheck = () => {
    if (condition?.length > 0) {
      let result = Data?.filter((item) => item.type == condition);
      setData(result);
    } else if (brand?.length > 0) {
      let result = Data?.filter((item) => item.brand == brand);
      setData(result);
    } else if (series?.length > 0) {
      let result = Data?.filter((item) => item.series == series);
      setData(result);
    } else if (model?.length > 0) {
      let result = Data?.filter((item) => item.model == model);
      setData(result);
    } else if (chipset?.length > 0) {
      let result = Data?.filter((item) => item.chipset == chipset);
      setData(result);
    } else {
      if (localStorage.getItem("Compare")) {
        setData(JSON.parse(localStorage.getItem("Compare")));
        setData1(JSON.parse(localStorage.getItem("Compare")));
        GetData1();
      }
    }
  };
  //chipset Filter
  const ChipsetFilter = (e, i) => {
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
    setmodel([]);
    setseries([]);
    setbrand([]);
    setchipset([]);
    setcondition([]);
    setcondition1([]);
    if (localStorage.getItem("Compare")) {
      setData(JSON.parse(localStorage.getItem("Compare")));
      setData1(JSON.parse(localStorage.getItem("Compare")));
      GetData1();
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

  const handleSelectAll = (e) => {
    let result = e.target.checked;
    if (result) {
      let data = Data.map((item) => {
        return { ...item, isSelected: true };
      });
      console.log(data)
      const data3 = Data.map(item => item._id)
      console.log(data3)
      // setSelectedData(data3)
      setData([...data]);
    } else {
      let data = Data.map((item) => {
        return { ...item, isSelected: false };
      });
      setData([...data]);
    }
  }

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
                  onChange={(e) => handleSrech(e.target.value)}
                />
              </div>
              <div>
                <Button className="bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize" disabled>
                  create batch
                </Button>
                <Button className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize" disabled>
                  view batch items
                </Button>
                {bidStatus ? (
                  <Button
                    className="bg-success text-white border-0 mb-2 mb-xl-0 text-capitalize"
                    onClick={() => handleBid()}
                  >
                    view your bids
                  </Button>
                ) : (
                  <Button
                    className="bg-light text-black border-0 mb-2 mb-xl-0 text-capitalize"
                    onClick={() => handleBid()}
                  >
                    view your bids
                  </Button>
                )}
                {askStatus ? (
                  <Button
                    className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={() => handleask()}
                  >
                    view your asks
                  </Button>
                ) : (
                  <Button
                    className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2 text-capitalize"
                    onClick={() => handleask()}
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
            <div className="text-center text-sm-start mt-3">

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
                        {model[i]}
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
          </Col>
          {/* <Col lg={12} className="text-start mt-5">
            <Button
              className="bg-light text-black graphicbt mb-2"
              onClick={() => handleClear()}
            >
              Clear All Filters
            </Button>
            <Button className="bg-light text-black graphicbt mx-2 mb-2">
              MSI
            </Button>
            <Button className="bg-light text-black graphicbt mb-2">
              RTX 3080Ti
            </Button>
          </Col> */}
        </Row>
        <div className="table-responsive mb-5">
          <Table bordered striped className="align-middle graphic-table">
            <thead>
              <tr>
                <th className="text-start">
                  <Form.Check className="d-inline me-2" type="checkbox" onChange={(e) => handleSelectAll(e)} />
                  <label>Select All</label>
                </th>
                <th>
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
                <th>
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
                <th>
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
                <th>
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
                <th>
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
                <th>
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
              {Data &&
                Data.map((val, i) => {
                  return (
                    <tr>
                      <td>
                        <span className="float-end">
                          {" "}
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
                            checked={val?.isSelected}
                            onChange={(e) => handleEdit(e, val._id)}
                          />{" "}
                          <img src={Ls2} style={{ width: "70px" }} />
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
                      </td>
                      <td>{val.chipset}</td>
                      <td>{val.brand}</td>
                      <td>{val.series}</td>
                      <td>{val.model}</td>

                      <td>
                        {val?.type == 1 ? (
                          " Retail Only"
                        ) : val?.type == 2 ? (
                          <Button
                            className="border bg-danger"
                            onClick={() =>
                              navigat("/bidask/" + val?._id + "/sell2")
                            }
                          >
                            Sell Now - {"$" + val?.highest_bid}
                          </Button>
                        ) : (
                          <Button
                            className="border bg-danger"
                            onClick={() =>
                              navigat("/bidask/" + val?._id + "/sell3")
                            }
                          >
                            Sell Now - {"$" + val?.highest_bid}
                          </Button>
                        )}
                      </td>
                      <td className="">
                        {val?.type == 1 ? (
                          <Button
                            className="border bg-success"
                            onClick={() =>
                              navigat("/bidask/" + val?._id + "/buy2")
                            }
                          >
                            Buy Now - ${val?.new_retail_website_price}
                          </Button>
                        ) : val?.type == 2 ? (
                          <Button
                            className="border bg-success"
                            onClick={() =>
                              navigat("/bidask/" + val?._id + "/buy3")
                            }
                          >
                            Buy Now - {"$" + val?.lowest_ask}
                          </Button>
                        ) : (
                          <Button
                            className="border bg-success"
                            onClick={() =>
                              navigat("/bidask/" + val?._id + "/buy4")
                            }
                          >
                            Buy Now - {"$" + val?.lowest_ask}
                          </Button>
                        )}
                        {AskBid == i ? (
                          <Button
                            className="bg-none border-0"
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
                            className="bg-none border-0"
                            onClick={() => ASKBID(val.id, i)}
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

                        {AskBid == i ? (
                          <div className="modal_custom">
                            <div className="inner_customModal">
                              <tr>
                                <td>
                                  <Table responsive="sm" striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Quantity</th>
                                        <th>Bid</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Bid > 0 ? (
                                        Bid.map((val) => {
                                          return (
                                            <tr>
                                              <td> 13</td>
                                              <td>${val.bidAmount}</td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <>
                                          <tr>
                                            <td> 13</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 18</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 23</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$188</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$28</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$738</td>
                                          </tr>
                                        </>
                                      )}
                                    </tbody>
                                  </Table>
                                </td>
                                <td>
                                  <Table responsive="sm" striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Quantity</th>
                                        <th>Ask</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {ask > 0 ? (
                                        ask.map((val) => {
                                          return (
                                            <tr>
                                              <td> 13</td>
                                              <td>${val.askAmount}</td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <>
                                          <tr>
                                            <td> 13</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 18</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 23</td>
                                            <td>$138</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$188</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$28</td>
                                          </tr>
                                          <tr>
                                            <td> 13</td>
                                            <td>$738</td>
                                          </tr>
                                        </>
                                      )}
                                    </tbody>
                                  </Table>
                                </td>
                              </tr>
                            </div>
                          </div>
                        ) : null}
                      </td>
                      <td>
                        {val?.type == 1 ? (
                          "Retail Only"
                        ) : localStorage.getItem("admin") ? (
                          <UserAskBidList
                            productId={val._id}
                            userId={
                              JSON.parse(localStorage.getItem("admin")).id
                            }
                            askListStatus={askStatus}
                            bidListStatus={bidStatus}
                          />
                        ) : localStorage.getItem("tokenuser") ? (
                          <UserAskBidList
                            productId={val._id}
                            userId={
                              JSON.parse(localStorage.getItem("tokenuser")).id
                            }
                            askListStatus={askStatus}
                            bidListStatus={bidStatus}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* start Filter Model */}
      <Modal show={showFilterModel} onHide={() => setShowFilterModel(false)} backdrop="static">
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
      {/* end Filter Model */}
    </div>
  );
};

export default UserBuySell;
