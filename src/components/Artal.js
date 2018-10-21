import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Artal extends React.Component {
  state = {
    ar: "2017"
  };

  handleChange = event => {
    this.setState({ ar: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel>Ártal</InputLabel>
          <Select
            value={this.state.ar}
            onChange={this.handleChange}
          >
            <MenuItem value={"2014"}>2014</MenuItem>
            <MenuItem value={"2015"}>2015</MenuItem>
            <MenuItem value={"2016"}>2016</MenuItem>
            <MenuItem value={"2017"}>2017</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

Artal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Artal);