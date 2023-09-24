// Import React and necessary dependencies
import React, { useEffect } from "react";
import Navbar from "../../src/components/navbar"; // Import the Navbar component
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom for navigation
import Cookies from "js-cookie"; // Import Cookies for handling cookies

// Define and export the Header component
export default function Header() {
  const navigate = useNavigate(); // Create a navigate function for routing

  // Use the useEffect hook to perform security checks when the component mounts
  useEffect(() => {
    if (Cookies.get("status")) {
      // If the "status" cookie exists, do nothing (user is authenticated)
    } else {
      // If the "status" cookie doesn't exist, prompt for a password
      let value = prompt("Enter Your Password");
    
      // Check if the entered password is correct
      if (value === "E123QWERFG") {
        // If the password is correct, set the "status" cookie with a 1-day expiration
        Cookies.set("status", "true", { expires: 1, path: "" });
      } else {
        // If the password is incorrect, navigate to the "/error" route
        navigate("/error");
      }
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Render the Header component
  return (
    <div className="custom-header">
      <div className="header-part py-3">
        {/* Render the Navbar component */}
        <Navbar />
      </div>
    </div>
  );
}

