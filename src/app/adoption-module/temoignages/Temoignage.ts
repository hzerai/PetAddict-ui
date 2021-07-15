import { AdoptionRequest } from "../adoption-request/AdoptionRequest";

export class Temoignage {
    id: number;
    titre: string = '';
    body: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    adoption: AdoptionRequest;
}