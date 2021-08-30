import React, {useState, useEffect, useContext} from 'react';

import {Paper, Box, Typography, CardMedia, Button} from '@material-ui/core';
import { AssignmentLate } from "@material-ui/icons";

import { AppContext } from '../AppContext';
import AddToWishlist from '../components/AddToWishlist';
import ServiceApi from '../services/ServiceApi';

import './Details.css';


const Details = ({ match, history }) => {
    const [details, setDetails] = useState(null);
    const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(null);

    const { setOrderItem, item } = useContext(AppContext);

    const { id } = match.params;

    const addToCart = async () => {
        await setOrderItem(details);
        history.push('/checkout');
    }

    useEffect(() => {
        ServiceApi.retrieveDetails(id).then((details) => {
            console.log("details: ", details);

            setDetails(details);
            setAlreadyAddedToCart(item && item.id === id);
        });
    }, []);

    return (
        <Paper className="tour-package-details">
            {details === null ?
                <Box className="tour-no-details">
                    <AssignmentLate />
                    <Typography>Package Tour have no details yet</Typography>
                </Box> :
                <Box className="tour-with-details">
                    <Box className="tour-with-details-header-1">
                        <Typography variant="h6">{ details.name }</Typography>
                        <Box className="tour-with-details-header-2">
                            <AddToWishlist itemId={details.id} />
                            <Typography>Add to Favorites</Typography>
                        </Box>
                    </Box>
                    <Box className="tour-with-details-body">
                        <Box className="tour-with-details-body-1">
                            <Typography><span>Start On:</span> { details.start }</Typography>

                            <Typography>
                                <span>Tour Length:</span>
                                { details.tour_length } { details.tour_length > 1 ? "Days" : "Day" }
                            </Typography>

                            <Typography><span>Total Price:</span> ${ details.price }</Typography>

                            <Typography className="newline">
                                <span>Package Description:</span>
                                { details.promo }
                            </Typography>
                        </Box>

                        <CardMedia className="tour-with-details-body-image" image={details.thumbnail_url}
                                   title={details.name} />
                    </Box>
                    <Box className="tour-with-details-footer">
                        <Button variant="contained" data-testid="buy" onClick={addToCart.bind(this)}>
                            { alreadyAddedToCart ? 'Already Reserved' : 'Reserve' }
                        </Button>
                    </Box>
                </Box>
            }
        </Paper>
    );
}

export default Details;
