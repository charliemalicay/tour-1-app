import React, { useState, useEffect, useContext } from 'react';
import './Checkout.css';
import { AppContext } from '../AppContext';
import { FormField, FormFieldUsingHooks } from '../components/form/FormField';
import { FaMinusCircle } from 'react-icons/fa';
import OnHold from '../components/OnHold';

import {Paper, Typography, Box, Button} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

import App from "../App";
// import { withFieldValidation } from '../components/form/FieldValidation';

// const ValidatedField = withFieldValidation(FormField);


const Checkout = () => {
    const [validationErrors, setValidationErrors] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const checkoutContext = useContext(AppContext);
    const { booking, item, updateField, clearOrderItem } = checkoutContext;

    let errors = [];
    const inputFields = [
        { label: 'Name', name: 'name' },
        { label: 'Email Address', name: 'email_address' },
        { label: 'Street Address', name: 'street_address' },
        { label: 'City', name: 'city' }
    ];

    const placeOrder = () => {
        checkoutContext.placeOrder().then(() => {
            setValidationErrors([]);
            setOrderPlaced(true);
        }).catch((validationErrors) => {
            setValidationErrors(validationErrors);
            setOrderPlaced(false);
        });
    }

    if (orderPlaced) {
        return (
            <Paper className="tour-order-placed">
                <CheckCircle />
                <Box>
                    <Typography variant="h5">Checkout</Typography>
                    <Typography variant="h6">Thanks for buying an excursion with Explore California!</Typography>
                </Box>
            </Paper>
        );
    } else {
        const formFields = inputFields.map((fieldProps) => {
            return (
                <FormFieldUsingHooks
                    key={fieldProps.name}
                    value={booking[fieldProps.name]}
                    onUpdate={updateField}
                    {...fieldProps}
                />
            );
        });

        let displayItem;

        if (item) {
            displayItem = (
                <div>
                    <button className="Checkout-package-remove" onClick={() => clearOrderItem(item.id)}>
                        <FaMinusCircle />
                    </button>
                    {item.name} - ${item.price} starts on {item.start} for {item.tour_length} days.
                </div>
            );
        }

        return (
            <Paper className="tour-order-placing">
                <Typography variant="h6">Checkout</Typography>

                {/*<section className="Checkout-summary">*/}
                {/*    {item && <OnHold duration={59} />}*/}
                {/*    {displayItem}*/}
                {/*</section>*/}

                {inputFields.map((fieldProps) => (
                    <FormFieldUsingHooks
                        key={fieldProps.name}
                        value={booking[fieldProps.name]}
                        onUpdate={updateField}
                        {...fieldProps}
                    />
                )) }

                <Button variant="contained" onClick={() => placeOrder()} disabled={item === null}>Place Order</Button>
            </Paper>

            // <section className="Checkout">
            //     <header className="Checkout-header">
            //         <h2>Checkout</h2>
            //     </header>
            //
            //     <section className="Checkout-summary">
            //         {item && <OnHold duration={59} />}
            //         {displayItem}
            //     </section>
            //
            //     <section className="Checkout-form">
            //         <form>
            //             <ul>{ errors }</ul>
            //             { formFields }
            //         </form>
            //     </section>
            //
            //     <section className="Checkout-actions">
            //         <div className="Checkout-actions__next">
            //             <button onClick={() => placeOrder()} disabled={item === null}>
            //                 Place order
            //             </button>
            //         </div>
            //     </section>
            // </section>
        );

    }
}

export default Checkout;
