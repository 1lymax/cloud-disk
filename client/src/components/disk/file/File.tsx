import React, {FC, useState} from 'react';
import ShareIcon from '@mui/icons-material/Share';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {Grid, IconButton, Tooltip, Typography} from "@mui/material";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import {IFile} from "../../../models/IFile";
import {fileDownload} from "../../../actions/fileDownload";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {popDirStack, pushDirStack, setCurrentDir} from "../../../store/reducers/FileSlice";


interface FileProps {
    file: IFile;
}

const File: FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const [actionButtonsVisible, setActionButtonsVisible] = useState(false)
    const currentDir = useAppSelector(state => state.fileState.currentDir)

    const downloadHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        fileDownload(file)
    }

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
              sx={{display: "grid", gridTemplateColumns: "1fr 4fr 2fr 1fr 1fr", minHeight: '40px'}}
              onMouseEnter={() => setActionButtonsVisible(true)}
              onMouseLeave={() => setActionButtonsVisible(false)}
        >
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
            <Grid item sx={{gridColumnStart: 3, justifySelf: "right"}}
                  hidden={!actionButtonsVisible}
            >
                {file.type !== "dir" &&
					<IconButton color='secondary' onClick={(e) => downloadHandler(e)}>
						<CloudDownloadIcon/>
					</IconButton>
                }
                <IconButton color='secondary'>
                    <DeleteForeverIcon/>
                </IconButton>
                <IconButton color='secondary'>
                    <ShareIcon/>
                </IconButton>
            </Grid>
            <Grid item sx={{gridColumnStart: 4, justifySelf: "center"}}>
                <Tooltip title={`${file.date.slice(4, 16)} ${file.date.slice(16, 24)}`}>
                    <Typography variant="subtitle2">
                        {file.date.slice(4, 15)}
                    </Typography>
                </Tooltip>

            </Grid>
            <Grid item sx={{gridColumnStart: 5, justifySelf: "center"}}>
                <Typography variant="subtitle1">
                    {file.size ? file.size.toString() : ''}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default File;