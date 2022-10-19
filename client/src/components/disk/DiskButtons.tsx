import {Button} from "@mui/material";
import React, {useState} from 'react';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import ModalCreateDir from "../UI/ModalCreateDir";
import {popDirStack} from "../../store/reducers/FileSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const DiskButtons = () => {
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
            <ModalCreateDir currentDir={currentDir} open={modalOpen} setOpen={setModalOpen}/>
        </>
    );
};

export default DiskButtons;