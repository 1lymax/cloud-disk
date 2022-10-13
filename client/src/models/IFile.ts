import {IUser} from "./IUser";

export interface IFile {
    id: number;
    name: string;
    isFolder: boolean
    user: IUser;
}