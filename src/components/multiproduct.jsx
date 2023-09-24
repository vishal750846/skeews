import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import ls2 from "../../src/images/ls2.png";
import Watch from "../../src/images/watch.png";

export default function multiproduct() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs="12" sm="6">
            <div className="d-flex lft-product align-items-center rounded p-4">
              <div>
                <p className="text-white">
                  Best Drones
                  <br /> Aderaline Junkies{" "}
                </p>
                <a
                  className="text-uppercase text-white text-decoration-none d-flex align-items-center"
                  href="#"
                >
                  shop now{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-caret-right"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                  </svg>
                </a>
              </div>
              <div className="ms-auto">
                <img src={ls2} />
              </div>
            </div>
          </Col>

          <Col xs="12" sm="6">
            <div className="d-flex ryt-product align-items-center rounded p-4">
              <div>
                <p className="">
                  Sports watches for
                  <br /> Men and Women
                </p>
                <a
                  className="text-uppercase text-black text-decoration-none d-flex align-items-center"
                  href="#"
                >
                  shop now{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-caret-right"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                  </svg>
                </a>
              </div>
              <div className="ms-auto">
                <img className="watch-img" src={Watch} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
