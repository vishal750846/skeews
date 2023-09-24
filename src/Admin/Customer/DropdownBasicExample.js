import Dropdown from "react-bootstrap/Dropdown";

function DropdownBasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        More Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" disabled>Block Customer</Dropdown.Item>
        <Dropdown.Item href="" disabled>Manual Rating</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownBasicExample;
