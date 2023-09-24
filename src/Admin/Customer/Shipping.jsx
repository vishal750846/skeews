import React from 'react'
import { useState } from 'react'
import { Col, Row, Button, Modal, Form } from 'react-bootstrap'
import ExportApi from '../../api/ExportApi'
import { useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";
const Shipping = () => {
    const [showPackageModel, setShowPackageModel] = useState()
    const [showEmailModal, setShowEmailModal] = useState()
    const [id, setId] = useState()
    const [length, setLength] = useState('18in')
    const [breadth, setBreadth] = useState('12in')
    const [height, setHeight] = useState('6in')
    const [weight, setWeight] = useState('6in')
    const [validLength, setValidLength] = useState('')
    const [validBreadth, setValidBreadth] = useState('')
    const [validHeight, setValidHeight] = useState('')
    const [validWeight, setValidWeight] = useState('')
    const [state, setState] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [zipCode, setZipCode] = useState()
    const [validState, setValidState] = useState()
    const [validStreet, setValidStreet] = useState()
    const [validCity, setValidCity] = useState()
    const [validCountry, setValidCountry] = useState()
    const [validZipCode, setValidZipCode] = useState()
    const [isLoading, setLoading] = useState(false);
    const [showPackageLoader, setShowPackageLoader] = useState(false)
    const[addressButtonLoader,setAddressButtonLoader] = useState(false)


    const admin = localStorage.getItem("admin");
    // const admin_id = admin?.id
    const parsed_admin = JSON.parse(admin)
    const admin_id = parsed_admin?.id
    console.log(admin_id);


    //to update the package dimensions
    const handleUpdatePackage = () => {
        let updatedHeight = parseInt(validHeight)
        setShowPackageLoader(true)
        if (
            !validBreadth ||
            !updatedHeight||
            !validLength ||
            !validWeight
        ) {
            toast.error("All Fields are required");
            setShowPackageLoader(false)
            return;
        }
        ExportApi.handleUpdatePackage(id, validLength, validBreadth, updatedHeight, validWeight).then((resp) => {
            if (resp.data.message == "Data updated sucessfully") {
                toast.success('Package successfully updated')
                setShowPackageModel(false)
                setShowPackageLoader(false)
                getPackageData(admin_id)
            } else {
                toast.error(resp.data.message)
                setShowPackageLoader(false)
            }
        }).catch((err) => {
            console.log(err)
            // window.dispatchEvent(new Event("Loginout"));
        })
    }
    //to updtdate the address
    const handleUpdateAddress = () => {
        setAddressButtonLoader(true)
        if (
            validStreet.trim() === "" ||
            validCity.trim() === "" ||
            validState.trim() === "" ||
            validCountry.trim() === "" 
          ) {
            toast.error("Address fields cannot be empty or not contain spaces");
            setAddressButtonLoader(false)
            return;
          }
          const postalCodeRegex = /^\d{5}(-\d{4})?$/;

          if (!postalCodeRegex.test(validZipCode)) {
              toast.error('Postal Code must be 5 digits or in the format "12345" or "12345-6789"');
              setAddressButtonLoader(false);
              return;
          }
          
        if (localStorage.getItem('admin')) {
            let id = JSON.parse(localStorage.getItem('admin')).id
            ExportApi.handleUpdateAddress(id, validStreet, validCity, validState, validCountry, validZipCode).then((resp) => {
                console.log(resp.data)
                if(resp.data.message == "Data updated Sucessfully"){
                    let data = resp.data.result.shipping_address
                    toast.success('Address Updated Successfully')
                    setShowEmailModal(false)
                    setCity(data?.city)
                    setState(data?.state)
                    setStreet(data?.street)
                    setCountry(data?.country)
                    setZipCode(data?.zip_code)
                    setAddressButtonLoader(false)
                    getPackageData(admin_id)
                }else{
                    toast.error(resp.data.message)
                    setAddressButtonLoader(false)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    //to get the package data and address data
    const getPackageData = (admin_id) => {
        setLoading(true)
        ExportApi.getPackageData(admin_id).then((resp) => {
            let data = resp.data.data
            // console.log(data);
            // return
            setId(data._id)
            setLength(data.length)
            setBreadth(data.breadth)
            setHeight(data.height)
            setWeight(data.weight)
            setValidLength(data.length)
            setValidBreadth(data.breadth)
            setValidHeight(data.height)
            setValidWeight(data.weight)
            setStreet(data?.shipping_address?.street)
            setValidStreet(data?.shipping_address?.street)
            setCity(data?.shipping_address?.city)
            setValidCity(data?.shipping_address?.city)
            setState(data?.shipping_address?.state)
            setValidState(data?.shipping_address?.state)
            setZipCode(data?.shipping_address?.postal_code)
            setValidZipCode(data?.shipping_address?.postal_code)
            setCountry(data?.shipping_address?.country)
            setValidCountry(data?.shipping_address?.country)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    //number validation for the length
    const handleNumberChange = (target) => {
        var numbers = /^[0-9]+$/;
        if (!target.value.match(numbers)) {
            setValidLength(validLength);
            if(validLength?.length <= 1){
                setValidLength('')
            }
        } else {
            setValidLength(target.value);
        }
    };
    
    //number validation for the breadth
    const handleBreadth = (target) => {
        var numbers = /^[0-9]+$/;
      if(!target.value.match(numbers)){
        setValidBreadth(validBreadth)
        if(validBreadth?.length <= 1){
            setValidBreadth('')
        }
      }else{
        setValidBreadth(target.value)
      }
    };
    //number validation for the Height
    const handleHeight = (target) => {
        var numbers = /^[0-9]+$/;
      if(!target.value.match(numbers)){
        setValidHeight(validHeight)
        if(validHeight?.length <= 1){
            setValidHeight('')
        }
      }else{
        setValidHeight(target.value)
      }
    };
    //number validation for the weight
    const handleWeight = (target) => {
        var numbers = /^[0-9]+$/;
      if(!target.value.match(numbers)){
        setValidWeight(validWeight)
        if(validWeight?.length <= 1){
            setValidWeight('')
        }
      }else{
        setValidWeight(target.value)
      }
    };

    // window.addEventListener("Loginout", () => {
    //     localStorage.clear();
    //     navigate("/");
    //   });
    
    useEffect(() => {
        getPackageData(admin_id)
    }, [])

    //Implement the loader on full page
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
            <ToastContainer />
            <Row>
                <Col xl={6} lg={12} md={12}>
                    <div className="profile_box">
                        <h2 className='fs-1 fw-300 mb-5 mt-3'>Shipping</h2>
                        <div className="line_one_box d-flex justify-content-start align-items-center border-bottom mt-3">
                            <p className='fs-5 fw-bold m-0 w-25'>Default Package:</p>
                            <p className='fs-5 fw-bold m-0 w-75'>{length} * {breadth} * {height} &nbsp; {weight}</p>
                            <Button className='bg-transparent border-0 text-dark fs-5' onClick={() => setShowPackageModel(true)}>Edit</Button>
                        </div>
                        <div className="line_one_box d-flex justify-content-between align-items-center border-bottom mt-3">
                            <p className='fs-5 fw-bold m-0 w-25'>Default Address:</p>
                            <p className='fs-5 fw-bold m-0 w-75 '>{street}, {city},{state} {zipCode},{country}</p>
                            <Button className='bg-transparent border-0 text-dark fs-5' onClick={() => setShowEmailModal(true)}>Edit</Button>
                        </div>
                    </div>
                </Col>
                <Col lg={6}></Col>
            </Row>

            {/* Start Package Model */}
            <Modal show={showPackageModel} onHide={() => setShowPackageModel(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Length</Form.Label>
                        <Form.Control type="text" placeholder="Enter Package Length" value={validLength}onChange={(e) => handleNumberChange(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Breadth</Form.Label>
                        <Form.Control type="text" placeholder="Enter Package Breadth" value={validBreadth} onChange={(e) => handleBreadth(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="text" placeholder="Enter Package Height" value={validHeight} onChange={(e) => handleHeight(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" placeholder="Enter Package Weight" value={validWeight} onChange={(e) => handleWeight(e.target)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPackageModel(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={showPackageLoader} onClick={handleUpdatePackage} >
                        {showPackageLoader ? 'Please Wait...' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* End Package Model */}


            {/* Start the deafult address */}
            <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street" value={validStreet} onChange={(e) => setValidStreet(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" value={validCity} onChange={(e) => setValidCity(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" value={validState} onChange={(e) => setValidState(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Country" value={validCountry} onChange={(e) => setValidCountry(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Postal Code" value={validZipCode} onChange={(e) => setValidZipCode(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={addressButtonLoader} onClick={handleUpdateAddress} >
                        {addressButtonLoader ? 'Please Wait ...':'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* End the default Address */}

        </div>
    )
}

export default Shipping