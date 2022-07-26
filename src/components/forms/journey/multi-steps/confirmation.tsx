function Confirmation(props: any){

    const Back = () => {
        props.prevStep();
    }

    return (
        <>
        Save Your Journey? 
            <button onClick={Back}> Back </button>
            <button> Save </button>
        </>
    )
}

export default Confirmation;