import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Form,
  Dropdown,
  Table,
  Modal,
  FormLabel,
  FormSelect,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ExportApi from "../api/ExportApi";
import { BiPlusCircle } from "react-icons/bi";
import { BiMinusCircle } from "react-icons/bi";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast, ToastContainer } from "react-toastify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutsideClickHandler from "react-outside-click-handler";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UserAskBidList from "./UserAskBidList";
import BuySpread from "./BuySpread";
import SellSpread from "./SellSpread";

let date;
export default function GraphicTab() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  let imageUrl = "https://api.skewws.com/resources/";
  let nevigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [inventoryData, setInventoryData] = useState(0);
  const [askResult, setAskResult] = useState([]);
  const [bidResult, setBidResult] = useState([]);
  const [cogsPrice, setCOGSPrice] = useState(0);
  const [currentImage, setCurrentImage] = useState([]);
  const [removeMultiple, setRemoveMultiple] = useState([]);
  const [marketPrice, setMarketPrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [secondHandMarketPrice, setSecondHandMarketPrice] = useState("");
  const [secondHandHouseBid, setSecondHandHouseBid] = useState("");
  const [secondHandHouseAsk, setSecondHandHouseAsk] = useState("");
  const [usedMarketPrice, setUsedMarketPrice] = useState("");
  const [usedHouseBid, setUsedHouseBid] = useState("");
  const [productType, setProductType] = useState([]);
  const [productType1, setProductType1] = useState([]);
  const [productType2, setProductType2] = useState([]);
  const [productType3, setProductType3] = useState([]);
  const [usedHouseAsk, setUsedHouseAsk] = useState("");
  const [websitePrice, setWebsitePrice] = useState("");
  const [productData, setProductData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [editId, setEditId] = useState();
  const [Data, setData] = useState();
  const [image, setImage] = useState();
  const [Data1, setData1] = useState();
  const [descriptionindex, setdescriptionindex] = useState();
  const [ask, setAsk] = useState();
  const [Bid, setBid] = useState();
  const [AskBid, setAskBid] = useState();
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [value, setvalue] = useState("");
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [Chipsetvalue, setChipsetvalue] = useState(false);
  const [Brand1Value, setBrand1Value] = useState(false);
  const [category, setCategory] = useState();
  const [chipset2, setChipset2] = useState();
  const [brand2, setBrand2] = useState();
  const [series2, setSeries2] = useState();
  const [model2, setModel2] = useState();
  const [seoTitle, setSeoTitle] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [sku, setSku] = useState();
  const [chipset, setchipset] = useState([]);
  const [condition, setcondition] = useState([]);
  const [brand, setbrand] = useState([]);
  const [series, setseries] = useState([]);
  const [model, setmodel] = useState([]);
  const [conditionKey, setconditionKey] = useState([]);
  const [chipsetKey, setchipsetKey] = useState([]);
  const [brandKey, setbrandKey] = useState([]);
  const [seriesKey, setseriesKey] = useState([]);
  const [modalKey, setmodalKey] = useState([]);
  const [res, setres] = useState();
  const [productTypeStatus, setProductTypeStatus] = useState([]);
  const [FilterList, setFilterList] = useState();
  const [selectData, setSelectData] = useState();
  const [deleteData, setDeleteData] = useState([]);
  const [marketPriceDate, setMarketPriceDate] = useState();
  const [secondMarketPriceDate, setSecondMarketPriceDate] = useState();
  const [usedMarketDate, setUsedMarketDate] = useState();
  const [brandShow, setBrandShow] = useState(false);
  const [chipsetShow, setChipsetShow] = useState(false);
  const [seriesShow, setSeriesShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [condition1, setcondition1] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [secondHandHouseAskStatus, setSecondHandHouseAskStatus] =
    useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [inActiveStatus, setInActiveStatus] = useState(false);
  const [secondHandHouseBidStatus, setSecondHandHouseBidStatus] =
    useState(false);
  // Render state
  const [render, setRender] = useState(1);
  // Ck Editor state
  const [editorContent, setEditorContent] = useState("");
  // Category Select State
  const [selectedValue, setSelectedValue] = useState(
    "63ff36fb23ad0386e761641f"
  );
  const items = [
    {
      name: "RTX 4090TI",
    },
    {
      name: "RTX 4090",
    },
    {
      name: "RTX 4080",
    },
    {
      name: "RTX 4070TI",
    },
    {
      name: "RTX 3070TI",
    },
    {
      name: "RTX 3070",
    },
    {
      name: "RTX 3060TI",
    },
    {
      name: "RTX 3060",
    },
    {
      name: "RTX 3050",
    },
    {
      name: "RTX 2080TI",
    },
    {
      name: "RTX 2080",
    },
    {
      name: "RTX 2070 SUPER",
    },
    {
      name: "RTX 2070",
    },
    {
      name: "RTX 2060 SUPER",
    },
    {
      name: "RTX 2060",
    },
    {
      name: "GTX 1080TI",
    },
    {
      name: "GTX 1080",
    },
    {
      name: "GTX 1070TI",
    },
    {
      name: "GTX 1070",
    },
    {
      name: "RX 7900XTX",
    },
    {
      name: "RX 7900XT",
    },
    {
      name: "RX 6950XT",
    },
    {
      name: "RX 6900XT",
    },
    {
      name: "RX 6800XT",
    },
    {
      name: "RX 6800",
    },
    {
      name: "RX 6750XT",
    },
    {
      name: "RX 6700XT",
    },
    {
      name: "RX 6650XT",
    },
    {
      name: "RX 6600XT",
    },
    {
      name: "RX 6600",
    },
    {
      name: "RX 6500XT",
    },
    {
      name: "RX 6400",
    },
    {
      name: "RX 5700XT",
    },
    {
      name: "RX 5600XT",
    },
    {
      name: "RX 5500XT",
    },
    {
      name: "RX VEGA 64",
    },
    {
      name: "RX VEGA 56",
    },
  ];
  const [inputList, setInputList] = useState([""]);
  const [item1, setitem1] = useState([
    {
      name: "RTX 4090TI",
    },
    {
      name: "RTX 4090",
    },
    {
      name: "RTX 4080",
    },
    {
      name: "RTX 4070TI",
    },
    {
      name: "RTX 3070TI",
    },
    {
      name: "RTX 3070",
    },
    {
      name: "RTX 3060TI",
    },
    {
      name: "RTX 3060",
    },
    {
      name: "RTX 3050",
    },
    {
      name: "RTX 2080TI",
    },
    {
      name: "RTX 2080",
    },
    {
      name: "RTX 2070 SUPER",
    },
    {
      name: "RTX 2070",
    },
    {
      name: "RTX 2060 SUPER",
    },
    {
      name: "RTX 2060",
    },
    {
      name: "GTX 1080TI",
    },
    {
      name: "GTX 1080",
    },
    {
      name: "GTX 1070TI",
    },
    {
      name: "GTX 1070",
    },
    {
      name: "RX 7900XTX",
    },
    {
      name: "RX 7900XT",
    },
    {
      name: "RX 6950XT",
    },
    {
      name: "RX 6900XT",
    },
    {
      name: "RX 6800XT",
    },
    {
      name: "RX 6800",
    },
    {
      name: "RX 6750XT",
    },
    {
      name: "RX 6700XT",
    },
    {
      name: "RX 6650XT",
    },
    {
      name: "RX 6600XT",
    },
    {
      name: "RX 6600",
    },
    {
      name: "RX 6500XT",
    },
    {
      name: "RX 6400",
    },
    {
      name: "RX 5700XT",
    },
    {
      name: "RX 5600XT",
    },
    {
      name: "RX 5500XT",
    },
    {
      name: "RX VEGA 64",
    },
    {
      name: "RX VEGA 56",
    },
  ]);
  const [Brand, setBrand] = useState([
    { name: "MSI" },
    { name: "Zotac" },
    { name: "PNY" },
    { name: "EVGA" },
    { name: "GIGABYTE" },
    { name: "ASUS" },
    { name: "Nvidia" },
    { name: "XFX" },
    { name: "AMD" },
  ]);
  const [Brand1, setBrand1] = useState([
    { name: "MSI" },
    { name: "Zotac" },
    { name: "PNY" },
    { name: "EVGA" },
    { name: "GIGABYTE" },
    { name: "ASUS" },
    { name: "Nvidia" },
    { name: "XFX" },
    { name: "AMD" },
  ]);
  const [Chipset, setChipset] = useState([
    { name: " AMD" },
    { name: "Nvidia " },
  ]);
  const [Chipset1, setChipset1] = useState([
    { name: " AMD" },
    { name: "Nvidia" },
  ]);

  // Start React Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setTimeout(() => {
      setMultipleFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  // End React DropZone

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    var list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  const handleRemoveClick = (index) => {
    var list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleOnSelectChipset = (item) => {
    productData.chipset = item;
    setProductData({ ...productData });
    setChipsetvalue(false);
  };

  const handleOnSelecBrand = (item) => {
    productData.brand = item;
    setProductData({ ...productData });
    setBrand1Value(false);
  };

  const handleItemss = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCheckClickOne = (e) => {
    if (e.target.checked) {
      productTypeStatus[0] = true;
      setProductTypeStatus(productTypeStatus);
    } else {
      productTypeStatus[0] = false;
      setProductTypeStatus(productTypeStatus);
    }
  };
  const handleCheckClickTwo = (e) => {
    if (e.target.checked) {
      productTypeStatus[1] = true;
      setProductTypeStatus(productTypeStatus);
    } else {
      productTypeStatus[1] = false;
      setProductTypeStatus(productTypeStatus);
    }
  };
  const handleCheckClickThree = (e) => {
    if (e.target.checked) {
      productTypeStatus[2] = true;
      setProductTypeStatus(productTypeStatus);
    } else {
      productTypeStatus[2] = false;
      setProductTypeStatus(productTypeStatus);
    }
  };

  const handleCheckClickone1 = (e) => {
    if (e.target.checked) {
      productType[0] = 1;
    } else {
      productType[0] = null;
    }
    setProductType(productType);
    setMarketPrice(productData.new_retail_market_price);
    setRetailPrice(productData.new_retail_price);
    setWebsitePrice(productData.new_retail_website_price);
    setRender(render + 1);
  };

  const handleCheckClickTwo2 = (e) => {
    if (e.target.checked) {
      productType[1] = 2;
    } else {
      productType[1] = null;
    }
    setProductType(productType);
    setSecondHandMarketPrice(productData.new_second_hand_market_price);
    setSecondHandHouseBid(productData.new_second_hand_house_bid);
    setSecondHandHouseAsk(productData.new_second_hand_house_ask);
    setRender(render + 1);
  };

  const handleCheckClickThree3 = (e) => {
    if (e.target.checked) {
      productType[2] = 3;
    } else {
      productType[2] = null;
    }
    setProductType(productType);
    setUsedMarketPrice(productData.used_market_price);
    setUsedHouseBid(productData.used_house_bid);
    setUsedHouseAsk(productData.used_house_ask);
    setRender(render + 1);
  };

  const handleGetEventlistChange = () => {
    ExportApi.GetAllProductUserid(JSON.parse(localStorage.getItem("admin")).id)
      .then((resp) => {
        let data = resp.data.details;
        let result = data.map((item) => {
          return { ...item, isSelected: false };
        });
        setData([...result]);
        setLoading(false);
        setData1(resp.data.details);
      })
      .catch((err) => console.log(err));
    // window.dispatchEvent(new Event("Loginout"));
  };

  // window.addEventListener("Loginout", () => {
  //   localStorage.clear();
  //   navigate("/");
  // });
  const hendleask = (id) => {
    ExportApi.getask(id)
      .then((resp) => {
        if (resp.data.data) {
          setAsk(resp.data.data);
          setCount1(1);
        } else {
          setAsk();
          setCount1(2);
        }
      })
      .catch((err) => console.log(err));
  };
  const hendlebid = (id) => {
    ExportApi.getBid(id)
      .then((resp) => {
        if (resp?.data?.data?.length > 0) {
          setBid(resp.data.data);
          setCount(1);
        } else {
          setBid();
          setCount(2);
        }
      })
      .catch((err) => console.log(err));
  };

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
        setLoading(false);
        setFilterList(resp?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetEventlistChange();
    GetData1();
  }, []);

  const ASKBID = (id, i) => {
    hendleask(id);
    hendlebid(id);
    setAskBid(i);
  };

  const handleSrech = (e) => {
    if (e == "") {
      setData([...Data1]);
    } else {
      let Filterdata = Data1.filter(
        (val) =>
          val.brand.toLowerCase().includes(e.toLowerCase()) ||
          val.chipset.toLowerCase().includes(e.toLowerCase()) ||
          val.model.toLowerCase().includes(e.toLowerCase()) ||
          val.series.toLowerCase().includes(e.toLowerCase())
      );
      setData([...Filterdata]);
    }
  };

  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = Data.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

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

  //for pre populate the data in the update form
  const handleUpdate = (data) => {
    console.log(data);
    ExportApi.updateMultiProductData(data?.sku)
      .then((resp) => {
        let data = resp.data.details;
        let result = data.filter((item) => item.type == 1);
        setProductType1([...result]);
        let result2 = data.filter((item) => item.type == 2);
        setTimeout(() => {
          setProductType2([...result2]);
        });
        let result3 = data.filter((item) => item.type == 3);
        setTimeout(() => {
          setProductType3([...result3]);
        });
        setProductTypeStatus([
          result?.length == 0 ? null : result[0].status == true,
          result2?.length == 0 ? null : result2[0].status == true,
          result3?.length == 0 ? null : result3[0].status == true,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
    setModalShow(true);
    setMultipleFiles([]);
    setEditorContent(data?.description);
    setEditId(data?._id);
    setProductData(data);
    setMarketPriceDate(data?.market_price_new_update_date);
    setCategory(data?.category);
    setChipset2(data.chipset);
    setBrand2(data.brand);
    setSeries2(data.series);
    setModel2(data.model);
    setCurrentImage(data?.image);
    setSeoTitle(data?.seoTitle);
    setMetaDescription(data?.metaDescription);
    setSku(data?.sku);
    setMarketPrice(data.new_retail_market_price);
    setSecondMarketPriceDate(data.market_price_second_update_date);
    setUsedMarketDate(data.market_price_used_update_date);
    setRetailPrice(data.new_retail_price);
    setWebsitePrice(data.new_retail_website_price);
    setSecondHandMarketPrice(data.new_second_hand_market_price);
    setSecondHandHouseBid(data.new_second_hand_house_bid);
    setSecondHandHouseAsk(data.new_second_hand_house_ask);
    setUsedMarketPrice(data.used_market_price);
    setUsedHouseBid(data.used_house_bid);
    setUsedHouseAsk(data.used_house_ask);
    setImage(data?.image);
    setInventoryData(data?.inventory);
    setCOGSPrice(data?.cogs);
    setInputList(data?.videos);
  };

  // update Product
  const handleSubmit = () => {
    if (chipset2 == "" || chipset2 == undefined) {
      toast.error("Chipset field required");
    } else if (brand2 == "" || brand2 == undefined) {
      toast.error("Brand field required");
    } else if (series2 == "" || series2 == undefined) {
      toast.error("Series field required");
    } else if (model2 == "" || model2 == undefined) {
      toast.error("Model field required");
    } else if (sku == "" || sku == undefined) {
      toast.error("Sku field required");
    } else {
      let error = false;
      if (productType.includes(1)) {
        if (websitePrice == "" || websitePrice == null) {
          toast.error("Website Price Field Required");
        }
      }
      if (!error) {
        setLoading(true);
        setRender(render + 1);
        let formData = new FormData();
        if (
          productType1.length == 0 ||
          productType2.length == 0 ||
          productType3.length == 0
        ) {
          formData.append("category", selectedValue);
          formData.append("chipset", chipset2);
          formData.append("brand", brand2);
          formData.append("current_image", currentImage);
          formData.append("series", series2);
          formData.append("model", model2);
          formData.append("sku", sku);
          formData.append("seoTitle", seoTitle),
            formData.append("metaDescription", metaDescription);
          if (marketPrice != null) {
            formData.append("new_retail_market_price", marketPrice);
          }
          if (retailPrice != null) {
            formData.append("new_retail_price", retailPrice);
          }
          formData.append("new_retail_website_price", websitePrice);
          if (secondHandMarketPrice != null) {
            formData.append(
              "new_second_hand_market_price",
              secondHandMarketPrice
            );
          }
          if (secondHandHouseBid != null) {
            formData.append("new_second_hand_house_bid", secondHandHouseBid);
          }
          if (secondHandHouseAsk != null) {
            formData.append("new_second_hand_house_ask", secondHandHouseAsk);
          }
          if (usedMarketPrice != null) {
            formData.append("used_market_price", usedMarketPrice);
          }
          if (usedHouseBid != null) {
            formData.append("used_house_bid", usedHouseBid);
          }
          if (usedHouseAsk != null) {
            formData.append("used_house_ask", usedHouseAsk);
          }
          formData.append("description", editorContent);
          for (let i = 0; i < multipleFiles.length; i++) {
            formData.append("image", multipleFiles[i]);
          }
          formData.append("type", productType);
          formData.append("remove_image", removeMultiple);
          if (marketPriceDate != undefined) {
            formData.append("market_price_update_date", marketPriceDate);
          }
          formData.append("product_type_status", productTypeStatus);
          formData.append("productname", brand2 + " " + series2 + " " + model2);
        } else {
          formData.append("category", selectedValue),
            formData.append("chipset", chipset2),
            formData.append("brand", brand2),
            formData.append("current_image", currentImage),
            formData.append("series", series2),
            formData.append("model", model2),
            formData.append("sku", sku),
            formData.append("seoTitle", seoTitle),
            formData.append("metaDescription", metaDescription);
          if (marketPrice != null) {
            formData.append("new_retail_market_price", marketPrice);
          }
          if (retailPrice != null) {
            formData.append("new_retail_price", retailPrice);
          }
          formData.append("new_retail_website_price", websitePrice);
          if (secondHandMarketPrice != null) {
            formData.append(
              "new_second_hand_market_price",
              secondHandMarketPrice
            );
          }
          if (secondHandHouseBid != null) {
            formData.append("new_second_hand_house_bid", secondHandHouseBid);
          }
          if (secondHandHouseAsk != null) {
            formData.append("new_second_hand_house_ask", secondHandHouseAsk);
          }
          if (usedMarketPrice != null) {
            formData.append("used_market_price", usedMarketPrice);
          }
          if (usedHouseBid != null) {
            formData.append("used_house_bid", usedHouseBid);
          }
          if (usedHouseAsk != null) {
            formData.append("used_house_ask", usedHouseAsk);
          }
          formData.append("description", editorContent);
          for (let i = 0; i < multipleFiles.length; i++) {
            formData.append("image", multipleFiles[i]);
          }
          formData.append("remove_image", removeMultiple);
          if (marketPriceDate != undefined) {
            formData.append("market_price_update_date", marketPriceDate);
          }
          formData.append("product_type_status", productTypeStatus),
            // formData.append("videos", inputList),
            formData.append(
              "productname",
              brand2 + " " + series2 + " " + model2
            );
        }
        setRender(render + 1);
        setTimeout(() => {
          ExportApi.Updateproduct(editId, formData)
            .then((resp) => {
              if (resp.data.Message == "updated") {
                toast.success("Update Product Successfully");
                setLoading(false);
                setModalShow(false);
                window.location.reload();
              } else {
                toast.error("Error");
                setLoading(false);
                setModalShow(false);
              }
            })
            .catch((err) => console.log(err));
        }, 2000);
      }
    }
  };

  // select All CheckBox Functionlaity
  const handleSelectAll = (e) => {
    let result = e.target.checked;
    if (result) {
      let data = Data.map((item, i) => {
        return { ...item, isSelected: true };
      });
      setData([...data]);
    } else {
      let data = Data.map((item) => {
        return { ...item, isSelected: false };
      });

      setData([...data]);
    }
  };

  const handleCheck = (data, id) => {
    let data2 = deleteData;
    let index = data2.indexOf(id);
    if (index === -1) {
      deleteData.push(id);
      setDeleteData([...deleteData]);
    } else {
      deleteData.splice(index, 1);
      setDeleteData([...deleteData]);
    }
    let product_id = id;
    let result = Data.filter((item) => item?._id == product_id);
    if (data) {
      for (let i = 0; i < Data.length; i++) {
        const element1 = Data[i];
        if (element1?._id.includes(product_id)) {
          Data[i].isSelected = true;
        }
      }
    } else {
      for (let i = 0; i < Data.length; i++) {
        const element1 = Data[i];
        if (element1?._id.includes(product_id)) {
          Data[i].isSelected = false;
        }
      }
    }
    setSelectData(result[0]?._id);
    setData([...Data]);
  };

  //for the inventory
  const handleInventory = () => {
    let result = Data?.filter(
      (item) => item.type == 1 && item._id == selectData
    );
    if (result.length > 0) {
      if (selectData) {
        nevigate("/addInventory/" + selectData);
      } else {
        toast.error("Please Select Product First");
      }
    } else {
      toast.error("Please Select the New Product Only");
    }
  };

  // filter House Ask
  const handleFilterHouseAsk = (data) => {
    let result = Data.filter(
      (item) => item.used_house_ask != data.used_house_ask && item.type > 1
    );
    setAskResult(result);
    setSecondHandHouseAskStatus(!secondHandHouseAskStatus);
    setSecondHandHouseBidStatus(false);
  };
  // filter House Bid
  const handleFilterHouseBid = (data) => {
    let result = Data.filter(
      (item) => item.used_house_bid != data.used_house_bid && item.type > 1
    );
    console.log("Product Data", result);
    setBidResult(result);
    setSecondHandHouseBidStatus(!secondHandHouseBidStatus);
    setSecondHandHouseAskStatus(false);
  };

  //delete house Ask and Bid
  const deleteHouseAskBid = () => {
    setSecondHandHouseAsk(0);
    setSecondHandHouseBid(0);
    ExportApi.Deleteproduct(selectData, secondHandHouseAsk, secondHandHouseBid)
      .then((resp) => {
        if (resp.data.Message == "updated") {
          toast.success("House Asks/Bids Deleted Successfully");
        } else {
          toast.error(resp.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  //Active and InActive Products
  const handleActiveProducts = (data) => {
    setActiveStatus(!activeStatus);
    let result = data.filter((item) => item.status == true);
    setActiveData(result);
    setInActiveStatus(false);
  };

  //for the inActive Prducts
  const handleInActiveProducts = (data) => {
    setInActiveStatus(!inActiveStatus);
    let result = data.filter((item) => item.status == false);
    setInactiveData(result);
    setActiveStatus(false);
  };

  //for open the filter Modal
  const handleFilterModel = () => {
    setShowFilterModel(true);
  };

  //Filter Api
  const SearchFilterCheck = () => {
    ExportApi.GetAllProductFilter(condition, chipset, brand, series, model)
      .then((resp) => {
        setData(resp.data.Data);
      })
      .catch((err) => console.log(err));
  };

  //Chipset Filter
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

  //modal Filter
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

  //series Filter
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
      // brandKey[i][name] = checked;
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

  //for Show more Chipset
  const handlechipsetshowmore = (data) => {
    if (data == "More") {
      setChipsetShow(true);
    } else {
      setChipsetShow(false);
    }
  };

  //for show more Brand
  const handlebrandshowmore = (data) => {
    if (data == "More") {
      setBrandShow(true);
    } else {
      setBrandShow(false);
    }
  };

  // for show more Series
  const handleSeriesshowmore = (data) => {
    if (data == "More") {
      setSeriesShow(true);
    } else {
      setSeriesShow(false);
    }
  };

  //for show more Model
  const handlemodelshowmore = (data) => {
    if (data == "More") {
      setModelShow(true);
    } else {
      setModelShow(false);
    }
  };

  //handle Market Price and date
  const handleMarketPrice = (e) => {
    if (e.target.value) {
      date = new Date();
      setMarketPriceDate(moment(date).format("l"));
      setMarketPrice(e.target.value);
      handleItemss(e);
    }
  };
  //handle Market Price and date
  const handleSecondHandMarketPrice = (e) => {
    if (e.target.value) {
      date = new Date();
      setSecondMarketPriceDate(moment(date).format("l"));
      setSecondHandMarketPrice(e.target.value);
      handleItemss(e);
    }
  };
  //handle Market Price and date
  const handleUsedMarketPrice = (e) => {
    if (e.target.value) {
      date = new Date();
      setUsedMarketDate(moment(date).format("l"));
      setUsedMarketPrice(e.target.value);
      handleItemss(e);
    }
  };

  //for the Frag And Drop Functionality
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...currentImage];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCurrentImage(copyListItems);
  };

  const dragNewStart = (e, position) => {
    dragItem.current = position;
  };

  const dragNewEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const dropNew = (e) => {
    const copyListItems = [...multipleFiles];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMultipleFiles(copyListItems);
  };
  //end for the drag and drop functionality

  //delete Multi Image from the Preview
  const handledeletesingleimage = (name) => {
    if (multipleFiles?.length > 0) {
      let result = multipleFiles.filter((item) => item.path !== name);
      setMultipleFiles(result);
    } else {
      let result = currentImage.filter((file) => file !== name);
      setCurrentImage(result);
    }
    let index = removeMultiple.indexOf(name);
    if (index === -1) {
      removeMultiple.push(name);
      setRemoveMultiple(removeMultiple);
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
    if (localStorage.getItem("tokenuser")) {
      GetData1(prams.id, JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      handleGetEventlistChange();
      GetData1(prams.id, JSON.parse(localStorage.getItem("admin")).id);
    } else {
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

  console.log(count, count1);

  return (
    <div>
      <ToastContainer />
      <Row className="py-2 mt-4">
        <Col lg={6}>
          <h5 className="mb-0 text-start fw-bold">Products</h5>
        </Col>
        <Col lg={6}>
          <div className="d-sm-flex gap-3 align-items-center justify-content-end">
            <Button
              className="bg-none border-0 text-dark fw-bold"
              onClick={() => nevigate("/Createproduct")}
            >
              Add Product
            </Button>
            <Button
              className="bg-none border-0 text-dark fw-bold"
              onClick={handleInventory}
            >
              Add Inventory
            </Button>
            <Dropdown>
              <Dropdown.Toggle
                className="border-0 bg-none text-dark fw-bold"
                id="dropdown-basic"
              >
                More action
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-2">
                <Dropdown.Item href="#">Manual Payout to Sellout</Dropdown.Item>
                <Dropdown.Item href="#">Flag Order</Dropdown.Item>
                <Dropdown.Item href="#">Send Payment Request</Dropdown.Item>
                <Dropdown.Item href="#">
                  Place Buyer with new seller
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12}>
          <div className="product-tool-list mb-3 bg-dark p-3 d-md-flex align-items-center justify-content-between rounded mt-3">
            <div className="d-flex align-items-center justify-content-between search-box">
              <h4 className="mb-0 text-white me-3 fw-bold text-nowrap">
                Product Tool
              </h4>
              <Form.Control
                type="search"
                placeholder="Search GPU"
                onChange={(e) => handleSrech(e.target.value)}
              />
            </div>
            <div className="view_ask_tab">
              {secondHandHouseAskStatus ? (
                <Button
                  className="bg-success text-white border-0 mb-2 mb-xl-0"
                  onClick={() => handleFilterHouseAsk(Data)}
                >
                  View House Asks
                </Button>
              ) : (
                <Button
                  className="bg-light text-black border-0 mb-2 mb-xl-0"
                  onClick={() => handleFilterHouseAsk(Data)}
                >
                  View House Asks
                </Button>
              )}
              {secondHandHouseBidStatus ? (
                <Button
                  className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleFilterHouseBid(Data)}
                >
                  View House Bids
                </Button>
              ) : (
                <Button
                  className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleFilterHouseBid(Data)}
                >
                  View House Bids
                </Button>
              )}
              <Button
                className="bg-light text-black border-0 mb-2 mb-xl-0"
                onClick={() => deleteHouseAskBid()}
              >
                Delete House Asks/Bids
              </Button>
              {activeStatus ? (
                <Button
                  className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleActiveProducts(Data)}
                >
                  Active
                </Button>
              ) : (
                <Button
                  className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleActiveProducts(Data)}
                >
                  Active
                </Button>
              )}

              {inActiveStatus ? (
                <Button
                  className="bg-success text-white border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleInActiveProducts(Data)}
                >
                  Inactive
                </Button>
              ) : (
                <Button
                  className="bg-light text-black border-0 mb-2 mb-xl-0 mx-2"
                  onClick={() => handleInActiveProducts(Data)}
                >
                  Inactive
                </Button>
              )}

              <Button
                className="bg-light text-black border-0 mb-2 mb-xl-0 px-5"
                onClick={handleFilterModel}
              >
                Filter
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={12} className="mt-3">
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
          <div>
            <div className="product_list_table mb-3">
              <Table bordered striped className="align-middle graphic-table">
                <thead>
                  <tr>
                    <th className="text-start">
                      <Form.Check
                        className="d-inline me-2"
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e)}
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
                    <th onClick={() => sortHere("inventory")}>
                      Inventory
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
                      Market Price
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
                      Buy Spread
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
                      Sell Spread
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
                      Spread
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
                    <th onClick={() => sortHere("new_second_hand_house_bid")}>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inActiveStatus ? (
                    inactiveData?.length > 0 ? (
                      inactiveData.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <span className="float-end">
                                {val?.type == 1
                                  ? "New"
                                  : val?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              <div className="product_description_view">
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                  <Form.Check
                                    className="d-inline"
                                    type="checkbox"
                                    checked={val?.isSelected}
                                    onChange={(e) =>
                                      handleCheck(e.target.checked, val?._id)
                                    }
                                  />{" "}
                                  <LazyLoadImage
                                    src={`${imageUrl}${val?.image[0]}`}
                                    style={{ width: "70px" }}
                                    onClick={() =>
                                      nevigate(`/product/${val._id}`)
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
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h5
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h5>
                                      </div>
                                    </div>
                                  ) : null}
                                </OutsideClickHandler>
                              </div>
                            </td>
                            <td>{val.chipset}</td>
                            <td>{val.brand}</td>
                            <td>{val.series}</td>
                            <td>{val.model}</td>
                            <td>{val.inventory}</td>
                            <td>
                              {val?.type == 1
                                ? val?.new_retail_market_price
                                  ? "$" + val?.new_retail_market_price
                                  : ""
                                : val?.type == 2
                                ? val.new_second_hand_house_ask
                                  ? val?.new_second_hand_market_price
                                    ? "$" + val?.new_second_hand_market_price
                                    : ""
                                  : ""
                                : val.used_house_ask
                                ? val?.used_market_price
                                  ? "$" + val?.used_market_price
                                  : ""
                                : ""}
                            </td>
                            {/* Buy Spread */}
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <BuySpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  buy={
                                    typeof val.highest_bid === "number"
                                      ? val.highest_bid
                                      : 0
                                  }
                                />
                              )}
                            </td>
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <SellSpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  sell={val.lowest_ask}
                                />
                              )}
                            </td>

                            <td>
                              {val?.type == 1
                                ? "Retail Only"
                                : Math.abs(
                                    val.highest_bid - val.lowest_ask
                                  ).toFixed(2)}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                " Retail Only"
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              )}
                            </td>

                            <td className="d-flex align-items-center py-5">
                              {val?.type == 1 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy2")
                                  }
                                >
                                  Buy Now - ${val?.new_retail_website_price}
                                </Button>
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
                                </Button>
                              )}
                              {AskBid == i ? (
                                <Button
                                  className="bg-none border-0 mt-2"
                                  disabled
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
                                                  {count == 0 ? (
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
                                                  ) : count == 1 ? (
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
                                                  {count1 == 0 ? (
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
                                                  ) : count1 == 1 ? (
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
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <UserAskBidList
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                />
                              )}
                            </td>
                            <td>
                              <Button
                                className="mx-2 border bg-none text-dark border-dark"
                                onClick={() => handleUpdate(val)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="d-flex justify-content-center">
                        <span>
                          <b>No Data Found</b>
                        </span>
                      </div>
                    )
                  ) : activeStatus ? (
                    activeData?.length > 0 ? (
                      activeData.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <span className="float-end">
                                {val?.type == 1
                                  ? "New"
                                  : val?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              <div className="product_description_view">
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                  <Form.Check
                                    className="d-inline"
                                    type="checkbox"
                                    checked={val?.isSelected}
                                    onChange={(e) =>
                                      handleCheck(e.target.checked, val?._id)
                                    }
                                  />{" "}
                                  <LazyLoadImage
                                    src={`${imageUrl}${val?.image[0]}`}
                                    style={{ width: "70px" }}
                                    onClick={() =>
                                      nevigate(`/product/${val._id}`)
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
                                  {/* <div className="custom_modal_outside_popup"> */}
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h5
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h5>
                                      </div>
                                    </div>
                                  ) : null}
                                  {/* </div> */}
                                </OutsideClickHandler>
                              </div>
                            </td>
                            <td>{val.chipset}</td>
                            <td>{val.brand}</td>
                            <td>{val.series}</td>
                            <td>{val.model}</td>
                            <td>{val.inventory}</td>
                            <td>
                              {val?.type == 1
                                ? val?.new_retail_market_price
                                  ? "$" + val?.new_retail_market_price
                                  : ""
                                : val?.type == 2
                                ? val.new_second_hand_house_ask
                                  ? val?.new_second_hand_market_price
                                    ? "$" + val?.new_second_hand_market_price
                                    : ""
                                  : ""
                                : val.used_house_ask
                                ? val?.used_market_price
                                  ? "$" + val?.used_market_price
                                  : ""
                                : ""}
                            </td>
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <BuySpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  buy={
                                    typeof val.highest_bid === "number"
                                      ? val.highest_bid
                                      : 0
                                  }
                                />
                              )}
                            </td>
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <SellSpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  sell={val.lowest_ask}
                                />
                              )}
                            </td>

                            <td>
                              {val?.type == 1
                                ? "Retail Only"
                                : Math.abs(
                                    val.highest_bid - val.lowest_ask
                                  ).toFixed(2)}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                " Retail Only"
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              )}
                            </td>

                            <td className="d-flex align-items-center py-5">
                              {val?.type == 1 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy2")
                                  }
                                >
                                  Buy Now - ${val?.new_retail_website_price}
                                </Button>
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
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
                                                  {count == 0 ? (
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
                                                  ) : count == 1 ? (
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
                                                  {count1 == 0 ? (
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
                                                  ) : count1 == 1 ? (
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
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <UserAskBidList
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                />
                              )}
                            </td>
                            <td>
                              <Button
                                className="mx-2 border bg-none text-dark border-dark"
                                onClick={() => handleUpdate(val)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <span>No Data Found</span>
                    )
                  ) : secondHandHouseAskStatus ? (
                    askResult?.length > 0 ? (
                      askResult.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <span className="float-end">
                                {val?.type == 1
                                  ? "New"
                                  : val?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              <div className="product_description_view">
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                  <Form.Check
                                    className="d-inline"
                                    type="checkbox"
                                    checked={val?.isSelected}
                                    onChange={(e) =>
                                      handleCheck(e.target.checked, val?._id)
                                    }
                                  />{" "}
                                  <LazyLoadImage
                                    src={`${imageUrl}${val?.image[0]}`}
                                    style={{ width: "70px" }}
                                    onClick={() =>
                                      nevigate(`/product/${val._id}`)
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
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h5
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h5>
                                      </div>
                                    </div>
                                  ) : null}
                                </OutsideClickHandler>
                              </div>
                            </td>
                            <td>{val.chipset}</td>
                            <td>{val.brand}</td>
                            <td>{val.series}</td>
                            <td>{val.model}</td>
                            <td>{val.inventory}</td>
                            <td>
                              {val?.type == 1
                                ? val?.new_retail_market_price
                                  ? "$" + val?.new_retail_market_price
                                  : ""
                                : val?.type == 2
                                ? val.new_second_hand_house_ask
                                  ? val?.new_second_hand_market_price
                                    ? "$" + val?.new_second_hand_market_price
                                    : ""
                                  : ""
                                : val.used_house_ask
                                ? val?.used_market_price
                                  ? "$" + val?.used_market_price
                                  : ""
                                : ""}
                            </td>
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <BuySpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  buy={
                                    typeof val.highest_bid === "number"
                                      ? val.highest_bid
                                      : 0
                                  }
                                />
                              )}
                            </td>
                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <SellSpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  sell={val.lowest_ask}
                                />
                              )}
                            </td>

                            <td>
                              {val?.type == 1
                                ? "Retail Only"
                                : Math.abs(
                                    val.highest_bid - val.lowest_ask
                                  ).toFixed(2)}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                " Retail Only"
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              )}
                            </td>

                            <td className="d-flex align-items-center py-5">
                              {val?.type == 1 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy2")
                                  }
                                >
                                  Buy Now - ${val?.new_retail_website_price}
                                </Button>
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
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
                                                  {count == 0 ? (
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
                                                  ) : count == 1 ? (
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
                                                  {count1 == 0 ? (
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
                                                  ) : count1 == 1 ? (
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
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <UserAskBidList
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  askListStatus={secondHandHouseAskStatus}
                                />
                              )}
                            </td>
                            <td>
                              <Button
                                className="mx-2 border bg-none text-dark border-dark"
                                onClick={() => handleUpdate(val)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <span>No Data Found</span>
                    )
                  ) : secondHandHouseBidStatus ? (
                    bidResult?.length > 0 ? (
                      bidResult.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <span className="float-end">
                                {val?.type == 1
                                  ? "New"
                                  : val?.type == 2
                                  ? "2nd Hand"
                                  : "Used"}
                              </span>
                              <div className="product_description_view">
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                  <Form.Check
                                    className="d-inline"
                                    type="checkbox"
                                    checked={val?.isSelected}
                                    onChange={(e) =>
                                      handleCheck(e.target.checked, val?._id)
                                    }
                                  />{" "}
                                  <LazyLoadImage
                                    src={`${imageUrl}${val?.image[0]}`}
                                    style={{ width: "70px" }}
                                    onClick={() =>
                                      nevigate(`/product/${val._id}`)
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
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h5
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h5>
                                      </div>
                                    </div>
                                  ) : null}
                                </OutsideClickHandler>
                              </div>
                            </td>
                            <td>{val.chipset}</td>
                            <td>{val.brand}</td>
                            <td>{val.series}</td>
                            <td>{val.model}</td>
                            <td>{val.inventory}</td>
                            <td>
                              {val?.type == 1
                                ? val?.new_retail_market_price
                                  ? "$" + val?.new_retail_market_price
                                  : ""
                                : val?.type == 2
                                ? val.new_second_hand_house_ask
                                  ? val?.new_second_hand_market_price
                                    ? "$" + val?.new_second_hand_market_price
                                    : ""
                                  : ""
                                : val.used_house_ask
                                ? val?.used_market_price
                                  ? "$" + val?.used_market_price
                                  : ""
                                : ""}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <BuySpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  buy={
                                    typeof val.highest_bid === "number"
                                      ? val.highest_bid
                                      : 0
                                  }
                                />
                              )}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <SellSpread
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  sell={val.lowest_ask}
                                />
                              )}
                            </td>

                            <td>
                              {val?.type == 1
                                ? "Retail Only"
                                : Math.abs(
                                    val.highest_bid - val.lowest_ask
                                  ).toFixed(2)}
                            </td>

                            <td>
                              {val?.type == 1 ? (
                                " Retail Only"
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell3")
                                  }
                                >
                                  Sell Now -{" "}
                                  {val?.highest_bid == 0
                                    ? "TBD"
                                    : "$" + val?.highest_bid}
                                </Button>
                              )}
                            </td>

                            <td className="d-flex align-items-center py-5">
                              {val?.type == 1 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy2")
                                  }
                                >
                                  Buy Now - ${val?.new_retail_website_price}
                                </Button>
                              ) : val?.type == 2 ? (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy4")
                                  }
                                >
                                  Buy Now -{" "}
                                  {val?.lowest_ask == 0
                                    ? "TBD"
                                    : "$" + val?.lowest_ask}
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
                                                  {count == 0 ? (
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
                                                  ) : count == 1 ? (
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
                                                  {count1 == 0 ? (
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
                                                  ) : count1 == 1 ? (
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
                              {val?.type == 1 ? (
                                "Retail Only"
                              ) : (
                                <UserAskBidList
                                  productId={val._id}
                                  userId={
                                    JSON.parse(localStorage.getItem("admin")).id
                                  }
                                  bidListStatus={secondHandHouseBidStatus}
                                />
                              )}
                            </td>
                            <td>
                              <Button
                                className="mx-2 border bg-none text-dark border-dark"
                                onClick={() => handleUpdate(val)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <span>No Data Found</span>
                    )
                  ) : Data?.length > 0 ? (
                    Data.map((val, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <span className="float-end">
                              {val?.type == 1
                                ? "New"
                                : val?.type == 2
                                ? "2nd Hand"
                                : "Used"}
                            </span>
                            <div className="product_description_view">
                              <div className="d-flex align-items-end justify-content-between mt-4">
                                <Form.Check
                                  className="d-inline"
                                  type="checkbox"
                                  checked={val?.isSelected}
                                  onChange={(e) =>
                                    handleCheck(e.target.checked, val?._id)
                                  }
                                />{" "}
                                <LazyLoadImage
                                  src={`${imageUrl}${val?.image[0]}`}
                                  style={{ width: "70px" }}
                                  onClick={() =>
                                    nevigate(`/product/${val._id}`)
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
                                <div className="custom">
                                  {descriptionindex == i ? (
                                    <div className="modal_custom_">
                                      <div className="inner_customModal_one">
                                        <h5
                                          dangerouslySetInnerHTML={{
                                            __html: val.description,
                                          }}
                                        ></h5>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </OutsideClickHandler>
                            </div>
                          </td>
                          <td>{val.chipset}</td>
                          <td>{val.brand}</td>
                          <td>{val.series}</td>
                          <td>{val.model}</td>
                          <td>{val.inventory}</td>
                          <td>
                            {val?.type == 1
                              ? val?.new_retail_market_price
                                ? "$" + val?.new_retail_market_price
                                : ""
                              : val?.type == 2
                              ? val.new_second_hand_house_ask
                                ? val?.new_second_hand_market_price
                                  ? "$" + val?.new_second_hand_market_price
                                  : ""
                                : ""
                              : val.used_house_ask
                              ? val?.used_market_price
                                ? "$" + val?.used_market_price
                                : ""
                              : ""}
                          </td>
                          {/* Buy Spread */}
                          <td>
                            {val?.type == 1 ? (
                              "Retail Only"
                            ) : (
                              <BuySpread
                                productId={val._id}
                                userId={
                                  JSON.parse(localStorage.getItem("admin")).id
                                }
                                buy={
                                  typeof val.highest_bid === "number"
                                    ? val.highest_bid
                                    : 0
                                }
                              />
                            )}
                          </td>
                          {/* Sell Spread */}
                          <td>
                            {val?.type == 1 ? (
                              "Retail Only"
                            ) : (
                              <SellSpread
                                productId={val._id}
                                userId={
                                  JSON.parse(localStorage.getItem("admin")).id
                                }
                                sell={val.lowest_ask}
                              />
                            )}
                          </td>
                          {/* Spread */}
                          <td>
                            {val?.type == 1
                              ? "Retail Only"
                              : Math.abs(
                                  val.highest_bid - val.lowest_ask
                                ).toFixed(2)}
                          </td>
                          {/* Highest Bid */}
                          <td>
                            {val?.type == 1 ? (
                              " Retail Only"
                            ) : val?.type == 2 ? (
                              val?.highest_bid > 0 ? (
                                <Button
                                  className="border bg-danger"
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now - {"$" + val?.highest_bid}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-danger"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/sell2")
                                  }
                                >
                                  Sell Now - {"TBD"}
                                </Button>
                              )
                            ) : val?.highest_bid > 0 ? (
                              <Button
                                className="border bg-danger"
                                onClick={() =>
                                  nevigate("/bidask/" + val?._id + "/sell3")
                                }
                              >
                                Sell Now - {"$" + val?.highest_bid}
                              </Button>
                            ) : (
                              <Button
                                className="border bg-danger"
                                disabled
                                onClick={() =>
                                  nevigate("/bidask/" + val?._id + "/sell3")
                                }
                              >
                                Sell Now - TBD
                              </Button>
                            )}
                          </td>
                          {/* Lowest Ask */}
                          <td className="d-flex align-items-center py-5">
                            {val?.type == 1 ? (
                              <Button
                                className="border bg-success"
                                onClick={() =>
                                  nevigate("/bidask/" + val?._id + "/buy2")
                                }
                              >
                                Buy Now - ${val?.new_retail_website_price}
                              </Button>
                            ) : val?.type == 2 ? (
                              val?.lowest_ask > 0 ? (
                                <Button
                                  className="border bg-success"
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now - {"$" + val?.lowest_ask}
                                </Button>
                              ) : (
                                <Button
                                  className="border bg-success"
                                  disabled
                                  onClick={() =>
                                    nevigate("/bidask/" + val?._id + "/buy3")
                                  }
                                >
                                  Buy Now - TBD
                                </Button>
                              )
                            ) : val?.lowest_ask > 0 ? (
                              <Button
                                className="border bg-success"
                                onClick={() =>
                                  nevigate("/bidask/" + val?._id + "/buy4")
                                }
                              >
                                Buy Now - {"$" + val?.lowest_ask}
                              </Button>
                            ) : (
                              <Button
                                className="border bg-success"
                                disabled
                                onClick={() =>
                                  nevigate("/bidask/" + val?._id + "/buy4")
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
                                                {count == 0 ? (
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
                                                ) : count == 1 ? (
                                                  <>
                                                    {Bid?.length > 0
                                                      ? Bid.map((val, i) => {
                                                          return (
                                                            <tr key={i}>
                                                              <td>
                                                                $
                                                                {val?.bidAmount}
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
                                                {count1 == 0 ? (
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
                                                ) : count1 == 1 ? (
                                                  <>
                                                    {ask?.length > 0
                                                      ? ask.map((val, i) => {
                                                          return (
                                                            <tr key={i}>
                                                              <td>
                                                                ${val.askAmount}
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
                            {val?.type == 1 ? (
                              "Retail Only"
                            ) : (
                              <UserAskBidList
                                productId={val._id}
                                userId={
                                  JSON.parse(localStorage.getItem("admin")).id
                                }
                              />
                            )}
                          </td>
                          <td>
                            <Button
                              className="mx-2 border bg-none text-dark border-dark"
                              onClick={() => handleUpdate(val)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <span>No Data Found</span>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/*Start Product Update Modal */}
      <Modal
        className="update_product"
        show={modalShow}
        onHide={() => setModalShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className="basicinformation">
                <h4 className="fw-bold">Basic Information</h4>
                <p className="text-muted fw-bold">
                  Section to config basic product information
                </p>
                <Form>
                  <FormLabel name="category" className="fw-bold fs-6">
                    Category
                  </FormLabel>
                  <FormSelect
                    id="select1"
                    className="mb-3"
                    onChange={handleSelectChange}
                    value={selectedValue}
                  >
                    <option value="63ff36fb23ad0386e761641f">
                      Graphics Cards
                    </option>
                  </FormSelect>
                  <FormLabel className="fw-bold fs-6">Chipset</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="chipset"
                    value={chipset2}
                    onChange={(e) => setChipset2(e.target.value)}
                    onFocus={() =>
                      setTimeout(() => {
                        setChipsetvalue(false);
                      })
                    }
                    placeholder="i.e. AMD or Nvidia"
                  />
                  {Chipsetvalue ? (
                    <>
                      <ListGroup as="ul" className="my-list">
                        {" "}
                        {Chipset1.map((val, i) => {
                          return (
                            <ListGroup.Item
                              as="li"
                              key={i}
                              onClick={() => handleOnSelectChipset(val.name)}
                            >
                              {val.name}
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </>
                  ) : null}
                  <FormLabel className="fw-bold fs-6">Brand</FormLabel>
                  <FormControl
                    name="brand"
                    className="mb-3"
                    value={brand2}
                    onChange={(e) => setBrand2(e.target.value)}
                    onFocus={() =>
                      setTimeout(() => {
                        setBrand1Value(false);
                      })
                    }
                    placeholder="i.e. MSI,PNY,Zotac etc..."
                  ></FormControl>
                  {Brand1Value ? (
                    <>
                      <ListGroup as="ul" className="my-list">
                        {" "}
                        {Brand1.map((val, i) => {
                          return (
                            <ListGroup.Item
                              as="li"
                              key={i}
                              onClick={() => handleOnSelecBrand(val.name)}
                            >
                              {val.name}
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </>
                  ) : null}
                  <FormLabel className="fw-bold fs-6">Series</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="series"
                    value={series2}
                    onChange={(e) => setSeries2(e.target.value)}
                    onFocus={() =>
                      setTimeout(() => {
                        setvalue(false);
                      })
                    }
                    placeholder="i.e. RTX3080TI,RTX 4090 etc..."
                  ></FormControl>
                  {value ? (
                    <ListGroup as="ul" className="my-list">
                      <>
                        {" "}
                        {item1.map((val, i) => {
                          return (
                            <ListGroup.Item
                              as="li"
                              key={i}
                              onClick={() => handleOnSelect(val.name)}
                            >
                              {val.name}
                            </ListGroup.Item>
                          );
                        })}
                      </>
                    </ListGroup>
                  ) : null}

                  <FormLabel className="fw-bold fs-6">Model</FormLabel>
                  <FormControl
                    name="model"
                    className="mb-3"
                    value={model2}
                    disabled
                    onChange={(e) => setModel2(e.target.value)}
                    placeholder="i.e. Gaming X,Gaming X Trio etc.. "
                  />
                  <FormLabel className="fw-bold fs-6">SKU</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="sku"
                    disabled
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="SKU Unique Per product"
                  />

                  <FormLabel className="fw-bold fs-6">Product Videos</FormLabel>

                  <Form className="mb-3">
                    {inputList.map((x, i) => {
                      if (true) {
                        return (
                          <div className="d-flex mb-3" key={i}>
                            <FormControl
                              name={`embeddedVideoLink${i + 1}`}
                              placeholder="Embedded Video Link"
                              value={x}
                              onChange={(e) => handleInputChange(e, i)}
                            />

                            <button
                              type="button"
                              className="butt bg-none border-0"
                              onClick={handleAddClick}
                            >
                              <BiPlusCircle style={{ fontSize: "30px" }} />
                            </button>
                            {inputList.length !== 1 && (
                              <button
                                type="button"
                                className="bg-none border-0 ms-2"
                                onClick={() => handleRemoveClick(i)}
                              >
                                <BiMinusCircle
                                  style={{
                                    fontSize: "30px",
                                  }}
                                />
                              </button>
                            )}
                          </div>
                        );
                      }
                    })}
                  </Form>
                </Form>
              </div>
            </Col>
            <Col lg={12}>
              <section className="mt-3 mb-3">
                <h4 className="fw-bold">Gallery Image</h4>
                <p className="text-muted fw-bold">
                  Add or change image for the Gallery
                </p>
                <div className="d-flex justify-content-center align-items-center border px-3 py-5">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span className="mb-3">Support : Jpeg,Png</span>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-image me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                      </svg>
                      Drag and drop your images here.
                    </div>
                  </div>
                </div>

                {/* Start Image Preview for the New Image Uploades */}
                {multipleFiles?.length > 0 ? (
                  <Button
                    className="remove_all_images border bg-primary mt-3"
                    onClick={() => setMultipleFiles([])}
                  >
                    Remove All
                  </Button>
                ) : (
                  ""
                )}
                {multipleFiles?.length > 4 ? (
                  <div
                    className="Whole_image_box mt-2 extra-images"
                    style={{ display: "flex", marginTop: "20px" }}
                  >
                    {multipleFiles.map((file, index) => (
                      <div className="parent_div">
                        <div
                          className="image_div"
                          key={index}
                          draggable
                          onDragStart={(e) => dragNewStart(e, index)}
                          onDragEnter={(e) => dragNewEnter(e, index)}
                          onDragEnd={dropNew}
                        >
                          <LazyLoadImage
                            className="show_multi_images"
                            src={file.preview}
                            alt={file.name}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
                          {/* <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(e) => handleFileChange(e, file.path)}
                            />
                            <EditIcon />
                          </IconButton> */}
                          <IconButton
                            color="error"
                            onClick={() => handledeletesingleimage(file.path)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="Whole_image_box mt-2"
                    style={{ display: "flex", marginTop: "20px" }}
                  >
                    {multipleFiles.map((file, index) => (
                      <div className="parent_div">
                        <div
                          className="image_div"
                          key={index}
                          draggable
                          onDragStart={(e) => dragNewStart(e, index)}
                          onDragEnter={(e) => dragNewEnter(e, index)}
                          onDragEnd={dropNew}
                        >
                          <LazyLoadImage
                            className="show_multi_images"
                            src={file.preview}
                            alt={file.name}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
                          {/* <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(e) => handleFileChange(e, file.path)}
                            />
                            <EditIcon />
                          </IconButton> */}
                          <IconButton
                            color="error"
                            onClick={() => handledeletesingleimage(file.path)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* end image preview of the new uploaded images */}

                {/* start image preview of the old images */}
                {currentImage?.length > 0 ? (
                  <Button
                    className="remove_all_images border bg-primary mt-3"
                    onClick={() => setCurrentImage([])}
                  >
                    Remove All
                  </Button>
                ) : (
                  ""
                )}
                {currentImage?.length > 4 ? (
                  <div
                    className="Whole_image_box mt-2 extra-images"
                    style={{ display: "flex", marginTop: "20px" }}
                  >
                    {currentImage.map((file, index) => (
                      <div className="parent_div">
                        <div
                          className="image_div"
                          key={index}
                          draggable
                          onDragStart={(e) => dragStart(e, index)}
                          onDragEnter={(e) => dragEnter(e, index)}
                          onDragEnd={drop}
                        >
                          <img
                            className="show_multi_images"
                            src={`${imageUrl}${file}`}
                            alt={file}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
                          {/* <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(e) => handleFileChange(e, file)}
                            />
                            <EditIcon />
                          </IconButton> */}
                          <IconButton
                            color="error"
                            onClick={() => handledeletesingleimage(file)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="Whole_image_box mt-2"
                    style={{ display: "flex", marginTop: "20px" }}
                  >
                    {currentImage.map((file, index) => (
                      <div className="parent_div">
                        <div
                          className="image_div"
                          key={index}
                          draggable
                          onDragStart={(e) => dragStart(e, index)}
                          onDragEnter={(e) => dragEnter(e, index)}
                          onDragEnd={drop}
                        >
                          <img
                            className="show_multi_images"
                            src={`${imageUrl}${file}`}
                            alt={file}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
                          {/* <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(e) => handleFileChange(e, file)}
                            />
                            <EditIcon />
                          </IconButton> */}
                          <IconButton
                            color="error"
                            onClick={() => handledeletesingleimage(file)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* end image preview of the old images */}
              </section>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="protyppri mt-3">
                <h4 className="mb-3 fw-bold">Product Type and Price</h4>
                <div className="marretweb border rounded bg-custom-light p-2">
                  <div className="marbidask">
                    <h5 className="invisible"></h5>
                    <h5 className="invisible"></h5>
                    <h5 className="text-center mb-3 update_font ">
                      Market Price
                    </h5>
                    <h5 className="text-center mb-3 update_font ">
                      Retail Price
                    </h5>
                    <h5 className="text-center mb-3 update_font ">
                      Website Price
                    </h5>
                  </div>
                  <div className="newret">
                    <h5 className="update_font">New-Retail</h5>

                    {productType1?.length > 0 ? (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={
                                productType1[0].status == true ? true : false
                              }
                              onChange={handleCheckClickOne}
                            />
                          }
                        />
                      </FormGroup>
                    ) : (
                      <input
                        type="checkbox"
                        id="checkboxx"
                        name="checkbox"
                        value="1"
                        onClick={handleCheckClickone1}
                      />
                    )}

                    <div>
                      <FormControl
                        name="marketPrice"
                        value={marketPrice}
                        onChange={(e) => handleMarketPrice(e)}
                        placeholder="Comp Price"
                      />
                      <p>
                        Date:
                        {marketPriceDate}
                      </p>
                    </div>
                    <div>
                      <FormControl
                        name="retailPrice"
                        value={retailPrice}
                        onChange={(e) => {
                          setRetailPrice(e.target.value);
                          handleItemss(e);
                        }}
                        placeholder="MSRP"
                      />
                    </div>
                    <div>
                      <FormControl
                        name="websitePrice"
                        value={websitePrice}
                        onChange={(e) => {
                          setWebsitePrice(e.target.value);
                          handleItemss(e);
                        }}
                        placeholder="Our Price"
                      />
                      <p>
                        Inventory:
                        {productType1.length > 0
                          ? productType1.map((item) => {
                              return item.inventory ? item.inventory : "";
                            })
                          : 0}
                      </p>
                      <p>
                        COGS Price :
                        {productType1.length > 0
                          ? productType1.map((item) => {
                              return item.cogs ? item.cogs.toFixed(2) : "";
                            })
                          : 0}
                      </p>
                    </div>
                  </div>
                  <div className="marbidask">
                    <h5 className="invisible"></h5>
                    <h5 className="invisible"></h5>
                    <h5 className="text-center mb-3 update_font ">
                      Market Price
                    </h5>
                    <h5 className="text-center mb-3 update_font ">House Bid</h5>
                    <h5 className="text-center mb-3 update_font ">House Ask</h5>
                  </div>
                  <div className="marbidask">
                    <h5 className="update_font">New-2nd Hand</h5>
                    {productType2?.length > 0 ? (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={
                                productType2[0].status == true ? true : false
                              }
                              onChange={handleCheckClickTwo}
                            />
                          }
                        />
                      </FormGroup>
                    ) : (
                      <input
                        type="checkbox"
                        id="checkboxx"
                        value="2"
                        name="checkbox"
                        onClick={handleCheckClickTwo2}
                      />
                    )}
                    <div>
                      <FormControl
                        name="secondHandMarketPrice"
                        value={secondHandMarketPrice}
                        onChange={(e) => handleSecondHandMarketPrice(e)}
                        placeholder=""
                      />
                      <p>Date : {secondMarketPriceDate} </p>
                    </div>
                    <div>
                      <FormControl
                        name="secondHandHouseBid"
                        value={secondHandHouseBid}
                        onChange={(e) => {
                          setSecondHandHouseBid(e.target.value);
                          handleItemss(e);
                        }}
                        placeholder=""
                      />
                    </div>
                    <div>
                      <FormControl
                        name="secondHandHouseAsk"
                        value={secondHandHouseAsk}
                        placeholder=""
                        onChange={(e) => {
                          setSecondHandHouseAsk(e.target.value);
                          handleItemss(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="marbidask">
                    <h5 className="update_font">Used</h5>
                    {productType3?.length > 0 ? (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={
                                productType3[0].status == true ? true : false
                              }
                              onChange={handleCheckClickThree}
                            />
                          }
                        />
                      </FormGroup>
                    ) : (
                      <input
                        type="checkbox"
                        id="checkboxx"
                        name="checkbox"
                        value="3"
                        onClick={handleCheckClickThree3}
                      />
                    )}
                    <div>
                      <FormControl
                        name="usedMarketPrice"
                        value={usedMarketPrice}
                        onChange={(e) => handleUsedMarketPrice(e)}
                        placeholder=""
                      />
                      <p>Date: {usedMarketDate} </p>
                    </div>
                    <div>
                      <FormControl
                        name="usedHouseBid"
                        value={usedHouseBid}
                        onChange={(e) => {
                          setUsedHouseBid(e.target.value);
                          handleItemss(e);
                        }}
                        placeholder=""
                      />
                    </div>
                    <div>
                      <FormControl
                        name="usedHouseAsk"
                        value={usedHouseAsk}
                        onChange={(e) => {
                          setUsedHouseAsk(e.target.value);
                          handleItemss(e);
                        }}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="descrip mt-3 fs-4 fw-bold">
                <h4 className="fs-6 fw-bold">Description</h4>
                <div className="desc-main">
                  <CKEditor
                    editor={ClassicEditor}
                    name="description"
                    data={editorContent}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorContent(data);
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                </div>
              </div>
              <div className="descrip">
                <Form>
                  <FormLabel className="fw-bold fs-6 mt-3">SEO Title</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="seoTitle"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder=""
                  />
                </Form>
              </div>
              <div className="descr">
                <Form>
                  <FormLabel className="fw-bold fs-6">
                    SEO Meta Description
                  </FormLabel>
                  <FormControl
                    name="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder=""
                  />
                </Form>
              </div>
              {isLoading ? (
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
              ) : (
                <div className="text-center my-5">
                  <Button
                    className="text-white px-5 border-0 py-2 bg-success"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>{" "}
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* End Product Update Modal */}

      {/* Start Filter Model */}
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
      </Modal>
      {/* end Filter Model */}
    </div>
  );
}
