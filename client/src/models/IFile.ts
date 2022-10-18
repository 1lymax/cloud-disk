
import {Key} from "react";

export interface IFile {
    childs?:[];
    _id: Key;
    name: String;
    path: String;
    size: Number;
    date: String;
    type: String;
    user: String;
}

export interface IFileApiAnswer {
    files: IFile[]
}

export interface IFileCreate {
    name: String;
    parent: Key | null;
    type: String;
}