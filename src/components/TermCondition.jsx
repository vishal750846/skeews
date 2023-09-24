import React from "react";
import { Button } from "react-bootstrap";
import Header from "./header";
const TermCondition = () => {
  const goBack = () => {
    window.history.back(); // Navigate back in the browser's history
  };
  return (
    <div>
      <Header />
      <div className="p-3">
      <p className="term_condition">
        The terms and conditions of an e-commerce platform website typically
        outline the rules and regulations governing the use of the website by
        customers and vendors. Here are some common provisions that you may find
        in the terms and conditions:
        <br />
        <br /> <b>Registration:</b> Users may need to create an account in order
        to use certain features of the website. The terms and conditions will
        outline the registration process and any requirements for creating an
        account.
        <br />
        <br />
        <b>Product listings:</b> Vendors may be required to follow certain
        guidelines when creating product listings, such as providing accurate
        descriptions and images of the product.
        <br /> Payments: The terms and conditions may outline the payment
        methods that are accepted on the website and any fees or charges that
        may apply.
        <br />
        <br /> <b>Shipping and delivery:</b> The terms and conditions may
        outline the shipping and delivery options that are available, as well as
        any restrictions or requirements that apply.
        <br />
        <br />
        <b>Returns and refunds:</b> The terms and conditions may outline the
        website's policy on returns and refunds, including any time limits or
        conditions that must be met.
        <br />
        <br /> <b>Intellectual property:</b> The website may have rules
        governing the use of its trademarks, logos, and other intellectual
        property. <br />
        <br />
        Prohibited activities: The terms and conditions may list activities that
        are prohibited on the website, such as fraud or misuse of the website's
        features. <br />
        <br /> <b>Limitation of liability:</b> The website may limit its
        liability for any damages that may arise from the use of the website.
        It's important to read and understand the terms and conditions of an
        e-commerce platform website before using it, as they may affect your
        rights and obligations when using the website.
      </p>
      </div>
      {/* <div className="d-flex justify-content-center">
        <Button className="mb-5 fs-3 p-3" onClick={goBack}>Go Back</Button>
      </div> */}
    </div>
  );
};

export default TermCondition;
