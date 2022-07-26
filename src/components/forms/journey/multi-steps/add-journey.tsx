import { access } from 'fs';
import { resolve } from 'node:path/win32';
import { useEffect, useState } from 'react';
import { promises } from 'stream';
import { Coordinates, Route } from '../../../../interfaces/route';
import '../form.css';

// the add journey form will gather the following sets of data: 
// Journey Origin Text 
// Journey Origin Latitude (hidden)
// Journey Origin Longitude (hidden)
// Journey Destination Text 
// Journey Destination Latitude (hidden)
// Journey Destination Longitude (hidden)

const accessToken = 'pk.eyJ1IjoidGltLXJheW5lciIsImEiOiJja2Z5Z3dkMDIwYWE5MzBtN2I2ZnJoYmoyIn0.wC13_nTQuaDewW9q0IB__w'

//TODO: Strongly type props 
function AddJourneyForm(props: any){

    const [routeData, setRouteData] = useState<Route>(props.route);

    const [originText, setOriginText] = useState<string>(props.route?.originText);
    const [originLatitude, setOriginLatitude] = useState<number>(props.route?.origin?.coordinates.lat);
    const [originLongitude, setOriginLongitude] = useState<number>(props.route?.origin?.coordinates.lng);


    const [destText, setDestText] = useState<string>(props.route?.destinationText);
    const [destLatitude, setDestLatitude] = useState<number>(props.route?.destination?.coordinates.lat);
    const [destLongitude, setDestLongitude] = useState<number>(props.route?.destination?.coordinates.lng);

    const Continue = () => {
        SaveChanges();
        props.nextStep();
    }

    const SaveChanges = async () => {
        //save changes back to state 

        const originCoords: Coordinates = await Geolocate(originText);
        const destCoords: Coordinates = await Geolocate(destText);


        console.log(originCoords);

        const route: Route = {
            originText: originText,
            destinationText: destText, 
            origin: {
                coordinates: {
                    lat: originCoords.lat, 
                    lng: originCoords.lng,
                }
            },
            destination: {
                coordinates: {
                    lat: destCoords.lat, 
                    lng: destCoords.lng
                }
            },
            departure: props.route?.departure, 
            return: props.route?.return,
        }

        props.handleChange(route);
    }

    const Geolocate = (address: string) : Promise<Coordinates> => {
     return fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=' + accessToken)
            .then((response) => response.json())
            .then(res => {
                
                const coords: Coordinates = {
                    lat: res.features[0].center[1],
                    lng: res.features[0].center[0]
                 }
                console.log(coords);
                return Promise.resolve(coords);
            })
            .catch(err => {
                return Promise.reject();
            });
    }   

    //for testing purposes 
    useEffect(() => {
        
    }, [])

    return (
        <form>
            <h3> Add Your Journey </h3>

            <br/>
            <label> Journey Start </label>
            <input type="text" onChange={(e: any) => setOriginText(e.target.value)} value={props.route?.originText}/>
            <br/>
            <label> Destination</label>
            <input type="text" onChange={(e: any) => setDestText(e.target.value)} value={props.route?.destinationText}/>
            <br/>
            <button onClick={Continue}>Next</button> 
        </form>
    )
}

export default AddJourneyForm; 