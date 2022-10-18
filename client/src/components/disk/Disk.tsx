import {useSnackbar} from "notistack";
import React, {useEffect, useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import File from "./filelist/file/File";
import ModalCreateDir from "../UI/ModalCreateDir";
import {fileAPI} from "../../services/FileService";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {popDirStack, setCurrentDir, setFiles} from "../../store/reducers/FileSlice";
import {getErrorMessage} from "../../utils/getErrorMessage";



const Disk = () => {
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const files = useAppSelector(state => state.fileState.files)
    const dirStack = useAppSelector(state => state.fileState.dirStack)
    const currentDir = useAppSelector(state => state.fileState.currentDir)

    const {data, isSuccess, isLoading, error} = fileAPI.useGetFilesQuery(currentDir)
    const [uploadFile, {
        isLoading: uploadLoading,
        error: uploadError,
        isSuccess: uploadSuccess
    }] = fileAPI.useUploadFileMutation()


    useEffect(() => {
        if (isSuccess) {
            dispatch(setFiles(data?.files));
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (uploadSuccess) {
            enqueueSnackbar('Upload success', {variant: "success"});
        }
    }, [uploadSuccess]);

    const handleBackButton = () => {
        dispatch(popDirStack())
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData: any = new FormData()
        const file = e.target.files && e.target.files[0]
        formData.append('file', file)
        if (currentDir)
            formData.append('parent', currentDir);
        uploadFile(formData)

    }

    useEffect(() => {
        const backDirId = dirStack.length ? dirStack[dirStack.length - 1] : ''
        dispatch(setCurrentDir(backDirId));
    }, [dirStack]);

    useEffect(() => {
        if (error || uploadError) {
            enqueueSnackbar(getErrorMessage(error || uploadError), {variant: "error"});
        }
    }, [error || uploadError]);

    return (
        <Box sx={{m: 2}}>
            <ModalCreateDir currentDir={currentDir} open={modalOpen} setOpen={setModalOpen}/>
            <Stack direction="row" alignItems="center" spacing={1}>
                {currentDir &&
					<Button size="large"
							startIcon={<KeyboardBackspaceIcon/>}
							variant="text"
							sx={{textTransform: "none"}}
							onClick={() => handleBackButton()}
					>
						Back
					</Button>
                }
                <Button size="large"
                        startIcon={<CreateNewFolderIcon/>}
                        variant="text"
                        sx={{textTransform: "none"}}
                        onClick={() => setModalOpen(!modalOpen)}
                >
                    Create Dir
                </Button>
                <LoadingButton
                    loading={uploadLoading}
                    loadingPosition="start"
                    startIcon={<CloudDownloadIcon/>}
                    variant="text"
                    component="label"
                    sx={{textTransform: "none"}}
                >
                    Upload
                    <input hidden type="file" onChange={handleUpload}/>
                </LoadingButton>
            </Stack>
            <Box sx={{mb: 4, m: 2,}}>
                <Grid container sx={{display: "grid", gridTemplateColumns: "1fr 4fr repeat(4, 1fr)"}}>
                    <Grid item sx={{gridColumnStart: 2}}>
                        <Typography variant="h6">
                            Name
                        </Typography>
                    </Grid>
                    <Grid item sx={{gridColumnStart: 5, justifySelf: "center"}}>
                        <Typography variant="h6">
                            Date
                        </Typography>
                    </Grid>
                    <Grid item sx={{gridColumnStart: 6, justifySelf: "center"}}>
                        <Typography variant="h6">
                            Size
                        </Typography>
                    </Grid>
                </Grid>
                <>
                    {isLoading && !isSuccess
                        ?
                        <div>Loading Files...</div>
                        :
                        <>
                            {currentDir && (
                                <File file={{
                                    name: '..',
                                    size: 0,
                                    date: '',
                                    path: '',
                                    type: 'dir',
                                    user: '',
                                    _id: dirStack[dirStack.length - 1]
                                }}
                                />
                            )}
                            {files.map(file =>
                                <File file={file} key={file._id}/>
                            )}
                        </>

                    }
                </>
            </Box>
        </Box>
    );
};

export default Disk;