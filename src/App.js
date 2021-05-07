import React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import GeoCode from "react-geocode";

GeoCode.setApiKey("API_KEY")

class App extends React.Component {

  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }

  getCity = (addressArray) => {
    let city = '';
    for(let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  }

  getArea = (addressArray) => {
    let area = '';
    for(let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for(let j = 0; j< addressArray.length; j++) {
          if('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  }

  getState = (addressArray) => {
    let state = '';
    for(let i = 0; i < addressArray.length; i++) {
      for(let i = 0; i < addressArray.length; i++) {
        if(addressArray[i].types[0] && 'administrative_area_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  }


  onMarkerDragEnd = (event) => {

    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    GeoCode.fromLatLng(newLat, newLng)
    .then(response => {

      const address = response.results[0].formatted_address,
          addressArray = response.result[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getSnapshotBeforeUpdate(addressArray)

    })
  }
  
  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker
        draggable={true}
        onDragEnd={this.onMarkerDragEnd}
          position={{ lat: -34.397, lng: 150.644 }}
        >
          <InfoWindow>
            <div>
              hello
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ));
  
    return ( 
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;