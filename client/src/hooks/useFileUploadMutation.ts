import axios, {AxiosError} from 'axios'
import {useMutation} from 'react-query'
import {LocalStorage} from "ts-localstorage";

import {IFile} from "../models/IFile";
import {useAppDispatch} from "./hooks";
import {ACCESS_TOKEN} from "../utils/consts";
import {updateUploadProgress} from "../store/reducers/FileSlice";
import {API_URL} from "../config";


export const useFileUploadMutation = () => {
    const dispatch = useAppDispatch()

    const mutation = useMutation<IFile, AxiosError, any>(
        args => axios.post(
            `${API_URL}api/files/upload`,
            args,
            {
                headers: {
                    'authorization': 'Bearer ' + LocalStorage.getItem(ACCESS_TOKEN),
                },
                onUploadProgress: ev =>
                    dispatch(updateUploadProgress({
                            file: args.get('file').name,
                            progress: Math.round((ev.loaded * 100) / (ev.total ? ev.total : 1))
                        })
                    )
            }
        )
    )

    return {...mutation}
}