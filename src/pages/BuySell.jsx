import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import GraphicTab from "../components/GraphicTab";
import Header from "../components/header";
export default function BuySell() {
  return (
    <div>
      <Row>
        {/* <Header /> */}
        <Col lg={12} className="text-center mx-auto">
          <h2 className="fs-1 fw-bold my-5">Pro Buy / Sell Tool</h2>
          <div className="tab-data">
            <Tabs
              defaultActiveKey="graphics-cards"
              id="fill-tab-example"
              className="my-5 border-0 buyselltab mx-auto"
              fill
            >
              <Tab eventKey="graphics-cards" title="Graphics Cards">
                <GraphicTab />
              </Tab>
              <Tab eventKey="moniters" title="Moniters">
                <GraphicTab />
              </Tab>
              <Tab eventKey="cases" title="Cases">
                <GraphicTab />
              </Tab>
              <Tab eventKey="cpu" title="CPU">
                <GraphicTab />
              </Tab>
              <Tab eventKey="ram" title="Ram">
                <GraphicTab />
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
}
