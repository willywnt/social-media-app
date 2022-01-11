import * as postActions from './postActions';

const initialState = {
  users: [],
  posts: [],
  error: null,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postActions.GET_ALL_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case postActions.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case postActions.GET_ALL_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case postActions.GET_ALL_POST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case postActions.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case postActions.GET_ALL_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default postReducer;
