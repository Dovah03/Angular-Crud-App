export interface User {
    id: number;
    firstName:string;
    lastName: string;
    username: string;
    profileImageUrl: string;
    role:string;
    email:string;
    creation_date:Date;
    last_login_date:Date;
    description: string;
}
