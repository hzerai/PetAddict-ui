
export class Comment {
    id: number;
    body: string = '';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string = '';
    updatedBy: string = '';
    userFullName:string='Anonymous';
    userId:number;
    comments:Comment[]=[];
}