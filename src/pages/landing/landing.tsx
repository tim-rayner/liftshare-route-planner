import { useState } from "react";
import { Col, Row } from "reactstrap";
import JourneyForm from "../../components/forms/journey/journey-form";
import Map from "../../components/map/map";
import { Distance, Route } from "../../interfaces/route";

//TODO: Store form input data in state, this state can then be parsed to the map component. 

// The Landing Page component uses a local state which it then parses down into child components. The reason for this is to avoid using 
// third party state management solutions, to keep the code as easy to understand and interpret as possible.
function LandingPage(){

    //hard coded initial route data for testing purposes
    const initialRoute : Route = {
        origin: {
            coordinates: {
                lat: 52.83423590788864,
                lng: 0.850835918025966,
            
            }
        },
        destination: {
            coordinates: {
                lat: 52.63102626665915,
                lng: 1.2930057892011253,             
            }
        }
    }
    
    const [userRoute, setUserRoute] = useState<Route>();
    const [routeDistanceData, setRouteDistanceData] = useState<Distance>();



    return (
        <div>
            <Row>
                <Col sm={12} md={5} className="form-panel">
                    {/* TODO: Add Form(s) Here As A Multi-Step Form */}
                    <div className="multi-form-container">
                        <JourneyForm
                            setUserRoute={setUserRoute}
                        /> 
                    </div>
                </Col>
                <Col sm={12} md={7} className="map-panel">
                    {/* TODO: Add Map Here */}
                    <Map route={userRoute} distanceData={(data: Distance) => setRouteDistanceData(data)}/>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage; 