export class Establishments{
    name: string;
    tlf: string;
    schedule: string;
    rating: string;
    street: string;
    services : Service []
}

export class Service{
    name : string;
    price : string;
    time : string
}