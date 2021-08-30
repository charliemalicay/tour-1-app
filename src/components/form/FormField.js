import React from 'react';
import { Box, InputBase, Typography } from "@material-ui/core";

import { useValidation } from './FieldValidation';

import './FormField.css';


const FormFieldUsingHooks = ({ name, label, value, onUpdate }) => {
    const [ErrorDisplay, validate] = useValidation();

    const onChange = (event) => {
        validate(event);
        onUpdate(name, event.target.value);
    };

    return (
        <Box key={name} className="tour-checkout-fields">
            <Typography>{ label }</Typography>
            <InputBase placeholder={`Enter ${ label }`} name={ name } value={ value }
                       className={value.length > 0 && 'filled'} onChange={ onChange } />
            <ErrorDisplay />
        </Box>
    );
}


const FormField = ({ name, label, value, onUpdate }) => {
    const onChange = (event) => {
        onUpdate(name, event.target.value);
    }

    return (
        <Box key={name} className="tour-checkout-fields">
            <Typography>{ label }</Typography>
            <InputBase placeholder={`Enter ${ label }`} name={ name } value={ value }
                       className={value.length > 0 && 'filled'} onChange={ onChange } />
        </Box>
    );
}

export { FormFieldUsingHooks, FormField };
