import Axios from 'axios';

const dotenv = require('dotenv');

const default_host = process.env.REACT_APP_BACKEND_URL;


export default {
    async retrieveWishlist() {
        return new Promise((resolve) => {
            Axios.get(default_host + '/api/v1/wishlist/').then((response) => {
                resolve(response.data);
            });
        });
    },

    async wishlistAdd(id) {
        const data = { id };

        return Axios.post( default_host + '/api/v1/wishlist/', data);
    },

    async wishlistDelete(itemId) {
        return Axios.delete(default_host + `/api/v1/wishlist/${itemId}/`);
    },

    async wishlistCartStatus(id, added_to_cart) {
        const data = { id, added_to_cart };

        return Axios.patch(default_host + `/api/v1/wishlist/${id}/`, data);
    },

    async retrieveDetails(id) {
        const api_url = default_host + `/api/v1/packages/${id}/`;

        return new Promise((resolve) => {
            Axios.get(api_url).then((response) => {
                resolve(response.data);
            });
        });
    },

    async retrieveList(queryParams) {
        const api_url = default_host + '/api/v1/packages/' + queryParams;

        return new Promise((resolve) => {
            Axios.get( api_url).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error.stack);
            });
        });
    },

    async createBooking(data) {
        return new Promise((resolve, reject) => {
            Axios.post(default_host + '/api/v1/bookings/', data).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    }
}
