import { useState } from 'react';
import { Route } from '../../../../interfaces/route';
import '../form.css';

// the journey schedule form will gather the following sets of data: 
// Departure Date (datetime)
// Return Date (datetime)
function JourneyScheduleForm(props: any){


    const [departureTime, setDepartureTime] = useState<Date>(props.route?.departure);
    const [returnTime, setReturnTime] = useState<Date>(props.route?.return);


    const Continue = () => {
        SaveChanges();
        props.nextStep();
    }

    const Back = () => {
        props.prevStep();
    }

    const SaveChanges = () => {
        const route: Route = {
            originText: props.route.originText,
            destinationText: props.route.destinationText, 
            origin: {
                coordinates: {
                    lat: props.route.origin?.coordinates?.lat, 
                    lng:  props.route.origin?.coordinates?.lng
                }
            },
            destination: {
                coordinates: {
                    lat: props.route.destination?.coordinates?.lat, 
                    lng: props.route.destination?.coordinates?.lng
                }
            },
            departure: departureTime, 
            return: returnTime
        }

        props.handleChange(route);
    }

    return(
        <form>
            {/* TODO: Implement Journey Schedule Form */}
            <h3> Schedule Your Journey </h3>
            <label> Departure </label> 
            <input type="datetime-local" onChange={(e: any) => setDepartureTime(e.target.value)} value={props.route?.departure}/>
            <br/>
            <label> Return </label> 
            <input type="datetime-local" onChange={(e: any) => setReturnTime(e.target.value)} value={props.route?.return}/>
            <br/>
            <button onClick={Back}>Back</button> 
            <button onClick={Continue}>Next</button> 
        </form>
    )
}


export default JourneyScheduleForm;
