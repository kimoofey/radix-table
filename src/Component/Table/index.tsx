import React, {Component} from 'react';
import {format} from "date-fns";
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddCosmonautModal from "../AddCosmonautModal";
import Checkbox from '@material-ui/core/Checkbox';
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableToolbar from "../TableToolbar";
import {Cosmonaut, TablePropsInterface, TableStateInterface} from '../../types'
import {headers, mockedData, sortOrder} from "../../CONSTS";

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

export type TableProps = TablePropsInterface & WithStyles<typeof styles>;

class TablePresenter extends Component<TableProps, TableStateInterface> {
    constructor(props: TableProps) {
        super(props);
        this.state = {
            orderedColumn: null,
            ordering: sortOrder.NONE,
            isOpenModal: false,
            data: mockedData,
            selectedRows: [],
        }
    }

    handleDelete = () => {
        const {data, selectedRows} = this.state;
        const newData = data.filter((profile: Cosmonaut) => !selectedRows.includes(profile.name));
        this.setState({data: newData, selectedRows: []});
    };

    handleRowClick = (event: React.MouseEvent, name: string) => {
        const {selectedRows} = this.state;
        const selectedIndex = selectedRows.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        this.setState({selectedRows: newSelected});
    };

    handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {data} = this.state;
        if (event.target.checked) {
            const newSelected = data.map((cosmonaut: Cosmonaut) => cosmonaut.name);
            this.setState({selectedRows: newSelected});
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
        const {orderedColumn, ordering} = this.state;
        const isAsc: boolean = orderedColumn === column && ordering === sortOrder.ASC;
        this.setState({ordering: isAsc ? sortOrder.DESC : sortOrder.ASC, orderedColumn: column});
    };

    renderRow = (profile: Cosmonaut, index: number) => {
        const {selectedRows} = this.state;

        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={profile.name}
                onClick={(event: React.MouseEvent) => this.handleRowClick(event, profile.name)}
                selected={selectedRows.indexOf(profile.name) !== -1}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selectedRows.indexOf(profile.name) !== -1}
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
        const {
            orderedColumn,
            ordering,
        } = this.state;
        const {classes} = this.props;

        return (
            <TableCell
                key={header}
                align={'right'}
                sortDirection={orderedColumn === index ? ordering : false}
            >
                <TableSortLabel
                    active={orderedColumn === index}
                    direction={orderedColumn === index ? ordering : sortOrder.ASC}
                    onClick={() => this.handleRequestSort(index)}
                >
                    {header}
                    {orderedColumn === index ? (
                        <span className={classes.visuallyHidden}>
                  {ordering === sortOrder.DESC ? sortOrder.DESC : sortOrder.ASC}
                </span>
                    ) : null}
                </TableSortLabel>
            </TableCell>
        )
    };

    render() {
        const {
            selectedRows,
            data,
            isOpenModal,
        } = this.state;
        const {classes} = this.props;

        return (
            <Container className={classes.root}>
                <Paper className={classes.paper}>
                    <TableToolbar numSelected={selectedRows.length} handleDelete={this.handleDelete}/>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                                            checked={data.length > 0 && selectedRows.length === data.length}
                                            onChange={this.handleSelectAllClick}
                                        />
                                    </TableCell>
                                    {headers.map((header: string, index: number) => this.renderHeader(header, index))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((element: Cosmonaut, index: number) => this.renderRow(element, index))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Fab color="primary" aria-label="add" className={classes.fab}
                         onClick={this.handleOpenModal}>
                        <AddIcon/>
                    </Fab>
                    <AddCosmonautModal isOpen={isOpenModal} handleClose={this.handleCloseModal}
                                       handleSubmit={this.handleSubmit}/>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(styles)(TablePresenter);