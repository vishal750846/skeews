import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BiPlusCircle } from "react-icons/bi";
import { BiMinusCircle } from "react-icons/bi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./NewProduct.css";
import ExportApi from "../api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
let date;
const NewProduct = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("tokenuser"))
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

  const [newProductData, setNewProductData] = useState({
    category: "",
    chipset: "",
    brand: "",
    series: "",
    model: "",
    sku: "",
    seoTitle: "",
    metaDescription: "",
    image: "",
  });

  const [inputList, setInputList] = useState([""]);
  // Checkbox State
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
  const [showModal, setShowModal] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [value, setvalue] = useState("");
  const [marketPrice, setMarketPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [websitePrice, setWebsitePrice] = useState(0);
  const [secondHandMarketPrice, setSecondHandMarketPrice] = useState(0);
  const [secondHandHouseBid, setSecondHandHouseBid] = useState(0);
  const [secondHandHouseAsk, setSecondHandHouseAsk] = useState(0);
  const [usedMarketPrice, setUsedMarketPrice] = useState(0);
  const [usedHouseBid, setUsedHouseBid] = useState(0);
  const [usedHouseAsk, setUsedHouseAsk] = useState(0);
  const [marketPriceCheckbox, setMarketPriceCheckBox] = useState(false);
  const [secondHandMarketPriceCheckbox, setSecondHandMarketPriceCheckbox] =
    useState(false);
  const [usedMarketPriceCheckbox, setUsedMarketPriceCheckBox] = useState(false);
  const [productData, setProductData] = useState([]);
  const [alreadySku, setAlreadySku] = useState([]);
  const [alreadyModel, setAlreadyModel] = useState([]);
  const [marketDate, setMarketDate] = useState();
  const [secondMarketDate, setSecondMarketDate] = useState();
  const [usedMarketDate, setusedMarketDate] = useState();
  const [modelData, setModelData] = useState([]);
  const [productType, setProductType] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(true);
  // Category Select State
  const [selectedValue, setSelectedValue] = useState(
    "63ff36fb23ad0386e761641f"
  );

  // Ck Editor state
  const [editorContent, setEditorContent] = useState("");
  const [Chipset, setChipset] = useState([
    { name: " AMD" },
    { name: "Nvidia " },
  ]);
  const [Chipset1, setChipset1] = useState([
    { name: " AMD" },
    { name: "Nvidia" },
  ]);
  const [Chipsetvalue, setChipsetvalue] = useState(false);
  const [Brand1Value, setBrand1Value] = useState(false);
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

  // Render state
  const [render, setRender] = useState(1);

  //Start React Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setShowModal(true);
    setMultipleFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  //End React DropZone

  // Start Select Chipset Data
  const handleOnSearchChipset = (string) => {
    if (string == "" || string == " ") {
      setChipsetvalue();
      newProductData.chipset = string;
      setNewProductData({ ...newProductData });
    } else {
      newProductData.chipset = string;
      setNewProductData({ ...newProductData });
      let data = Chipset?.filter((val, i) =>
        val.name.toLowerCase().includes(string.toLowerCase())
      );
      setChipsetvalue(true);
      setChipset1([...data]);
    }
  };
  //End Select Chipset Data

  const handleItemss = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(newProductData);
  };

  const handleModelItem = (e) => {
    const { name, value } = e.target;
    let Data = productData.filter((item) => item.model == value);
    setModelData(Data);
    setNewProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleItem = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //for Submit the Data
  const handleSubmit = () => {
    var numbers = /^[0-9]+$/;
    if (newProductData.chipset == "") {
      toast.error("Chipset Field Required");
    } else if (newProductData.brand == "") {
      toast.error("Brand Field Required");
    } else if (newProductData.series == "") {
      toast.error("Series Field Required");
    } else if (newProductData.model == "") {
      toast.error("Model Field Required");
    } else if (multipleFiles == null) {
      toast.error("Please Upload Image");
    } else if (productType?.length <= 0) {
      toast.error("You Need to Select Product Type");
    } else if (newProductData.sku == "") {
      toast.error("Sku Field Required");

    }else if(marketPriceCheckbox && marketPrice == ""){
      toast.error("New Retail Market Price is Required");
    }
    else if(marketPriceCheckbox && !marketPrice.match(numbers)){
      toast.error("New Retail Market Price Enter Numbers only");
    }    

    else if(marketPriceCheckbox && retailPrice == ""){
      toast.error("New Retail Retail Price is Required");
    }
    else if(marketPriceCheckbox && !retailPrice.match(numbers)){
      toast.error("New Retail Retail Price Enter Numbers only");
    }
    
    else if(marketPriceCheckbox && websitePrice == ""){
      toast.error("New Retail Website Price is Required");
    }
    else if(marketPriceCheckbox && !websitePrice.match(numbers)){
      toast.error("New Retail Website Price Enter Numbers only");
    }


    else if(secondHandMarketPriceCheckbox && secondHandMarketPrice == ""){
      toast.error("Second Hand Market Price is Required");
    }
    else if(secondHandMarketPriceCheckbox && !secondHandMarketPrice.match(numbers)){
      toast.error("Second Hand Market Price Enter Numbers only");
    }

    else if(secondHandHouseBid && !secondHandHouseBid.match(numbers)){
      toast.error("Second Hand House Bid Price Enter Numbers only");
    }
    else if(secondHandHouseAsk && !secondHandHouseAsk.match(numbers)){
      toast.error("Second Hand House Ask Price Enter Numbers only");
    }

    else if(usedMarketPriceCheckbox && usedMarketPrice == ""){
      toast.error("Used Market Price is Required");
    } else if(usedMarketPriceCheckbox && !usedMarketPrice.match(numbers)){
      toast.error("Used Market Price Enter Numbers only");
    }
    else if(usedHouseBid && !usedHouseBid.match(numbers)){
      toast.error("Used House Bid Price Enter Numbers only");
    }
    else if(usedHouseAsk && !usedHouseAsk.match(numbers)){
      toast.error("Used House Ask Price Enter Numbers only");
    }
    
    
    else {
      let error = false;
      if (productType.includes("1")) {
        if (websitePrice == "") {
          toast.error("Website Price Field Required");
          error = true;
        }
      }
      if (!error) {
        setCount(0);
        setRender(render + 1);
        let formData = new FormData();
        formData.append("category", selectedValue),
          formData.append("chipset", newProductData.chipset),
          formData.append("brand", newProductData.brand),
          formData.append("series", newProductData.series),
          formData.append("model", newProductData.model),
          formData.append("sku", newProductData.sku),
          formData.append("seoTitle", newProductData.seoTitle),
          formData.append("metaDescription", newProductData.metaDescription),
          formData.append("videos", inputList);
        if (marketPrice != 0) {
          formData.append("new_retail_market_price", marketPrice);
        }
        if (retailPrice != 0) {
          formData.append("new_retail_price", retailPrice);
        }
        formData.append("new_retail_website_price", websitePrice);
        if (secondHandMarketPrice != 0) {
          formData.append(
            "new_second_hand_market_price",
            secondHandMarketPrice
          );
        }
        if (secondHandHouseBid != 0) {
          formData.append("new_second_hand_house_bid", secondHandHouseBid);
        }
        if (secondHandHouseAsk != 0) {
          formData.append("new_second_hand_house_ask", secondHandHouseAsk);
        }
        if (usedMarketPrice != 0) {
          formData.append("used_market_price", usedMarketPrice);
        }
        if (usedHouseBid != 0) {
          formData.append("used_house_bid", usedHouseBid);
        }
        if (usedHouseAsk != 0) {
          formData.append("used_house_ask", usedHouseAsk);
        }
        formData.append("description", editorContent),
          formData.append("type", productType);
        formData.append("admin", token?.id);
        if (marketDate != undefined) {
          formData.append("market_price_new_update_date", marketDate);
        }
        if (secondMarketDate != undefined) {
          formData.append("market_price_second_update_date", secondMarketDate);
        }
        if (usedMarketDate != undefined) {
          formData.append("market_price_used_update_date", usedMarketDate);
        }
        for (let i = 0; i < multipleFiles.length; i++) {
          formData.append("image", multipleFiles[i]);
        }
        formData.append(
          "productname",
          newProductData.brand +
            " " +
            newProductData.series +
            " " +
            newProductData.model
        );
        setRender(render + 1);

        setTimeout(() => {
          ExportApi.Createproduct(formData)
            .then((resp) => {
              if (resp.data.message == "add Product Successfully") {
                toast.success("Add Product Successfully");
                setCount(1);
                navigate("/productlist");
              } else {
                toast.error("Error");
                setCount(0);
              }
            })
            .catch((err) => console.log(err));
        }, 2000);
      }
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    var list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = [...inputList];
    inputList.splice(index, 1);
    setInputList([...inputList]);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  //Start for the Product Type
  const handleCheckClickOne = (e) => {
    setMarketPriceCheckBox(e.target.checked);
    let index = productType.indexOf(e.target.value);
    if (e.target.checked && index === -1) {
      productType.push(e.target.value);
      setProductType(productType);
    } else {
      setMarketPrice(0);
      setRetailPrice(0);
      setWebsitePrice(0);
      productType.splice(index, 1);
      setProductType(productType);
    }
    setRender(render + 1);
  };

  const handleCheckClickTwo = (e) => {
    setSecondHandMarketPriceCheckbox(e.target.checked);
    let index = productType.indexOf(e.target.value);
    if (e.target.checked && index === -1) {
      productType.push(e.target.value);
      setProductType(productType);
    } else {
      setSecondHandMarketPrice("");
      setSecondHandHouseBid("");
      setSecondHandHouseAsk("");
      productType.splice(index, 1);
      setProductType(productType);
    }

    setRender(render + 1);
  };

  const handleCheckClickThree = (e) => {
    setUsedMarketPriceCheckBox(e.target.checked);
    let index = productType.indexOf(e.target.value);
    if (e.target.checked && index === -1) {
      productType.push(e.target.value);
      setProductType(productType);
    } else {
      setUsedMarketPrice(0);
      setUsedHouseBid(0);
      setUsedHouseAsk(0);
      productType.splice(index, 1);
      setProductType(productType);
    }

    setRender(render + 1);
  };
  //end for the Product type

  // Category Select
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // for the Series Select
  const handleOnSearch = (string) => {
    if (string == "" || string == " ") {
      setvalue(false);
      newProductData.series = string;
      setNewProductData({ ...newProductData });
    } else {
      newProductData.series = string;
      setNewProductData({ ...newProductData });
      let data = items?.filter((val, i) =>
        val.name.toLowerCase().includes(string.toLowerCase())
      );
      setvalue(true);
      setitem1([...data]);
    }
  };

  const handleOnSelect = (item) => {
    newProductData.series = item;
    setNewProductData({ ...newProductData });
    setvalue(false);
  };

  const handleOnSelectChipset = (item) => {
    newProductData.chipset = item;
    setNewProductData({ ...newProductData });
    setChipsetvalue(false);
  };

  const handleOnSelecBrand = (item) => {
    newProductData.brand = item;
    setNewProductData({ ...newProductData });
    setBrand1Value(false);
  };

  const handleOnSearchBrand = (string) => {
    if (string == "" || string == " ") {
      setBrand1Value(false);
      newProductData.brand = string;
      setNewProductData({ ...newProductData });
    } else {
      newProductData.brand = string;
      setNewProductData({ ...newProductData });
      let data = Brand?.filter((val, i) =>
        val.name.toLowerCase().includes(string.toLowerCase())
      );
      setBrand1Value(true);
      setBrand1([...data]);
    }
  };

  const handleGetEventlistChange = (id) => {
    setTimeout(() => {
      ExportApi.GetAllProductUserid(id)
        .then((resp) => {
          let Data = resp.data.details;
          setProductData(Data);
        })
        .catch((err) => console.log(err));
        // window.dispatchEvent(new Event("Loginout"));
    });
  };
  // window.addEventListener("Loginout", () => {
  //   localStorage.clear();
  //   navigate("/");
  // });

  const handleMultiData = () => {
    ExportApi.GetSkuData()
      .then((resp) => {
        let Data = resp.data.data;
        let Model = Data.model;
        let Sku = Data.sku;
        const lowercaseWords = Model.map((word) => word.toLowerCase());
        const lowercaseWordsku = Sku.map((word) => word.toLowerCase());
        setAlreadyModel(lowercaseWords);
        setAlreadySku(lowercaseWordsku);
      })
      .catch((err) => console.log(er));
  };

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      handleGetEventlistChange(
        JSON.parse(localStorage.getItem("tokenuser")).id
      );
      setToken(JSON.parse(localStorage.getItem("tokenuser")));
    } else if (localStorage.getItem("admin")) {
      handleGetEventlistChange(JSON.parse(localStorage.getItem("admin")).id);
      handleMultiData();
      setToken(JSON.parse(localStorage.getItem("admin")));
    }
  }, []);

  //Click on the Cancel Button
  const handleemptyProduct = () => {
    let confirm = window.confirm("Are You Want to Sure to cancel ");
    if (confirm) {
      navigate("/productlist");
    }
  };

  //set Market Price and date
  const handleMarketPrice = (e, i) => {
    date = new Date();
    let data = moment(date).format("l");
    setMarketDate(data);
    setMarketPrice(e.target.value);
    handleItemss(e);
  };

  //set Market Price and Date
  const handleSecondHandMarketPrice = (e, i) => {
    date = new Date();
    let data = moment(date).format("l");
    setSecondMarketDate(data);
    setSecondHandMarketPrice(e.target.value);
    handleItemss(e);
  };

  //set Market Price and Date
  const handleUsedMarketPrice = (e, i) => {
    date = new Date();
    let data = moment(date).format("l");
    setusedMarketDate(data);
    setUsedMarketPrice(e.target.value);
    handleItemss(e);
  };

  // to delete the Single image on the preview
  const handledeletesingleimage = (name) => {
    let result = multipleFiles.filter((file) => file.path !== name);
    setMultipleFiles(result);
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  //remove all images click on remove all
  const handleremoveallimages = (data) => {
    setMultipleFiles([]);
  };

  const drop = (e) => {
    const copyListItems = [...multipleFiles];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMultipleFiles(copyListItems);
  };

  return (
    <div>
      {count == 0 ? (
        <div className="loader-icon" style={{ marginBlock: "80px" }}>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : count == 1 ? (
        <div className="mt-5">
          <ToastContainer />
          <h2 className="mb-5 fw-bold">Add New Product</h2>
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
                    autocomplete="off"
                    required
                  >
                    <option value="63ff36fb23ad0386e761641f">
                      Graphics Cards
                    </option>
                  </FormSelect>
                  <FormLabel className="fw-bold fs-6">Chipset</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="chipset"
                    value={newProductData.chipset}
                    onChange={(e) => handleOnSearchChipset(e.target.value)}
                    onFocus={() => setChipsetvalue(false)}
                    placeholder="i.e. AMD or Nvidia"
                    autocomplete="off"
                    required
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
                              <b>{val.name}</b>
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
                    value={newProductData.brand}
                    onChange={(e) => handleOnSearchBrand(e.target.value)}
                    onFocus={() =>
                      setTimeout(() => {
                        setBrand1Value(false);
                      })
                    }
                    placeholder="i.e. MSI,PNY,Zotac etc..."
                    autocomplete="off"
                    required
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
                              <b>{val.name}</b>
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
                    value={newProductData.series}
                    onChange={(e) => handleOnSearch(e.target.value)}
                    onFocus={() =>
                      setTimeout(() => {
                        setvalue(false);
                      })
                    }
                    placeholder="i.e. RTX3080TI,RTX 4090 etc..."
                    autocomplete="off"
                    required
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
                              <b>{val.name}</b>
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
                    onChange={handleModelItem}
                    placeholder="i.e. Gaming X,Gaming X Trio etc.. "
                    autocomplete="off"
                    required
                  />
                  {alreadyModel.includes(newProductData.model.toLowerCase()) ? (
                    <span className="text-danger">Model Already Exist</span>
                  ) : (
                    ""
                  )}
                  <br />
                  <FormLabel className="fw-bold fs-6">SKU</FormLabel>
                  <FormControl
                    className="mb-3"
                    name="sku"
                    onChange={handleItem}
                    autocomplete="off"
                    placeholder="SKU Unique Per product"
                  />
                  {alreadySku.includes(newProductData.sku.toLowerCase()) ? (
                    <span className="text-danger">Sku Already Exist</span>
                  ) : (
                    ""
                  )}
                  <br />
                  <FormLabel className="fw-bold fs-6">Product Videos</FormLabel>
                  <Form className="mb-3">
                    {inputList.map((x, i) => {
                      if (true) {
                        return (
                          <div className="d-flex mb-3 justify-content-between">
                            <FormControl
                              name={`embeddedVideoLink${i + 1}`}
                              placeholder="Embedded Video Link"
                              value={x}
                              autocomplete="off"
                              style={{}}
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
                {multipleFiles?.length > 0 ? (
                  <Button
                    className="remove_all_images mt-3"
                    variant="contained"
                    onClick={() => handleremoveallimages(multipleFiles)}
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
                          onDragStart={(e) => dragStart(e, index)}
                          onDragEnter={(e) => dragEnter(e, index)}
                          onDragEnd={drop}
                        >
                          <img
                            className="show_multi_images"
                            src={file.preview}
                            alt={file.name}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
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
                          onDragStart={(e) => dragStart(e, index)}
                          onDragEnter={(e) => dragEnter(e, index)}
                          onDragEnd={drop}
                        >
                          <img
                            className="show_multi_images"
                            src={file.preview}
                            alt={file.name}
                            height="200px"
                            width="100%"
                          />
                        </div>
                        <div className="icon_div">
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
              </section>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="protyppri mt-3">
                <h4 className="mb-3 fw-bold">Product Type and Price</h4>
                <div className="marretweb border rounded bg-custom-light p-5">
                  <div className="marbidask">
                    <h5 className="invisible"></h5>
                    <h5 className="invisible"></h5>
                    <h5 className="text-center mb-3">Market Price</h5>
                    <h5 className="text-center mb-3">Retail Price</h5>
                    <h5 className="text-center mb-3">Website Price</h5>
                  </div>
                  <div className="newret">
                    <h5>New-Retail</h5>
                    <input
                      type="checkbox"
                      id="checkboxx"
                      name="checkbox"
                      value="1"
                      onClick={handleCheckClickOne}
                    />
                    <div>
                      <FormControl
                        name="marketPrice"
                        onChange={(e) => handleMarketPrice(e, 0)}
                        placeholder="Comp Price"
                      />
                      <p>
                        Date:
                        {date ? marketDate : ""}
                      </p>
                    </div>
                    <div>
                      <FormControl
                        name="retailPrice"
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
                        onChange={(e) => {
                          setWebsitePrice(e.target.value);
                          handleItemss(e);
                        }}
                        required
                        placeholder="Our Price"
                      />
                      <p>Inventory :</p>
                      <p>COGS Price :</p>
                    </div>
                  </div>
                  <div className="marbidask">
                    <h5 className="invisible"></h5>
                    <h5 className="invisible"></h5>
                    <h5 className="text-center mb-3">Market Price</h5>
                    <h5 className="text-center mb-3">House Bid</h5>
                    <h5 className="text-center mb-3">House Ask</h5>
                  </div>
                  <div className="marbidask">
                    <h5>New-2nd Hand</h5>
                    <input
                      type="checkbox"
                      id="checkboxx"
                      value="2"
                      name="checkbox"
                      onClick={handleCheckClickTwo}
                    />
                    <div>
                      <FormControl
                        name="secondHandMarketPrice"
                        onChange={(e) => handleSecondHandMarketPrice(e, 1)}
                        placeholder=""
                      />
                      <p>Date : {date ? secondMarketDate : ""} </p>
                    </div>
                    <div>
                      <FormControl
                        name="secondHandHouseBid"
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
                        placeholder=""
                        onChange={(e) => {
                          setSecondHandHouseAsk(e.target.value);
                          handleItemss(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="marbidask">
                    <h5>Used</h5>
                    <input
                      type="checkbox"
                      id="checkboxx"
                      name="checkbox"
                      value="3"
                      onClick={handleCheckClickThree}
                    />
                    <div>
                      <FormControl
                        name="usedMarketPrice"
                        onChange={(e) => handleUsedMarketPrice(e, 2)}
                        placeholder=""
                      />
                      <p>Date: {date ? usedMarketDate : ""} </p>
                    </div>
                    <div>
                      <FormControl
                        name="usedHouseBid"
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
                    onChange={handleItem}
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
                    onChange={handleItem}
                    placeholder=""
                  />
                </Form>
              </div>
              <div className="text-center my-5">
                {alreadyModel.includes(newProductData.model.toLowerCase()) ||
                alreadySku.includes(newProductData.sku.toLowerCase()) ? (
                  <Button
                    className="text-white px-5 border-0 py-2 bg-success"
                    style={{ opacity: 0.3 }}
                    variant="contained"
                    disabled
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="text-white px-5 border-0 py-2 bg-success"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                )}{" "}
                <Button
                  variant="contained"
                  className="text-white px-5 border-0 py-2 bg-success"
                  onClick={handleemptyProduct}
                >
                  Cancel
                </Button>{" "}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewProduct;
