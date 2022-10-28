import {Box} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {FC, useEffect} from 'react';
import LoadingButton from "@mui/lab/LoadingButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import {useAppSelector} from "../../hooks/hooks";
import {getErrorMessage} from "../../utils/getErrorMessage";
import {useFileUploadMutation} from "../../hooks/useFileUploadMutation";


interface FileUploaderProps {
    refetch: () => void;
    dragEnterHandler: (e: React.DragEvent) => void;
    dragLeaveHandler: (e: React.DragEvent) => void;
    dragEnter: boolean
}

const FileUploader: FC<FileUploaderProps> = ({refetch, dragEnter, dragEnterHandler, dragLeaveHandler}) => {
    const {enqueueSnackbar} = useSnackbar()
    const currentDir = useAppSelector(state => state.fileState.currentDir)
    const {
        mutate: uploadFile,
        error: uploadError,
        isSuccess: uploadSuccess,
    } = useFileUploadMutation()


    const uploadButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadFiles(e.target.files)
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        uploadFiles(e.dataTransfer.files)
        dragLeaveHandler(e)
    }

    const uploadFiles = (files:FileList | null) => {
        if (files)
            Array.from(files).forEach(file => {
                    const formData: any = new FormData()
                    formData.append('file', file)
                    if (currentDir)
                        formData.append('parent', currentDir);
                    uploadFile(formData)
                }
            )
    }

    useEffect(() => {
        if (uploadSuccess) {
            enqueueSnackbar('Upload success', {variant: "success"});
            refetch()
        }
    }, [uploadSuccess]);

    useEffect(() => {
        if (uploadError) {
            enqueueSnackbar(getErrorMessage(uploadError), {variant: "error"});
        }
    }, [uploadError]);


    return (
        <>
            {!dragEnter
                ?
                <LoadingButton
                    //loading={uploadLoading}
                    //loadingPosition="start"
                    startIcon={<CloudDownloadIcon/>}
                    variant="text"
                    component="label"
                    sx={{textTransform: "none", border: "2px dashed", paddingInline: 3}}
                >
                    Upload
                    <input hidden type="file" multiple onChange={uploadButtonHandler}/>
                </LoadingButton>
                :
                <Box sx={{
                    width: 'calc(100wh - 40px)',
                    height: 'calc(100vh - 150px - 40px)',
                    margin: '20px',
                    border: 'dashed 4px',
                    borderRadius: '10px',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                     onDragEnter={(e) => dragEnterHandler(e)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={(e) => dragEnterHandler(e)}
                     onDrop={(e) => dropHandler(e)}
                >
                    Перетащите файлы
                </Box>
            }
        </>
    );
};

export default FileUploader;