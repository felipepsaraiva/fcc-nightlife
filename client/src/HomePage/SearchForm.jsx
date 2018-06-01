import { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    marginTop: 7 * theme.spacing.unit,
    marginBottom: 5 * theme.spacing.unit,
  },
  paper: {
    padding: '5px 10px 10px',
  },
  searchBtn: {
    // Fix the paper padding to stay vertically centered
    marginTop: 5,
    marginLeft: theme.spacing.unit,
  },
});

class SearchForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    onSearch: PropTypes.func.isRequired,
  };

  static defaultProps = { loading: false };

  constructor(props) {
    super(props);
    this.state = { input: props.location };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ input: event.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    if (!this.props.loading) {
      this.props.onSearch(this.state.input);
    }
  }

  render() {
    const { classes, loading } = this.props;
    return (
      <Grid container justify="center" spacing={0} className={classes.root}>
        <Grid item xs sm={10} md={8} lg={6} xl={4}>
          <Paper className={classes.paper}>
            <form onSubmit={this.onSubmit} noValidate>
              <Grid container spacing={8} alignItems="center">
                <Grid item xs>
                  <TextField
                    autoFocus
                    fullWidth
                    label="My location is..."
                    onChange={this.onChange}
                    type="text"
                    value={this.state.input}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.searchBtn}
                    color="primary"
                    type="submit"
                    variant="raised"
                    disabled={loading}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchForm);
