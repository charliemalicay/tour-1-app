import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import './AddToWishlist.css';
import { AppContext } from '../AppContext';


export default function AddToWishlist({ itemId }) {
    return (
        <AppContext.Consumer>
            {context => {
                const wishListItemCond = context.wishlist &&
                    context.wishlist.filter((data) => data.package === itemId).length > 0;

                // console.log("wishListItemCond: ", wishListItemCond);

                return (<button className="AddToWishlist" onClick={() => context.toggleWishlist(itemId)}>
                    { wishListItemCond ? <FaHeart /> : <FaRegHeart /> }
                </button>);
            }}
        </AppContext.Consumer>
    );
}
