import React, {FC, Key} from 'react';
import {Typography} from "@mui/material";

import File from "./file/File";
import {IFile} from "../../models/IFile";
import {useAppSelector} from "../../hooks/hooks";

import classes from './file/File.module.scss'

interface FileListProps {
    files: IFile[];
    refetch: () => void;
    parent: Key;
}

const FileList: FC<FileListProps> = ({files, refetch, parent}) => {
    const dirStack = useAppSelector(state => state.fileState.dirStack)
    const fileView = useAppSelector(state => state.fileState.fileView)

    const emptyFile = {
        name: '..', size: 0, date: '', path: '', type: 'dir', user: '',
        _id: dirStack[dirStack.length - 1],
    }

    return (
        <>
            {parent && <File refetch={refetch} file={emptyFile}/>}

            {files.length === 0 &&
				<div className={classes.notFound}>
					<Typography variant={'h5'}>File not found</Typography>
				</div>
            }
            <div className={fileView === 'list' ? classes.list__wrapper: classes.plate__wrapper}>
            {files.map(file =>
                <File file={file} refetch={refetch} key={file._id}/>
            )}
            </div>
        </>
    );
};

export default FileList;