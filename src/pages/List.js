import React, { useState, useEffect, useContext } from 'react';

import { Container, Box } from '@material-ui/core';

import './List.css';

import { AppContext } from '../AppContext';
import Item from '../components/Item';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import ServiceApi from '../services/ServiceApi';


const List = () => {
    const [list, setList] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        price_min: null,
        price_max: null,
        search: ''
    });

    const { wishlist, toggleWishlist } = useContext(AppContext);

    const updateList = () => {
        const queryParams = {
            price_min: 0,
            price_max: 0,
            search: "",
            page: pageIndex
        };

        if (filters.price_min) queryParams.price_min = filters.price_min;

        if (filters.price_max) queryParams.price_max = filters.price_max;

        if (filters.search && filters.search.length > 0) queryParams.search = filters.search;

        const paramsString = `?price_min=${queryParams.price_min}&price_max=${queryParams.price_max}&search=${queryParams.search}&page=${queryParams.page}`;

        ServiceApi.retrieveList(paramsString).then((data) => {
            const { results, count } = data;
            setList(results);
            setTotalItems(count);
        });
    }

    const updateFilters = (inpFilters) => {
        setFilters(inpFilters);
    }

    const previousPage = () => {
        setPageIndex(pageIndex - 1);
    }

    const nextPage = () => {
        setPageIndex(pageIndex + 1);
    }

    useEffect(() => {
        if((List && List.length === 0) && (totalItems && totalItems > 0)) {
            updateList();
        }
    }, []);

    useEffect(() => {
        updateList();
    }, [filters, pageIndex]);

    return (
        <Container maxWidth={ false } className="tour-list-package">
            <Filters onFilterUpdate={(inpFilters) => updateFilters(inpFilters)} />

            <Box className="items-handler">
                { list.map(item => {
                    return (
                        <Item key={item.id} route={`/details/${item.id}`} item={item} wishlist={wishlist}
                              toggleWishlist={toggleWishlist}/>);
                })}
            </Box>

            <Pagination pageIndex={ pageIndex } total={ totalItems } perPage={ 9 } onNext={() => nextPage()}
                        onPrevious={() => previousPage()}/>
        </Container>
    )
}

export default List;
