import {useSnackbar} from "notistack";
import React, {useEffect, useState} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";

import File from "./file/File";
import DiskButtons from "./DiskButtons";
import FileUploader from "./FileUploader";
import {fileAPI} from "../../services/FileService";
import {getErrorMessage} from "../../utils/getErrorMessage";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setCurrentDir, setFiles} from "../../store/reducers/FileSlice";
import UploaderProgress from "./UploaderProgress";


const Disk = () => {
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [dragEnter, setDragEnter] = useState(false);
    const files = useAppSelector(state => state.fileState.files)
    const dirStack = useAppSelector(state => state.fileState.dirStack)
    const currentDir = useAppSelector(state => state.fileState.currentDir)
    const {data, isSuccess, isLoading, error, refetch} = fileAPI.useGetFilesQuery(currentDir)

    const dragEnterHandler = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    useEffect(() => {
        if (isSuccess) dispatch(setFiles(data?.files));
    }, [isSuccess, data]);

    useEffect(() => {
        const backDirId = dirStack.length ? dirStack[dirStack.length - 1] : ''
        dispatch(setCurrentDir(backDirId));
    }, [dirStack]);

    useEffect(() => {
        if (error) enqueueSnackbar(getErrorMessage(error), {variant: "error"});
    }, [error]);

    if (dragEnter) return <FileUploader refetch={refetch}
                                 dragEnter={dragEnter}
                                 dragLeaveHandler={dragLeaveHandler}
                                 dragEnterHandler={dragEnterHandler}/>
    return (
        <>
            {!dragEnter &&
				<Box sx={{mt: 2, ml: 2, mr: 2, mb: 10}}
					 onDragEnter={dragEnterHandler}
					 onDragLeave={dragLeaveHandler}
					 onDragOver={dragEnterHandler}
				>
					<Stack direction="row" alignItems="center" spacing={1}>
						<DiskButtons/>
						<FileUploader refetch={refetch}
									  dragEnter={dragEnter}
									  dragLeaveHandler={dragLeaveHandler}
									  dragEnterHandler={dragEnterHandler}
						/>
					</Stack>
                    <UploaderProgress/>
					<Box sx={{mb: 4, m: 2,}}>
						<Grid container sx={{display: "grid", gridTemplateColumns: "1fr 4fr 2fr 1fr 1fr"}}>
							<Grid item sx={{gridColumnStart: 2}}>
								<Typography variant="h6">
									Name
								</Typography>
							</Grid>
							<Grid item sx={{gridColumnStart: 4, justifySelf: "center"}}>
								<Typography variant="h6">
									Date
								</Typography>
							</Grid>
							<Grid item sx={{gridColumnStart: 5, justifySelf: "center"}}>
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
            }
        </>

    );
};

export default Disk;