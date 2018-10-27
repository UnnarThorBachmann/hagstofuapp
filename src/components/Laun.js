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
    const { classes, laun,launaflokkar} =this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel>Laun/Greiddar stundir</InputLabel>
          <Select
            value={laun}
            onChange={this.handleChange}
          >
          {
            Object.keys(launaflokkar).map(item=>
               <MenuItem key={item} value={`${item}`}>{`${launaflokkar[item]}`}</MenuItem>   
            )
          }
        
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