export interface IUser {
    firstName?: string;
    lastName?: string;
    username: string;
    email: string;
    updatePassword?: boolean;
}

export interface IUserUpdateBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    updatePassword?: boolean;
}

export interface IUserRegisterBody {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
