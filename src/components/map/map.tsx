import mapIcon from '../../assets/media/location.png';
import { Route } from '../../interfaces/route';
import GoogleMapReact, { fitBounds } from 'google-map-react'
import './map.css'
import MapMarker from './marker/marker';
import { useEffect } from 'react';

const googleApiKey = 'AIzaSyDq1YnI0V0dPBUukIr1oBDF4rbn7_7wmzg'; 

type Props = {
    route?: Route
}   

function Map({route}: Props){

    let location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }

    let zoomLevel: number = 10; 
  

    if(route?.origin == undefined){
        return (
            <>
                <img src={mapIcon} alt="no route found"/>
                <p> let's get started by finding your route</p>
            </>

        )
    }

    //TODO: Refactor this to avoid code repetition => initial state could be user current location? 
    location = {
        address: '', 
        lat: route.origin.coordinates.lat ? route.origin.coordinates.lat : 37.42216,
        lng: route.origin.coordinates.lng ? route.origin.coordinates.lng : -122.08427
    }

    return (
        <>
         <div className="map">

            <div className="google-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: googleApiKey }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
              >
                {/* Add Map Marker For Origin Location */}
                <MapMarker
                    lat={route.origin.coordinates.lat}
                    lng={route.origin.coordinates.lng}
                    text={route.originText}
                />
                {/* Add Map Marker For Destination Location */}
                <MapMarker
                    lat={route.destination?.coordinates.lat}
                    lng={route.destination?.coordinates.lng}
                    text={route.destinationText}
                />
              </GoogleMapReact>
            </div>
        </div>
         lat:  {route.origin.coordinates.lat}
         <br/>
         lng:  {route.origin.coordinates.lng}
        </>
    )
  

}

export default Map;
