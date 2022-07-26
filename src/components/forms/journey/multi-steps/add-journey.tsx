import { useEffect, useState } from 'react';
import { Route } from '../../../../interfaces/route';
import '../form.css';

// the add journey form will gather the following sets of data: 
// Journey Origin Text 
// Journey Origin Latitude (hidden)
// Journey Origin Longitude (hidden)
// Journey Destination Text 
// Journey Destination Latitude (hidden)
// Journey Destination Longitude (hidden)



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

    const SaveChanges = () => {
        //save changes back to state 
        const route: Route = {
            originText: originText,
            destinationText: destText, 
            origin: {
                coordinates: {
                    lat: originLatitude, 
                    lng: originLongitude
                }
            },
            destination: {
                coordinates: {
                    lat: destLatitude, 
                    lng: destLongitude
                }
            },
            departure: props.route?.departure, 
            return: props.route?.return,
        }

        props.handleChange(route);
    }

    //for testing purposes 
    useEffect(() => {
        
    }, [])

    return (
        <form>
            add journey 
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