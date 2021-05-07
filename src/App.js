import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class App extends React.Component {
  
  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
        />
      </GoogleMap>
    ));
  
    return ( 
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=API_KEY_GOES_HERE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;