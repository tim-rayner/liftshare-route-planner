import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Route } from '../../../../interfaces/route';

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
            <Row>
                <Col sm={12}>
                    <h3> Schedule Your Journey </h3>
                    <p> To find a the best fit, please provide us with the times you will be taking this journey</p>
                </Col>
                <Col sm={6}>
                    <label> Departure </label> 
                    <input type="datetime-local" onChange={(e: any) => setDepartureTime(e.target.value)} defaultValue={props.route?.departure}/>
                    <br/>
                    <label> Return </label> 
                    <br/>
                    <input type="datetime-local" onChange={(e: any) => setReturnTime(e.target.value)} defaultValue={props.route?.return}/>
                </Col>
            </Row>
            <div className="button-group">
                <button onClick={Back} className="btn btn-primary prev">Back</button> 
                <button onClick={Continue} className="btn btn-primary next">Next</button> 
            </div>

        </form>
    )
}


export default JourneyScheduleForm;
