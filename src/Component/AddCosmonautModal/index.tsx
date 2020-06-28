import React, {Component} from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {ModalPropsInterface, ModalStateInterface} from "../../types";
import {emptyCosmonaut} from "../../CONSTS";

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

export type ModalProps = ModalPropsInterface & WithStyles<typeof styles>;

class AddCosmonautModal extends Component<ModalProps, ModalStateInterface> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            cosmonaut: emptyCosmonaut,
        }
    }

    handleSubmit = (event: React.MouseEvent) => {
        const {handleSubmit} = this.props;
        const {cosmonaut} = this.state;
        handleSubmit(cosmonaut);
        this.setState({cosmonaut: emptyCosmonaut});
    };

    onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, name: event.target.value}});
    };

    onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, date: new Date(event.target.value).getTime()}});
    };

    onChangeDays = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, days: parseInt(event.target.value)}});
    };

    onChangeMissions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, mission: event.target.value}});
    };

    onChangeCheckbox = () => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, isMultiple: !cosmonaut.isMultiple}})
    };

    render() {
        const {
            classes,
            isOpen,
            handleClose,
        } = this.props;
        const {cosmonaut} = this.state;

        return (
            <div>
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new cosmonaut</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={this.onChangeName}
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            label="Date of flight"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.onChangeDate}
                        />
                        <TextField
                            margin="dense"
                            id="days"
                            label="Days in flight"
                            type="number"
                            onChange={this.onChangeDays}
                        />
                        <TextField
                            margin="dense"
                            id="missions"
                            label="Missions"
                            type="text"
                            fullWidth
                            multiline
                            onChange={this.onChangeMissions}
                        />
                        <FormControlLabel
                            label="Have multiple flights"
                            control={
                                <Checkbox
                                    checked={cosmonaut.isMultiple}
                                    onChange={() => this.onChangeCheckbox()}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddCosmonautModal);