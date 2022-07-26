export interface Coordinates {
    lat: number | undefined;
    lng: number | undefined; 
}

export interface Location {
    coordinates: Coordinates; 
}

export interface Route {
    originText?: string,
    destinationText?: string,
    origin?: Location, 
    destination?: Location,
    departure?: Date, 
    return? : Date | boolean
    
}