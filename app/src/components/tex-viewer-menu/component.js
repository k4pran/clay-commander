import React, {useEffect, useState} from 'react';
import {StyledTexViewerMenu} from "./style";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const marks = [
    {
        value: 10,
        label: '10px',
    },
    {
        value: 20,
        label: '20px',
    },
    {
        value: 30,
        label: '30px',
    },
    {
        value: 40,
        label: '40px',
    },
];

const TexViewerMenu = ({className, defaultFontSize, fontSizeChangeHandler}) => {

    return (
        <StyledTexViewerMenu className={className}>
            <Grid container spacing={3}
                  alignItems="center"
                  justify="center">
                <Grid item xs={3} align="center">
                    <Slider
                        defaultValue={defaultFontSize}
                        onChange={(event, val) => fontSizeChangeHandler(val)}
                        aria-labelledby="discrete-slider-custom"
                        step={2}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={10}
                        max={40}
                    />
                </Grid>
            </Grid>
        </StyledTexViewerMenu>
    );
};

export default TexViewerMenu;