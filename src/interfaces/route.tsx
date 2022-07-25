export interface Coordinates {
    lng: number; 
    lat: number;
}

export interface Location {
    coordinates: Coordinates; 
}

export interface Route {
    origin: Location, 
    destination: Location,
    departure: Date, 
    return : Date
}

