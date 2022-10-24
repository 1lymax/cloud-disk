import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {IconButton, InputBase, Paper} from "@mui/material";
import {setSearchName} from "../../store/reducers/FileSlice";
import SearchIcon from '@mui/icons-material/Search';

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const search = useAppSelector(state => state.fileState.searchName)

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
                onChange={(e)=>dispatch(setSearchName(e.target.value))}
                sx={{ ml: 1, flex: 1, color: 'white' }}
                placeholder="Search..."
            />
        </Paper>
    );
};

export default Search;