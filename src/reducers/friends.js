import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS } from '../actions/actionTypes';

const initialProfileState = [];

export default function friends(state = initialProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend); //adds to array
    default:
      return state;
  }
}
