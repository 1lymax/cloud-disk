import {useSnackbar} from "notistack";
import React, {useEffect} from 'react';
import {Skeleton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import Count from "../../components/Count";
import sizeFormat from "../../utils/sizeFormat";
import {fileAPI} from "../../services/FileService";
import {REGISTRATION_ROUTE} from "../../utils/consts";
import {getErrorMessage} from "../../utils/getErrorMessage";

import classes from './Main.module.scss'

const Main = () => {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const {data, isLoading, error} = fileAPI.useGetStatsQuery(undefined, {
        pollingInterval: 30000
    })

    useEffect(() => {
        if (error) {
            enqueueSnackbar(getErrorMessage(error), {variant: "error"});
        }
    }, [error]);

    return (
        <div className={classes.main__wrapper} data-testid='main-page'>
            <div className={classes.main}>
                <div className={classes.main__title}>
                    Our service is
                </div>
                <div className={[classes.main__users, classes.main__item__wrapper].join(' ')}>
                    <div className={classes.main__item__header}>
                        <PeopleAltIcon sx={{fontSize: 80, mr: 1}}/>
                        {isLoading
                            ?
                            <Skeleton variant="rounded" width={120} height={60} data-testid='skeleton-elem'/>
                            :
                            data?.users &&
							<Count number={String(data?.users)} duration={1000}/>

                        }
                    </div>
                    <div className={classes.main__item__description}>registered users</div>
                </div>

                <div className={[classes.main__space, classes.main__item__wrapper].join(' ')}>
                    <div className={classes.main__item__header}>
                        <CloudDoneIcon sx={{fontSize: 80, mr: 1}}/>
                        {isLoading
                            ?
                            <Skeleton variant="rounded" width={180} height={60} data-testid='skeleton-elem'/>
                            :
                            data?.usedSpace &&
                            <>
							<Count number={sizeFormat(data?.usedSpace as number)} duration={1500}/>
                                {sizeFormat(data?.usedSpace as number, true)}
                            </>
                        }
                    </div>
                    <div className={classes.main__item__description}>used space</div>
                </div>

                <div className={[classes.main__files, classes.main__item__wrapper].join(' ')}>
                    <div className={classes.main__item__header}>
                        <SaveAsIcon sx={{fontSize: 80, mr: 1}}/>
                        {isLoading
                            ?
                            <Skeleton variant="rounded" width={120} height={60} data-testid='skeleton-elem'/>
                            :
                            data?.files &&
							<Count number={String(data?.files)} duration={3000}/>

                        }
                    </div>
                    <div className={classes.main__item__description}>uploaded files</div>
                </div>

                <div className={[classes.main__try, classes.main__item__wrapper].join(' ')}>
                    <div className={classes.main__try__link}
                         onClick={() => navigate(REGISTRATION_ROUTE)}>try it for free.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
