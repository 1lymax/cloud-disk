export interface IUser {
    id: number;
    email: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string;
}

export interface UserAuthQuery {
    email: string;
    password: string
}

export interface UserAuthAnswer {
    user?: IUser;
    token?: string;
    status?: number;
    data?: {
        message: string
    }
}