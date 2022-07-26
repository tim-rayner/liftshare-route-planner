import { useState } from 'react';
import { Col, Row } from 'reactstrap';
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


    const [originText, setOriginText] = useState<string>(props.route?.originText);
    const [destText, setDestText] = useState<string>(props.route?.destinationText);
    const [originLng, setOriginLng] = useState<number>();
    const [originLat, setOriginLat] = useState<number>();

    const Continue = () => {
        if(originText && destText){
            SaveChanges();
            props.nextStep();
        }
    }

    const SaveChanges = async () => {

        const originCoords: Coordinates = await Geolocate(originText);
        const destCoords: Coordinates = await Geolocate(destText);


        console.log(originCoords);

        let route: Route = {
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

    return (
            <form className='aj-form'>
                <Row>
                    <Col sm={12}>
                    <h3> Add Your Journey </h3>
                    <p> Whether you're looking to Liftshare as a driver or a passenger, listing your journey is the best way to find a match.</p>
                    </Col>
                    <Col sm={12}>
                        <label> Journey Start </label>
                        <br/>
                        <input required={true} type="text" onChange={(e: any) => setOriginText(e.target.value)} defaultValue={props.route?.originText}/>
                        <br/>
                    </Col>
                    <Col sm={12}>
                        <label> Destination</label>
                        <br/>
                        <input required={true} type="text" onChange={(e: any) => setDestText(e.target.value)} defaultValue={props.route?.destinationText}/>
                        <br/>
                    </Col>
                    <Col sm={12}>
                        <input type="checkbox" defaultChecked={true} className="checkbox"/> <label> This is a return journey (round trip)</label> 
                    </Col>
                </Row>
                <div className="button-group">
                    <button onClick={Continue} className="btn btn-primary next"> Get Started </button>
                </div>
            </form>


    )
}

export default AddJourneyForm; 