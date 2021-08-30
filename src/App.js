import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import { Container, Grid, Typography } from '@material-ui/core';
import { Explore } from '@material-ui/icons';

import { AppContext } from './AppContext';
import AppSidebar from './AppSidebar';

import CartLink from './components/CartLink';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import List from './pages/List';

import './App.css';



const App = () => {
    const [wishlist, setWishlist] =  useState([]);
    const [booking, setBooking] =  useState({
        name: '',
        email_address: '',
        street_address: '',
        city: ''
    });
    const [item, setItem] = useState(null);

    const toggleWishlist = (itemId) => {
        let toggle;

        // if (wishlist.includes(itemId)) {
        //     toggle = ServiceApi.wishlistDelete(itemId);
        // } else {
        //     toggle = ServiceApi.wishlistAdd(itemId);
        // }
        //
        // toggle.then(() => {
        //     ServiceApi.retrieveWishlist().then((data) => {
        //         setWishlist(data);
        //     })
        // });
    }

    const updateField = (field, value) => {
        setBooking({...booking, [field]: value });
    }

    const setOrderItem = (item) => {
        // return new Promise((resolve) => {
        //     ServiceApi.wishlistCartStatus(item.id, true).then(() => {
        //         setItem(item);
        //         resolve(item);
        //     });
        // });
    }

    const clearOrderItem = (itemId) => {
        // return new Promise((resolve) => {
        //     ServiceApi.wishlistCartStatus(itemId, false).then(() => {
        //         setItem(null);
        //         resolve();
        //     });
        // });
    }

    const placeOrder = () => {
        const bookingData = {...booking, package: item.id};

        // return new Promise((resolve, reject) => {
        //     ServiceApi.createBooking(bookingData).then(() => {
        //         setItem(null);
        //         resolve();
        //     }).catch((validationErrors) => {
        //         reject(validationErrors);
        //     });
        // });
    }

    useEffect(() => {
        // if (wishlist && wishlist.length === 0) {
        //     ServiceApi.retrieveWishlist().then((data) => {
        //         setWishlist(data);
        //     });
        // }
    }, [wishlist]);

    return (
        <BrowserRouter>
            <Container maxWidth={ false } className="tour-container">
                <Grid container spacing={4}>
                    <Grid item xs={2} className="tour-main-icon">
                        <NavLink to="/">
                            <span>
                                <Explore />
                                <Typography >
                                    Explore Our Tours
                                </Typography>
                            </span>
                        </NavLink>
                    </Grid>
                    <Grid item xs={10} className="tour-other-options">
                        <button>Advertise your tour</button>
                        <button>Help</button>
                        <CartLink booking={booking} />
                    </Grid>
                    <Grid item xs={2}>
                        <AppSidebar />
                    </Grid>
                    <Grid item xs={10} className="tour-body-display">
                        <AppContext.Provider value={{
                            wishlist, booking, item,
                            toggleWishlist, updateField,
                            setOrderItem, clearOrderItem, placeOrder
                        }}>
                            <Route path="/" exact component={List} />
                            <Route path="/details/:id" component={Details} />
                            <Route path="/checkout" component={Checkout} />
                        </AppContext.Provider>
                    </Grid>
                </Grid>
            </Container>
        </BrowserRouter>
    );
}

export default App;
