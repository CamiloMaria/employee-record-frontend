export interface Office {
    _id: string;
    pl: string;
    name: string;
    status: string;
}

export interface OfficeResponse {
    map(arg0: (items: any) => any): any; 
    value: Office[];
}
