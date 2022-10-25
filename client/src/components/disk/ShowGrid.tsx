import React, {FC, ReactNode} from 'react';
import {Grid} from "@mui/material";

interface ShowGridProps {
    cells: ReactNode[];
}

const ShowGrid: FC<ShowGridProps> = ({cells}) => {
    const sxProps = [
        {justifySelf: 'center'},
        {justifySelf: 'left'},
        {},
        {justifySelf: 'left'},
        {justifySelf: 'left'},
    ]

    return (
        <Grid container sx={{display: "grid", gridTemplateColumns: "1fr 4fr 2fr 1fr 1fr"}}>
            {cells.map((cell, index) =>
                <Grid key={index} item sx={{gridColumnStart: `${index+1}`, height: '40px', alignItems: 'center', ...sxProps[index]}}>
                    {cell}
                </Grid>
            )}
        </Grid>
    );
};

export default ShowGrid;