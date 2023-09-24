import React, { useState } from "react";
import Ls2 from "../../src/images/ls2.png";
import { Form } from "react-bootstrap";
import Heart from "react-heart";
import { useNavigate } from "react-router-dom";
export default function Singleproduct(props) {
  const [val, setval] = useState(props.Data);
  const [active, setActive] = useState(false);
  let navigate = useNavigate();
  return (
    <div>
      <div className="inner-pro-cont border p-3 position-relative">
        <p className="up-text position-absolute fw-bold"> {val?.brand}</p>
        <img src={Ls2} onClick={() => navigate(`/bidask/${val._id}`)} />

        <p className="d-flex align-items-center w-full mb-0">
          {val.model}
          <Heart
            isActive={val.isfav}
            onClick={() =>
              props.handleFevButton(!val.isfav, val._id, props.index)
            }
            animationScale={1.25}
            style={{ marginBottom: "1rem", width: "18px" }}
          />
        </p>
        <p className="mb-0" onClick={() => navigate(`/bidask/${val._id}`)}>
          {val.chipset}
        </p>
        {/* <p className="mb-0">Gamling X Trlo 12G</p> */}

        <div className="bl-text">
          <p className="mb-0">Condition:Used . </p>
          <p className="mb-0" onClick={() => navigate(`/bidask/${val._id}`)}>
            {val.condition}{" "}
          </p>
        </div>
        <h2 className="text-center fw-bold mt-3">
          ${val.new_retail_market_price}
        </h2>
        <div className="text-end">
          <label className="form-check-label" for="exampleCheck1">
            Compare
          </label>
          <input
            type="checkbox"
            className="form-check-input ms-2"
            id="exampleCheck1"
          />
        </div>
      </div>
    </div>
  );
}
