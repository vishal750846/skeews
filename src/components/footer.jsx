// Import React and necessary dependencies
import React from "react";
import { Button, Container } from "react-bootstrap"; // Import Button and Container components from react-bootstrap

// Define and export the Footer component
export default function Footer() {
  return (
    <div className="footer py-3">
      <Container>
        <div className="ftr-cont d-flex align-items-center">
          <div>
            {/* Render a heading with a white color */}
            <h4 className="mb-0 text-white">
              Apply today and get
              <br /> <span>10% back</span>
            </h4>
          </div>
          <div className="ms-auto">
            {/* Render a paragraph with white text */}
            <p className="text-white">
              In reward on your first day. when you approved the card.
            </p>
            {/* Render a button with specific styling */}
            <Button className="text-capitalize p-2 bg-black border-0">
              learn more
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
