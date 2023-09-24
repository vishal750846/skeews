import Accordion from "react-bootstrap/Accordion";
import Ls2 from "../../images/ls2.png";
function BasicExample() {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Order History</Accordion.Header>
        <Accordion.Body>
          <div className="mt-4 active-order">
            <div className="inner-custom-data">
              <div className="d-flex align-items-center gap-4 w-75 justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={Ls2} />
                  MSI RTX 3080TI Gaming X Trio
                </div>
                <div>2/4/22</div>
                <div>
                  <span className="spent fw-bold">$250</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 mt-4 w-75 justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={Ls2} />
                  MSI RTX 3080TI Gaming X Trio
                </div>
                <div>2/4/22</div>
                <div>
                  <span className="sold fw-bold">$250</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-4 mt-4 w-75 justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={Ls2} />
                  MSI RTX 3080TI Gaming X Trio
                </div>
                <div>2/4/22</div>
                <div>
                  <span className="spent fw-bold">$250</span>
                </div>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;
