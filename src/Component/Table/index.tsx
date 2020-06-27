import React, {Component} from 'react';
import {format} from "date-fns";
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
    }
});

export type TableProps = TablePropsInterface & WithStyles<typeof styles>;

class TablePresenter extends Component<TableProps, TableStateInterface> {
    constructor(props: TableProps) {
        super(props);

        this.state = {
            orderedColumn: null,
            ordering: sortOrder.NONE,
        }
    }

    handleRequestSort = (column: number) => {
        const isAsc: boolean = this.state.orderedColumn === column && this.state.ordering === sortOrder.ASC;
        this.setState({ordering: isAsc ? sortOrder.DESC : sortOrder.ASC, orderedColumn: column});
    };

    renderRow = (profile: Cosmonaut) => {
        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={profile.name}
            >
                <TableCell align="right">{profile.name}</TableCell>
                <TableCell align="right">{format(profile.date, 'dd/MM/yyyy')}</TableCell>
                <TableCell align="right">{profile.days}</TableCell>
                <TableCell align="right">{profile.mission}</TableCell>
                <TableCell align="right">{profile.isMultiple}</TableCell>
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
            <Container>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header: string, index: number) => this.renderHeader(header, index))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((element: Cosmonaut) => this.renderRow(element))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab color="primary" aria-label="add" className={this.props.classes.fab}>
                    <AddIcon/>
                </Fab>
            </Container>
        )
    }
}

export default withStyles(styles)(TablePresenter);