import React, {useEffect} from 'react';
import {useSnackbar} from "notistack";
import {Avatar, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {API_URL} from "../../config";
import {userAPI} from "../../services/UserService";
import {getErrorMessage} from "../../utils/getErrorMessage";
import {setCurrentUser} from "../../store/reducers/UserSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

import classes from './Profile.module.scss'

const Profile = () => {
        const user = useAppSelector(state => state.userState.currentUser)
        const {enqueueSnackbar} = useSnackbar()
        const dispatch = useAppDispatch()
        const [uploadAvatar, {
            error: uploadError,
            isLoading: uploadLoading,
            isSuccess: uploadSuccess,
            data: uploadData
        }] = userAPI.useUploadAvatarMutation()
        const [deleteAvatar, {
            error: deleteError,
            isLoading: deleteLoading,
            isSuccess: deleteSuccess,
            data: deleteData
        }] = userAPI.useDeleteAvatarMutation()

        const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files)
                Array.from(e.target.files).forEach(file => {
                        const formData: any = new FormData()
                        formData.append('file', file)
                        console.log('upload')
                        uploadAvatar(formData)
                    }
                )
        }

        const delAvatar = () => {
            deleteAvatar(undefined)
        }

        useEffect(() => {
            if (deleteSuccess || uploadSuccess) {
                dispatch(setCurrentUser(deleteData || uploadData))
                enqueueSnackbar('Avatar was updated', {variant: "success"});
            }
        }, [deleteSuccess, uploadSuccess]);

        useEffect(() => {
                if (deleteError)
                    enqueueSnackbar(getErrorMessage(deleteError), {variant: "error"});
                if (uploadError)
                    enqueueSnackbar(getErrorMessage(uploadError), {variant: "error"});
            }, [deleteError, deleteError]
        )
        ;


        return (
            <div className={classes.profile}>
                <div className={classes.profile__header}>
                    <Typography variant="h5">My Profile</Typography>
                </div>
                <div className={classes.profile__item}>
                    <div><Typography variant="h6">My avatar</Typography>
                        <div className={classes.profile__avatar__actions}>
                            <LoadingButton component="label" color='secondary'
                                           loading={uploadLoading}
                                           startIcon={<CloudDownloadIcon/>}>
                                <input hidden accept="image/*" type="file" onChange={e => {
                                    upload(e)
                                    e.target.value=''
                                }}/>
                                Upload
                            </LoadingButton>
                            <LoadingButton component="label" color='secondary'
                                           loading={deleteLoading}
                                           onClick={() => delAvatar()}
                                           startIcon={<DeleteForeverIcon/>}>
                                Delete
                            </LoadingButton>
                        </div>
                    </div>
                    <div className={classes.profile__avatar}>
                        <Avatar alt={user.email.toUpperCase()} src={API_URL + user?.avatar}
                                sx={{width: 56, height: 56}}/>

                    </div>
                </div>
            </div>
        );
    }
;

export default Profile;