function Confirmation(props: any){

    const Back = () => {
        props.prevStep();
    }

    //fake XHR request to simulate posting the journey to others on liftshare via an api call
    const postJourney = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/route');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(props.route);
    }

    return (
        <form onSubmit={() => postJourney()}>
            <h3> Nearly There! </h3>
            <p> 
                Your Journey Takes You From {props.route.originText} to {props.route?.destinationText} {props.route?.departure ? 'on ' + props.route?.departure : 'however a date has not yet been specified.'} <br/>
                <br/>
                Share your journey and find your Liftshare partner today. 
            </p>

            <div className="button-group">
                <button onClick={Back} className="btn btn-primary prev"> Back </button>
                <button type="submit" className="btn btn-primary next"> Share </button>
            </div>

        </form>
    )
}

export default Confirmation;