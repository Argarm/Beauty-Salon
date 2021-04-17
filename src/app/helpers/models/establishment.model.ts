export class Establishment{
    name: string;
    tlf: string;
    schedule: string[];
    rating: string;
    street: string;
    image : string[];
    isUserFavorite: boolean;
    services : Service [];
    bookings : Booking [];
}

export class Service{
    name : string;
    price : string;
    time : string
}

export class Booking{
    userId : string;
    duration : string;
    globalService : string;
    reservationDate : string;
    serviceName : string;
}