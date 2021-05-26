import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup, Settings } from './';
import { authenticateUser } from '../actions/auth';

// Redirectin issue- 1.consider a user,who isnt logged in, goes to settings url and
//  gets redirected to login page..logs in..after logging in he goes to the home page instead of the setting page
//2. if logged in user goes to /settings url directly,he gets redirected to the home page refresh the settings page.
//To fix this,we pass the url our user wants to go to the login page and apply following logic
const PrivateRoute = (PrivateRouteProps) => {
  const { isLoggedin, path, component: Component } = PrivateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              //this state will be passed to our location prop,we can use location.state to get this prop in the login page
              state: {
                from: props.location, //props.location is an object{pathname:'path'}
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token); //decodes the middle part of jwt token and gets info about the user
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user.id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                /* history:history,location:location */
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

//Ensures whatever props we pass to compnents are the actual props that we intended to pass
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
