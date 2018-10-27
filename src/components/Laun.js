import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Laun extends React.Component {
  

  handleChange = event => {
    this.props.change(event.target.value)
  };
 
  render() {
    const { classes, laun} =this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel>Laun/Greiddar stundir</InputLabel>
          <Select
            value={laun}
            onChange={this.handleChange}
          >
            <MenuItem value={"grunnlaun"}>Grunnlaun</MenuItem>
            <MenuItem value={"regluleg laun"}>Regluleg laun</MenuItem>
            <MenuItem value={"regluleg heildarlaun"}>Regluleg heildarlaun</MenuItem>
            <MenuItem value={"heildarlaun"}>Heildarlaun</MenuItem>
            <MenuItem value={"greiddar stundir"}>Greiddar stundir</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

Laun.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Laun);