import React from "react";
import { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import ExportApi from "../api/ExportApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const HistoryTable = () => {
  const navigate = useNavigate();
  let imageUrl = "https://api.skewws.com/resources/";
  const [sellerHistoryData, setSellerHistoryData] = useState();
  const [buyerHistoryData, setBuyerHistoryData] = useState();
  const [currentSortKey, setCurrentSortKey] = useState(null);
  const [currentSortOrder, setCurrentSortOrder] = useState(1);
  //  Sorting Table Data
  const sortHere = (key) => {
    console.log("Order Sorting", key);
    const sortOrder = key === currentSortKey ? -currentSortOrder : 1;
    const sortedProducts = Data2.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortOrder;
      if (a[key] > b[key]) return sortOrder;
      return 0;
    });
    setCurrentSortKey(key);
    setCurrentSortOrder(sortOrder);
  };

  const HandleHistoryData = (id) => {
    ExportApi.getPendingData(id)
      .then((resp) => {
        let data = resp.data.Data;
        console.log("data", data);
        let SellerCompleteOrderData = data?.sellerOrderlist?.filter(
          (item) =>
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Failed to Ship" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Sale Complete" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Item returned"
        );

        setSellerHistoryData(SellerCompleteOrderData);
        let BuyerCompleteOrderData = data?.buyerOrderlist?.filter(
          (item) =>
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Delivered" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Payment Failed" ||
            item?.deliveryStatusId?.deliveryStatusForSeller?.status ==
              "Refunded"
        );
        setBuyerHistoryData(BuyerCompleteOrderData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSingleUserData = (id) => {
    ExportApi.getSingleUserData(id)
      .then((resp) => {
        if (resp.data.message == "user not found") {
          window.dispatchEvent(new Event("Loginout"));
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  window.addEventListener("Loginout", () => {
    localStorage.clear();
    navigate("/");
  });

  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      HandleHistoryData(JSON.parse(localStorage.getItem("tokenuser")).id);
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      HandleHistoryData(JSON.parse(localStorage.getItem("admin")).id);
      handleSingleUserData(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else {
      console.log("No Data Found");
    }
  }, []);

  return (
    <div>
      <Row>
        <Col
          lg={12}
          className="product_list_table table-responsive mt-sm-5 mt-2"
        >
          <>
            <Table
              bordered
              striped
              className="align-middle text-center managment-table"
            >
              <thead>
                <tr>
                  <th className="text-start"></th>
                  <th onClick={() => sortHere("brand")}>
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
                  <th onClick={() => sortHere("status")}>
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
                  <th onClick={() => sortHere("subTotal")}>
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
                {buyerHistoryData?.length > 0 ? (
                  buyerHistoryData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={`${imageUrl}${item.productId?.image[0]}`}
                            style={{ width: "70px" }}
                            onClick={() =>
                              navigate(`/product/${item.productId._id}`)
                            }
                          />
                        </td>
                        <td>{item.productId.brand}</td>
                        <td>{item.productId.series}</td>
                        <td>{item.productId.model}</td>
                        <td>{item._id}</td>
                        <td>
                          {item?.deliveryStatusId.deliveryStatusForBuyer
                            ?.status == "Payment Failed" ? (
                            <Button className="order_status_payment_failed border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Delivered" ? (
                            <Button className="order_status_delivered border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForBuyer
                              ?.status == "Refunded" ? (
                            <Button className="order_status_refunded border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForBuyer
                                  ?.status
                              }
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{moment(item?.createdAt).format("l")}</td>
                        <td>{"$" + item.askId.subTotal}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span>No Buyer Data Found</span>
                )}
                <br />
                {sellerHistoryData?.length > 0 ? (
                  sellerHistoryData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={`${imageUrl}${item.productId?.image[0]}`}
                            style={{ width: "70px" }}
                            onClick={() =>
                              navigate(`/product/${item.productId._id}`)
                            }
                          />
                        </td>
                        <td>{item.productId.brand}</td>
                        <td>{item.productId.series}</td>
                        <td>{item.productId.model}</td>
                        <td>{item._id}</td>
                        <td>
                          {item?.deliveryStatusId.deliveryStatusForSeller
                            ?.status == "Sale Complete" ? (
                            <Button className="order_status_shipped_out border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForSeller
                              ?.status == "Failed to Ship" ? (
                            <Button className="order_status_failed_ship border text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : item?.deliveryStatusId.deliveryStatusForSeller
                              ?.status == "Item returned" ? (
                            <Button className="order_status_item_returned text-white">
                              {
                                item?.deliveryStatusId.deliveryStatusForSeller
                                  ?.status
                              }
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{moment(item.createdAt).format("l")}</td>
                        <td>{"$" + item.bidId.subTotal}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span>No Seller Data Found</span>
                )}
              </tbody>
            </Table>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default HistoryTable;
