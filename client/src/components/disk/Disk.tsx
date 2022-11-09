import {useSnackbar} from "notistack";
import React, {useEffect, useState} from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {Box, IconButton, LinearProgress, Stack, Typography} from "@mui/material";

import FileList from "./FileList";
import ShowGrid from "./ShowGrid";
import SelectSort from "./SelectSort";
import DiskButtons from "./DiskButtons/DiskButtons";
import FileUploader from "./FileUploader";
import LoadingCells from "./LoadingCells";
import sizeFormat from "../../utils/sizeFormat";
import UploaderProgress from "./UploaderProgress";
import {fileAPI} from "../../services/FileService";
import {getErrorMessage} from "../../utils/getErrorMessage";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setCurrentDir, setFiles, setFileView} from "../../store/reducers/FileSlice";


const Disk = () => {
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [dragEnter, setDragEnter] = useState(false);
    const {
        sort,
        files,
        dirStack,
        fileView,
        currentDir: parent,
        searchName: search,
        uploadProgress
    } = useAppSelector(state => state.fileState)
    const user = useAppSelector(state => state.userState.currentUser)
    const {data, isSuccess, isLoading, error, refetch} = fileAPI.useGetFilesQuery({parent, sort, search})


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
        refetch()
    }, [sort, parent]);

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

    const headerCells = [
        <></>,
        <Typography variant="h6">
            Name
        </Typography>,
        <></>,
        <Typography variant="h6">
            Date
        </Typography>,
        <Typography variant="h6">
            Size
        </Typography>
    ]


    return (
        <>
            {!dragEnter &&
				<Box sx={{
                    mt: 4, ml: 2, mr: 2, mb: 5,
                    minHeight: 'calc(100vh - 220px)'
                }}
					 onDragEnter={dragEnterHandler}
					 onDragLeave={dragLeaveHandler}
					 onDragOver={dragEnterHandler}
                     data-testid='disk-page'
				>
					<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<DiskButtons refetch={refetch} isLoading={isLoading}/>
							<FileUploader refetch={refetch}
										  dragEnter={dragEnter}
										  dragLeaveHandler={dragLeaveHandler}
										  dragEnterHandler={dragEnterHandler}
							/>
						</Stack>
						<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
							<SelectSort/>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<IconButton color='primary' onClick={() => dispatch(setFileView('list'))}
											aria-label='List'
								>
									<ViewListIcon/>
								</IconButton>
								<IconButton color='primary' onClick={() => dispatch(setFileView('plate'))}
											aria-label='Plate'
								>
									<ViewModuleIcon/>
								</IconButton>
							</Stack>
						</Stack>
					</Stack>
					<UploaderProgress uploadProgress={uploadProgress}/>
					<Box sx={{mb: 4, m: 2,}}>
                        {fileView === 'list' && <ShowGrid cells={headerCells}/>}
						<>
                            {isLoading && !isSuccess
                                ? <LoadingCells/>
                                : <FileList files={files} refetch={refetch} parent={parent}/>

                            }
						</>
					</Box>
				</Box>
            }
            <Box sx={{width: '300px', ml: 5}}>
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography variant={"subtitle1"}>
                                Used {sizeFormat(user.usedSpace)} of
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant={"subtitle1"}>
                                {sizeFormat(user.diskSpace)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <LinearProgress variant="determinate" value={(user.usedSpace / user.diskSpace) * 100}
                                aria-label='Used disk space'
                />
                <Box sx={{display: 'flex', justifyContent: 'end', mt: 1}}>
                    <Typography variant={"subtitle2"} sx={{cursor: 'pointer'}}>
                        Need more space?
                    </Typography>
                </Box>
            </Box>
        </>

    );
};

export default Disk;