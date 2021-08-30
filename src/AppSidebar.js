import React from 'react';
import { Typography } from '@material-ui/core';


const AppSidebar = () => {
    return (
        <div className="tour-side-bar">
            <Typography className="side-text">
                Our Tours
            </Typography>

            <Typography className="side-text">
                Explore California
            </Typography>

            <Typography className="side-text" align="justify">
                What type of California experience do you want to have? Are you looking for an exciting
                adventure? A chance to relax and get away from it all? Or maybe you're looking for a chance
                to do something entirely new and enriching! As you can see, we've got you covered. We offer
                tours that are as diverse as California itself! Select any of our tours learn more about pricing
                and available options.
            </Typography>
        </div>
    );
}

export default AppSidebar;
