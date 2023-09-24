import React, { Children, useEffect, useState } from "react";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import Header from "../../src/components/header";
import Login from "../components/Login";
import Heart from "react-heart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { animateScroll as scroll } from "react-scroll";

//Start Global Variables
let checkBoxData;
var MinData;
var MaxData;
//end GLobal Variables
export default function Categories() {
  let prams = useParams();
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [Compare, setCompare] = useState([]);
  const [CompareData, setCompareData] = useState([]);
  const [category, setCategory] = useState([]);
  const [res, setres] = useState();
  const [customPrice, setCustomPrice] = useState(false);
  const [customMinPrice, setCustomMinPrice] = useState(0);
  const [customMaxPrice, setCustomMaxPrice] = useState(0);
  const [conditionKey, setconditionKey] = useState([]);
  const [chipsetKey, setchipsetKey] = useState([]);
  const [brandKey, setbrandKey] = useState([]);
  const [seriesKey, setseriesKey] = useState([]);
  const [modalKey, setmodalKey] = useState([]);
  const [PriceKey, setPriceKey] = useState([]);
  const [chipset, setchipset] = useState([]);
  const [condition, setcondition] = useState([]);
  const [condition1, setcondition1] = useState([]);
  const [hide, setHide] = useState();
  const [brand, setbrand] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [Price, setPrice] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [FilterList, setFilterList] = useState();
  const [brandShow, setBrandShow] = useState(false);
  const [chipsetShow, setChipsetShow] = useState(false);
  const [seriesShow, setSeriesShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [sorting, setSorting] = useState("Normal");
  const [sort, setSort] = useState("Normal");
  const [customFilterPrice, setCustomFilterPrice] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  //Loaders
  const [showConditionLoader, setShowConditionLoader] = useState(false);
  const [showChipsetLoader, setShowChipsetLoader] = useState(false);
  const [showBrandLoader, setShowBrandLoader] = useState(false);
  const [showSeriesLoader, setShowSeriesLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);
  const [showPriceLoader, setShowPriceLoader] = useState(false);

  //function used for get the category data when user not login
  //id used for category Id
  const GetData = (id) => {
    if (localStorage.getItem("Compare")) {
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);
      ExportApi.GetSinglecategory(id)
        .then((resp) => {
          let chipsetKeyArray = [];
          let conditionKeyArray = [];
          let brandKeyArray = [];
          let modalKeyArray = [];
          let seriesKeyArray = [];
          setres(resp?.data.data);
          resp?.data.data?.filterKey?.chipset?.map((val, i) => {
            let key = { [val]: false };
            chipsetKeyArray.push(key);
          });
          setchipsetKey([...chipsetKeyArray]);
          resp?.data.data?.filterKey?.condition?.map((val) => {
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
          resp?.data.data?.filterKey?.series?.map((val) => {
            let key = { [val]: false };
            seriesKeyArray.push(key);
          });
          setseriesKey([...seriesKeyArray]);
          resp?.data.data?.filterKey?.brands?.map((val) => {
            let key = { [val]: false };

            brandKeyArray.push(key);
          });
          setbrandKey([...brandKeyArray]);
          resp?.data.data?.filterKey?.model?.map((val) => {
            let key = { [val]: false };
            modalKeyArray.push(key);
          });
          setmodalKey([...modalKeyArray]);
          let data = resp?.data?.data?.productList1;
          for (let i = 0; i < result.length; i++) {
            const element = result[i];
            for (let index = 0; index < data.length; index++) {
              const element1 = data[index];

              if (element?._id.includes(element1?._id)) {
                data[index].isCompare = true;
              }
            }
          }

          // setTimeout(() => {
          if (prams.name == undefined) {
            setCategory([...data]);
          } else {
            setCategory([]);
          }

          setCount(1);
          // });
          setFilterList(resp?.data?.data?.filterKey);
        })
        .catch((err) => console.log(err));
    } else {
      ExportApi.GetSinglecategory(id)
        .then((resp) => {
          let chipsetKeyArray = [];
          let conditionKeyArray = [];
          let brandKeyArray = [];
          let modalKeyArray = [];
          let seriesKeyArray = [];
          setres(resp?.data.data);
          resp?.data.data?.filterKey?.chipset?.map((val, i) => {
            let key = { [val]: false };
            chipsetKeyArray.push(key);
          });
          setchipsetKey([...chipsetKeyArray]);
          resp?.data.data?.filterKey?.condition?.map((val) => {
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
          resp?.data.data?.filterKey?.series?.map((val) => {
            let key = { [val]: false };
            seriesKeyArray.push(key);
          });
          setseriesKey([...seriesKeyArray]);
          resp?.data.data?.filterKey?.brands?.map((val) => {
            let key = { [val]: false };

            brandKeyArray.push(key);
          });
          setbrandKey([...brandKeyArray]);
          resp?.data.data?.filterKey?.model?.map((val) => {
            let key = { [val]: false };
            modalKeyArray.push(key);
          });
          setmodalKey([...modalKeyArray]);
          if (prams.name == undefined) {
            setCategory(resp?.data?.data?.productList1);
          } else {
            setCategory([]);
          }

          setCount(1);
          setFilterList(resp?.data?.data?.filterKey);
        })
        .catch((err) => console.log(err));
    }
  };

  //function used for get the category data when user login
  //id used for category Id
  //userId used for the userid
  const GetData1 = (id, userid) => {
    if (localStorage.getItem("Compare")) {
      let result = JSON.parse(localStorage.getItem("Compare"));
      setCompareData(result);
      ExportApi.GetSinglecategory1(id, userid)
        .then((resp) => {
          let chipsetKeyArray = [];
          let conditionKeyArray = [];
          let brandKeyArray = [];
          let modalKeyArray = [];
          let seriesKeyArray = [];
          setres(resp?.data.data);
          resp?.data.data?.filterKey?.chipset?.map((val, i) => {
            let key = { [val]: false };
            chipsetKeyArray.push(key);
          });
          setchipsetKey([...chipsetKeyArray]);
          resp?.data.data?.filterKey?.condition?.map((val) => {
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
          resp?.data.data?.filterKey?.series?.map((val) => {
            let key = { [val]: false };
            seriesKeyArray.push(key);
          });
          setseriesKey([...seriesKeyArray]);
          resp?.data.data?.filterKey?.brands?.map((val) => {
            let key = { [val]: false };

            brandKeyArray.push(key);
          });
          setbrandKey([...brandKeyArray]);
          resp?.data.data?.filterKey?.model?.map((val) => {
            let key = { [val]: false };
            modalKeyArray.push(key);
          });
          setmodalKey([...modalKeyArray]);
          let data = resp?.data?.data?.productList1;
          for (let i = 0; i < result.length; i++) {
            const element = result[i];
            for (let index = 0; index < data.length; index++) {
              const element1 = data[index];

              if (element?._id.includes(element1?._id)) {
                data[index].isCompare = true;
              }
            }
          }
          // setTimeout(() => {
          if (prams.name == undefined) {
            setCategory([...data]);
          } else {
            setCategory([]);
          }

          // });
          // setCategory(resp?.data?.data?.productList1);
          setCount(1);
          setFilterList(resp?.data?.data?.filterKey);
        })
        .catch((err) => console.log(err));
    } else {
      ExportApi.GetSinglecategory1(id, userid)
        .then((resp) => {
          let chipsetKeyArray = [];
          let conditionKeyArray = [];
          let brandKeyArray = [];
          let modalKeyArray = [];
          let seriesKeyArray = [];
          setres(resp?.data.data);
          resp?.data.data?.filterKey?.chipset?.map((val, i) => {
            let key = { [val]: false };
            chipsetKeyArray.push(key);
          });
          setchipsetKey([...chipsetKeyArray]);
          resp?.data.data?.filterKey?.condition?.map((val) => {
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
          resp?.data.data?.filterKey?.series?.map((val) => {
            let key = { [val]: false };
            seriesKeyArray.push(key);
          });
          setseriesKey([...seriesKeyArray]);
          resp?.data.data?.filterKey?.brands?.map((val) => {
            let key = { [val]: false };

            brandKeyArray.push(key);
          });
          setbrandKey([...brandKeyArray]);
          resp?.data.data?.filterKey?.model?.map((val) => {
            let key = { [val]: false };
            modalKeyArray.push(key);
          });
          setmodalKey([...modalKeyArray]);
          if (prams.name == undefined) {
            setCategory(resp?.data?.data?.productList1);
          } else {
            setCategory([]);
          }

          setCount(1);
          setFilterList(resp?.data?.data?.filterKey);
        })
        .catch((err) => console.log(err));
    }
  };

  //For Close the Modal
  const handleClose = () => {
    setShow(false);
  };
  //for Open the Modal
  const handleShow = () => setShow(true);

  //handle Fev. Button
  //data used for the fav is checked or not
  //i used for the index
  //id used for the productId
  const handleFevButton = (data, id, i) => {
    if (data) {
      if (localStorage.getItem("tokenuser")) {
        HandleAddtoFevreat(
          id,
          JSON.parse(localStorage.getItem("tokenuser")).id,
          i
        );
      } else if (localStorage.getItem("admin")) {
        HandleAddtoFevreat(id, JSON.parse(localStorage.getItem("admin")).id, i);
      } else {
        handleShow();
      }
    } else {
      if (localStorage.getItem("tokenuser")) {
        setToken(JSON.parse(localStorage.getItem("tokenuser")));
        HandleRemovetoFevreat(
          id,
          JSON.parse(localStorage.getItem("tokenuser")).id,
          i
        );
      } else if (localStorage.getItem("admin")) {
        setToken(JSON.parse(localStorage.getItem("admin")));
        HandleRemovetoFevreat(
          id,
          JSON.parse(localStorage.getItem("admin")).id,
          i
        );
      } else {
        handleShow();
      }
    }
  };

  const GetDataFilterList = (id) => {
    ExportApi.GetAllcategoryList(prams.id)
      .then((resp) => {})
      .catch((err) => console.log(err));
  };

  //Add in the Fav. List
  //data used for the fav is checked or not
  //i used for the index
  //id used for the productId
  const HandleAddtoFevreat = (id, userId, i) => {
    ExportApi.AddtoFevreat(id, userId)
      .then((resp) => {
        category[i].isfav = true;
        setCategory([...category]);
        // GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);

        // setCategory(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  //Remove from the Fav.
  //id used for the productId
  //i used for the index
  const HandleRemovetoFevreat = (id, userId, i) => {
    ExportApi.RemovetoFevreat(id, userId)
      .then((resp) => {
        category[i].isfav = false;
        setCategory([...category]);
      })
      .catch((err) => console.log(err));
  };

  // Search Filter Api
  const SearchFilterCheck = (search, sort) => {
    ExportApi.GetAllcategorySerch(
      search,
      sort,
      condition,
      chipset,
      brand,
      series,
      model,
      Price,
      customFilterPrice
    )
      .then((resp) => {
        setLoading(false);
        let data = resp.data.Data;
        if (resp.data.Message == "Data Fetched Successfully") {
          setTimeout(() => {
            setCategory([...data]);
          }, 100);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setCategory([]);
          }, 100);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  //function used to the Condition filter
  //i used for the index
  //e used for the which Condition filter we want to implement
  const conditionKeyFilter = (e, i) => {
    setShowConditionLoader(true);
    setCount(0);
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
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowConditionLoader(false);
        setCount(1);
      }, 2000);
    } else {
      conditionKey[i][name] = checked;
      condition.splice(index, 1);
      setcondition([...condition]);
      condition1.splice(index1, 1);
      setcondition1([...condition1]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowConditionLoader(false);
        setCount(1);
      }, 2000);
    }
  };
  // End condition Filter

  //function used to Condition the series filter
  //i used for the index
  //name used for the which Condition filter we want to remove
  const conditionKeyFilterClose = (i, name) => {
    setShowConditionLoader(true);
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
    SearchFilterCheck(search, sort);
    setTimeout(() => {
      setShowConditionLoader(false);
    }, 2000);
  };

  //function used to the Chipset filter
  //i used for the index
  //e used for the which Chipset filter we want to implement
  const ChipsetFilter = (e, i) => {
    setShowChipsetLoader(true);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked || index === -1) {
      chipset.push(name);
      chipsetKey[i][name] = checked;
      setchipset([...chipset]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowChipsetLoader(false);
      }, 2000);
    } else {
      chipsetKey[i][name] = checked;
      chipset.splice(index, 1);
      setchipset([...chipset]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowChipsetLoader(false);
      }, 2000);
    }
  };

  //function used to Chipset the series filter
  //i used for the index
  //name used for the which Chipset filter we want to remove
  const ChipsetFilterClose = (id, name) => {
    setShowChipsetLoader(true);
    let index = -1;
    for (let i = 0; i < chipsetKey.length; i++) {
      if (Object.keys(chipsetKey[i])[0] == name) {
        index = i;
      }
    }

    chipsetKey[index][name] = false;
    chipset.splice(id, 1);
    setchipset([...chipset]);
    SearchFilterCheck(search, sort);
    setTimeout(() => {
      setShowChipsetLoader(false);
    }, 2000);
  };

  //function used to the brand filter
  //i used for the index
  //e used for the which brand filter we want to implement
  const BrandtFilter = (e, i) => {
    setShowBrandLoader(true);
    const { name, checked } = e.target;
    let index = brand.indexOf(name);
    if (checked) {
      brand.push(name);
      brandKey[i][name] = checked;
      setbrand([...brand]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowBrandLoader(false);
      }, 2000);
    } else {
      brandKey[i][name] = checked;
      brand.splice(index, 1);
      setbrand([...brand]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowBrandLoader(false);
      }, 2000);
    }
  };
  //function used to brand the series filter
  //i used for the index
  //name used for the which brand filter we want to remove
  const brandtFilterClose = (i, name) => {
    setShowBrandLoader(true);
    let index = -1;
    for (let i = 0; i < brandKey.length; i++) {
      if (Object.keys(brandKey[i])[0] == name) {
        index = i;
      }
    }
    brandKey[index][name] = false;
    brand.splice(i, 1);
    setbrand([...brand]);
    SearchFilterCheck(search, sort);
    setTimeout(() => {
      setShowBrandLoader(false);
    }, 2000);
  };

  //function used to the series filter
  //i used for the index
  //e used for the which series filter we want to implement
  const seriesFilter = (e, i) => {
    setShowSeriesLoader(true);
    const { name, checked } = e.target;
    let index = series.indexOf(name);
    if (checked) {
      series.push(name);
      seriesKey[i][name] = checked;
      setseries([...series]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowSeriesLoader(false);
      }, 2000);
    } else {
      seriesKey[i][name] = checked;
      series.splice(index, 1);
      setseries([...series]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowSeriesLoader(false);
      }, 2000);
    }
  };

  //function used to remove the series filter
  //i used for the index
  //name used for the which series filter we want to remove
  const seriesFilterCsole = (i, name) => {
    setShowSeriesLoader(true);
    let index = -1;
    for (let i = 0; i < seriesKey.length; i++) {
      if (Object.keys(seriesKey[i])[0] == name) {
        index = i;
      }
    }
    seriesKey[index][name] = false;
    series.splice(i, 1);
    setseries([...series]);
    SearchFilterCheck(search, sort);
    setTimeout(() => {
      setShowSeriesLoader(false);
    }, 2000);
  };

  //function used to the modal filter
  //i used for the index
  //e used for the which modal filter we want to implement
  const modalFilter = (e, i) => {
    setShowModalLoader(true);
    const { name, checked } = e.target;
    let index = chipset.indexOf(name);
    if (checked) {
      model.push(name);
      modalKey[i][name] = checked;
      setmodel([...model]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowModalLoader(false);
      }, 2000);
    } else {
      modalKey[i][name] = checked;
      model.splice(index, 1);
      setmodel([...model]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowModalLoader(false);
      }, 2000);
    }
  };

  //function used to remove modal filter
  //i used for the index
  //name used for the which modal filter we want to remove
  const modalFilterCsole = (i, name) => {
    setShowModalLoader(true);
    let index = -1;
    for (let i = 0; i < modalKey.length; i++) {
      if (Object.keys(modalKey[i])[0] == name) {
        index = i;
      }
    }
    modalKey[index][name] = false;
    model.splice(i, 1);
    setmodel([...model]);
    SearchFilterCheck(search, sort);
    setTimeout(() => {
      setShowModalLoader(false);
    }, 2000);
  };

  //function to remove custom price filter
  //min used for the minimum price
  //max used for the maximum price
  //checked used to checkbox is selected or not
  //i used for the index
  const custompriceFilter = (Min, Max, checked, i) => {
    let total = { min: Min, max: Max };
    if (checked) {
      customFilterPrice.push(total);
      setCustomFilterPrice([...customFilterPrice]);
      SearchFilterCheck(search, sort);
    } else {
      let result = [];
      setCustomFilterPrice(result);
      setCustomMaxPrice(0);
      setCustomMinPrice(0);
      setTimeout(() => {
        ExportApi.GetAllcategorySerch(
          search,
          sort,
          condition,
          chipset,
          brand,
          series,
          model,
          Price,
          result
        )
          .then((resp) => {
            setCategory(resp.data.Data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  //function used to the Price filter
  //i used for the index
  //name which price filter we want to implement
  const priceFilter = (e, i) => {
    setShowPriceLoader(true);
    const { name, checked, min, max } = e.target;
    let total = { min: min, max: max };
    if (checked) {
      Price.push(total);
      PriceKey[i] = checked;
      setPrice([...Price]);
      SearchFilterCheck(search, sort);
      setTimeout(() => {
        setShowPriceLoader(false);
      }, 2000);
    } else {
      let result = Price.filter((item) => {
        return item.min != min;
      });
      setPrice(result);
      setTimeout(() => {
        ExportApi.GetAllcategorySerch(
          search,
          sort,
          condition,
          chipset,
          brand,
          series,
          model,
          result
        )
          .then((resp) => {
            setCategory(resp.data.Data);
            setTimeout(() => {
              setShowPriceLoader(false);
            }, 2000);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  //function used to remove Price filter
  //i used for the index
  //name which price filter we want to implement
  const priceFilterClose = (i, name) => {
    setShowPriceLoader(true);
    document.getElementById(`$${name?.min} - $${name?.max}`).checked = false;
    let result = Price.filter((item) => {
      return item.min != name.min;
    });
    setPrice([...result]);
    setTimeout(() => {
      ExportApi.GetAllcategorySerch(
        search,
        sort,
        condition,
        chipset,
        brand,
        series,
        model,
        result
      )
        .then((resp) => {
          setCategory(resp.data.Data);
          setTimeout(() => {
            setShowPriceLoader(false);
          }, 2000);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    });
  };
  //end Price Filter

  // Start clear All Filter
  const clearAllFilters = () => {
    if (!prams.name) {
      setPrice([]);
      setmodel([]);
      setseries([]);
      setbrand([]);
      setchipset([]);
      setcondition([]);
      setcondition1([]);
      if (localStorage.getItem("tokenuser")) {
        GetData1(prams.id, JSON.parse(localStorage.getItem("tokenuser")).id);
      } else if (localStorage.getItem("admin")) {
        GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);
      } else {
        GetData(prams.id);
      }

      setTimeout(() => {
        setCategory(res.productList1);
        setFilterList(res.filterKey);
      }, 2000);
    } else {
      navigate("/categories/63ff36fb23ad0386e761641f");
      window.location.reload();
    }
  };
  //end Clear All fiters

  //Handle Compare
  // e used for checked functionality of the checkbox
  // val used for the product data
  // i used for checked index
  const handleCompare = (e, val, i) => {
    if (e) {
      val.isCompare = true;
      category[i].isCompare = true;
      setCategory([...category]);
      if (Compare.length <= 10) {
        Compare.push(val);
        setCompare([...Compare]);
        setTimeout(() => {
          setModalShow(e);
          localStorage.setItem("Compare", JSON.stringify(Compare));
        });
      }
    } else {
      let data;
      Compare.filter((vall, i) => {
        if (vall._id == val._id) {
          data = i;
        }
      });
      val.isCompare = false;
      category[i].isCompare = false;
      setCategory([...category]);
      Compare.splice(data, 1);
      if (Compare?.length > 0) {
        setCompare([...Compare]);
        localStorage.setItem("Compare", JSON.stringify(Compare));
      } else {
        HandleCompareClear();
      }
    }
  };

  //Show More Chipset
  const handlechipsetshowmore = (data) => {
    if (data == "More") {
      setChipsetShow(true);
    } else {
      setChipsetShow(false);
    }
    GetDataFilterList();
  };

  //Show More Brand
  const handlebrandshowmore = (data) => {
    if (data == "More") {
      setBrandShow(true);
    } else {
      setBrandShow(false);
    }
    GetDataFilterList();
  };

  //Show More Series
  const handleSeriesshowmore = (data) => {
    if (data == "More") {
      setSeriesShow(true);
    } else {
      setSeriesShow(false);
    }
    GetDataFilterList();
  };

  //Show More Model
  const handlemodelshowmore = (data) => {
    if (data == "More") {
      setModelShow(true);
    } else {
      setModelShow(false);
    }
    GetDataFilterList();
  };

  //Handle Sort values
  //e used for the which sort we want to implement
  const handleSort = (e) => {
    setSorting(e.target.innerText);
    setSort(e.target.getAttribute("value"));
    SearchFilterCheck(search, e.target.getAttribute("value"));
  };

  // Function to remove all items present in the Compare PopUp
  const HandleCompareClear = () => {
    // Remove comparison and favorite product data from local storage.
    localStorage.removeItem("Compare");
    localStorage.removeItem("FavouriteProducts");

    // Clear the Compare state and close the modal.
    setCompare([]);
    setModalShow(false);

    // Depending on the user's authentication status, retrieve data accordingly.
    if (localStorage.getItem("tokenuser")) {
      GetData1(prams.id, JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);
    } else {
      GetData(prams.id);
    }
  };

  // Function to remove a single product from the Compare Popup
  const handleCloseButton = (productId) => {
    // Filter out the product to be removed from the Compare state.
    let result = Compare.filter((item) => item._id != productId);

    // Update the category data to reflect that the removed product is no longer in comparison.
    let data = category;
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      if (element?._id.includes(productId)) {
        data[i].isCompare = false;
      }
    }

    // Check if there is only one product left in comparison, and close the modal if so.
    let data2 = JSON.parse(localStorage.getItem("Compare"));
    if (data2?.length == 1) {
      setModalShow(false);
    }

    // Update the state and local storage with the modified comparison data.
    setCategory([...data]);
    setCompare(result);
    localStorage.setItem("Compare", JSON.stringify(result));
  };

  // Function for custom price filtering
  const handleCustomPrice = (e, i, data) => {
    // Handle custom price filtering based on input data.
    if (data == "checkBox") {
      checkBoxData = e.target.checked;
    }
    if (data == "Max") {
      MaxData = e.target.value;
    }
    if (data == "Min") {
      MinData = e.target.value;
    }
    if (MinData == undefined) {
      MinData = 0;
    }

    // Call a custom price filter function with the specified parameters.
    custompriceFilter(MinData, MaxData, checkBoxData, i);
  };

  // Function to handle search filter
  const handleSearchFilter = () => {
    // Navigate to the specified category page based on "prams.id"
    navigate(`/categories/${prams.id}`);

    // Reload the window, typically to refresh the page or apply the filter.
    window.location.reload();
  };

  // Function to retrieve single user data based on UserId
  const handleSingleUserData = (UserId) => {
    ExportApi.getSingleUserData(UserId)
      .then((resp) => {
        if (resp.data.message == "user not found") {
          // If the response indicates that the user was not found, trigger a "Loginout" event.
          window.dispatchEvent(new Event("Loginout"));
        } else {
          // Handle user data if the user was found.
          // You may want to add logic here to process the user data as needed.
        }
      })
      .catch((err) => console.log(err));
  };

  // Event listener for the "Loginout" event
  window.addEventListener("Loginout", () => {
    // Clear local storage and navigate to the home page when a user logs out.
    localStorage.clear();
    navigate("/");
  });

  // Start of the first useEffect block
  useEffect(() => {
    // Event listener for the "Login" event
    window.addEventListener("Login", () => {
      if (localStorage.getItem("tokenuser")) {
        // If a user is logged in as "tokenuser", retrieve data and user information.
        GetData1(prams.id, JSON.parse(localStorage.getItem("tokenuser")).id);
        handleSingleUserData(
          prams.id,
          JSON.parse(localStorage.getItem("tokenuser")).id
        );
      } else if (localStorage.getItem("admin")) {
        // If an admin is logged in, retrieve data and admin information.
        GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);
        handleSingleUserData(
          prams.id,
          JSON.parse(localStorage.getItem("admin")).id
        );
      }
      handleClose();
    });

    // Event listener for the "Loginout" event
    window.addEventListener("Loginout", () => {
      // Retrieve data when a user logs out.
      GetData(prams.id);
    });
  }, []); // This useEffect runs only once since the dependency array is empty.

  // Search Filter useEffect
  useEffect(() => {
    if (prams.name) {
      // If a search query parameter "name" is present, set the search state and apply a search filter.
      setSearch(prams.name);
      SearchFilterCheck(prams.name, sort);
    }
  }, []);

  // Get data for comparison from local storage
  useEffect(() => {
    if (localStorage.getItem("Compare")) {
      // If there are items in local storage for comparison, set the Compare state.
      setCompare(JSON.parse(localStorage.getItem("Compare")));
    }
  }, []);

  // Another useEffect block for data retrieval
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      // If a user is logged in as "tokenuser", retrieve data specific to that user.
      GetData1(prams.id, JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      // If an admin is logged in, retrieve data specific to that admin.
      GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);
    } else {
      // If no user is logged in, retrieve general data.
      GetData(prams.id);
    }
    // Retrieve filter list data.
    GetDataFilterList(prams.id);
  }, []);

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col lg={3}>
            {/* Start for the Showing Filter */}
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

                <div>
                  <span>
                    <b>Price</b>
                  </span>
                  <>
                    {/* {i < 3 ? ( */}
                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => priceFilter(e, 0)}
                        min="25"
                        max="50"
                        id="$25 - $50"
                        label="$25 - $50"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => priceFilter(e, 1)}
                        min="50"
                        max="75"
                        id="$50 - $75"
                        label="$50 - $75"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => priceFilter(e, 2)}
                        min="75"
                        max="100"
                        id="$75 - $100"
                        label="$75 - $100"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => priceFilter(e, 3)}
                        min="100"
                        max="200"
                        id="$100 - $200"
                        label="$100 - $200"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => priceFilter(e, 4)}
                        min="200"
                        max="300"
                        id="$200 - $300"
                        label="$200 - $300"
                      />
                    </Form.Group>

                    {/* <Form.Group className="mb-2">
                          <Form.Check
                            type="checkbox"
                            checked={retailPrice}
                            onChange={() => setRetailPrice(!retailPrice)}
                            id="Before Retail"
                            label="Before Retail"
                          />
                        </Form.Group> */}

                    <Form.Group className="mb-2">
                      <Row>
                        <Col md={1}>
                          <Form.Check
                            type="checkbox"
                            id="custom"
                            onChange={(e) =>
                              handleCustomPrice(e, 5, "checkBox")
                            }
                            min={customMinPrice}
                            max={customMaxPrice}
                          />
                        </Col>
                        {customPrice ? (
                          <>
                            <Col md={5}>
                              <Form.Control
                                placeholder="$"
                                type="number"
                                disabled
                              />
                            </Col>
                            <Col md={5}>
                              <Form.Control
                                placeholder="$"
                                type="number"
                                disabled
                              />
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col md={5}>
                              <Form.Control
                                placeholder="0"
                                type="number"
                                id="Min"
                                onChange={(e) => handleCustomPrice(e, 5, "Min")}
                              />
                            </Col>
                            <Col md={5}>
                              <Form.Control
                                type="number"
                                id="Max"
                                onChange={(e) => handleCustomPrice(e, 5, "Max")}
                              />
                            </Col>
                          </>
                        )}
                      </Row>
                    </Form.Group>
                  </>
                  {FilterList?.pricee?.length > 5 ? (
                    <Button className="bg-none border-0 p-0 text-dark">
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
            {/* End Showing Filter */}
          </Col>
          <Col lg={9}>
            <div className="d-sm-flex justify-content-between text-center">
              <div>
                <Breadcrumb className="mt-3 mt-sm-0">
                  <Breadcrumb.Item
                    className="fs-5"
                    onClick={(e) => navigate(`/`)}
                  >
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="fs-5">
                    {category ? category[0]?.category?.name : null}
                  </Breadcrumb.Item>
                  {/* <Breadcrumb.Item className="fs-5" active>Data</Breadcrumb.Item> */}
                </Breadcrumb>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    className="rounded-0 bg-white border text-dark px-5 py-2 fw-bold mb-3 mb-sm-0"
                    id="dropdown-basic"
                  >
                    Sort By: {sorting}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="rounded-0 w-100 mt-2"
                    onClick={(e) => handleSort(e)}
                  >
                    <Dropdown.Item value="Featured">Featured</Dropdown.Item>
                    <Dropdown.Item value="Low">Lowest Price</Dropdown.Item>
                    <Dropdown.Item value="High">Highest Price</Dropdown.Item>
                    <Dropdown.Item value="Popular">Most Popular</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* Start Clear All Filter */}
            <div className="text-center text-sm-start">
              <Button
                className="rounded-0 bg-white border text-dark px-5 py-2 fw-bold"
                onClick={() => clearAllFilters()}
              >
                Clear all filters
              </Button>
              {prams.name ? (
                <span className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block">
                  {prams.name}
                  <Button
                    className="bg-none border-0 py-0 text-dark"
                    onClick={handleSearchFilter}
                  >
                    X
                  </Button>
                </span>
              ) : null}

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
              {Price.map((val, i) => {
                let key = Price[i].min;
                return (
                  <>
                    {val ? (
                      <span
                        key={i}
                        className="bg-custom-light border px-3 py-2 text-center ms-2 fw-500 fs-6 d-inline-block"
                      >
                        ${Price[i]?.min} - ${Price[i]?.max}
                        <Button
                          className="bg-none border-0 py-0 text-dark"
                          onClick={() => priceFilterClose(i, val)}
                        >
                          X
                        </Button>
                      </span>
                    ) : null}
                  </>
                );
              })}
            </div>
            {/* end Clear All Filter */}
            {/* Start for Showing the Product */}
            {showConditionLoader ||
            showChipsetLoader ||
            showBrandLoader ||
            showSeriesLoader ||
            showModalLoader ||
            showPriceLoader ||
            count == 0 ? (
              <div className="loader-icon" style={{ marginBlock: "80px" }}>
                <i
                  class="fa-solid fa-spinner fa-spin-pulse"
                  style={{ marginBottom: "100%" }}
                ></i>
              </div>
            ) : (
              <div className="product-divide mt-3 mb-5">
                {category?.length > 0 ? (
                  category?.map((val, i) => {
                    return (
                      <div
                        key={i}
                        className="categeory_page product_homepage_card inner-pro-cont border px-3 pt-3 pb-0 position-relative"
                      >
                        <div onClick={() => navigate(`/product/${val._id}`)}>
                          {val.chipset == "Nvidia" ? (
                            <p
                              className="up-text position-absolute fw-bold"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {val?.chipset}
                            </p>
                          ) : val.chipset == "AMD" ? (
                            <p
                              className="chipset-text position-absolute fw-bold"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {val?.chipset}
                            </p>
                          ) : val.chipset == "AYU" ? (
                            <p
                              className="up-down-text position-absolute fw-bold"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {val?.chipset}
                            </p>
                          ) : (
                            <p
                              className="chipset-text position-absolute fw-bold"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {val?.chipset}
                            </p>
                          )}
                          <div
                            className="text-center image_parent"
                            onClick={() => navigate(`/product/${val._id}`)}
                          >
                            <LazyLoadImage
                              src={`${imageUrl}${val?.image[0]}`}
                              effect="blur"
                              onClick={() => navigate(`/product/${val._id}`)}
                            />{" "}
                          </div>
                        </div>
                        <div className="combine_details">
                          <div
                            className="d-flex align-items-center justify-content-between w-full mb-0"
                            onClick={() => navigate(`/product/${val._id}`)}
                          >
                            <p>{val?.brand}</p>
                            <div className="w-25 text-end"></div>
                          </div>
                          <div onClick={() => navigate(`/product/${val?._id}`)}>
                            <p
                              className="mb-0"
                              onClick={() => navigate(`/product/${val?._id}`)}
                            >
                              {val?.series}
                            </p>
                            <p
                              className="mb-0"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {val?.model}
                            </p>

                            <div
                              className="bl-text"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              <p
                                className="mb-0"
                                onClick={() => navigate(`/product/${val._id}`)}
                              >
                                Condition:{" "}
                                {val?.type == 1
                                  ? "New-Retail"
                                  : val?.type == 2
                                  ? " New-2nd Hand"
                                  : "Used"}
                              </p>
                              <p
                                className="mb-0"
                                onClick={() => navigate(`/product/${val._id}`)}
                              >
                                {val.condition}{" "}
                              </p>
                            </div>
                            <h2
                              className="text-center fw-bold mt-3"
                              onClick={() => navigate(`/product/${val._id}`)}
                            >
                              {"$" + val?.new_retail_website_price}
                              {/* {val?.type == 1
                                  ? "$" + val?.new_retail_website_price
                                  : val?.type == 2
                                  ? val.new_second_hand_house_ask
                                    ? "$" + val?.new_second_hand_house_ask
                                    : ""
                                  : val.used_house_ask
                                  ? "$" + val?.used_house_ask
                                  : ""} */}
                            </h2>
                          </div>
                          <div className="compar_mar text-end">
                            <label className="form-check-label">Compare</label>
                            <input
                              type="checkbox"
                              checked={val.isCompare}
                              className="form-check-input ms-2"
                              onChange={(e) => {
                                handleCompare(e.target.checked, val, i);
                              }}
                            />
                          </div>
                        </div>
                        <Heart
                          className="hear-icon"
                          isActive={val?.isfav}
                          onClick={() =>
                            handleFevButton(!val.isfav, val._id, i)
                          }
                          animationScale={1.25}
                          style={{ width: "25px" }}
                        />
                      </div>
                    );
                  })
                ) : (
                  <h4
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      alignItems: "center",
                    }}
                  >
                    No Product Found
                  </h4>
                )}
              </div>
            )}
            {/* End Showing the Proudct */}
          </Col>
        </Row>
        {/* Start Login Modal */}
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
        {/* end Login Modal */}
      </Container>
      {/* } */}

      {/* Open Compare Modal  */}
      <Modal
        show={modalShow}
        className="compare-modal custom-model"
        aria-labelledby="contained-modal-title-vcenter"
        data-backdrop="false"
        centered
      >
        <div className="d-flex flex-coloumn">
          <Modal.Body>
            <div className="model-custom-inner">
              {Compare.map((Compare, i) => {
                return (
                  <div
                    className="inner-pro-cont border p-3 position-relative"
                    id="modal-inner-cont"
                    key={i}
                  >
                    <button
                      className="close-box"
                      onClick={() => handleCloseButton(Compare._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                    <div className="d-flex gap-2">
                      <div>
                        {Compare?.chipset == "Nvidia" ? (
                          <p className="up-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : Compare?.chipset == "AMD" ? (
                          <p className="chipset-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : Compare?.chipset == "AYU" ? (
                          <p className="up-down-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        ) : (
                          <p className="chipset-text position-absolute fw-bold toptext">
                            {Compare?.chipset}
                          </p>
                        )}
                        <LazyLoadImage
                          src={`${imageUrl}${Compare?.image[0]}`}
                          effect="blur"
                        />
                      </div>
                      <div className="custom-model-body text-start">
                        <p className=" w-full mb-0">
                          {Compare?.brand}
                          <div className="w-25 text-end"></div>
                        </p>
                        <p className="mb-0">{Compare?.model}</p>
                        <p className="mb-0">{Compare?.category?.name}</p>
                        <div className="bl-text">
                          <p className="mb-0">
                            Condition:
                            {Compare?.type == 1
                              ? "New-Retail"
                              : Compare?.type == 2
                              ? "New-2nd Hand"
                              : "Used"}
                          </p>
                          <p className="mb-0">{Compare?.condition} </p>
                        </div>
                        <h2 className=" fw-bold">
                          {Compare?.type == 1
                            ? "$" + Compare?.new_retail_website_price
                            : Compare?.type == 2
                            ? Compare.new_second_hand_house_ask
                              ? "$" + Compare?.new_second_hand_house_ask
                              : ""
                            : Compare.used_house_ask
                            ? "$" + Compare?.used_house_ask
                            : ""}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center mt-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#b8b8b8"
                className="bi bi-dash-circle position-absolute end-0 top-0 me-5 mt-3"
                viewBox="0 0 16 16"
                onClick={() => setModalShow(false)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </div>

            <Button
              varient="primary"
              className="px-4"
              onClick={() => navigate("/compareBuySell")}
            >
              Compare
            </Button>
            <Button
              className="px-4 bg-transparent text-blue border-0"
              onClick={() => {
                HandleCompareClear();
              }}
            >
              Clear All
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      {/* End Compare Modal */}

      {/* Start Compare Button */}
      {Compare[0]?._id && (
        <div className="main_compare_box compare_product_menu">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="compare_product_button">
                  <Button
                    varient="primary"
                    className="px-4"
                    onClick={() => setModalShow(true)}
                  >
                    Compare
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {/* end Compare Button */}

      <Footer />
    </div>
  );
}
