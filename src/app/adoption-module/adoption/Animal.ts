import { Animals } from "./Animals";
import { Sexe } from "./Sexe";

export class Animal {
    id: number;
    espece: Animals = Animals.NOTHING;
    sexe: Sexe;
    taille: string = '';
    age: number = 0;
    couleur: string = '';
    type: string = '';
    nom: string = '';
    updatedAt: Date;
    createdAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
}