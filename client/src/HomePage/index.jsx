import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SearchForm from './SearchForm';
import BusinessCard from './BusinessCard';
import Loader from '../common/Loader';

const styles = theme => ({
  root: {
    padding: 3 * theme.spacing.unit,
    paddingTop: 4 * theme.spacing.unit,
  },
  title: {
    color: theme.palette.common.white,
    fontWeight: '500',
  },
  subheading: {
    color: theme.palette.common.white,
    opacity: 0.70,
  },
  loader: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
});

const HomePage = ({
  classes,
  location,
  businesses,
  loading,
  error,
  onSearch,
}) => (
  <div className={classes.root}>
    <Typography variant="display2" align="center" className={classes.title} gutterBottom>
      Where are you going tonight?
    </Typography>
    <Typography variant="display2" align="center" component="p" gutterBottom>
      <i className="fas fa-fw fa-map-marker-alt" />
      <i className="fas fa-fw fa-taxi" />
      <i className="fas fa-fw fa-glass-martini" />
    </Typography>

    <SearchForm
      location={location}
      loading={loading}
      onSearch={onSearch}
    />

    <Grid container justify="center" align="center" spacing={24}>
      {businesses.map(business => (
        <Grid key={business.id} item xs={12} sm={6} md={5} lg={4}>
          <BusinessCard business={business} />
        </Grid>
      ))}
    </Grid>

    <Loader className={classes.loader} render={loading} />

    {error &&
      <Typography variant="display1" align="center">
        Something went wrong. Please try again...
      </Typography>
    }
  </div>
);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.string,
  businesses: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  location: '',
  loading: false,
  error: false,
};

export default withStyles(styles)(HomePage);
