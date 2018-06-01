import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import Details from './Details';
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
  left: {
    height: '100vh',
    marginRight: -12,
    overflowY: 'scroll',
  },
  img: { height: 250 },
  noImg: { height: 2 * theme.spacing.unit },
  back: {
    position: 'absolute',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
    color: theme.palette.primary.contrastText,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    borderRadius: 50,
    padding: '8px 10px 6px',
  },
  details: { padding: 3 * theme.spacing.unit },
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
          <Typography variant="title" component="p">
            <Link href to="/" className={classes.back}>
              <i className="fas fa-arrow-left" />
              <span className="sr-only">Go Back</span>
            </Link>
          </Typography>

          {business.image_url ?
            <CardMedia className={classes.img} image={business.image_url} />
            : <div className={classes.noImg} />
          }

          <div className={classes.details}>
            <Details business={business} />
          </div>
        </Grid>
        <Grid item xs={12} sm>
          <iframe title="Google Maps" src={mapsURL} className={classes.map} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BusinessPage);
