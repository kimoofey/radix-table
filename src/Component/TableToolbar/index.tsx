import {lighten, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {TableToolbarProps} from "../../types";
import React from "react";

const useToolbarStyles = makeStyles((theme: Theme) => ({
    highlight: {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
        display: 'flex',
        flex: '1 1 100%',
    },
}));

const TableToolbar = (props: TableToolbarProps) => {
    const classes = useToolbarStyles();
    const {numSelected, handleDelete} = props;

    return (
        <Toolbar className={numSelected > 0 ? classes.highlight : ''}>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="h6" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Cosmonauts
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

export default TableToolbar;