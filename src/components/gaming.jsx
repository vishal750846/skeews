import React from "react";
import { Container } from "react-bootstrap";
import ls2 from "../../src/images/ls2.png";

export default function gaming() {
  return (
    <div className="gaming py-5">
      <Container>
        <div className="d-flex">
          <div>
            <h2>
              VR gaming with friends:
              <br />
              Discover what's possible
            </h2>
            <p className="text-uppercase">weekend sale</p>
            <p className="text-uppercase fs-1">20% off</p>
          </div>

          <div className="ms-auto">
            <img src={ls2} />
          </div>
        </div>
      </Container>
    </div>
  );
}
