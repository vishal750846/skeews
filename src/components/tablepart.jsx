// Import necessary dependencies
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";

// Define the Tablepart component
function Tablepart(props) {
  const [userId, setUserId] = useState(0); // State to store the user's ID

  // Use useEffect to set the user's ID from local storage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("tokenuser")) {
      setUserId(JSON.parse(localStorage.getItem("tokenuser")).id);
    } else if (localStorage.getItem("admin")) {
      setUserId(JSON.parse(localStorage.getItem("admin")).id);
    } else {
      // Handle the case when the user ID is not found in local storage
    }
  }, []);

  return (
    <>
      {props.count > 1 ? (
        "" // Render nothing if the count is greater than 1
      ) : (
        <p className="bidask_label text-center">Asks</p>
      )}
      <Table responsive="sm" striped bordered hover>
        <thead>
          {props.count > 1 ? (
            "" // Render nothing if the count is greater than 1
          ) : (
            <tr>
              <th onClick={() => props.sortAskHere("askAmount")}>
                {props.h2}
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
              <th>{props.h1}</th>
            </tr>
          )}
        </thead>
        <tbody>
          {props.count == 0 ? (
            <tr>
              <td>
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </td>
            </tr>
          ) : props.count == 1 ? (
            <>
              {props.data?.length > 0 || props.amount ? (
                props.data.map((val) => {
                  return val?.userId == userId ? (
                    <>
                      <tr style={{ backgroundColor: "#75b299" }}>
                        <td>${val.askAmount}</td>
                        <td> 1</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td>${val.askAmount}</td>
                        <td> 1</td>
                      </tr>
                    </>
                  );
                })
              ) : null}
            </>
          ) : (
            <span className="no_ask">
              There is no Ask for this product
            </span>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Tablepart;
