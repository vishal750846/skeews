// Import React and necessary dependencies
import React, { useState } from "react";
import Header from "../../src/components/header"; // Import the Header component
import Placeask from "../../src/components/placeask"; // Import the Placeask component
import Footer from "../../src/components/footer"; // Import the Footer component
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom for routing

// Define and export the bidask component
export default function bidask() {
  // Get the route parameters using useParams
  const params = useParams();

  // Define a state variable 'hide' and a function 'setHide' to control visibility
  const [hide, setHide] = useState();

  // Callback function to update the 'hide' state variable
  const hideData = (data) => {
    setHide(data);
  };

  // Render the components and pass necessary props
  return (
    <div>
      {/* Render the Header component and pass the 'hideData' function as a prop */}
      <Header hideData={hideData} />

      {/* Render the Placeask component and pass the 'id' from route parameters as 'prams' prop */}
      <Placeask prams={params.id} />

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}
