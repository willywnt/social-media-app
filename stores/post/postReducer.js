import * as postActions from './postActions';

const initialState = {
  users: [],
  posts: [],
  hasMoreToLoad: true,
  error: null,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postActions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case postActions.GET_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case postActions.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case postActions.GET_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case postActions.GET_POSTS_LOADED:
      return {
        ...state,
        loading: false,
      };
    case postActions.GET_POSTS_MORE_LOAD:
      return {
        ...state,
        hasMoreToLoad: action.payload.hasMoreToLoad,
      };
    default:
      return state;
  }
};

export default postReducer;
