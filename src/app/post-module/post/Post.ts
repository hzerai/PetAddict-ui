import { Comment } from "../comment/Comment";

export class Post {
    id: number;
    title: string = '';
    body: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
   userFullName:string='Anonymous';
   userId:number;
   comments:Comment[]=[];

}