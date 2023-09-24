import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ChartImg from "../../src/images/chart.png";
import ExportApi from "../api/ExportApi";
import moment from "moment";
export default function OrderGraph() {
  const [dateFilter, setDateFilter] = useState();
  const [filterDate, setFilterDate] = useState()
  const [comparisonFilterDate, setComparisonFilterDate] = useState()
  const [orderPlaced, setOrderPlaced] = useState()
  const [orderPlacedPercentage, setOrderPlacedPercentage] = useState()
  const [orderIncoming, setOrderIncoming] = useState()
  const [orderIncomingPercentage, setOrderIncomingPercentage] = useState()
  const [orderProcessed, setOrderProcessed] = useState()
  const [orderProcessedPercentage, setOrderProcessedPercentage] = useState()
  const [orderDeivered, setOrderDelivered] = useState()
  const [orderDeiveredPercentage, setOrderDeliveredPercentage] = useState()


// This function handles filtering data based on the input parameter 'data' used for which button is clicked
const handleFilterData = (data) => {
  if (data == 1) {
    let date = new Date();
    let TodayDate = moment(date).format('YYYY-MM-DD');
    setFilterDate(TodayDate); // Set the filter date to today's date
    const last1thDay = new Date(date.setDate(date.getDate() - 1));
    const lastDayDate = moment(last1thDay).format('YYYY-MM-DD');
    setComparisonFilterDate(lastDayDate); // Set the comparison filter date to one day ago
  } else if (data == 7) {
    let today = new Date();
    const last7thDay = new Date(today.setDate(today.getDate() - 7));
    const lastDate = moment(last7thDay).format('YYYY-MM-DD');
    setFilterDate(lastDate); // Set the filter date to one week ago
    const last8thDay = new Date(today.setDate(today.getDate() - 8));
    const last8Day = moment(last8thDay).format('YYYY-MM-DD');
    setComparisonFilterDate(last8Day); // Set the comparison filter date to eight days ago
  } else if (data == 30) {
    let today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const previos = moment(previousMonth).format('YYYY-MM-DD');
    setFilterDate(previousMonth); // Set the filter date to one month ago
    setFilterDate(previos);
    const lastpreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const previouslast = moment(lastpreviousMonth).format('YYYY-MM-DD');
    setComparisonFilterDate(previouslast); // Set the comparison filter date to the same date one month ago
  } else if (data == 365) {
    let today = new Date();
    const previousYear = today.getFullYear() - 1;
    const previousYearDate = new Date(previousYear, today.getMonth(), today.getDate());
    const previos = moment(previousYearDate).format('YYYY-MM-DD');
    setFilterDate(previos); // Set the filter date to one year ago
    const LastpreviousYear = today.getFullYear() - 2;
    const lastpreviousYearDate = new Date(LastpreviousYear, today.getMonth(), today.getDate());
    const previosLast = moment(lastpreviousYearDate).format('YYYY-MM-DD');
    setComparisonFilterDate(previosLast); // Set the comparison filter date to the same date two years ago
  }
  handleGetAllFilterData(); // Call a function to retrieve and update data based on the selected filter dates
};

// This function retrieves and updates data based on the selected filter dates.
const handleGetAllFilterData = () => {
  if (filterDate != undefined) {
    ExportApi.getdatewiseFilterData(filterDate, comparisonFilterDate)
      .then((resp) => {
        let data = resp?.data?.data;
        // Update various data points with the retrieved data
        setOrderDelivered(data?.Delivered);
        setOrderDeliveredPercentage(data?.deliveredPar);
        setOrderProcessed(data?.Processed);
        setOrderProcessedPercentage(data?.ProcessedPar);
        setOrderIncoming(data?.incoming);
        setOrderIncomingPercentage(data?.incomingPar);
        setOrderPlaced(data?.pleaced);
        setOrderPlacedPercentage(data?.placedPar);
      })
      .catch((err) => {
        console.log(err);
        // Handle errors or logouts here
        window.dispatchEvent(new Event("Loginout"));
      });
  } else {
    let date = new Date();
    let TodayDate = moment(date).format('YYYY-MM-DD');
    ExportApi.getdatewiseFilterData(TodayDate, comparisonFilterDate)
      .then((resp) => {
        let data = resp?.data?.data;
        // Update various data points with the retrieved data
        setOrderDelivered(data?.Delivered);
        setOrderDeliveredPercentage(data?.deliveredPar);
        setOrderProcessed(data?.Processed);
        setOrderProcessedPercentage(data?.ProcessedPar);
        setOrderIncoming(data?.incoming);
        setOrderIncomingPercentage(data?.incomingPar);
        setOrderPlaced(data?.pleaced);
        setOrderPlacedPercentage(data?.placedPar);
      })
      .catch((err) => {
        console.log(err);
        // Handle errors or logouts here
        // window.dispatchEvent(new Event("Loginout"));
      });
  }
};

// This useEffect hook calls handleGetAllFilterData whenever filterDate or comparisonFilterDate changes.
useEffect(() => {
  handleGetAllFilterData();
}, [filterDate, comparisonFilterDate]);


  return (
    <div>
      <div className="d-xl-flex gap-2 justify-content-around align-items-center p-2 bg-dark text-white rounded mt-3">
        {/* Start Date Wise Filter */}
        <span className="d-block mt-4">
          <Form.Select
            aria-label="Default select example"
            className="border-0 fw-bold mb-2 mb-xl-0 bg-none text-white today-select"
            value={dateFilter}
            onChange={(e) => handleFilterData(e.target.value)}
          >
            <option className="text-dark bg-white" value="1">Today</option>
            <option className="text-dark" value="7">Last 7 Days</option>
            <option className="text-dark" value="30">Month</option>
            <option className="text-dark" value="365">Year</option>
          </Form.Select>
        </span>
        {/* End Sate Wise Filter */}
        {/* Start Order History Data and Graph  */}
        <div className="py-2 px-3 rounded text-center">
          <h5 className="text-white fw-bold">Orders</h5>
          <div className="d-sm-flex justify-content-between gap-3">
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Placed</h6>
                <span className=" me-2 fw-bold">{orderPlaced}</span>
                <span className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  {orderPlacedPercentage?.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Incoming</h6>
                <span className=" me-2 fw-bold">{orderIncoming}</span>
                <span className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  {orderIncomingPercentage?.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Processed</h6>
                <span className=" me-2 fw-bold">{orderProcessed}</span>
                <span className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  {orderProcessedPercentage}%
                </span>
              </div>
            </div>
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Delivered</h6>
                <span className=" me-2 fw-bold">{orderDeivered}</span>
                <span className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  {orderDeiveredPercentage?.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* End Order History Data and Graph */}
        {/* Start Order Timing for completed the process of order */}
        <div className="text-center py-2 px-3 rounded mt-2 mt-sm-0">
          <h5 className="text-white fw-bold">Times</h5>
          <div className="d-sm-flex justify-content-between gap-3">
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Process</h6>
                <span className=" me-2 fw-bold">157</span>
                <span className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  37%
                </span>
              </div>
            </div>
            <div className="bg-custom-light py-2 px-3 text-center rounded mb-2 mb-xl-0 text-dark">
              <div>
                <h6 className="mb-0 fw-bold">Fulfill</h6>
                <span className=" me-2 fw-bold">34 hrs</span>
                <span className="text-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                  37%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* end Order Timing for Completed the process of order */}
      </div>
    </div>
  );
}
