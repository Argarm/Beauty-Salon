export class Service{
    name: string;
    tlf: string;
    schedule: string;
    rating: string;
    street: string;

    constructor(name,tlf,schedule,rating,street) {
        this.name = name;
        this.schedule = schedule;
        this.tlf = tlf;
        this.rating = rating;
        this.street = street;
    }
}