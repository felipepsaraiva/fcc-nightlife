import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Loader from '../common/Loader';
import Api from '../Api';

// TODO: Restrict Maps API Key

const styles = theme => ({
  loader: { marginTop: 5 * theme.spacing.unit },
  error: {
    marginTop: 5 * theme.spacing.unit,
    color: 'white',
    opacity: 0.87,
  },
  back: {
    color: theme.palette.primary.contrastText,
  },
  left: {
    height: '100vh',
    padding: 3 * theme.spacing.unit,
    overflowY: 'scroll',
  },
  name: {
    color: theme.palette.primary.contrastText,
    opacity: 0.87,
    fontWeight: 500,
  },
  map: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

class BusinessPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      business: null,
      error: false,
    };
  }

  componentDidMount() {
    Api.fetchBusiness(this.state.id)
      .then(response => this.setState({ business: response }))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const { classes } = this.props;
    const { business, error } = this.state;

    if (!(error || business)) {
      return (<Loader className={classes.loader} />);
    }

    if (error) {
      return (
        <Typography variant="display1" align="center" className={classes.error} component="p">
          Something went wrong, please try again...
        </Typography>
      );
    }

    const coordinates = encodeURIComponent(`${business.coordinates.latitude}, ${business.coordinates.longitude}`);
    const mapsURL = `//www.google.com/maps/embed/v1/place?key=AIzaSyDVxgSD61DGShcSkYO9zI4Se1aEKYroo7s&q=${coordinates}`;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm className={classes.left}>
          <Typography variant="headline" component="p">
            <Link href to="/" className={classes.back}>
              <i className="fas fa-arrow-left" />
              <span className="sr-only">Go Back</span>
            </Link>
          </Typography>

          <Typography variant="display2" align="center" className={classes.name}>
            {business.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm>
          <iframe title="Google Maps" src={mapsURL} className={classes.map} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BusinessPage);
