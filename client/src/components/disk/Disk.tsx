import {useSnackbar} from "notistack";
import React, {useEffect, useState} from 'react';
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";

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
    const [sort, setSort] = useState('');
    const [dragEnter, setDragEnter] = useState(false);
    const files = useAppSelector(state => state.fileState.files)
    const dirStack = useAppSelector(state => state.fileState.dirStack)
    const parent = useAppSelector(state => state.fileState.currentDir)
    const search = useAppSelector(state => state.fileState.searchName)
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
    return (
        <>
            {!dragEnter &&
				<Box sx={{mt: 4, ml: 2, mr: 2, mb: 10}}
					 onDragEnter={dragEnterHandler}
					 onDragLeave={dragLeaveHandler}
					 onDragOver={dragEnterHandler}
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
						<FormControl sx={{m: 1, minWidth: 150}} size="small">
							<InputLabel id="select-sort">Sort by...</InputLabel>
							<Select
								id="select-sort"
								label="Sort by..."
								value={sort}
								onChange={(e) => setSort(e.target.value)}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value='name'>Name</MenuItem>
								<MenuItem value='type'>Type</MenuItem>
								<MenuItem value='date'>Date</MenuItem>
							</Select>
						</FormControl>
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
                                    {parent && (
                                        <File refetch={refetch}
                                              file={{
                                                  name: '..',
                                                  size: 0,
                                                  date: '',
                                                  path: '',
                                                  type: 'dir',
                                                  user: '',
                                                  _id: dirStack[dirStack.length - 1],
                                              }}
                                        />
                                    )}
                                    {files.length === 0 &&
										<Box sx={{width: '100%', height: '50px',
                                            display: 'flex',
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Typography variant={'h5'}>File not found</Typography>
                                        </Box>
                                    }
                                    {files.map(file =>
                                        <File file={file} refetch={refetch}/>
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