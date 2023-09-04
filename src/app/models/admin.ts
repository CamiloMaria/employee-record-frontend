export interface Admin {
    _id: string;
    username: string;
    password: string;
    role: string;
    created_at: Date;
}

export interface AdminResponse {
    map(arg0: (items: any) => any): any; 
    value: Admin[];
}