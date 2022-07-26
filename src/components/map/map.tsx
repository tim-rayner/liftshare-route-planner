import mapIcon from '../../assets/media/location.png';
import { Route } from '../../interfaces/route';

type Props = {
    route?: Route
}   

function Map({route}: Props){

    if(route?.origin == undefined){
        return (
            <>
                <img src={mapIcon} alt="no route found"/>
                <p> let's get started by finding your route</p>
            </>

        )
    }
    return (
        <>
         route found... loading map...
         lng:  {route.origin.coordinates.lng}
         lat:  {route.origin.coordinates.lat}
        </>
    )
  

}

export default Map;