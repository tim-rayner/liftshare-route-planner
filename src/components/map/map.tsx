import mapIcon from '../../assets/media/location.png';
import { Route } from '../../interfaces/route';
import GoogleMapReact from 'google-map-react'
import './map.css'
import { useState } from 'react';

const googleApiKey = 'AIzaSyDq1YnI0V0dPBUukIr1oBDF4rbn7_7wmzg'; 

type Props = {
    route?: Route
    distanceData: Function
}   


// typescript ignore flags are used within the Map component to ignore type errors as the google location api didn't seem to support react/typescript 
function Map({route}: Props){

    const [distance, setDistance] = useState<string>();
    const [duration, setDuration] = useState<string>();


    //hard coded example location for initial state of location
    let location = {
        address: '4 Duke St, Norwich NR3 3AJ',
        lat: 52.63129586908027,
        lng: 1.292840625183546,
    }

    let zoomLevel: number = 10; 

    // if origin has been specified, return blank map space with introduction note 
    if(route?.origin == undefined){
        return (
          <div className="map-container">
            <div className="no-map">
              <img src={mapIcon} alt="no route found"/>
              <h3> let's get started by finding your route </h3>
            </div>
          </div>

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
          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    };

    //if route has been specified, return google map 
    return (
      <div className="map-container">
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
        <div className="duration-container">
          <i> Distance: {distance} (approx {duration} drive) </i>
        </div>
      </div>
    )
  

}

export default Map;
