import './marker.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

function MapMarker( props: any){
    return (
        <>
            <div className="pin">
                <Icon icon={locationIcon} className="pin-icon" />
                <p className="pin-text">{props.text}</p>
            </div>
        </>
    )
}


export default MapMarker; 