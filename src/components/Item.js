import React from 'react';
import { Link } from 'react-router-dom';
import { FaMountain } from 'react-icons/fa';

import { Card, Typography, CardHeader, Avatar, CardActionArea, CardMedia, CardContent,
    CardActions, Box } from '@material-ui/core';

import './Item.css';
import AddToWishList from './AddToWishlist';


const Item = ({ wishlist, toggleWishlist, item, route }) => {

    const textDescriptionLimiter = (inpText) => {
        const limitWords = 100;

        if (inpText.length > limitWords) {
            inpText = inpText.slice(0, limitWords) + "...";
        }

        return inpText;
    }

    return (
        <Card className="tour-item">
            <CardHeader
                avatar={
                    <Avatar aria-label="tour-package">
                        TP
                    </Avatar>
                }
                title={item.name}
                subheader={`${item.price} USD`}
            />

            <CardMedia image={item.thumbnail_url} title={item.name} alt={item.name}
                       height="120"/>

            <CardContent>
                <span className="tour-rating-handler">
                    <Typography>Difficulty - {item.rating}</Typography>
                    <span className={`tour-rating Item-rating__${item.rating}`}>
                        <FaMountain />
                        <FaMountain />
                        <FaMountain />
                    </span>
                </span>
                <Typography>{textDescriptionLimiter(item.promo)}</Typography>
            </CardContent>

            <CardActions>
                <Box>
                    <AddToWishList wishlist={wishlist} itemId={item.id} toggle={toggleWishlist} />
                    <Typography>Add To Favorites</Typography>
                </Box>
                <Link className="Item-more" to={route}>Learn more!</Link>
            </CardActions>
        </Card>
    );
}

export default Item;
