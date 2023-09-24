import React, { useState, useEffect } from 'react'
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe, useElements, Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import ExportApi from '../api/ExportApi';
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { Button } from 'react-bootstrap';
const StripeElement = () => {
    const params = useParams()
    const [clientSecret, setClientSecret] = useState()
    const [paymentId, setPaymentId] = useState()
    const [cardEmail, setCardEmail] = useState('');
    const stripePromise = loadStripe('pk_test_51N5ispHPaRDrtdL2GeydDgCPMGxVg4i7NhYNw6IO1MgsghsqzAFzvZlrV5RPQUFLYIehV8CmPBN1IFKh7XMxjNnr00TT87qqvt');


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

    useEffect(() => {
        ExportApi.handleCardDetails(params.id).then((resp) => {
            setClientSecret(resp.data.data.data.client_secret);
            setPaymentId(resp.data.data.id)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleSingleUserData = () => {
        ExportApi.getSingleUserData(params.id)
            .then((resp) => {
                let Data = resp.data.data;
                setCardEmail(Data.email);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        handleSingleUserData()
    }, [])
    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm clientSecret={clientSecret} paymentId={paymentId} id={params.id} email={cardEmail} />
                </Elements>
            )}
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

        // console.log('Payment', props.paymentId);


        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: 'http://skewws.com/stripeconnectaccount/' + props.id,
            },
        });

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


    let email = props.email;
    const getOptions = {
        defaultValues: {
            email: email
        }
    }


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                options={getOptions}
            />
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className='btn btn-primary' disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Add Payment Method"}
                </span>
            </button>
        </form>
    );
}

export default StripeElement