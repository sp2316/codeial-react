import {
  ADD_FRIEND,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const initialProfileState = [];

export default function friends(state = initialProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend); //adds to array
    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;
    default:
      return state;
  }
}
