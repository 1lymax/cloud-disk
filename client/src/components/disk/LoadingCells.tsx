import React from 'react';
import {Skeleton} from "@mui/material";
import ShowGrid from "./ShowGrid";

const LoadingCells = () => {
    let loadingCells = []
    for (let i = 0; i < 4; i++) {
        loadingCells.push([
            <Skeleton variant="circular" width={30} height={30}/>,
            <Skeleton variant="rounded" width={Math.round(Math.random() * (250 - 150)) + 150} height={20}/>,
            <></>,
            <Skeleton variant="rounded" width={Math.round(Math.random() * (70 - 40)) + 40} height={20}/>,
            <Skeleton variant="rounded" width={Math.round(Math.random() * (70 - 40)) + 40} height={20}/>
        ])
    }

    return (
        <>
            {loadingCells.map(cells => <ShowGrid cells={cells}/>)}
        </>
    );
};

export default LoadingCells;