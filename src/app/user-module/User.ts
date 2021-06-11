import { AdoptionRequest } from "../adoption-module/adoption-request/AdoptionRequest";
import { Adoption } from "../adoption-module/adoption/Adoption";

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    about : string;
    email : string;
    phoneNumber : string;
    favoriteAnimal : string;
    birthDate : Date;
    adoptions : Adoption[];
    adoptionRequests : AdoptionRequest[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    roles:string[];
}