import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Button } from "react-bootstrap";
const Tooltip = () => {
  return (
    <div>
      <ReactTooltip
        anchorId="button1"
        place="bottom"
        content="Hello world! This is button 1"
      />
      <ReactTooltip
        anchorId="button2"
        place="bottom"
        content="Hello world! This is button 2"
      />
      <ReactTooltip
        anchorId="button3"
        place="bottom"
        content="Hello world! This is button 3"
      />
      <ReactTooltip
        anchorId="button4"
        place="bottom"
        content="Hello world! This is button 4"
      />
      <Button id="button1">Button1</Button>
      <br />
      <Button id="button2">Button2</Button>
      <br />
      <Button id="button3">Button3</Button>
      <br />
      <Button id="button4">Button4</Button>
      <br />
    </div>
  );
};

export default Tooltip;
