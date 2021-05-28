import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    console.log('userId', match.params.userId);
    if (match.params.userId) {
      //dispatch an action to fetch particular user
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  render() {
    //   props->match->params->userId
    //same as {params}=this.props.match
    const {
      match: { params },
      profile,
    } = this.props;

    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading</h1>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add friend</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps)(UserProfile);
