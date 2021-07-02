import { User } from "../User";


export class Message {
    id: number;
    toUser: string;
    fromUser: string;
    body: string;
    vu: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;

    public compare(b: Message): number {
        if (this.createdAt > b.createdAt) {
            return 1;
        }
        return -1;
    }
}