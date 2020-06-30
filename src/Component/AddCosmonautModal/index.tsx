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
import {emptyCosmonaut, emptyErrors} from "../../CONSTS";

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
            helperText: 'Cannot be empty!',
            error: emptyErrors,
        }
    }

    checkFields = () => {
        const {cosmonaut} = this.state;
        return new Promise(resolve => {
            this.setState({
                error: {
                    name: cosmonaut.name === '',
                    date: cosmonaut.date === 0 || isNaN(cosmonaut.date),
                    days: cosmonaut.days === 0 || isNaN(cosmonaut.days),
                    mission: cosmonaut.mission === '',
                }
            });
            resolve(this.state.error);
        })
    };

    handleSubmit = async (event: React.MouseEvent) => {
        const {handleSubmit} = this.props;
        const {cosmonaut, error} = this.state;
        await this.checkFields();
        if (!(cosmonaut === emptyCosmonaut || error.name || error.date || error.days || error.mission)) {
            handleSubmit(cosmonaut);
            this.setState({cosmonaut: emptyCosmonaut, error: emptyErrors});
        }
    };

    handleClose = (event: React.MouseEvent) => {
        const {handleClose} = this.props;
        this.setState({cosmonaut: emptyCosmonaut, error: emptyErrors});
        handleClose();
    };

    onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, name: event.target.value}}, () => this.checkFields());
    };

    onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({
            cosmonaut: {
                ...cosmonaut,
                date: new Date(event.target.value).getTime()
            }
        }, () => this.checkFields());
    };

    onChangeDays = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, days: parseInt(event.target.value)}}, () => this.checkFields());
    };

    onChangeMissions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, mission: event.target.value}}, () => this.checkFields());
    };

    onChangeCheckbox = () => {
        const {cosmonaut} = this.state;
        this.setState({cosmonaut: {...cosmonaut, isMultiple: !cosmonaut.isMultiple}});
    };

    render() {
        const {
            classes,
            isOpen,
        } = this.props;
        const {cosmonaut, error, helperText} = this.state;

        return (
            <div>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
                            required
                            helperText={error.name ? helperText : null}
                            error={error.name}
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
                            required
                            helperText={error.date ? helperText : null}
                            error={error.date}
                        />
                        <TextField
                            margin="dense"
                            id="days"
                            label="Days in flight"
                            type="number"
                            onChange={this.onChangeDays}
                            required
                            helperText={error.days ? helperText : null}
                            error={error.days}
                        />
                        <TextField
                            margin="dense"
                            id="missions"
                            label="Missions"
                            type="text"
                            fullWidth
                            multiline
                            onChange={this.onChangeMissions}
                            required
                            helperText={error.mission ? helperText : null}
                            error={error.mission}
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
                        <Button onClick={this.handleClose} color="primary">
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