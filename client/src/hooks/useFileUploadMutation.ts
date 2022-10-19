import axios, {AxiosError} from 'axios'
import {Key} from 'react'
import {useMutation} from 'react-query'
import {LocalStorage} from "ts-localstorage";
import {ACCESS_TOKEN} from "../utils/consts";
import {useAppDispatch} from "./hooks";
import {updateUploadProgress} from "../store/reducers/FileSlice";

interface IArgs {
    file: File,
    parent: Key
}

export const useFileUploadMutation = () => {
    const dispatch = useAppDispatch()

    const mutation = useMutation<void, AxiosError, any>(
        args => axios.post(
            'http://localhost:5000/api/files/upload',
            args,
            {
                headers: {
                    'authorization': 'Bearer ' + LocalStorage.getItem(ACCESS_TOKEN),
                },
                onUploadProgress: ev =>
                    dispatch(updateUploadProgress({
                            file: args.get('file').name,
                            progress: Math.round((ev.loaded * 100) / (args.get('file').size))
                        })
                    )
            }
        )
    )

    return {...mutation}
}