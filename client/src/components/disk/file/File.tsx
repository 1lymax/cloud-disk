import {useSnackbar} from "notistack";
import ShareIcon from '@mui/icons-material/Share';
import LoadingButton from "@mui/lab/LoadingButton";
import React, {FC, useEffect, useState} from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {IconButton, Tooltip, Typography} from "@mui/material";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import {IFile} from "../../../models/IFile";
import sizeFormat from "../../../utils/sizeFormat";
import {fileAPI} from "../../../services/FileService";
import {fileDownload} from "../../../actions/fileDownload";
import {getErrorMessage} from "../../../utils/getErrorMessage";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {popDirStack, pushDirStack, setCurrentDir} from "../../../store/reducers/FileSlice";

import classes from './File.module.scss'


interface FileProps {
    file: IFile;
    refetch: () => void;
}

const File: FC<FileProps> = ({file, refetch}) => {
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const fileView = useAppSelector(state => state.fileState.fileView)
    const currentDir = useAppSelector(state => state.fileState.currentDir)
    const [actionButtonsVisible, setActionButtonsVisible] = useState(false)
    const [deleteFile, {
        isLoading: deleteLoading,
        error: deleteError,
        isSuccess: deleteSuccess
    }] = fileAPI.useDeleteFileMutation()

    const downloadHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        fileDownload(file)
    }

    const handleClick = () => {
        if (file.type === 'dir') {
            if (currentDir === file._id) {
                dispatch(popDirStack());
            } else {
                dispatch(setCurrentDir(file._id ? file._id : ''));
                dispatch(pushDirStack(file._id));
            }
        }

    };

    const deleteHandler = () => {
        deleteFile(file._id)
    };

    useEffect(() => {
        if (deleteError) enqueueSnackbar(getErrorMessage(deleteError), {variant: "error"});
    }, [deleteError]);

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar('File was deleted', {variant: "success"});
            refetch()
        }
    }, [deleteSuccess]);


    return (
        <div onClick={() => handleClick()}
             className={fileView === 'list' ? classes.list : classes.plate}
             onMouseEnter={() => setActionButtonsVisible(true)}
             onMouseLeave={() => setActionButtonsVisible(false)}
        >
            <div className={fileView === 'list' ? classes.list__icon : classes.plate__icon}>
                {file.type === "dir"
                    ? currentDir !== file._id &&
					<FolderOpenIcon
						className={fileView === 'list' ? classes.list__icon__folder : classes.plate__icon__folder}
						color="primary"/>
                    :
                    <TextSnippetOutlinedIcon
                        className={fileView === 'list' ? classes.list__icon__file : classes.plate__icon__file}
                    />
                }
            </div>
            <div className={fileView === 'list' ? classes.list__name : classes.plate__name}
                style={file.name.length > 23 ? {justifyContent: 'left'} : {}}
            >
                <Typography variant="subtitle1">
                    <Tooltip title={file.name.length > 23 ? file.name : ''}>
                        <Typography variant="subtitle2">
                            {file.name}
                        </Typography>
                    </Tooltip>
                </Typography>
            </div>
            <div className={fileView === 'list' ? classes.list__actions : classes.plate__actions}
                 style={!actionButtonsVisible ? {display: 'none'} : {}}>
                {file.type !== "dir" &&
					<IconButton color='secondary' onClick={(e) => downloadHandler(e)}>
						<CloudDownloadIcon/>
					</IconButton>
                }
                <LoadingButton loading={deleteLoading} variant='text' color='secondary' onClick={deleteHandler}>
                    <DeleteForeverIcon/>
                </LoadingButton>
                <IconButton color='secondary'>
                    <ShareIcon/>
                </IconButton>
            </div>
            <div className={fileView === 'list' ? classes.list__date : classes.plate__date}>
                <Tooltip title={`${file.date.slice(4, 16)} ${file.date.slice(16, 24)}`}>
                    <Typography variant="subtitle2">
                        {file.date.slice(4, 15)}
                    </Typography>
                </Tooltip>

            </div>
            <div className={fileView === 'list' ? classes.list__size : classes.plate__size}>
                <Typography variant="subtitle2">
                    {sizeFormat(file.size as number)}
                </Typography>
            </div>
        </div>
    );
};

export default File;