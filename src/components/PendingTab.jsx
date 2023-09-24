import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import PendingTable from "./PendingTable";
import { useState } from "react";

export default function PendingTab() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Row>
        <Col lg={12} className="mt-sm-5 mt-2">
          <div className="text-sm-end text-center">
            <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">
              Ready to ship
            </Button>
            <Button className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0">
              Print shipping label
            </Button>
            <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">
              Filter
            </Button>
          </div>
        </Col>
        <Col lg={12} className="mt-sm-5 mt-2">
          <PendingTable show={showModal} />
        </Col>
      </Row>
    </div>
  );
}
