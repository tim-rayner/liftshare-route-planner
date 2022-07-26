function Confirmation(props: any){

    const Back = () => {
        props.prevStep();
    }

    const postJourney = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/route');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(props.route);
    }

    return (
        <form onSubmit={() => postJourney()}>
            Your Journey Takes You From {props.route.originText} to {props.route?.destinationText} on {props.route?.departure} <br/>
            Share Your Journey? 
            <button onClick={Back}> Back </button>
            <button type="submit"> Save </button>
        </form>
    )
}

export default Confirmation;