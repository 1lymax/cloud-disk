import React, {FC} from 'react';
import {Grid, Tooltip, Typography} from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import {IFile} from "../../../models/IFile";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {popDirStack, pushDirStack, setCurrentDir} from "../../../store/reducers/FileSlice";

interface FileProps {
    file: IFile;
}

const File: FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const currentDir = useAppSelector(state => state.fileState.currentDir)

    const handleDoubleClick = () => {
        if (currentDir === file._id) {
            dispatch(popDirStack());
        } else {
            dispatch(setCurrentDir(file._id ? file._id : ''))
            dispatch(pushDirStack(file._id));
        }
    };

    return (
        <Grid container alignItems="center" onDoubleClick={() => handleDoubleClick()}
              sx={{display: "grid", gridTemplateColumns: "1fr 4fr repeat(4, 1fr)", minHeight: '40px'}}>
            <Grid item sx={{gridColumnStart: 1, justifySelf: "center"}}>
                {file.type === "dir"
                    ?
                    <>
                        {currentDir !== file._id &&
                            <FolderOpenIcon sx={{fontSize: 40}} color="primary"/>
                        }
                    </>
                    :
                    <TextSnippetOutlinedIcon sx={{fontSize: 30}}/>}
            </Grid>
            <Grid item sx={{gridColumnStart: 2}}>
                <Typography variant="subtitle1">
                    {file.name}
                </Typography>
            </Grid>
            <Grid item sx={{gridColumnStart: 5, justifySelf: "center"}}>
                <Tooltip title={`${file.date.slice(4, 16)} ${file.date.slice(16, 24)}`}>
                    <Typography variant="subtitle2">
                        {file.date.slice(4, 15)}
                    </Typography>
                </Tooltip>

            </Grid>
            <Grid item sx={{gridColumnStart: 6, justifySelf: "center"}}>
                <Typography variant="subtitle1">
                    {file.size ? file.size.toString() : ''}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default File;