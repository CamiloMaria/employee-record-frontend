export interface Employee {
    _id: string;
    completeName: string;
    extension: number;
    email: string;
    department: string;
    officeCode: string;
}
export interface EmployeeResponse {
    map(arg0: (items: any) => any): any; 
    value: Employee[];
}

