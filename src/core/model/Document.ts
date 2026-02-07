export interface Document {
    id: number;
    name: string;
    linkFile: string;
    deadline: string; // ISO string
    isValid: boolean;
}
export interface Existence {
    id: number; 
    name: string;
    status: string;
    date: string; // ISO string
}