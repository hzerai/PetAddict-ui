import { AdoptionRequest } from "../adoption-module/adoption-request/AdoptionRequest";
import { Adoption } from "../adoption-module/adoption/Adoption";
import { Animals } from "../adoption-module/adoption/Animals";
import { Sexe } from "../adoption-module/adoption/Sexe";
import { Address } from "./Address";

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    about: string;
    email: string;
    phoneNumber: string;
    sexe: Sexe;
    favoriteAnimal: Animals;
    birthDate: Date;
    adoptions: Adoption[];
    adoptionRequests: AdoptionRequest[];
    recievedAdoptionRequests: AdoptionRequest[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    roles: string[];
    isMailPublic: boolean = false;
    isPhonePublic: boolean = false;
    allowNotification: boolean = false;
    address : Address;
    addressId : number;
    status:boolean;
}