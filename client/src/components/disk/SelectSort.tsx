import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {setSort} from "../../store/reducers/FileSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


const SelectSort = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.fileState.sort)

    return (
        <FormControl sx={{m: 1, minWidth: 150}} size="small">
            <InputLabel id="select-sort">Sort by...</InputLabel>
            <Select
                id="select-sort"
                label="Sort by..."
                value={sort}
                onChange={(e) => dispatch(setSort(e.target.value))}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value='name'>Name</MenuItem>
                <MenuItem value='type'>Type</MenuItem>
                <MenuItem value='date'>Date</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectSort;