import { User } from "src/app/user-module/User";
import { AdoptionRequest } from "../adoption-request/AdoptionRequest";
import { Animal } from "./Animal";

export class Adoption {
    id: number;
    title: string = '';
    description: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    user : User;
    userId : number;
    animalId : number;
    animal : Animal = new Animal();
    adoptionRequests : AdoptionRequest[];
}