import {useSnackbar} from "notistack";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import React, {FC, Key, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField} from "@mui/material";

import {fileAPI} from "../../services/FileService";
import LoadingButton from "@mui/lab/LoadingButton";
import {getErrorMessage} from "../../utils/getErrorMessage";


interface ModalCreateDirProps {
    currentDir: Key | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalCreateDir: FC < ModalCreateDirProps > = ({open, setOpen, currentDir}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [dirName, setDirName] = useState<String>('');
    const [createDir, {isLoading: createLoading, error: createError, isSuccess}] = fileAPI.useCreateDirMutation()

    const handleCreateDir = async () => {
        await createDir({name: dirName, type: 'dir', parent: currentDir})
    };

    useEffect(() => {
        if (isSuccess) {
            setDirName('')
            setOpen(false)
        }
    }, [isSuccess]);

    useEffect(() => {
        if (createError)
            enqueueSnackbar(getErrorMessage(createError), {variant: "error"});
    }, [createError]);


    return (
            <Dialog fullWidth open={open} onClose={() => setOpen(false)} data-testid='modalCreateDir-dialog'>
                <DialogTitle>Folder create
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input the name of new folder
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Folder name"
                        value={dirName}
                        inputProps={
                            {"data-testid": "createDir-input"}
                        }
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setDirName(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}
                        data-testid='createDir-cancel-button'
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={createLoading}
                        loadingPosition="start"
                        onClick={handleCreateDir}
                        startIcon={<SaveIcon/>}
                        data-testid='createDir-submit-button'
                    >
                        Create
                    </LoadingButton>
                </DialogActions>
            </Dialog>
    );
};

export default ModalCreateDir;