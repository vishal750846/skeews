import React from "react";
import { Button } from "react-bootstrap";
import Header from "./header";
const PrivacyPolicy = () => {
  const goBack = () => {
    window.history.back(); // Navigate back in the browser's history
  };
  return (
    <div>
      <Header />
      <div className="p-3">
      <p className="privacy_policy">
        The privacy policies of an e-commerce platform website typically outline
        how the website collects, uses, and protects personal information from
        its customers. Here are some common provisions that you may find in the
        privacy policies:
        <br />
        <br />
        <b>Types of information collected:</b> The website may collect various
        types of personal information, such as name, address, email address, and
        payment information.
        <br />
        <br />
        <b>How information is collected:</b> The website may collect information
        through various methods, such as when a user creates an account, places
        an order, or interacts with the website.
        <br />
        <br />
        <b>How information is used:</b> The website may use personal information
        for various purposes, such as to process orders, provide customer
        support, and improve the website's services.
        <br />
        <br />
        <b>Disclosure of information:</b> The website may share personal
        information with third-party service providers or partners, such as
        payment processors or shipping companies.
        <br />
        <br />
        <b>Cookies and tracking:</b> The website may use cookies and other
        tracking technologies to collect information about user activity on the
        website.
        <br />
        <br />
        <b>Security measures:</b> The website may implement security measures to
        protect personal information from unauthorized access or disclosure.
        <br />
        <br />
        <b>Access and control:</b> The website may provide users with options to
        access, correct, or delete their personal information.
        <br />
        <br />
        <b>Children's privacy:</b> The website may have specific policies
        regarding the collection and use of personal information from children
        under the age of 13.
        <br />
        <br />
        It's important to read and understand the privacy policies of an
        e-commerce platform website before using it, as they may affect how your
        personal information is collected, used, and protected.
        <br />
        <br />
      </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
