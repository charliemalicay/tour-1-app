import React, { useState } from 'react';

import { AppBar, Typography, InputBase, Button, IconButton } from '@material-ui/core';
import { AttachMoney, Remove, Search } from '@material-ui/icons';

import './Filters.css';


const Filters = ({ onFilterUpdate }) => {
    const [currentState, setCurrentState] = useState({
        price_min: '',
        price_max: '',
        search: ''
    });

    const updateFilter = (event) => {
        setCurrentState({...currentState, [event.target.name]: event.target.value});
    }

    const applyFilter = () => {
        onFilterUpdate(currentState);
    }

    return (
        <AppBar position="static" className="tour-filters">
            <Typography>
                Filter By:
            </Typography>

            <div className="filter-price">
                <Typography>Price</Typography>

                <AttachMoney />
                <InputBase placeholder="minimum" name="price_min" value={currentState.price_min}
                           className={currentState.price_min.length > 0 && 'filled'}
                           onChange={(event) => updateFilter(event)} />

                <Remove />

                <AttachMoney />
                <InputBase placeholder="maximum" name="price_max" value={currentState.price_max}
                           className={currentState.price_max.length > 0 && 'filled'}
                           onChange={(event) => updateFilter(event)} />

                <Button variant="contained" onClick={applyFilter}>Apply</Button>
            </div>

            <div className="search-key-word">
                <Typography>Search keyword:</Typography>

                <InputBase placeholder="Try typing in 'hiking'" name="search" value={currentState.search}
                           className={currentState.search.length > 0 && 'filled'}
                           onChange={(event) => updateFilter(event)} />

                <IconButton aria-label="search-key-word" onClick={applyFilter}>
                    <Search />
                </IconButton>
            </div>
        </AppBar>
    );
}

export default Filters;
