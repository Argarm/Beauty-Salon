export class User{
    id: string;
    name: string;
    surname: string;
    tlf: string;
    email: string;
    password: string;
    image: string;
    favorites: string;

    constructor(name,surname,tlf,email,password,image) {
        this.name = name;
        this.surname = surname;
        this.tlf = tlf;
        this.email = email;
        this.password = password;
        this.image = image
    }
}