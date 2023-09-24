import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Productslider from "../../src/components/productslider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export default function buysell(props) {
  console.log("props", props);
  const htmlString =
    "<p>Let the Market Know at what price you are committed to make a deal.<br/><br/>A Bid is the price at which you are willing to buy an item.<br/><br/>An Ask is the price you are willing to sell an item.<br/><br/> Your Bid/Ask will stayactive until someone except it,it expires, or you cancel it.<br/><br/>If Someone except your Bid/Ask there is no backing out!</p>";
  let navigate = useNavigate();
  return (
    <div>
      <Container className="py-5 product_slider_page_images">
        {props.count == 0 ? (
          <div className="loader-icon" style={{ marginBlock: "80px" }}>
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          </div>
        ) : props.count == 1 ? (
          <Row>
            <Col xs="12" sm="6">
              <Productslider Data={props.Image} count={props.count} />
            </Col>
            <Col className="d-flex justify-content-center" xs="12" sm="6">
              <div className="thumb-btns">
                {props.type == 1 ? (
                  <>
                    <Button
                      className="py-2 up-btn border-0"
                      onClick={() => navigate("/bidask/" + props.prm + "/buy2")}
                    >
                      Buy Now for ${props?.website}
                    </Button>
                    <br />
                  </>
                ) : props.Ask || props.Bid ? (
                  <>
                    {props.Ask ? (
                      <Button
                        className="py-2 up-btn border-0"
                        onClick={() =>
                          navigate("/bidask/" + props.prm + "/buy")
                        }
                      >
                        Buy Now for ${props?.Ask}
                      </Button>
                    ) : (
                    ""
                    )}

                    <br />
                    {props.Bid ? (
                      <Button
                        className="my-3 py-2 lw-btn border-0"
                        onClick={() =>
                          navigate("/bidask/" + props.prm + "/sell")
                        }
                      >
                        Sell Now for ${props?.Bid}
                      </Button>
                    ) : (
                      ""
                    )}
                    <br />
                    <a
                      className="text-capitalize border py-2  rounded position-relative"
                      onClick={() => navigate("/bidask/" + props.prm)}
                    >
                      place bid/ask
                      <ReactTooltip
                        className="custom-tooltip"
                        anchorId="app-title"
                        place="bottom"
                        content=<div
                          dangerouslySetInnerHTML={{ __html: htmlString }}
                        />
                      />
                      <svg
                        id="app-title"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-question-circle-fill position-absolute"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                      </svg>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="text-capitalize border py-2  rounded position-relative"
                      onClick={() => navigate("/bidask/" + props.prm)}
                    >
                      place bid/ask
                      <ReactTooltip
                        className="custom-tooltip"
                        anchorId="app-title"
                        place="bottom"
                        content=<div
                          dangerouslySetInnerHTML={{ __html: htmlString }}
                        />
                      />
                      <svg
                        id="app-title"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-question-circle-fill position-absolute"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}
