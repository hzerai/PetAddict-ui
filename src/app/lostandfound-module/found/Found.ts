import { User } from "src/app/user-module/User";
import { Animal } from "../../adoption-module/adoption/Animal";

export class Found {
    id: number;
    title: string = '';
    description: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    user : User;
    animal : Animal = new Animal();
}