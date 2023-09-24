import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Table,
  Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExportApi from "../../api/ExportApi"
import { toast } from "react-toastify";
export default function CustomerMain() {
  // Initialize state variables
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [ActiveIndex, setActiveIndex] = useState(0);
  const [userData1, setUserData1] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);
  const [tabnameTaxt, setTabnameTaxt] = useState(null);
  const [totalSold, setTotalSold] = useState([]);
  const [activeBidAsk, setActiveBidAsk] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [smShow, setSmShow] = useState(false);
  const [FilterOnCModal, setFilterOnCModal] = useState();
  const [text, setText] = useState();
  const [smShow1, setSmShow1] = useState(false);
  const [filterTabData, setFilterTabData] = useState()
  const [FilterHedertext, setFilterHedertext] = useState();
  const [tabName, setTabName] = useState()
  const [singleTabName, setSingleTabName] = useState()
  const [tagName, setTagName] = useState()
  const [filterName, setFilterName] = useState()
  const [isLoading, setLoading] = useState(true);
  const [ShowCol, setShowCol] = useState({
    Customer: true,
    Purchase: true,
    Sales: true,
    TotalSpent: true,
    TotalSold: true,
    ActiveBidAsk: true,
    ActiveOrder: true,
  });

  //get the Customer List
  const handleGetCustomerList = () => {
    ExportApi.GetAllCustomerList()
      .then((resp) => {
        let data = resp.data.data;
        setUserData(data);
        let Data2 = data?.filter((item) => {
          return (
            item.purchaseCount > 0
          )
        })
        let Data3 = data?.filter((item) => {
          return (
            item.salesCount > 0
          )
        })
        let Data4 = data?.filter((item) => {
          return (
            item.totalSpent > 0
          )
        })
        let Data5 = data?.filter((item) => {
          return (
            item.activeBidAskCount > 0
          )
        })
        let Data6 = data?.filter((item) => {
          return (
            item.totalSold > 0
          )
        })
        let Data7 = data?.filter((item) => {
          return (
            item.activeOrder > 0
          )
        })
        setPurchases(Data2)
        setSales(Data3)
        setTotalSpent(Data4)
        setActiveBidAsk(Data5)
        setTotalSold(Data6)
        setActiveOrders(Data7)
        setUserData1(resp.data.data)
        setLoading(false)
      })
      .catch((err) => console.log(err));
      // window.dispatchEvent(new Event("Loginout"));
  };

  //sorting the table
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = userData.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  //search the data 
  const HandleSearchData = (data) => {
    if (data == "") {
      setUserData(userData1);
    } else {
      let Filterdata = userData1.filter(
        (val) =>
          val?._id.firstname.toLowerCase().includes(data.toLowerCase())
      );
      setUserData([...Filterdata]);
    }
  }

  // const handleTableFilter = () => {
  //   setFilterHedertext(text);
  //   setSmShow(false);
  //   setFilterOnCModal();
  //   setText();
  // };

  // const FilterHandle = (data) => {
  //   console.log(data);
  //   if (FilterOnCModal == "CustomerName") {
  //     let Data = userData.filter((val) => val._id.firstname.includes(data.toLowerCase()));
  //     setUserData1([...Data]);
  //     console.log(Data)
  //   } else {
  //     // console.log({ FilterOnCModal });
  //     let Data = userData.filter((val) => val[FilterOnCModal].includes(data));
  //     setUserData1([...Data]);
  //   }
  // };

  //to creating the tab 
  const handleNewTab = () => {
    ExportApi.createFilterTabName(tabnameTaxt, FilterOnCModal, filterTabData, 'Customer').then((resp) => {
      console.log(resp.data.message)
      if (resp.data.message == 'Data Created successfully') {
        toast.success('Data created successfully')
        handleGetAllFilterTabNames()
        setFilterTabData()
        setFilterOnCModal()
        setTabnameTaxt()
        setSmShow1(false)
      } else {
        toast.error(resp.data.message);
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  
  const handleGetAllFilterTabNames = () => {
    ExportApi.getAllTabName('Customer').then((resp) => {
      if (resp.data.message == "Data fetched Successfully") {
        let data = resp.data.data
        setTabName(data)
        setSingleTabName(data[0]?.filterName)
      } else {
        toast.error(resp.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //when we switch tabs of filter
  const handleFilterTab = (id, index, name) => {
    setActiveIndex(index)
    if (name == 'All') {
      setUserData(userData1)
    } else {
      ExportApi.getCustomerTagName(id).then((resp) => {
        let data = resp.data
        if (data.message == "Data fetched successfully") {
          console.log(data)
          setTagName(data?.data?.[0].filterName)
          setUserData(data?.data)
          setFilterName(data?.data?.[0].tabName)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  //clear tab filter
  const handleClearFilter = (name, filter) => {
    ExportApi.removeFilter(name, filter).then((resp) => {
      let data = resp.data
      if (data.message == "Data removed successfully") {
        toast.success(resp.data.message)
        handleGetAllFilterTabNames()
        setActiveIndex(0)
      } else {
        toast.error(resp.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //select all checkboxes
  const handleSelectAll = (e, type) => {
    let result = e.target.checked;
    if (result) {
      let data = userData.map((item, i) => {
        return { ...item, isSelected: true };
      });
      // console.log('Active Banner Data', data)
      setUserData([...data]);
    } else {
      let data = userData.map((item) => {
        return { ...item, isSelected: false };
      });

      setUserData([...data]);
    }
  }

  //select one checkbox
  const handleCheck = (data, id) => {
    let customer_id = id;
    // let result = userData.filter((item) =>{
    //   return item._id === customer_id ? customer_id:null
    // });
    // let final_data = result[0]._id
    if (data) {
      for (let i = 0; i < userData.length; i++) {
        const element1 = userData[i];
        if (element1?._id.includes(customer_id)) {
          userData[i].isSelected = true;
        }
      }
    } else {
      for (let i = 0; i < userData.length; i++) {
        const element1 = userData[i];
        if (element1?._id.includes(customer_id)) {
          userData[i].isSelected = false;
        }
      }
    }
    setUserData([...userData]);
  };

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  useEffect(() => {
    handleGetCustomerList();
    handleGetAllFilterTabNames()
  }, []);

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
  return (
    <div>
      <Row className="my-5">
        <Col lg={12}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Customers</h4>
            <Dropdown>
              <Dropdown.Toggle
                className="border-0 bg-none text-dark fw-bold"
                id="dropdown-basic"
                disabled
              >
                More action
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-2">
                <Dropdown.Item href="#">TBD</Dropdown.Item>
                <Dropdown.Item href="#">
                  Possible Export Customers
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  Possible Import Customers
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col>

          <div className="border p-3 bg-white mt-3">
            <div className="d-flex gap-5">
              {tabName?.map((val, i) => {
                return (
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
                    onClick={() => handleFilterTab(val?._id, i, val?.tabName,)}
                  >
                    {val.tabName}
                  </h4>
                );
              })}
            </div>
            <div className="d-sm-flex mt-3">
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
              <ButtonGroup
                aria-label="Basic example"
                className="border ms-sm-2 mb-2 mb-sm-0"
              >

                {/* Start Filter Customer */}
                <Button variant="light" className="d-flex align-items-center" onClick={() => setSmShow(true)}>
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
                {/* End Filter Customer */}

                {/* Start Add or Remove Dynamic Field  */}
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
                      label="Customer Name"
                      type={"checkbox"}
                      checked={ShowCol.Customer}
                      onChange={(e) => {
                        ShowCol.Customer = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Purchases"
                      type={"checkbox"}
                      checked={ShowCol.Purchase}
                      onChange={(e) => {
                        ShowCol.Purchase = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Sales"
                      type={"checkbox"}
                      checked={ShowCol.Sales}
                      onChange={(e) => {
                        ShowCol.Sales = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Total Spent"
                      type={"checkbox"}
                      checked={ShowCol.TotalSpent}
                      onChange={(e) => {
                        ShowCol.TotalSpent = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Total Sold"
                      type={"checkbox"}
                      checked={ShowCol.TotalSold}
                      onChange={(e) => {
                        ShowCol.TotalSold = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Active Bids /Asks"
                      type={"checkbox"}
                      checked={ShowCol.ActiveBidAsk}
                      onChange={(e) => {
                        ShowCol.ActiveBidAsk = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                    <Form.Check
                      inline
                      label="Active Order"
                      name="group1"
                      type={"checkbox"}
                      checked={ShowCol.ActiveOrder}
                      onChange={(e) => {
                        ShowCol.ActiveOrder = e.target.checked;
                        setShowCol({ ...ShowCol });
                      }}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                {/* End Add or Remove Dynamic Field */}

                {/* Start Saving the tab   */}
                {filterTabData ? (
                  <Button
                    type="button"
                    onClick={() => setSmShow1(true)}
                    variant="light"
                  >
                    Save
                  </Button>
                ) : null}
                {/* End Saving the tab */}



                {/* Start Sorting  */}
                <Button
                  variant="light"
                  className="d-flex align-items-center"
                  onClick={() => sortHere("purchaseCount")}
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
                {/* End Sorting */}

              </ButtonGroup>

              {/* <Button className="bg-light border ms-sm-2 mb-2 mb-sm-0">
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


            {/* Start Static Data of search Input */}
            <div className="d-flex mt-3 justify-content-between align-items-center">
              <div className="d-flex gap-2">
                {ActiveIndex == 0 ? '' :
                  <div>
                    {
                      tabName?.length > 0 ? (
                        <Button className="border bg-custom-light text-dark" onClick={() => handleClearFilter(tagName, filterName)}>Clear All Filters</Button>
                      ) : ""}

                    <span className="bg-custom-light px-2 py-1 rounded text-dark ms-3">
                      {tagName == undefined ? singleTabName : tagName}
                      <Button
                        className="border-0 bg-none p-0"
                        onClick={() => {
                          setFilterHedertext();
                          setUserData(userData1);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="#000"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                          onClick={() => handleClearFilter(tagName, filterName)}
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </Button>
                    </span>
                  </div>}
              </div>
              {/* <div className="border p-2">
                <p className="mb-0">
                  Sort by last update (newest first)
                  <Button className="border-0 bg-none p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill=""
                      className="bi bi-chevron-expand ms-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                      />
                    </svg>
                  </Button>
                </p>
              </div> */}
            </div>
            {/* End Static Data of Search Input */}

            <div className="table-responsive mt-3">
              <Table bordered className="align-middle graphic-table">
                <thead>
                  <tr className="border-0 border-bottom">
                    <th className="text-start">
                      <Form.Check className="d-inline me-2" type="checkbox" onClick={(e) => handleSelectAll(e)} />
                    </th>
                    {
                      ShowCol.Customer ?
                        <th onClick={() => sortHere('firstname')}>
                          Customer Name
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
                        </th> : null
                    }
                    {
                      ShowCol.Purchase ?
                        <th onClick={() => sortHere('purchaseCount')}>
                          Purchases
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
                        </th> : null
                    }
                    {
                      ShowCol.Sales ?
                        <th onClick={() => sortHere('salesCount')}>
                          Sales
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
                        </th> : null
                    }
                    {
                      ShowCol.TotalSpent ?
                        <th onClick={() => sortHere('totalSpent')}>
                          Total Spent
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
                        </th> : null
                    }
                    {
                      ShowCol.TotalSold ?
                        <th onClick={() => sortHere('totalSold')}>
                          Total Sold
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
                        </th> : null
                    }
                    {
                      ShowCol.ActiveBidAsk ?
                        <th onClick={() => sortHere('activeBidAskCount')}>
                          Active Bids/Asks
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
                        </th> : null
                    }
                    {
                      ShowCol.ActiveOrder ?
                        <th onClick={() => sortHere('activeOrder')}>
                          Active Orders
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
                        </th> : null
                    }
                  </tr>
                </thead>
                <tbody>
                  {userData?.map((val, i) => {
                    return (
                      <tr className="border-0 border-bottom">
                        <td className="border-0">
                          <div className="d-flex align-items-end justify-content-between">
                            <Form.Check className="d-inline" type="checkbox" onChange={(e) =>
                              handleCheck(e.target.checked, val?._id)} checked={val?.isSelected} />
                          </div>
                        </td>
                        {
                          ShowCol.Customer ?
                            <td
                              className="border-0"
                              onClick={() => navigate("/customerDetail/" + val?._id.id)}
                            >
                              <p className="mb-0 fw-bold">{val?._id.firstname}</p>
                            </td> : null
                        }
                        {
                          ShowCol.Purchase ?
                            <td className="border-0">{val?.purchaseCount} orders</td> : null
                        }
                        {
                          ShowCol.Sales ?
                            <td className="border-0">{val?.salesCount}Sales</td> : null
                        }
                        {
                          ShowCol.TotalSpent ?
                            <td className="border-0">{"$" + val?.totalSpent.toFixed(2)} Spent</td> : null
                        }
                        {
                          ShowCol.TotalSold ?
                            <td className="border-0">{"$" + val?.totalSold.toFixed(2)} Sold</td> : null
                        }
                        {
                          ShowCol.ActiveBidAsk ?
                            <td className="border-0">{val?.activeBidAskCount} Bids/Asks</td> : null
                        }
                        {
                          ShowCol.ActiveOrder ?
                            <td className="border-0">{val?.activeOrder} Active Orders</td> : null
                        }
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>


      {/* Start Filter Modal      */}
      <Modal
        className="custom_filter"
        show={smShow}
        onHide={() => {
          setFilterHedertext(text);
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
                  setFilterOnCModal(e.target.value);
                }}
              >
                <option value="">Select Filter </option>
                <option value="CustomerName"> Customer Name</option>
                <option value="Purchases">Purchases</option>
                <option value="Sales">Sales</option>
                <option value="TotalSpent">Total Spent</option>
                <option value="TotalSold">Total Sold</option>
                <option value="ActiveBidsAsks">Active Bids/Asks</option>
                <option value="ActiveOrders">Active Orders</option>
              </Form.Select>
            </Col>
            {FilterOnCModal ? (
              <Col xs={4} xl={4}>
                <Dropdown
                  className="Change_bg"
                  style={{ marginBottom: "90px" }}
                >
                  <Dropdown.Toggle id="dropdown-basic">
                    {text ? text : "Select Value"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      FilterOnCModal == "CustomerName" ?
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => {
                            setFilterTabData(e.target.value);
                          }}
                        >
                          <option value="">Select Customer </option>
                          {
                            userData?.map((item) => {
                              return (
                                <option value={item?._id?.id}>{item?._id.firstname}</option>
                              )
                            })
                          }
                        </Form.Select> : FilterOnCModal == "Purchases" ?
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => {
                              setFilterTabData(e.target.value);
                            }}
                          >
                            <option value="">Select Purchases </option>
                            {
                              purchases?.map((item) => {
                                return (
                                  <option value={item?._id?.id}>{item?._id.firstname}</option>
                                )
                              })
                            }
                          </Form.Select> : FilterOnCModal == "Sales" ?
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setFilterTabData(e.target.value);
                              }}
                            >
                              <option value="">Select Sales </option>
                              {
                                sales?.map((item) => {
                                  return (
                                    <option value={item?._id?.id}>{item?._id.firstname}</option>
                                  )
                                })
                              }
                            </Form.Select> : FilterOnCModal == "TotalSpent" ?
                              <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setFilterTabData(e.target.value);
                                }}
                              >
                                <option value="">Select Spent </option>
                                {
                                  totalSpent?.map((item) => {
                                    return (
                                      <option value={item?._id?.id}>{item?._id.firstname}</option>
                                    )
                                  })
                                }
                              </Form.Select> : FilterOnCModal == "ActiveBidsAsks" ?
                                <Form.Select
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilterTabData(e.target.value);
                                  }}
                                >
                                  <option value="">Select Active Bid/Ask </option>
                                  {
                                    activeBidAsk?.map((item) => {
                                      return (
                                        <option value={item?._id?.id}>{item?._id.firstname}</option>
                                      )
                                    })
                                  }
                                </Form.Select> : FilterOnCModal == "TotalSold" ?
                                  <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                      setFilterTabData(e.target.value);
                                    }}
                                  >
                                    <option value="">Select Total Sold </option>
                                    {
                                      totalSold?.map((item) => {
                                        return (
                                          <option value={item?._id?.id}>{item?._id.firstname}</option>
                                        )
                                      })
                                    }
                                  </Form.Select> : FilterOnCModal == "ActiveOrders" ?
                                    <Form.Select
                                      aria-label="Default select example"
                                      onChange={(e) => {
                                        setFilterTabData(e.target.value);
                                      }}
                                    >
                                      <option value="">Select Active Orders </option>
                                      {
                                        activeOrders?.map((item) => {
                                          return (
                                            <option value={item?._id?.id}>{item?._id.firstname}</option>
                                          )
                                        })
                                      }
                                    </Form.Select> : ""
                    }


                    {/* <input
                      type={"text"}
                      value={text}
                      style={{ marginLeft: "30px" }}
                      onChange={(e) => {
                        setText(e.target.value);
                        FilterHandle(e.target.value);
                      }}
                    /> */}
                    {text ? (
                      <Button
                        onClick={() => {
                          setText("");
                          setUserData1(userData);
                        }}
                      >
                        Clear
                      </Button>
                    ) : null}
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
            {
              FilterOnCModal != null && filterTabData != null ?
                <Button
                  variant="success"
                  onClick={() => {
                    setFilterHedertext(text);
                    setSmShow(false);
                  }}
                >
                  Done
                </Button> : <Button
                  variant="success"
                  disabled
                  onClick={() => {
                    setFilterHedertext(text);
                    setSmShow(false);
                  }}
                >
                  Done
                </Button>
            }
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      {/* End Filter Modal */}

      {/* Start save Model */}
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
            <Form.Label>View Name</Form.Label>
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
          {
            tabnameTaxt == null ?
              <Button
                variant="success"
                disabled
                onClick={handleNewTab}
              >
                Save view
              </Button> : filterTabData != null ? <Button
                variant="success"
                onClick={handleNewTab}
              >
                Save view
              </Button> : <Button
                variant="success"
                disabled
                onClick={handleNewTab}
              >
                Save view
              </Button>
          }
        </Modal.Footer>
      </Modal>
      {/* End Save Model */}

    </div>
  );
}
