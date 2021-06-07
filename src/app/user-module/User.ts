import { AdoptionRequest } from "../adoption-module/adoption-request/AdoptionRequest";
import { Adoption } from "../adoption-module/adoption/Adoption";

export class User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    adoptions : Adoption[];
    adoptionRequests : AdoptionRequest[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
}