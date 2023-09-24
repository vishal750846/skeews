// src/components/MapContainer.js

import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {
  const { google, address } = props;

  // Function to get latitude and longitude from address using the Geocoder API
  const getLatLngFromAddress = (address) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        // Do something with lat and lng (e.g., update state)
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  // Call getLatLngFromAddress when the component mounts
  React.useEffect(() => {
    getLatLngFromAddress(address);
  }, [address, google]);

  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{ lat: 0, lng: 0 }} // Initial center before getting the actual location
    >
      {/* Add a Marker if you want to display a pin on the map */}
      {/* <Marker position={{ lat: 0, lng: 0 }} /> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
})(MapContainer);
