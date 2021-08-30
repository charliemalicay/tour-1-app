import React from 'react';

import { Paper, IconButton, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

import './Pagination.css';


const Pagination = ({ pageIndex, total, perPage, onNext, onPrevious }) => {
    const lastPage = Math.ceil(total / perPage);
    const previous = pageIndex > 1;
    const next = pageIndex < lastPage;

    return (
        <Paper className="tour-pagination">
            <IconButton aria-label="page-prev" disabled={!previous} onClick={ onPrevious }>
                <ArrowLeft />
            </IconButton>

            <Typography> { pageIndex } of { lastPage } {lastPage === 1 ? "Page" : "Pages"} </Typography>

            <IconButton aria-label="page-next" disabled={!next} onClick={ onNext }>
                <ArrowRight />
            </IconButton>
        </Paper>
    );
}

export default Pagination;
