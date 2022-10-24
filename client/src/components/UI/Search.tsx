import SearchIcon from '@mui/icons-material/Search';
import React, {FC, useEffect, useState} from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";

import {useAppDispatch} from "../../hooks/hooks";
import {useDebounce} from "../../hooks/useDebounce";
import {setSearchName} from "../../store/reducers/FileSlice";

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('');

    useEffect(
        useDebounce(
            () => dispatch(setSearchName(search)),
            500),
        [search])

    return (
        <Paper elevation={0}
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: 300,
                backgroundColor: 'rgba(255,255,255,0.25)', color: 'white'
            }}
        >
            <IconButton color="inherit" sx={{ p: '10px'}}>
                <SearchIcon />
            </IconButton>
            <InputBase
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                sx={{ ml: 1, flex: 1, color: 'white' }}
                placeholder="Search..."
            />
        </Paper>
    );
};

export default Search;