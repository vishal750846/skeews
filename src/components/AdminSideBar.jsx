import React, { useState } from "react";
import { Accordion, Button, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import AdminSideBar2 from "./AdminSideBar2";

export default function AdminSideBar() {
  // State to toggle sidebar
  const [togle, setTogle] = useState(false);
  
  // Get the current location
  let Location = useLocation();
  return (
    <>
    {/* Conditionally render the sidebar based on the location */}
    {Location.pathname == "/" ||
      Location.pathname == "/userBuySell" ||
      Location.pathname.includes("BuySellManagment") ||
      Location.pathname.includes("categories") ||
      Location.pathname.includes("/bidask") ? null : (
      <div
        className={
          togle
            ? "bg-custom-light d-inline-block adminsidebar showleftbar"
            : "bg-custom-light d-inline-block adminsidebar"
        }
      >
        <Button
          className="mob-toggle"
          onClick={() => {
            setTogle(!togle);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              filerule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Button>
        {/* Sidebar content */}
        <Nav defaultActiveKey="/home" className="flex-column">
          {/* Home link */}
          <Link to="/" className={Location.pathname == "/" ? "active" : ""}>
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
              </svg>
            </span>
            Home
          </Link>

          {/* Order link */}
          <Link
            to="/orderView"
            className={Location.pathname == "/orderView" ? "active" : ""}
          >
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-inbox-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
              </svg>
            </span>
            Order
          </Link>
          
          {/* Products accordion */}
          <div>
            <Accordion className="product_center_icon">
              {/* Conditional rendering for Products section */}
              {Location.pathname == "/createproduct" || Location.pathname == "/productlist" ? 
                <Accordion.Item>
                  <Accordion.Header>
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-tag-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </span>
                    Products
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link
                      to="/createproduct"
                      className={
                        Location.pathname == "/createproduct" ? "active" : ""
                      }
                    >
                      Create Product
                    </Link>
                    <Link
                      to="/productlist"
                      className={
                        Location.pathname == "/productlist" ? "active" : ""
                      }
                    >
                      Product list
                    </Link>
                  </Accordion.Body>
                </Accordion.Item> :
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-tag-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </span>
                    Products
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link
                      to="/createproduct"
                      className={
                        Location.pathname == "/createproduct" ? "active" : ""
                      }
                    >
                      Create Product
                    </Link>
                    <Link
                      to="/productlist"
                      className={
                        Location.pathname == "/productlist" ? "active" : ""
                      }
                    >
                      Product list
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
              }
            </Accordion>
          </div>

          {/* Customers link */}
          <Link
            to="/customerMain"
            className={Location.pathname == "/customerMain" ? "active" : ""}
          >
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </span>
            Customers
          </Link>

          {/* Finances link */}
          <Link to="#">
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bank2"
                viewBox="0 0 16 16"
              >
                <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
              </svg>
            </span>
            Finances
          </Link>

          {/* Analytics link */}
          <Link to="#">
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bar-chart-line-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
              </svg>
            </span>
            Analytics
          </Link>

          {/* Marketing link */}
          <Link to="#">
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </span>
            Marketing
          </Link>

          {/* Reports link */}
          <Link to="#">
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-journal-x"
                viewBox="0 0 16 16"
              >
                <path
                  filerule="evenodd"
                  d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"
                />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
            </span>
            Reports
          </Link>

          {/* Templates link */}
          <Link to="#">
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </span>
            Templates
          </Link>
            <Link to="#">
              <Accordion>
                {
                  Location.pathname == "/banner" || Location.pathname == "/shipping" ? 
                  <Accordion.Item>
                  <Accordion.Header>
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                      </svg>
                    </span>
                    Setting
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link to="#">Users & Permissions</Link>
                    <Link to="/banner">Banner Management</Link>
                    <Link to="#">Payments</Link>
                    <Link to="#">Checkout</Link>
                    <Link to="/shipping">Shipping</Link>
                    <Link to="#">Taxes</Link>
                    <Link to="#">Metafields</Link>
                    <Link to="#">Files</Link>
                    <Link to="#">Policies</Link>
                  </Accordion.Body>
                </Accordion.Item>: <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                      </svg>
                    </span>
                    Setting
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link to="#">Users & Permissions</Link>
                    <Link to="/banner">Banner Management</Link>
                    <Link to="#">Payments</Link>
                    <Link to="#">Checkout</Link>
                    <Link to="/shipping">Shipping</Link>
                    <Link to="#">Taxes</Link>
                    <Link to="#">Metafields</Link>
                    <Link to="#">Files</Link>
                    <Link to="#">Policies</Link>
                  </Accordion.Body>
                </Accordion.Item>
                }
               
              </Accordion>
            </Link>
          </Nav>
        </div>
      )}
      {Location.pathname == "/BuySellManagment" ||
        location.pathname.includes("BuySellManagment") ? (
        <AdminSideBar2 />
      ) : null}
    </>
  );
}
