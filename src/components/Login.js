import React, { Component } from 'react';
import { login } from '../actions/auth';
import { connect } from 'react-redux';
//Controlled component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('this.state=', this.state);
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Login);
