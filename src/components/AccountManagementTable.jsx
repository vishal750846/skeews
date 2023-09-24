import React, {useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
export default function AccountManagementTable(props) {
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  const [descriptionindex, setdescriptionindex] = useState();
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState(null);

  //  Sorting Table Data
  const sortHere = (key) => {
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = props.Data.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

console.log(props.Data)

  return (
    <div>
      <ToastContainer />
      <div className="product_list_table table-responsive mb-sm-5 mb-3">
        {props.Data2 == 0 ? (
          <div className="loader-icon" style={{ marginBlock: "80px" }}>
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          </div>
        ) : props.Data2 == 1 ? (
          <Table
            bordered
            striped
            className="align-middle text-center managment-table"
          >
            <thead>
              <tr>
                <th className="text-start">
                  <Form.Check
                    className="d-inline"
                    type="checkbox"
                    checked={props.selectCheckBox}
                    onChange={(e) => props.handleSelectAll(e)}
                  />{" "}
                  <label>Select All</label>
                </th>
                <th onClick={() => sortHere("chipset")}>
                  Chipset{" "}
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
                <th onClick={() => sortHere("brand")}>
                  Brand{" "}
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
                <th onClick={() => sortHere("series")}>
                  Series{" "}
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
                <th onClick={() => sortHere("model")}>
                  Model{" "}
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

                <th onClick={() => sortHere("_id")}>
                  ProductId{" "}
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
                <th onClick={() => sortHere("expiration")}>
                  Status{" "}
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
                <th onClick={() => sortHere("createdAt")}>
                  Created At{" "}
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
                <th onClick={() => sortHere("askAmount")}>
                  Price{" "}
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
              {props.Data?.map((val, i) => {
                return (
                  <tr>
                    <td>
                      <div className="d-flex align-items-end justify-content-between">
                        <Form.Check
                          className="d-inline"
                          type="checkbox"
                          checked={val?.isSelected}
                          onChange={(e) =>
                            props.handleCheck(e.target.checked, val?._id)
                          }
                        />{" "}
                        <img
                          src={`${imageUrl}${val?.productId?.image[0]}`}
                          style={{ width: "100px" }}
                          onClick={() =>
                            navigate(
                              `/product/${
                                val?.productId?._id
                                  ? val?.productId?._id
                                  : val?.productId
                              }`
                            )
                          }
                        />
                        {descriptionindex == i ? (
                          <Button
                            className="bg-none border-0"
                            onClick={() => setdescriptionindex()}
                          >
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
                        ) : (
                          <Button
                            className="bg-none border-0"
                            onClick={() => setdescriptionindex(i)}
                          >
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
                        )}
                      </div>

                      {descriptionindex == i ? (
                        <div className="modal_custom_">
                          <div className="inner_customModal_one">
                            <h3
                              dangerouslySetInnerHTML={{
                                __html: val.productId.description,
                              }}
                            ></h3>
                          </div>
                        </div>
                      ) : null}
                    </td>
                    <td>{val?.productId?.chipset}</td>
                    <td>{val?.productId?.brand}</td>
                    <td>{val?.productId?.series}</td>
                    <td>{val?.productId?.model}</td>
                    <td>{val?.productId?._id}</td>
                    <td>
                      {val?.askStatus ? (
                        <Button className="text-white btn btn-success">
                          Active
                        </Button>
                      ) : (
                        <Button className="text-white btn btn-danger">
                          Inactive
                        </Button>
                      )}
                    </td>
                    <td>{moment(val?.createdAt).format("L")}</td>
                    <td>{"$" + val?.askAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Table
            bordered
            striped
            className="align-middle text-center managment-table"
          >
            <thead>
              <tr>
                <th className="text-start">
                  <Form.Check
                    className="d-inline"
                    type="checkbox"
                    checked={props.selectCheckBox}
                    onChange={(e) => props.handleSelectAll(e)}
                  />{" "}
                  <label>Select All</label>
                </th>
                <th onClick={() => sortHere("chipset")}>
                  Chipset{" "}
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
                <th onClick={() => sortHere("brand")}>
                  Brand{" "}
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
                <th onClick={() => sortHere("series")}>
                  Series{" "}
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
                <th onClick={() => sortHere("model")}>
                  Model{" "}
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

                <th onClick={() => sortHere("_id")}>
                  Order No.{" "}
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
                <th onClick={() => sortHere("expiration")}>
                  Status{" "}
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
                <th onClick={() => sortHere("createdAt")}>
                  Order Date{" "}
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
                <th onClick={() => sortHere("askAmount")}>
                  Price{" "}
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
              <tr>No Data Found</tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
