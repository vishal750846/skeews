import React from "react";
import { Accordion, Nav, Form, Button } from "react-bootstrap";
import SidebarMenu from "react-bootstrap-sidebar-menu";

export default function Sidebar() {
  return (
    <div className="mt-sm-5 mt-3 border mb-sm-5">
      <Accordion defaultActiveKey="0" className="sidebar-accordian">
        <Accordion.Item eventKey="0" className="border-0 outline-none">
          <Accordion.Header>Condition</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="New" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="New -2nd Hand" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Used" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-0 outline-none">
          <Accordion.Header>Chipset</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="AMD" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Intel" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="NVIDIA" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="border-0 outline-none">
          <Accordion.Header>Brand</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="ASUS" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="NVIDIA" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Shaphire Tech" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className="border-0 outline-none">
          <Accordion.Header>Series</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RTX 40 Series" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RTX 40 Series" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RTX 40 Series" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className="border-0 outline-none">
          <Accordion.Header>Modal</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RTX 40 Series" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RTX 30 Series" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Geforce RX 6000 Series" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5" className="border-0 outline-none">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$25 - $50" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$50 - $75" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$75 - $100" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$100 - $150" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$150 - $200" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="$200 - $250" />
            </Form.Group>
            <Button className="bg-none border-0 p-0 text-dark">
              <span className="d-inline me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </span>{" "}
              Show More
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
