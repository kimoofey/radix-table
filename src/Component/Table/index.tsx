import React, {Component} from 'react';
import {format} from "date-fns";
import {createStyles, lighten, makeStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddCosmonautModal from "../AddCosmonautModal";
import Checkbox from '@material-ui/core/Checkbox';
import Container from "@material-ui/core/Container";
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab";
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import {Cosmonaut, TablePropsInterface, TableStateInterface} from '../../types'
import {data, headers, sortOrder} from "../../CONSTS";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
});

const useToolbarStyles = makeStyles((theme: Theme) => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props: { numSelected: number }) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar className={numSelected > 0 ? classes.highlight : undefined}>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Cosmonauts
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

export type TableProps = TablePropsInterface & WithStyles<typeof styles>;

class TablePresenter extends Component<TableProps, TableStateInterface> {
    constructor(props: TableProps) {
        super(props);

        this.state = {
            orderedColumn: null,
            ordering: sortOrder.NONE,
            isOpenModal: false,
            data: data,
            selectedRows: [],
        }
    }

    handleRowClick = (event: React.MouseEvent, name: string) => {
        const selectedIndex = this.state.selectedRows.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selectedRows, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selectedRows.slice(1));
        } else if (selectedIndex === this.state.selectedRows.length - 1) {
            newSelected = newSelected.concat(this.state.selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selectedRows.slice(0, selectedIndex),
                this.state.selectedRows.slice(selectedIndex + 1),
            );
        }

        this.setState({selectedRows: newSelected});
    };

    handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = this.state.data.map((cosmonaut: Cosmonaut) => cosmonaut.name);
            this.setState({selectedRows: newSelecteds});
            return;
        }
        this.setState({selectedRows: []});
    };

    handleSubmit = (cosmonaut: Cosmonaut) => {
        this.setState({data: [...this.state.data, cosmonaut]});
        this.handleCloseModal();
    };

    handleOpenModal = () => {
        this.setState({isOpenModal: true});
    };

    handleCloseModal = () => {
        this.setState({isOpenModal: false});
    };

    handleRequestSort = (column: number) => {
        const isAsc: boolean = this.state.orderedColumn === column && this.state.ordering === sortOrder.ASC;
        this.setState({ordering: isAsc ? sortOrder.DESC : sortOrder.ASC, orderedColumn: column});
    };

    renderRow = (profile: Cosmonaut, index: number) => {
        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={profile.name}
                onClick={(event: React.MouseEvent) => this.handleRowClick(event, profile.name)}
                selected={this.state.selectedRows.indexOf(profile.name) !== -1}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={this.state.selectedRows.indexOf(profile.name) !== -1}
                        inputProps={{'aria-labelledby': `enhanced-table-checkbox-${index}`}}
                    />
                </TableCell>
                <TableCell align="right">
                    <div>{profile.name}</div>
                </TableCell>
                <TableCell align="right">
                    <div>{format(profile.date, 'dd/MM/yyyy')}</div>
                </TableCell>
                <TableCell align="right">
                    <div>{profile.days}</div>
                </TableCell>
                <TableCell align="right">
                    <div>{profile.mission}</div>
                </TableCell>
                <TableCell align="right">
                    <div>{profile.isMultiple}</div>
                </TableCell>
            </TableRow>
        );
    };

    renderHeader = (header: string, index: number) => {
        return (
            <TableCell
                key={header}
                align={'right'}
                sortDirection={this.state.orderedColumn === index ? this.state.ordering : false}
            >
                <TableSortLabel
                    active={this.state.orderedColumn === index}
                    direction={this.state.orderedColumn === index ? this.state.ordering : sortOrder.ASC}
                    onClick={() => this.handleRequestSort(index)}
                >
                    {header}
                    {this.state.orderedColumn === index ? (
                        <span className={this.props.classes.visuallyHidden}>
                  {this.state.ordering === sortOrder.DESC ? sortOrder.DESC : sortOrder.ASC}
                </span>
                    ) : null}
                </TableSortLabel>
            </TableCell>
        )
    };

    render() {
        return (
            <Container className={this.props.classes.root}>
                <Paper className={this.props.classes.paper}>
                    <EnhancedTableToolbar numSelected={this.state.selectedRows.length}/>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={this.state.selectedRows.length > 0 && this.state.selectedRows.length < this.state.data.length}
                                            checked={this.state.data.length > 0 && this.state.selectedRows.length === this.state.data.length}
                                            onChange={this.handleSelectAllClick}
                                            inputProps={{'aria-label': 'select all desserts'}}
                                        />
                                    </TableCell>
                                    {headers.map((header: string, index: number) => this.renderHeader(header, index))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((element: Cosmonaut, index: number) => this.renderRow(element, index))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Fab color="primary" aria-label="add" className={this.props.classes.fab}>
                        <AddIcon onClick={this.handleOpenModal}/>
                    </Fab>
                    <AddCosmonautModal isOpen={this.state.isOpenModal} handleClose={this.handleCloseModal}
                                       handleSubmit={this.handleSubmit}/>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(styles)(TablePresenter);