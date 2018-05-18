import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Api from './Api';
import HomePage from './HomePage';
import BusinessPage from './BusinessPage';
import LocalStorage from './LocalStorage';

const styles = {
  btn: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
};

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.storage = new LocalStorage('fcc-nightlife');
    this.state = {
      location: this.storage.get('location') || '',
      total: 0,
      businesses: [],
      loading: false,
      error: null,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onRequireMore = this.onRequireMore.bind(this);
  }

  componentDidMount() {
    if (this.state.location && !this.state.businesses.length) {
      this.onSearch(this.state.location);
    }
  }

  onSearch(location) {
    this.storage.set('location', location);
    this.setState({
      location,
      total: 0,
      businesses: [],
      loading: true,
      error: null,
    });

    Api.search(location)
      .then(response => this.setState({
        total: response.total,
        businesses: response.businesses || [],
        loading: false,
      }))
      .catch(error => this.setState({ error, loading: false }));
  }

  onRequireMore() {
    this.setState({
      loading: true,
      error: null,
    });

    Api.search(this.state.location, this.state.businesses.length)
      .then(response => this.setState(prevState => ({
        total: response.total,
        businesses: prevState.businesses.concat(response.businesses),
        loading: false,
      })))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const {
      location,
      total,
      businesses,
      loading,
      error,
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              location={location}
              total={total}
              businesses={businesses}
              loading={loading}
              error={!!error}
              onSearch={this.onSearch}
              onRequireMore={this.onRequireMore}
            />
          )}
        />

        <Switch style={{ backgroundColor: 'green' }}>
          <Route path="/profile" render={() => 'Profile'} />
          <Route path="/:id" component={BusinessPage} />
        </Switch>

        <Route
          render={route => (
            route.location.pathname.startsWith('/profile')
            || (
              <Button className={classes.btn} color="primary" variant="fab">
                <i className="fab fa-twitter" />
              </Button>
            )
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
