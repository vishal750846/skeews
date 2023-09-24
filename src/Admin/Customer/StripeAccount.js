import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Modal } from 'react-bootstrap'
import ExportApi from '../../api/ExportApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import {
    PaymentElement,
    useStripe, useElements, Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import StripeElement from '../../components/StripeElement';

const stripePromise = loadStripe('pk_test_51N5ispHPaRDrtdL2GeydDgCPMGxVg4i7NhYNw6IO1MgsghsqzAFzvZlrV5RPQUFLYIehV8CmPBN1IFKh7XMxjNnr00TT87qqvt');
const StripeAccount = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [account, setAccount] = useState("")
    const [cardBrand, setCardBrand] = useState()
    const [cardYear, setCardYear] = useState()
    const [cardMonth, setCardMonth] = useState()
    const [primaryAccountModel, setPrimaryAccountModel] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showPayoutModal, setShowPayoutModal] = useState(false)
    const [connectedAccountId, setConnectedAccountId] = useState()
    const [clientSecret, setClientSecret] = useState()
    const [paymentId, setPaymentId] = useState()
    const [payoutCardNumber, setPayoutCardNumber] = useState()
    const [defaultCardNumber, setDefaultCardNumber] = useState()
    const [defaultCardBrand, setDefaultCardBrand] = useState()
    const [defaultCardMonth, setDefaultCardMonth] = useState()
    const [defaultCardYear, setDefaultCardYear] = useState()
    const [cardNumber, setCardNumber] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [payoutBankName, setPayoutBankName] = useState()
    const [payoutsStatus, setPayoutsStatus] = useState()
    const[payoutExpireMonth,setPayoutExpireMonth] = useState()
    const[payoutExpireYear,setPayoutExpireYear] = useState()

    //handle for setup Payouts
    const handleStripeAccount = () => {
        setIsLoading(true);
        ExportApi.handleCard(params.id, email).then((resp) => {
            if (resp.data.message == "Account Created Successfully") {
                setShowPayoutModal(false)
                let data = resp.data.data
                console.log('Setup Payment Method',data)
                window.open(`${data.link}`, "_self")
                setIsLoading(false);
            } else if (resp.data.message == "Account Already Exists") {
                setShowPayoutModal(false)
                toast.error("Email already exists")
                setIsLoading(false);
            } else {
                toast.error(resp.data.message)
                setTimeout(() => {
                    if (resp.data.message == "Add payment information to place an order") {
                        navigate("/profile/" + params.id)
                    } else {
                        setShowPayoutModal(false)
                        toast.error(resp.data.message)
                        setIsLoading(false);
                    }
                }, 1000)
            }
        }).catch((err) => {
            setShowPayoutModal(false)
            console.log(err);
            setIsLoading(false);
        })
    }

    //get the specific user data
    const handleSingleUserData = () => {
        setIsLoading(true)
        ExportApi.getSingleUserData(params.id)
            .then((resp) => {
                if(resp.data.message == "user not found"){
                    window.dispatchEvent(new Event("Loginout"));
                }else{
                    let Data = resp.data.data;
                    setFirstName(Data.firstname);
                    setLastName(Data.lastname);
                    localStorage.setItem('Account_id', Data.stripe_account_id)
                    setIsLoading(false)
                }
            })
            .catch((err) => console.log(err));
    };

    //handle card Data
    const handleCardData = () => {
        setIsLoading(true)
        ExportApi.getCardData(params.id).then((resp) => {
            let data = resp.data.data
            console.log(data)
            setCardBrand(data?.brand)
            setCardYear(data?.exp_year)
            setCardMonth(data?.exp_month)
            setCardNumber(data?.lastFour)
            setDefaultCardNumber(data?.defaultCard?.card?.last4)
            setDefaultCardBrand(data?.defaultCard?.card?.brand)
            setDefaultCardMonth(data?.defaultCard?.card?.exp_month)
            setDefaultCardYear(data?.defaultCard?.card?.exp_year)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }

    //handle the setup payouts edit button
    const handleStripeConnectedaccount = () => {
        setIsLoading(true)
        ExportApi.getSingleUserData(params.id).then((resp) => {
            let Data = resp.data.data;
            setEmail(Data.email)
            setConnectedAccountId(Data.stripe_account_id)
            setEmail(Data.email)
            setIsLoading(false)
        })
    }
    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
        layout: {
            type: 'tabs',
            defaultCollapsed: false,
        }
    };

    //handle stripe card edit data
    const handleStripConnectedCardData = () => {
        setIsLoading(true)
        ExportApi.getStripeCardData(params.id).then((resp) => {
            let data = resp?.data?.data?.data[0]
            let data2 = resp?.data
            if(resp.data.data.data?.length <= 0){
                console.log(data2,'********')
                setPayoutCardNumber(data2?.last4)
                setPayoutBankName(data2?.brand)
                setPayoutsStatus(resp?.data?.isActive)
                setPayoutExpireMonth(data2?.exp_month)
                setPayoutExpireYear(data2?.exp_year)
                setIsLoading(false)
            }else{
                setPayoutCardNumber(data?.last4)
                setPayoutBankName(data?.bank_name)
                setPayoutsStatus(resp?.data?.isActive)
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }



    const handleEditPayouts = async () => {
        setIsLoading(true)
        if (localStorage.getItem('tokenuser')) {
            let data = JSON.parse(localStorage.getItem('tokenuser'))?.stripe_account_id
            if (data == undefined) {
                let Data = localStorage.getItem('Account_id')
                ExportApi.updateExpressStripeAccount(Data).then((resp) => {
                    let data = resp.data.data
                    setIsLoading(false)
                    window.open(`${data?.url}`, '_self')
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                ExportApi.updateExpressStripeAccount(data).then((resp) => {
                    let data = resp.data.data
                    setIsLoading(false)
                    window.open(`${data?.url}`, '_self')
                }).catch((err) => {
                    console.log(err)
                })
            }
        }

    }

    window.addEventListener("Loginout", () => {
        localStorage.clear();
        navigate("/");
      });

    useEffect(() => {
        handleCardData()
        handleStripeConnectedaccount()
        handleStripConnectedCardData()
        handleSingleUserData()
    }, [])

    const handlePaymentData = () => {
        setIsLoading(true)
        setShowPaymentModal(true)
        ExportApi.handleCardDetails(params.id).then((resp) => {
            if (resp.data.message == "Card added successfully") {
                setClientSecret(resp.data.data.data.client_secret);
                setPaymentId(resp.data.data.id)
                setIsLoading(false)
            } else {
                toast.error(resp.data.message)
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div>
            {
                isLoading ?
                    <div className="loader-icon" style={{ marginBlock: "80px" }}>
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    </div> :
                    <Row>
                        <Col xl={6} lg={12} md={12}>
                            <div className="payment_account_box">
                                <h2 className='fs-1 fw-300 mb-5 mt-3'>Payments & Payouts</h2>
                                <div class="line_one_box d-flex  align-items-center border-bottom mt-3">
                                    <p class="fs-5 fw-bold m-0 me-5">Payments</p>
                                    {
                                        cardBrand ?
                                            <p class="fs-5 fw-bold active_line m-0">Active</p> : <p class="fs-5 fw-bold inactive_line m-0">Inactive</p>
                                    }
                                </div>
                                {
                                    cardBrand ?
                                        <>
                                            <div className="line_one_box d-flex justify-content-between align-items-center mt-3">
                                                <p className='fs-5 fw-bold m-0 w-25'>Primary Payment Account:</p>
                                                <p className='fs-5 fw-bold m-0 w-25'>{cardBrand} Ending in {cardNumber} <br /> {firstname} {lastname} <br /> {cardMonth}/{cardYear}</p>
                                                <Button className='bg-transparent border-0 text-dark fs-5' onClick={() => setPrimaryAccountModel(true)}>Edit</Button>
                                            </div>
                                        </>
                                        :
                                        <div className='mt-3'>
                                            <Button className='fs-5 payment_btn text-black fw-bold' onClick={() => handlePaymentData()}>Set Up Payments</Button>
                                        </div>
                                }
                                <div class="line_one_box d-flex  align-items-center border-bottom mt-3">
                                    <p class="fs-5 fw-bold m-0 me-5">Payouts</p>
                                    {
                                        payoutsStatus ?
                                            <p class="fs-5 fw-bold active_line m-0">Active</p> :
                                            <p class="fs-5 fw-bold inactive_line m-0">Inactive</p>
                                    }
                                </div>
                                {
                                    payoutsStatus ?
                                        <div className="line_one_box d-flex justify-content-between align-items-center mt-3">
                                            <p className='fs-5 fw-bold m-0 w-25'>Payout Account:</p>
                                            {
                                                payoutBankName ?
                                                    <p className='fs-5 fw-bold m-0 w-25'>{payoutBankName} ending in {payoutCardNumber} <br /> {firstname} {lastname}</p> : ""
                                            }
                                            <Button className='bg-transparent border-0 text-dark fs-5' onClick={handleEditPayouts}>Edit</Button>
                                        </div> :
                                        <div className='mt-3'>
                                            <Button className='fs-5 payment_btn text-black fw-bold' onClick={handleStripeAccount}>Set Up Payouts</Button>
                                        </div>
                                }
                                <div className='mt-5'>
                                    <span>Buyers-Must have an Active Payments Status</span>
                                </div>
                                <div className='mt-3'>
                                    <span>Sellers-Must have an Active Payments and Payouts Status</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}></Col>
                    </Row>
            }


            {/* Model start Primary Payment Account */}
            <Modal show={primaryAccountModel} size='lg' onHide={() => setPrimaryAccountModel(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Primary Payment Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StripeElement />
                </Modal.Body>
            </Modal>
            {/* Model End Primary Payment Account */}

            {/* Model start Set Payments Account */}
            <Modal show={showPaymentModal} size='lg' onHide={() => setShowPaymentModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Payment Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm clientSecret={clientSecret} paymentId={paymentId} id={params.id} />
                        </Elements>
                    )}
                </Modal.Body>
            </Modal>
            {/* Model End Set Payments Account */}

        </div>
    )
}

function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: 'https://skewws.com/stripeconnectaccount/'+props.id,
            },
        });
        if (error) {
            if (error.message == "Card added successfully") {
                toast.success(error.message)
            } else {
                toast.error(error.message)
            }
        }

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message);
            } else {
                setMessage('An unexpected error occurred.');
            }
        }


        setIsLoading(false);
    };

    useEffect(() => {
        if (!stripe) {
            return;
        }
        let clientSecret = props.clientSecret
        if (!clientSecret) {
            return;
        }

        stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
            switch (setupIntent.status) {
                case 'succeeded':
                    setMessage('Success! Your payment method has been saved.');
                    break;

                case 'processing':
                    setMessage("Processing payment details. We'll update you when processing is complete.");
                    break;

                case 'requires_payment_method':
                    setMessage('Failed to process payment details. Please try another payment method.');
                    break;
            }
        });
    }, [stripe]);

    const paymentElementOptions = {
        layout: "tabs"
    }



    return (
        <form id="payment-form" onSubmit={handleSubmit}>
          
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Add Payment Method"}
                </span>
            </button>
        </form>
    );
}

export default StripeAccount