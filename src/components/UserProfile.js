import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';
// import { addFriend } from './actions/friends';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log('userId', match.params.userId);
    if (match.params.userId) {
      //dispatch an action to fetch particular user
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;

    //if we click on a profile,we check if that user id is present in the list of friends of the current user
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    //if the user id is present in the friends list of the current user,that user is a friend
    if (index !== -1) return true;
    //if no id
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added friend succesfully',
      });
      console.log('hi', data.data.friendship);
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { match } = this.props;
    const url = APIUrls.removeFriend(match.params.userId);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed friend succesfully',
      });
      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

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
    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error, successMessage } = this.state;
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
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove friend
            </button>
          )}
          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert success-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  friends: state.friends,
});
/* another way
const mapStateToProps =({profile,friends})
{
    return{
        profile,
        friends
    };
    */

export default connect(mapStateToProps)(UserProfile);
