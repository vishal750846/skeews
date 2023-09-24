import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import Ls2 from "../../src/images/ls2.png";

export default function GraphicTable() {
  return (
    <div>
      <div className="table-responsive mb-5">
        <Table bordered striped className="align-middle graphic-table">
          <thead>
            <tr>
              <th className="text-start">
                <Form.Check className="d-inline me-2" type="checkbox" />
                <label>Select All</label>
              </th>
              <th>
                Chipset
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Brand
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Series
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Model
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Inventory
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Market Price
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Buy Spread
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Sell Spread
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Spread
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Highest Bid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Lowest Ask
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
              <th>
                Your Ask/Bid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    filerule="evenodd"
                    d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="float-end">New</span>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>
                <Button className="border bg-danger">Sell Now - $260</Button>
              </td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>
                <Button className="border bg-none text-dark border-dark">
                  Place Bid/Ask
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <span className="float-end">2nd hand</span>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>
                <Button className="border bg-danger">Sell Now - $260</Button>
              </td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>
                <Button className="border bg-none text-dark border-dark">
                  Place Bid/Ask
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <span className="float-end">Used</span>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>
                <Button className="border bg-danger">Sell Now - $260</Button>
              </td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>
                <Button className="border bg-none text-dark border-dark">
                  Place Bid/Ask
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>
                <Button className="border bg-danger">Sell Now - $260</Button>
              </td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>
                <Button className="border bg-none text-dark border-dark">
                  Place Bid/Ask
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Retail Only</td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>Retail Only</td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <Form.Check className="d-inline" type="checkbox" />{" "}
                  <img src={Ls2} style={{ width: "70px" }} />
                  <Button className="bg-none border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0000ff"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        filerule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
              <td>Nvidia</td>
              <td>MSI</td>
              <td>RTX 3080Ti</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>Gaming X</td>
              <td>
                <Button className="border bg-danger">Sell Now - $260</Button>
              </td>
              <td className="text-end">
                <Button className="border bg-success">Buy Now - $260</Button>
                <Button className="bg-none border-0 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0000ff"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      filerule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </td>
              <td>
                <div className="border bg-none border-dark rounded py-2 px-1">
                  {" "}
                  <span>
                    <Button className="bg-success-500 text-success border-0 rounded px-2 py-1">
                      $200
                    </Button>
                  </span>
                  <span className="ms-2">
                    <Button className="bg-danger-500 text-danger border-0 rounded px-2 py-1">
                      $260
                    </Button>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
