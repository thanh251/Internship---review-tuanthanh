export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserInput{
    name: string;
    email: string;
}
export interface UpdateUserInput{
    name?: string; // k bắt buộc :?
    email?: string;
}
