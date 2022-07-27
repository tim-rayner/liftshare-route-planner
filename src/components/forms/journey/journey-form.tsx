import { useState } from "react";
import { Progress } from "reactstrap";
import { Route } from "../../../interfaces/route";
import AddJourneyForm from "./multi-steps/add-journey";
import Confirmation from "./multi-steps/confirmation";
import JourneyScheduleForm from "./multi-steps/journey-schedule";

    
//journey form is a multi step form for gathering information about route from user. 
type Props = {
    setUserRoute: Function,
}   

function JourneyForm({setUserRoute} : Props){

    const [step, setStep] = useState<number>(1);
    const [route, setRoute] = useState<Route>();
    

    const prevStep = () => {
        setStep(step - 1); 
    }

    const nextStep = () => {
        setStep(step + 1); 
    }

    const handleChange = (route: Route) => {
        setRoute(route);
        setUserRoute(route);
    }


    //implement multi step rendering based on step value inside state 
    switch(step) {
        case 1: 
            return (
                <>
                    <AddJourneyForm 
                        nextStep={() => nextStep()}
                        handleChange = {(route: Route) => handleChange(route)}
                        route={route!}
                    />
                    <Progress value={0} className="inv"/>
                </>
            )
        case 2: 
            return (
                <>
                    <JourneyScheduleForm
                            prevStep={() => prevStep()}
                            nextStep={() => nextStep()}
                            handleChange = {(route: Route) => handleChange(route)}
                            route = {route}
                        />
                    <Progress value={45}/>
                </>
            )
        case 3: 
            return (
                <>
                    <Confirmation
                        prevStep={() => prevStep()}
                        nextStep={() => nextStep()}
                        route = {route}
                    />
                    <Progress value={100}/>
                </>
            ) 
        default: 
            return <> </>
    }

}


export default JourneyForm;