import {Button} from "@mui/material";
import React, {FC, useState} from 'react';
import SyncIcon from '@mui/icons-material/Sync';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import ModalCreateDir from "../UI/ModalCreateDir";
import LoadingButton from "@mui/lab/LoadingButton";
import {popDirStack} from "../../store/reducers/FileSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


interface DiskButtonsProps {
    refetch: () => void;
    isLoading: boolean;
}


const DiskButtons: FC <DiskButtonsProps> = ({refetch, isLoading}) => {
    const dispatch = useAppDispatch()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const currentDir = useAppSelector(state => state.fileState.currentDir)


    const handleBackButton = () => {
        dispatch(popDirStack())
    };

    return (
        <>
            {currentDir &&
				<Button size="large"
						startIcon={<KeyboardBackspaceIcon/>}
						variant="text"
						sx={{textTransform: "none"}}
						onClick={handleBackButton}
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
            <LoadingButton loading={isLoading} size="large"
                    startIcon={<SyncIcon/>}
                    variant="text"
                    sx={{textTransform: "none"}}
                    onClick={() => refetch()}
            >
                Refresh
            </LoadingButton>
            <ModalCreateDir currentDir={currentDir} open={modalOpen} setOpen={setModalOpen}/>

        </>
    );
};

export default DiskButtons;