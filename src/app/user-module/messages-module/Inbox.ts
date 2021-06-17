import { Message } from "./Message";

export class Inbox {
    messagesByUser: Map<string, Message[]> = new Map();
}