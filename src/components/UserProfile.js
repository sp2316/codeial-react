import React, { Component } from 'react';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      //dispatch an action to fetch particular user
    }
  }

  render() {
    //   props->match->params->userId
    //same as {params}=this.props.match
    const {
      match: { params },
    } = this.props;
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
          <div className="field-value">Unknown</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">s@123.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add friend</button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
