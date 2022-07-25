import { Col, Row } from "reactstrap";
import Map from "../../components/map/map";

//TODO: Store form input data in state, this state can then be parsed to the map component. 
function LandingPage(){
    return (
        <div>
            <Row>
                <Col sm={12} md={6}>
                    {/* TODO: Add Form(s) Here As A Multi-Step Form */}
                    FORM HERE 
                </Col>
                <Col sm={12} md={6}>
                    {/* TODO: Add Map Here */}
                    <Map/>
                </Col>
            </Row>
        </div>
    )
}


export default LandingPage; 