import { Colors } from "src/app/interface-module/filter/Colors";
import { Tailles } from "src/app/interface-module/filter/Tailles";
import { Animals } from "./Animals";
import { Sexe } from "./Sexe";

export class Animal {
    id: number;
    espece: Animals ;
    sexe: Sexe;
    taille: Tailles;
    age: number = 0;
    couleur: Colors;
    type: string = '';
    nom: string = '';
    updatedAt: Date;
    createdAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
}