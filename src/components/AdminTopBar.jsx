import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../../src/images/logo.png";

export default function AdminTopBar() {
  return (
    <div className="bg-custom-light border-bottom border-1 border-light px-3">
      <div className="d-flex align-items-center justify-content-between py-2">
        <img src={Logo} style={{ width: "150px" }} />
        <div className="d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#000"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              filerule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          <h5 className="ms-2 mb-0">Admin</h5>
        </div>
      </div>
    </div>
  );
}
