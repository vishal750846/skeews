import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import ExportApi from "../../api/ExportApi";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
export default function AddInventory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setvalue] = useState("");
  const [ProductNamevalue, setProductNamevalue] = useState("");
  const [ProductData, setProductData] = useState();
  const [ProductData1, setProductData1] = useState();
  const [QTY, setQTY] = useState("");
  const [Total, setTotal] = useState("");
  const [productName, setProductName] = useState(false);
  const [Unit, setUnit] = useState("");
  const[buttonLoader,setButtonLoader] = useState(false)
  const [Data, setData] = useState({
    ProductName: "",
    SKU: "",
    Condition: "",
    Invertory: 0,
    Ordernumber: "",
    OrderNotes: "",
    Supplier: "",
    QTY: "",
    Total: "",
    Unit: "",
  });

  //Start to calculate the qty and price
  const handleDivaide = (e) => {
    setTotal(e);
    let Divaide = e / QTY;
    Data.QTY = QTY;
    Data.Unit = Divaide;
    setUnit(Divaide);
  };
  const handleMulti = (e) => {
    setUnit(e);
    let Divaide = e * QTY;
    Data.Total = Divaide;
    Data.QTY = QTY;
    setTotal(Divaide);
  };
  //end to calculate the qty and price

  //for submit the inventory
  const handleSubmit = () => {
    setButtonLoader(true)
    if (Data.Ordernumber == "") {
      toast.error("Please Select Order Number");
      setButtonLoader(false)
    } else if (Data.Supplier == "") {
      toast.error("Supplier Cannot be Empty");
      setButtonLoader(false)
    } else if (QTY == "") {
      toast.error("New Inventory Cannot be Empty");
      setButtonLoader(false)
    } else if (Total == "") {
      toast.error("Total Cost Cannot be Empty");
      setButtonLoader(false)
    } else if (Unit == "") {
      toast.error("Unit cannot be Empty");
      setButtonLoader(false)
    } else {
      ExportApi.GetAllProductinventory(
        JSON.parse(localStorage.getItem("admin"))?.id,
        Data,
        id,
        Unit,
        Total,
        QTY
      )
        .then((resp) => {
          toast.success("inventory created successfully");
          setButtonLoader(false)
          navigate("/Productlist");
        })
        .catch((err) => console.log(err));
    }
  };

  const HandleGetData = () => {
    ExportApi.GetAllProductUserid(JSON.parse(localStorage.getItem("admin"))?.id)
      .then((resp) => {
        setProductData(resp.data.details);
        setProductData1(resp.data.details);
      })
      .catch((err) => console.log(err));
  };

  //for the pre populated Data
  const handleGetSignleProductData = () => {
    ExportApi.GetSingleProductData(id)
      .then((resp) => {
        let data = resp.data.Data;
        setProductNamevalue(`${data.brand} ${data.series} ${data.model}`);
        Data.SKU = data.sku;
        setData({ ...Data });
        let condition;
        if (data.type == 1) {
          condition = "New";
        } else if (data.type == 2) {
          condition = "2nd Hand";
        } else {
          condition = "Used";
        }
        Data.Condition = condition;
        setData({ ...Data });

        Data.Invertory = data.inventory;
        setData({ ...Data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    HandleGetData();
    handleGetSignleProductData();
  }, []);
  const handleOnFocus = () => {
    setvalue(true);
  };

  //for the Product Name
  const handleOnSearch = (string) => {
    if (string == "" || string == " ") {
      setProductName(false);
      Data.ProductName = string;
      setData({ ...Data });
    } else {
      let data = ProductData?.filter(
        (val, i) =>
          val.productname.toLowerCase().includes(string) ||
          val.productname.toUpperCase().includes(string)
      );
      setProductName(true);
      setProductData1(data);
    }
  };

  // to handle the sku
  const handleSku = (e) => {
    Data.SKU = e.target.value;
    setData({ ...Data });
  };

  //to handle the condition
  const handleCondition = (e) => {
    Data.Condition = e.target.value;
    setData({ ...Data });
  };

  const handleProductName = (e) => {
    handleOnSearch(e.target.value);
    setProductNamevalue(e.target.value);
  };

  // to handle the Inventory
  const handleInventory = (e) => {
    Data.Invertory = e.target.value;
    setData({ ...Data });
  };

  const handleOnSelectChipset = (item, name, data) => {
    Data.ProductName = item;
    setData({ ...Data });
    setProductNamevalue(name);
    setProductName(false);
  };

  const handleemptyInventory = () => {
    let confirm = window.confirm("Are You Want to Sure to cancel ");
    if (confirm) {
      navigate("/productlist");
    }
  };

  const handleNewInventory = (e) => {
    setQTY(e.target.value);
    if (e.target.value?.length === 0) {
      setTotal("");
      setUnit("");
      setQTY("");
    }
  };

  return (
    <div className="mt-5" style={{ marginLeft: "30px" }}>
      <ToastContainer />
      <h2 className="mb-5 fw-bold">Add Inventory</h2>
      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name format: Brand, Series, Model"
              value={ProductNamevalue}
              disabled
              onChange={(e) => {
                handleProductName(e);
              }}
              onFocus={() => setProductName(false)}
            />
            {productName ? (
              <>
                <ListGroup as="ul" className="my-list custom_form_width">
                  {" "}
                  {ProductData1?.map((val, i) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        key={i}
                        onClick={() =>
                          handleOnSelectChipset(val._id, val.productname, val)
                        }
                      >
                        {val.productname}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">SKU</Form.Label>
            <Form.Control
              type="text"
              placeholder="SKU"
              disabled
              value={Data.SKU}
              onChange={(e) => handleSku(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">Condition</Form.Label>
            <Form.Control
              type="text"
              disabled
              placeholder="New-Retail, New-2nd Hand, or Used"
              value={Data.Condition}
              onChange={(e) => handleCondition(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">Inventory</Form.Label>
            <Form.Control
              type="text"
              placeholder="Existing Inventory Qty Populates"
              disabled
              value={Data.Invertory}
              onChange={(e) => handleInventory(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">New Inventory QTY</Form.Label>
            <Form.Control
              type="number"
              value={QTY}
              placeholder="Enter QTY to add"
              onChange={(e) => handleNewInventory(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">
              Total Cost of Inventory
            </Form.Label>
            <Form.Control
              type="number"
              value={Total}
              onChange={(e) => handleDivaide(e.target.value)}
              placeholder="Enter Total Cost of Inventory inci Shipping"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">
              Unit Cost of Inventory
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Unit Cost of Inventory inci Shipping"
              value={Unit}
              onChange={(e) => handleMulti(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">Supplier</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Supplier Name"
              onChange={(e) => {
                Data.Supplier = e.target.value;
                setData({ ...Data });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">
              Invoice/Order number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Invoice number"
              value={Data.Ordernumber}
              onChange={(e) => {
                Data.Ordernumber = e.target.value;
                setData({ ...Data });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-6">Order Notes</Form.Label>
            <Form.Control
              type="text"
              value={Data.OrderNotes}
              onChange={(e) => {
                Data.OrderNotes = e.target.value;
                setData({ ...Data });
              }}
              placeholder=""
            />
          </Form.Group>
              <div className="mb-4">
          <Button
            variant="success"
            type="submit"
            className="px-5 fw-bold fs-5"
            disabled={buttonLoader}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="danger"
            type=""
            className="px-5 fw-bold fs-5 inventory_save_button"
            onClick={handleemptyInventory}
          >
            Cancel
          </Button>
              </div>
        </Col>
      </Row>
    </div>
  );
}
