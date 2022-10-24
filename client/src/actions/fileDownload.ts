import {LocalStorage} from "ts-localstorage";

import {IFile} from "../models/IFile";
import {ACCESS_TOKEN} from "../utils/consts";


export const fileDownload = async (file: IFile) => {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            authorization: `Bearer ${LocalStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name as string
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
    return response
};