import React, {useEffect, useState} from 'react';
import {StyledTexEditorMenu, texEditorThemes} from "./style";
import Grid from "@material-ui/core/Grid";
import {Assignment, ClearAllOutlined} from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";
import Snackbar from "@material-ui/core/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";

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

const styles = {
    snackbarCopySuccess: {
        backgroundColor: "rgba(0, 255, 0, 0.8)",
        minWidth: "150px",
        width: "150px"
    }
};

const TexEditorMenu = ({classes, className, defaultFontSize, clearTexHandler, fontSizeChangeHandler, copyToClipboardHandler}) => {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopied = () => {
        copyToClipboardHandler();
        setIsCopied(true);
    };

    const handleCopiedOnClose = () => {
        setIsCopied(false);
    };

    return (
        <StyledTexEditorMenu className={className}>
            <Grid container spacing={3}
                  alignItems="center"
                  justify="center">
                <Grid item xs={3} align="center">
                    <ClearAllOutlined className={"menuItem"} onClick={clearTexHandler}>xs=3</ClearAllOutlined>
                </Grid>
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
                <Grid item xs={3} align="center" className="menuItem">
                    <Assignment onClick={handleCopied}>xs=3</Assignment>
                    <Snackbar open={isCopied}
                              anchorOrigin={{vertical: "top", horizontal: "right"}}
                              autoHideDuration={3000}
                              message="copied"
                              ContentProps={{
                                  "aria-describedby": "message-id",
                                  className: classes.snackbarCopySuccess
                              }}
                              onClose={handleCopiedOnClose}>
                    </Snackbar>
                </Grid>
            </Grid>
        </StyledTexEditorMenu>
    );
};

export default withStyles(styles, { withTheme: true })(TexEditorMenu);