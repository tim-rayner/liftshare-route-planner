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

    
    const apiIsLoaded = (map : any, maps: any) => {
        //@ts-ignore
        const directionsService = new google.maps.DirectionsService();
        //@ts-ignore
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        const origin = { lat: 40.756795, lng: -73.954298 };
        const destination = { lat: 41.756795, lng: -78.954298 };
  
        directionsService.route(
          {
            origin: route.origin?.coordinates,
            destination: route.destination?.coordinates,
            //@ts-ignore
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result: any, status: any) => {
            //@ts-ignore
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
    };


    return (
        <>
            <div className="map">
                <div className="google-map">
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: googleApiKey }}
                    defaultCenter={location}
                    defaultZoom={zoomLevel}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                  >
                  </GoogleMapReact>
                </div>
            </div>
        </>
    )
  

}

export default Map;
