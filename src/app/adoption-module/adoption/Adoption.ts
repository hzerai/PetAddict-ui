import { User } from "src/app/user-module/User";
import { Animals } from "./Animals";

export class Adoption {
    id: number;
    title: string = '';
    description: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    user : User;
    animal : Animals
}