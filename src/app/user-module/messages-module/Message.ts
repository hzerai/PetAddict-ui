import { User } from "../User";


export class Message {
    id: number;
    toUser: string;
    fromUser: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}