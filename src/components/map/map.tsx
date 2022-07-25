import mapIcon from '../../assets/media/location.png';

function Map(props: any){

    if(props.route == undefined){
        return (
            <>
                no route defined 
                <img src={mapIcon} alt="no route found"/>
            </>

        )
    }
    return (
        <>
         route found... loading map...
        </>
    )
  

}

export default Map;