import { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    '& i': {
      fontSize: '0.7em',
      marginRight: 7,
      transform: 'rotate(30deg)',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: '3.7em',
    },
  },
  loader: {
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
});

class HomePage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.string,
    total: PropTypes.number.isRequired,
    businesses: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    onSearch: PropTypes.func.isRequired,
    onRequireMore: PropTypes.func.isRequired,
  };

  static defaultProps = {
    location: '',
    loading: false,
    error: false,
  };

  componentDidMount() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 300) {
        const {
          total,
          businesses,
          loading,
          onRequireMore,
        } = this.props;
        if (!loading && total > businesses.length) onRequireMore();
      }
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    const {
      classes,
      location,
      businesses,
      loading,
      error,
      onSearch,
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display4" align="center" className={classes.title} gutterBottom>
          N<i className="fas fa-glass-martini" /><span className="sr-only">i</span>ghtlife
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
  }
}

export default withStyles(styles)(HomePage);
