import React, { useEffect, useState } from "react";
import { Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { useNavigate } from "react-router-dom";
import UserAskBidList from "./UserAskBidList";
const FavouriteList = () => {
  const navigate = useNavigate();
  let imageUrl = "https://api.skewws.com/resources/";
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [DataFev, setDataFev] = useState();
  //filter State
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

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  const handleSingleUserData = (id) => {
    ExportApi.getSingleUserData(id)
        .then((resp) => {
            if(resp.data.message == "user not found"){
              window.dispatchEvent(new Event("Loginout"));
            }else{
            }
        })
        .catch((err) => console.log(err));
};

  //to get the data from the fav. list
  const HandleGetfavouriteList = (id) => {
    ExportApi.favouriteList(id)
      .then((resp) => {
        if (resp.data.data.favourite) {
          setDataFev(resp.data.data.favourite);
        } else {
          setDataFev([]);
        }
      })
      .catch((err) => console.log(err));
  };

  //sort data Here
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = DataFev.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //For Check the All Checkboxes
  const handleSelectAll = (e) => {
    let result = e.target.checked;
    if (result) {
      let data = DataFev.map((item) => {
        return { ...item, isSelected: true };
      });
      setDataFev([...data]);
    } else {
      let data = DataFev.map((item) => {
        return { ...item, isSelected: false };
      });
      setDataFev([...data]);
    }
  };

  //for Check the Single Checkbox
  const handleCheck = (data, id) => {
    let product_id = id;
    if (data) {
      for (let i = 0; i < DataFev.length; i++) {
        const element1 = DataFev[i];
        if (element1?._id.includes(product_id)) {
          DataFev[i].isSelected = true;
        }
      }
    } else {
      for (let i = 0; i < DataFev.length; i++) {
        const element1 = DataFev[i];
        if (element1?._id.includes(product_id)) {
          DataFev[i].isSelected = false;
        }
      }
    }
    setDataFev([...DataFev]);
  };

  //filter Api
  const SearchFilterCheck = () => {
    if (condition?.length > 0) {
      let result = DataFev?.filter((item) => item.type == condition);
      setDataFev(result);
    } else if (brand?.length > 0) {
      let result = DataFev?.filter((item) => item.brand == brand);
      setDataFev(result);
    } else if (series?.length > 0) {
      let result = DataFev?.filter((item) => item.series == series);
      setDataFev(result);
    } else if (model?.length > 0) {
      let result = DataFev?.filter((item) => item.model == model);
      setDataFev(result);
    } else if (chipset?.length > 0) {
      let result = DataFev?.filter((item) => item.chipset == chipset);
      setDataFev(result);
    } else {
      if (localStorage.getItem("tokenuser")) {
        HandleGetfavouriteList(
          JSON.parse(localStorage.getItem("tokenuser")).id
        );
        GetData1();
      } else if (localStorage.getItem("admin")) {
        HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
        GetData1();
      } else {
      }
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
        setFilterList(resp?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  //Open Filter Model
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
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("tokenuser")).id);
      GetData1();
    } else if (localStorage.getItem("admin")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
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

  // chipset Filter
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

  // Modal Filter
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

  // Series Filter
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

  // Brand Filter
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

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("tokenuser")).id);
      GetData1();
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id)
    } else if (localStorage.getItem("admin")) {
      HandleGetfavouriteList(JSON.parse(localStorage.getItem("admin")).id);
      GetData1();
      handleSingleUserData(JSON.parse(localStorage.getItem("admin")).id)
    } else {
    }
  }, []);

  return (
    <div>
      <Row>
        <Col lg={12} className="mt-sm-5 mt-3">
          <div className="text-sm-end text-center">
            <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">
              Duplicate
            </Button>
            <Button className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0">
              Delete
            </Button>
            <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">
              Make Inactive/Active
            </Button>
            <Button className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0">
              Show Inactive
            </Button>
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </div>
        </Col>
        <Col lg={12} className="mt-sm-5 mt-3">
          <>
            {/* Start Clear Filter */}
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
            {/* End Clear Filter */}
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
                      onChange={(e) => handleSelectAll(e)}
                    />{" "}
                    <label>Select All</label>
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
                  <th onClick={() => sortHere("series")}>
                    Sub Model{" "}
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
                    Spread{" "}
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
                  <th>
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
                  <th>
                    Your Bid/Ask{" "}
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
                {DataFev?.length > 0 ? (
                  DataFev?.map((val) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex align-items-end justify-content-between">
                            <Form.Check
                              className="d-inline"
                              type="checkbox"
                              checked={val?.isSelected}
                              onChange={(e) =>
                                handleCheck(e.target.checked, val._id)
                              }
                            />{" "}
                            <img
                              src={`${imageUrl}${val?.image[0]}`}
                              style={{ width: "100px" }}
                              onClick={() => navigate(`/product/${val._id}`)}
                            />
                            <Button className="bg-none border-0">
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
                          </div>
                        </td>
                        <td>{val.brand}</td>
                        <td>{val.model}</td>
                        <td>{val.series}</td>
                        <td>
                          {val.highest_bid == 0 && val.lowest_ask == 0
                            ? "NA"
                            : "$" +
                              Math.abs(val?.highest_bid - val?.lowest_ask)}
                        </td>
                        <td>
                          {val.highest_bid > 0 ? (
                            <Button className="border bg-danger">
                              Sell Now - {"$" + val?.highest_bid}
                            </Button>
                          ) : (
                            <Button className="border bg-danger">NA</Button>
                          )}
                        </td>
                        <td>
                          {val.lowest_ask > 0 ? (
                            <Button className="border bg-success">
                              Buy Now - {"$" + val?.lowest_ask}
                            </Button>
                          ) : (
                            <Button className="border bg-success">NA</Button>
                          )}
                        </td>
                        <td>
                          <div className="d-flex">
                            <UserAskBidList
                              productId={val._id}
                              userId={
                                JSON.parse(localStorage.getItem("tokenuser")).id
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>
                    <p className="text-center">No Data Found</p>
                  </div>
                )}
              </tbody>
            </Table>
          </>
        </Col>
      </Row>
      {/* Start Filter Modal */}
      <Modal
        className="custom-mode"
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
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
          <Button variant="secondary">Save</Button>
        </Modal.Footer>
      </Modal>
      {/* end Filter Modal */}
    </div>
  );
};

export default FavouriteList;
