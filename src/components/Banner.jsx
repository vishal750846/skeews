import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import ExportApi from "../api/ExportApi";
import "moment-duration-format";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
let updateDate;
let date;
export default function Banner() {
  const navigate = useNavigate()
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let imageUrl = "https://api.skewws.com/resources/";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  updateDate = moment(formattedDate).format("l");
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [showAddBannerModel, setShowAddBannerModel] = useState(false);
  const [showTimerBannerModel, setShowTimerBannerModel] = useState(false);
  const [bannerCategoryList, setBannerCategoryList] = useState([]);
  const [bannerCategoryId, setBannerCategoryId] = useState(null);
  const [activeBanner, setActiveBanner] = useState([]);
  const [inActiveBanner, setInactiveBanner] = useState([]);
  const [image, setImage] = useState();
  const [deleteData, setDeleteData] = useState([]);
  const [inDeleteData, setInDeleteData] = useState([]);
  const [filePixels, setFilepixels] = useState();
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [bannerCategorySelectId, setBannerCategorySelectId] = useState();
  const [isLoading, setLoading] = useState(true);
  const [bannerType, setBannerType] = useState(true);
  const [forwardLocation, setForwardLocation] = useState();
  const [imageLink, setImageLink] = useState();
  const [selectedBannerName, SetSelectedBannerName] = useState("Main Banner");
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentInactiveSortKey, setCurrentInactiveSortKey] = useState(null);
  const [currentInactiveSortOrder, setCurrentInactiveSortOrder] = useState(1);
  const [timing, setTiming] = useState();
  const [sliderButtonLoader, setSliderButtonLoader] = useState(false);
  const [addImageLoader, setAddImageLoader] = useState(false);
  const [updateImageLoader, setUpdateImageLoader] = useState(false);
  const [validMain, setValidMain] = useState();
  const [validCategory, setValidCategory] = useState();
  const [validPixelSize, setValidPixelSize] = useState();
  const [validForwardLocationName, setValidForwardLocationName] = useState();
  const [validForwardLocationLink, setValidForwardLocationLink] = useState();
  const [validImage, setValidImage] = useState();
  const [validBannerId, setValidBannerId] = useState();
  const [showBannerUpdateModal, setShowBannerUpdateModal] = useState(false);
  const [validShownImage, setValidShownImage] = useState();
  const [selectAllActive, setSelectAllActive] = useState(false);
  const[selectAllInActive,setSelectAllInActive] = useState(false)
  const[categoryName,setCategoryName] = useState()

  // get the banner Category List
  const getBannerCategoryList = () => {
    ExportApi.getCategoryBannerList()
      .then((resp) => {
        let data = resp.data.data;
        console.log(data);
        setBannerCategoryList(data);
        setBannerCategoryId(data[0]?._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

// Function to update the "Select All" checkbox
  const updateSelectAll = () => {
    const allSelected = activeBanner.every((item) => item.isSelected);
    setSelectAllActive(allSelected);
  };
// Function to update the "Select All" checkbox
  const updateSelectAll1 = () => {
    const allSelected = inActiveBanner.every((item) => item.isSelected);
    setSelectAllInActive(allSelected);
  };

  // get the banner list
  const getBannerList = () => {
    ExportApi.getBannerList(bannerCategoryId)
      .then((resp) => {
        let data = resp.data.data;
        if (resp.data.message == "Data Not Found") {
          setLoading(false);
          setActiveBanner([]);
        } else {
          setTiming(data[0].bannerTime);
          if (data?.length > 0) {
            let ActiveResult = data.filter((item) => {
              return item.active == true;
            });
            setActiveBanner(ActiveResult);
            let InActiveResult = data?.filter((item) => {
              return item.active == false;
            });
            setInactiveBanner(InActiveResult);
            setData(InActiveResult);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.warn(err);
        // window.dispatchEvent(new Event("Loginout"));
      });
  };

  // add the banner
  const handlesubmitBanner = () => {
    setAddImageLoader(true);
    if (!name || name.trim() === "") {
      toast.error("Name is required");
      setAddImageLoader(false);
      return;
    }
    if (filePixels && forwardLocation) {
      if (!image) {
        toast.error("Image is required");
        setAddImageLoader(false);
        return;
      }
      if (!imageLink) {
        toast.error("Invalid Forward location link");
        setAddImageLoader(false);
        return;
      }
      if (bannerCategorySelectId === "Select Category") {
        toast.error("Invalid Banner Category");
        setAddImageLoader(false);
        return;
      }
      let formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("pixel_size", filePixels);
      formData.append("forward_location", forwardLocation);
      formData.append("image_link", imageLink);
      ExportApi.createBanner(bannerCategorySelectId, formData)
        .then((resp) => {
          if (resp.data.message === "Data Fetched Successfully") {
            toast.success("Banner Added Successfully");
            handleAddBannerClose();
            setMultipleFiles([]);
            getBannerList();
            setFilepixels();
            setAddImageLoader(false);
          } else {
            toast.success(resp.data.message);
            setAddImageLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("All Fields are Required");
      setAddImageLoader(false);
    }
  };
  

  //to uplaod the image
  const handlefileChange = (file) => {
    setImage("");
    let ImageFile = file[0];
    setImage(ImageFile);
  };

  // to select all checkbox for the active
  const handleSelectAll = (e, type) => {
    setDeleteData([]);
    let result = e.target.checked;
    setSelectAllActive(result);
    if (result) {
      let data = activeBanner.map((item, i) => {
        return { ...item, isSelected: true };
      });
      setActiveBanner([...data]);
      let banner_id = data?.map((item) => item._id);
      setDeleteData(banner_id);
      setBannerType(type);
    } else {
      let data = activeBanner.map((item) => {
        return { ...item, isSelected: false };
      });
      setActiveBanner([...data]);
    }
  };
  // to select all checkbox for the inactive
  const handleSelectInActiveAll = (e, type) => {
    let result = e.target.checked;
    setSelectAllInActive(result);
    if (result) {
      let data = inActiveBanner.map((item, i) => {
        return { ...item, isSelected: true };
      });
      setInactiveBanner([...data]);
      let banner_id = data?.map((item) => item._id);
      setInDeleteData(banner_id);
      setBannerType(type);
    } else {
      let data = inActiveBanner.map((item) => {
        return { ...item, isSelected: false };
      });

      setInactiveBanner([...data]);
    }
  };
  // to select the single checkbox for the active banner
  const handleCheck = (data, id, type) => {
    let data2 = deleteData;
    let index = data2.indexOf(id);
    if (index === -1) {
      deleteData.push(id);
      setDeleteData([...deleteData]);
      setBannerType(type);
    } else {
      deleteData.splice(index, 1);
      setDeleteData([...deleteData]);
      setBannerType(type);
    }
    let banner_id = id;
    if (data) {
      for (let i = 0; i < activeBanner.length; i++) {
        const element1 = activeBanner[i];
        if (element1?._id.includes(banner_id)) {
          activeBanner[i].isSelected = true;
        }
      }
    } else {
      for (let i = 0; i < activeBanner.length; i++) {
        const element1 = activeBanner[i];
        if (element1?._id.includes(banner_id)) {
          activeBanner[i].isSelected = false;
        }
      }
    }
    // setSelectData(result[0]?._id);
    setActiveBanner([...activeBanner]);
    updateSelectAll()
  };

  //to select the single checkbox for the inactive banner
  const handleinActiveCheck = (data, id, type) => {
    let data2 = inDeleteData;
    let index = data2.indexOf(id);
    if (index === -1) {
      inDeleteData.push(id);
      setBannerType(type);
      setInDeleteData([...inDeleteData]);
    } else {
      inDeleteData.splice(index, 1);
      setBannerType(type);
      setInDeleteData([...inDeleteData]);
    }
    let banner_id = id;
    // let result = activeBanner.filter((item) => item?._id == banner_id);
    if (data) {
      for (let i = 0; i < inActiveBanner.length; i++) {
        const element1 = inActiveBanner[i];
        if (element1?._id.includes(banner_id)) {
          inActiveBanner[i].isSelected = true;
        }
      }
    } else {
      for (let i = 0; i < inActiveBanner.length; i++) {
        const element1 = inActiveBanner[i];
        if (element1?._id.includes(banner_id)) {
          inActiveBanner[i].isSelected = false;
        }
      }
    }
    // setSelectData(result[0]?._id);
    setInactiveBanner([...inActiveBanner]);
    setData([...inActiveBanner]);
    updateSelectAll1()
  };

  // search functionality for the inactive banner
  const handleSearch = (value) => {
    console.log(value);
    if (value == "" || value == null) {
      console.log(data);
      setInactiveBanner(data);
    } else {
      ExportApi.searchInactiveBanner(value).then((resp) => {
        if (resp.data.message == "Data Fetched Successfully") {
          let data = resp.data.data;
          let InActiveResult = data.filter((item) => {
            return item.active == false;
          });
          setInactiveBanner(InActiveResult);
        } else {
          setInactiveBanner([]);
        }
      });
    }
  };

  //for add the banner timing
  const handleBannerTimer = () => {
    setSliderButtonLoader(true);
    if (!timing) {
      toast.error("Banner Time is required");
      setSliderButtonLoader(false);
      return;
    }
    ExportApi.addBannerTimer(timing).then((resp) => {
      if (resp.data.message == "Data added Successfully") {
        toast.success(resp.data.message);
        setShowTimerBannerModel(false);
        setSliderButtonLoader(false);
      } else {
        toast.error(resp.data.message);
        // setShowTimerBannerModel(false)
        setSliderButtonLoader(false);
      }
    });
  };

  // to delete the banner
  const handleMultiDelete = () => {
    setSelectAllActive(false);
    setSelectAllInActive(false)
    let banner_id = deleteData.concat(inDeleteData);
    if (banner_id?.length > 0) {
      let confirm = window.confirm("Are you sure you want to delete");
      if (confirm) {
        if (banner_id?.length > 0) {
          ExportApi.multideletebanner(banner_id).then((resp) => {
            if (resp.data.msg == "Data deleted successfully") {
              toast.success("Deleted Successfully");
              setDeleteData([]);
              getBannerList();
            } else {
              toast.error(resp.data.message);
            }
          });
        } else {
          toast.error("Please select the Banner first");
        }
      } else {
      }
    } else {
      toast.error("Please select the Banner first");
    }
    updateSelectAll()
    updateSelectAll1()
  };

  // to update the banner active or inactive
 

  //to upload the image in the banner
  const handleUpdateBannerData = (id, data) => {
    ExportApi.updateBannerImages(id, data, selectedBannerName).then((resp) => {
      if (resp.data.message == "Image Updated Successfully") {
        let data = resp.data.data;
        toast.success("Banner Image Uploaded Successfully");
      } else {
        toast.error(resp.data.message);
      }
    });
  };

  //change the banner cateegory
  const HandleBannerCategoryChange = (value) => {
    const selectedCategoryId = value;
    setBannerCategoryId(selectedCategoryId);

    // Find the selected category object in the bannerCategoryList using the selectedCategoryId
    const selectedCategory = bannerCategoryList.find(
      (item) => item._id === selectedCategoryId
    );
    if (selectedCategory) {
      const { _id, categoryName } = selectedCategory;
      setBannerCategoryId(_id);
      SetSelectedBannerName(categoryName);
      // You can perform any additional actions with the selected ID and category name here
    }
  };

  //get the pixel size acc. to the banner
  const handleBannerCategory = (value) => {
    setBannerCategorySelectId(value);
    if(value == "Select Category"){
      setFilepixels("")
    }else{
    ExportApi.getBannerNameById(value)
      .then((resp) => {
        let data = resp.data.data.categoryName;
        setCategoryName(data)
        if (data == "Main Banner") {
          setFilepixels("2000x600");
        } else if(data == "Mini Banner left" || data == "Mini Banner right" || data == "Bottom Banner") {
          setFilepixels("1000x400");
        }else{
          setFilepixels("")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  //for the table sorting for the active
  const sortHere = (key) => {
    const SortBanner = key === currentSortKey ? -currentSortOrder : 1;
    const SortedBannerData = activeBanner.sort((a, b) => {
      if (a[key] < b[key]) return -1 * SortBanner;
      if (a[key] > b[key]) return SortBanner;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(SortBanner);
  };

  //for the table sorting for the inactive
  const InactivesortHere = (key) => {
    const SortInactiveBanner =
      key === currentInactiveSortKey ? -currentInactiveSortOrder : 1;
    const SortedBannerData = inActiveBanner.sort((a, b) => {
      if (a[key] < b[key]) return -1 * SortInactiveBanner;
      if (a[key] > b[key]) return SortInactiveBanner;
      return 0;
    });
    setCurrentInactiveSortKey(key);
    setCurrentInactiveSortOrder(SortBanner);
  };

  // to check the valid url
  let toastShown = false; // Add this flag outside the function
  const handleImageLink = (value) => {
    const urlPattern =
    /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g || /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/i
    if (urlPattern.test(value)) {
      setImageLink(value);
      toastShown = false;
    } else if (!toastShown) {
      toastShown = true;
      setImageLink("");
    }
  };

  //for the prefill field for the update
  const handleUpdate = (value) => {
    console.log(value);
    setShowBannerUpdateModal(true);
    setValidMain(value?.name);
    setValidCategory(value?.category_type);
    setValidPixelSize(value?.pixel_size);
    setValidForwardLocationLink(value?.image_link);
    setValidForwardLocationName(value?.forword_location);
    setValidImage(value?.imageName);
    setValidBannerId(value?._id);
  };

  // for the valid url
  const handleValidImageLink = (value) => {
    const urlPattern = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g || /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/i;
    if (urlPattern.test(value)) {
      setValidForwardLocationLink(value);
    } else {
      setValidForwardLocationLink("");
    }
  };


  // Update the banner
  const handleUpdateDataBanner = () => {
    setUpdateImageLoader(true);
    if (!validMain || validMain.trim() === "") {
      toast.error("Name is required");
      setAddImageLoader(false);
      return;
    }
    if (validPixelSize && validForwardLocationName) {
      if (!validImage) {
        toast.error("Image is required");
        setUpdateImageLoader(false);
        return;
      }
      if (!validForwardLocationLink) {
        toast.error("Invalid Forward location link");
        setUpdateImageLoader(false);
        return;
      }

      let formData = new FormData();
      formData.append("name", validMain);
      formData.append("image", validImage);
      formData.append("pixel_size", validPixelSize);
      formData.append("forward_location", validForwardLocationName);
      formData.append("image_link", validForwardLocationLink);
      ExportApi.updateBannerData(validBannerId, formData)
        .then((resp) => {
          console.log(resp);
          if (resp.data.message == "Data Updated sucessfully") {
            toast.success("Banner Updated Successfully");
            setShowBannerUpdateModal(false);
            setMultipleFiles([]);
            getBannerList();
            setFilepixels();
            setUpdateImageLoader(false);
          } else {
            toast.success(resp.data.message);
            setUpdateImageLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setUpdateImageLoader(false);
        });
    } else {
      toast.error("All Field Required");
      setUpdateImageLoader(false);
    }
  };
  // for the edit category
  const handleValidBannerCategory = (value) => {
    ExportApi.getBannerNameById(value)
      .then((resp) => {
        let data = resp.data.data.categoryName;
        // setCategoryBannerName(data)
        if (data == "Main Banner") {
          setValidPixelSize("2000x600");
        } else {
          setValidPixelSize("1000x400");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidImage = (value) => {
    setValidImage(value);
    setValidShownImage(URL.createObjectURL(value));
  };

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  const handleAddBannerClose = () => {
    setName()
    setFilepixels()
    setForwardLocation()
    setImageLink()
    setShowAddBannerModel(false)
  }

  //handle drag
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...activeBanner];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setActiveBanner(items);
    handleBannerSorting(items)
  };

  const handleBannerSorting = (items) => {
    ExportApi.bannersorting(items).then((resp) => {
      if(resp.data.message == "Order updated successfully"){
        setActiveBanner(resp.data.data)
      }else{
        console.log(resp.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //timer validation
  const handleTiming = (value) => {
    var numbers = /^[0-9]+$/;
    if (!value.match(numbers)) {
      setTiming(timing);
      if (timing?.length <= 1) {
        setTiming("");
      }
    } else {
      setTiming(value);
    }
  };

  useEffect(() => {
    getBannerCategoryList();
  }, []);

  useEffect(() => {
    getBannerList();
  }, [bannerCategoryId]);

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

  const handleUpdateBanner = (type) => {
    let banner_id = deleteData.concat(inDeleteData);
    if (banner_id?.length > 0) {
      ExportApi.updateBanner(banner_id, type).then((resp) => {
        if (resp.data.message == "Data Updated sucessfully") {
          toast.success(resp.data.message);
          setDeleteData([]);
          setInDeleteData([])
          getBannerList();
        } else {
          toast.error("Not Updated successfully");
        }
      });
    } else {
      toast.error("Please select the Banner first");
    }
    updateSelectAll()
    updateSelectAll1()
    setSelectAllActive(false)
    setSelectAllInActive(false)
  };


  return (
    <div>
      <ToastContainer />
      <div className="main_banner custom_select_box py-2 fw-bold mt-3">
        <Form.Select
          aria-label="Default select example"
          className="w-25 "
          onChange={(e) => HandleBannerCategoryChange(e.target.value)}
        >
          <option selected hidden>
            Main Banner
          </option>
          {bannerCategoryList?.map((item) => {
            return <option value={item._id}>{item.categoryName}</option>;
          })}
        </Form.Select>
      </div>
      <Row>
        <Col lg={12} className="mt-sm-5 mt-2">
          <div className="text-sm-end text-center d-flex justify-content-end">
            <Button
              className="bg-none text-black border border-2 mb-2 mb-sm-0"
              onClick={handleMultiDelete}
            >
              Delete
            </Button>
            <Button
              className="bg-none text-black border border-2 ms-2 mb-2 mb-sm-0"
              onClick={() => handleUpdateBanner(true)}
            >
              Active
            </Button>
            <Button
              className="bg-none text-black border border-2 ms-2 mb-2 mb-sm-0"
              onClick={() => handleUpdateBanner(false)}
            >
              InActive
            </Button>
            <Button
              className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
              onClick={() => setShowAddBannerModel(true)}
            >
              Add Banner
            </Button>
            <Button
              className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
              onClick={() => setShowTimerBannerModel(true)}
            >
              Add Timer
            </Button>
            <div class="dropdown">
              <button
                type="button"
                id="dropdown-basic"
                aria-expanded="false"
                class=" bg-none text-dark border border-2 fw-normal dropdown-toggle btn btn-primary"
              >
                More action
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="active_banner">
        <Row>
          <Col lg={12} className="">
            <div className="active_banner fw-bold">
              Active{" "}
              <Button className="bg-none border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#000"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </Button>
            </div>
          </Col>
        </Row>
        <div className="table-responsive mb-5">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="bannerTable">
              {(provided) => (
                <Table
                  bordered
                  striped
                  className="align-middle graphic-table text-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <thead>
                    <tr>
                      <th className="text-start">
                        <Form.Check
                          className="d-inline me-2"
                          type="checkbox"
                          checked={selectAllActive}
                          onClick={(e) => handleSelectAll(e, false)}
                        />
                        <label>Select All</label>
                      </th>
                      <th onClick={() => sortHere("name")}>
                        Name
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
                      <th onClick={() => sortHere("pixel_size")}>
                        Pixel Size
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
                      <th onClick={() => sortHere("file_size")}>
                        File Size
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
                        Days Active
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
                      <th onClick={() => sortHere("rate")}>
                        Click Through Rate
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
                        Date Created
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
                      <th onClick={() => sortHere("forword_location")}>
                        Forward Location
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
                      <th onClick={() => sortHere("forword_location")}>
                        Action
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
                    {activeBanner?.length > 0 ? (
                      activeBanner?.map((item, i) => {
                        return (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={i}
                          >
                            {(provided) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <td>
                                  <div className="d-flex align-items-end justify-content-between">
                                    <Form.Check
                                      className="d-inline"
                                      type="checkbox"
                                      checked={item?.isSelected}
                                      onChange={(e) =>
                                        handleCheck(
                                          e.target.checked,
                                          item?._id,
                                          false
                                        )
                                      }
                                    />
                                    <img
                                      src={`${imageUrl}${item?.imageName}`}
                                      style={{
                                        width: "150px",
                                        height: "100px",
                                      }}
                                    />
                                    {imagePreview == i ? (
                                      <Button
                                        className="bg-none border-0"
                                        onClick={() => setImagePreview()}
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
                                        onClick={() => setImagePreview(i)}
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
                                  <div>
                                    {imagePreview == i ? (
                                      <div className="modal_custom_">
                                        <div className="inner_customModal_one">
                                          <Slider
                                            key={i}
                                            style={{
                                              height: "100px",
                                              width: "200px",
                                            }}
                                            {...sliderSettings}
                                          >
                                            <img
                                              className="mx-auto d-block border"
                                              src={`${imageUrl}${item?.imageName}`}
                                              effect="blur"
                                              height="100px"
                                              width="100px"
                                            />
                                          </Slider>
                                          {/* <img src={`${imageUrl}${item.imageName}`} style={{ width: "100%", height: "100%" }} /> */}
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </td>
                                <td>{item?.name}</td>
                                <td>{item?.pixel_size}</td>
                                <td>
                                  {(item?.file_size / (1024 * 1024)).toFixed(2)}{" "}
                                  MB
                                </td>
                                <td>
                                  {moment(updateDate).diff(
                                    moment(item?.createdAt),
                                    "days"
                                  )}{" "}
                                  Days
                                </td>
                                <td>{item?.rate}%</td>
                                <td>{moment(item?.createdAt).format("l")}</td>
                                <td>
                                  <Button
                                    className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0"
                                    onClick={() =>
                                      handleUpdateBannerData(item?._id, true)
                                    }
                                  >
                                    {item?.forword_location}
                                  </Button>
                                </td>
                                <td>
                                  {" "}
                                  <Button
                                    className="mx-2 border bg-none text-dark border-dark"
                                    onClick={() => handleUpdate(item)}
                                  >
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        );
                      })
                    ) : (
                      <span>No Data Found</span>
                    )}
                  </tbody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="inactive_banner">
        <Row>
          <Col lg={12} className="">
            <div className="active_banner fw-bold d-flex">
              Inactive{" "}
              <Button className="bg-none border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#000"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </Button>
              <input
                placeholder="Search GPU"
                type="search"
                class="form-control w-25"
                onChange={(e) => handleSearch(e.target.value)}
              ></input>
            </div>
          </Col>
        </Row>
        <div className="table-responsive mb-5">
          <Table
            bordered
            striped
            className="align-middle graphic-table text-center"
          >
            <thead>
              <tr>
                <th className="text-start">
                  <Form.Check
                    className="d-inline me-2"
                    type="checkbox" 
                    checked={selectAllInActive}
                    onClick={(e) => handleSelectInActiveAll(e, true)}
                  />
                  <label>Select All</label>
                </th>
                <th onClick={() => InactivesortHere("name")}>
                  Name
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
                <th onClick={() => InactivesortHere("pixel_size")}>
                  Pixel Size
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
                <th onClick={() => InactivesortHere("file_size")}>
                  File Size
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
                <th onClick={() => InactivesortHere("createdAt")}>
                  Days Active
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
                <th onClick={() => InactivesortHere("rate")}>
                  Click Through Rate
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
                <th onClick={() => InactivesortHere("createdAt")}>
                  Date Created
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
                <th onClick={() => InactivesortHere()}>
                  Date Last used
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
              {inActiveBanner?.length > 0 ? (
                inActiveBanner?.map((item, i) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-end justify-content-between">
                          <Form.Check
                            className="d-inline"
                            type="checkbox"
                            checked={item?.isSelected}
                            onChange={(e) =>
                              handleinActiveCheck(
                                e.target.checked,
                                item?._id,
                                true
                              )
                            }
                          />
                          <img
                            src={`${imageUrl}${item.imageName}`}
                            style={{ width: "150px", height: "100px" }}
                          />

                          {imagePreview == i ? (
                            <Button
                              className="bg-none border-0"
                              onClick={() => setImagePreview()}
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
                              onClick={() => setImagePreview(i)}
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
                            setImagePreview();
                          }}
                        >
                          {imagePreview == i ? (
                            <div className="modal_custom_">
                              <div className="inner_customModal_one">
                                <Slider
                                  style={{ height: "100px", width: "200px" }}
                                  {...sliderSettings}
                                >
                                  {activeBanner?.map((item, i) => {
                                    return (
                                      // item?.imageName?.map((data) => {
                                      //     return (
                                      <img
                                        key={i}
                                        className="mx-auto d-block border"
                                        src={`${imageUrl}${item}`}
                                        effect="blur"
                                        height="100px"
                                        width="100px"
                                      />

                                      //     )
                                      // })
                                    );
                                  })}
                                </Slider>
                                {/* <img src={`${imageUrl}${item.imageName}`} style={{ width: "100%", height: "100%" }} /> */}
                              </div>
                            </div>
                          ) : null}
                        </OutsideClickHandler>
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.pixel_size}</td>
                      <td>{(item?.file_size / 1024).toFixed(2)} MB</td>
                      <td>
                        {moment(updateDate).diff(
                          moment(item?.createdAt),
                          "days"
                        )}{" "}
                        Days
                      </td>
                      <td>{item?.rate}%</td>
                      <td>{moment(item?.createdAt).format("l")}</td>
                      <td>{moment(item?.updatedAt).format("l")}</td>
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

      {/* start Add Banner Model */}
      <Modal
        className="add_banner_model"
        show={showAddBannerModel}
        backdrop="static"
        onHide={() => handleAddBannerClose()}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              onChange={(e) => handleBannerCategory(e.target.value)}
            >
              <option selected>Select Category</option>
              {bannerCategoryList?.map((item) => {
                return <option value={item._id}>{item.categoryName}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File Pixels</Form.Label>
            <Form.Control
              type="text"
              required
              disabled
              placeholder="Choose Category"
              value={filePixels}
              onChange={(e) => setFilepixels(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Forward Location Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setForwardLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Forward Location Link</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => handleImageLink(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group controlId="formFile" className="mb-3 ">
            <Form.Label>Image</Form.Label>
            <input
              className="custom-file-control"
              accept="image/*"
              type="file"
              required
              onChange={(e) => handlefileChange(e.target.files)}
            />{" "}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleAddBannerClose()}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={addImageLoader}
            onClick={handlesubmitBanner}
          >
            {addImageLoader ? "Please Wait..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* start Slider Model */}
      <Modal
        show={showTimerBannerModel}
        onHide={() => setShowTimerBannerModel(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Slider Timer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Timing(in MilliSecond.)</Form.Label>
            <Form.Control
              type="text"
              value={timing}
              onChange={(e) => handleTiming(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTimerBannerModel(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={sliderButtonLoader}
            onClick={handleBannerTimer}
          >
            {sliderButtonLoader ? "Please Wait..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* start Edit Banner Data */}
      <Modal
        className="add_banner_model"
        show={showBannerUpdateModal}
        backdrop="static"
        onHide={() => setShowBannerUpdateModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={validMain}
              onChange={(e) => setValidMain(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              // value={validCategory}
              onChange={(e) => handleValidBannerCategory(e.target.value)}
            >
              <option>{validCategory}</option>
              {bannerCategoryList?.map((item) => (
                <option value={item?._id}>{item?.categoryName}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File Pixels</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={validPixelSize}
              // onChange={(e) => setValidPixelSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Forward Location Name</Form.Label>
            <Form.Control
              type="text"
              value={validForwardLocationName}
              onChange={(e) => setValidForwardLocationName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Forward Location Link</Form.Label>
            <Form.Control
              type="text"
              defaultValue={validForwardLocationLink}
              onChange={(e) => handleValidImageLink(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 ">
            <Form.Label>Image</Form.Label>
            <input
              className="custom-file-control"
              accept="image/*"
              type="file"
              onChange={(e) => handleValidImage(e.target.files[0])}
            />

            {validShownImage ? (
              <img
                src={validShownImage}
                alt="banner"
                style={{ width: "150px", height: "100px", marginTop: "10px" }}
              />
            ) : (
              <img
                src={`${imageUrl}${validImage}`}
                alt="banner"
                style={{ width: "150px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowBannerUpdateModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={updateImageLoader}
            onClick={handleUpdateDataBanner}
          >
            {updateImageLoader ? "Please Wait..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
