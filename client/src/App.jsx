import { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Api from './Api';
import HomePage from './HomePage';
import LocalStorage from './LocalStorage';

const styles = {
  title: {
    flex: 1,
    textTransform: 'capitalize',
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
    if (this.state.location) this.onSearch(this.state.location);

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 300) {
        const { total, businesses, loading } = this.state;
        if (!loading && total > businesses.length) this.onRequireMore();
      }
    };
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
      businesses,
      loading,
      error,
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.title} noWrap>
              Nightlife {this.state.location}
            </Typography>
            <Button color="secondary" variant="raised">Sign in</Button>
          </Toolbar>
        </AppBar>

        <div>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                location={location}
                businesses={businesses}
                loading={loading}
                error={!!error}
                onSearch={this.onSearch}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
