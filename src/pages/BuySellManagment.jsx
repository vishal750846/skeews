import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import BuyingTab from "../components/BuyingTab";
import FavoriteTab from "../components/FavoriteTab";
import SellingTab from "../components/SellingTab";
import PendingTable from "../components/PendingTable";
import HistoryTable from "../components/HistoryTable";
import { useLocation } from "react-router-dom";

export default function BuySellManagment() {
  // Get the current location using the useLocation hook
  let Location = useLocation();
  return (
    <div>
      <Container>
        <Row>
          <Col lg={12} className="mt-sm-5 mt-3">
            <div className="account-management-tab">
              {/* Conditionally render components based on the current location */}
              {Location.pathname == "/buySellManagment/selling" ? (
                <SellingTab />
              ) : null}
              {Location.pathname == "/buySellManagment/buying" ? (
                <BuyingTab />
              ) : null}
              {Location.pathname == "/buySellManagment/pending" ? (
                <PendingTable />
              ) : null}
              {Location.pathname == "/buySellManagment/history" ? (
                <HistoryTable />
              ) : null}
              {Location.pathname == "/buySellManagment/setting" ? (
                <BuyingTab />
              ) : null}
              {Location.pathname == "/buySellManagment/favorites" ? (
                <FavoriteTab />
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}
