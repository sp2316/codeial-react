import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';
import { authenticateUser } from '../actions/auth';

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
    const { posts } = this.props;

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
  };
}

//Ensures whatever props we pass to compnents are the actual props that we intended to pass
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
