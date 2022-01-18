import axios from 'axios';

// Get All User
export const GET_ALL_USER_BEGIN = 'GET_ALL_USER_BEGIN';
export const GET_ALL_USER_SUCCESS = 'GET_ALL_USER_SUCCESS';
export const GET_ALL_USER_FAILURE = 'GET_ALL_USER_FAILURE';

export const getAllUserBegin = () => ({
  type: GET_ALL_USER_BEGIN,
});
export const getAllUserSuccess = users => ({
  type: GET_ALL_USER_SUCCESS,
  payload: { users },
});
export const getAllUserFailure = error => ({
  type: GET_ALL_USER_FAILURE,
  payload: { error },
});

export function getAllUser() {
  return dispatch => {
    dispatch(getAllUserBegin());

    let apiUrl = 'https://jsonplaceholder.typicode.com/users';
    return axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          dispatch(getAllUserSuccess(response.data));
        } else {
          dispatch(getAllUserFailure(response.data));
        }
      })
      .catch(error => {
        dispatch(getAllUserFailure(error));
      });
  };
}

// Get List Post from all user
export const GET_ALL_POST_BEGIN = 'GET_ALL_POST_BEGIN';
export const GET_ALL_POST_SUCCESS = 'GET_ALL_POST_SUCCESS';
export const GET_ALL_POST_FAILURE = 'GET_ALL_POST_FAILURE';

export const getAllPostBegin = () => ({
  type: GET_ALL_POST_BEGIN,
});
export const getAllPostSuccess = posts => ({
  type: GET_ALL_POST_SUCCESS,
  payload: { posts },
});
export const getAllPostFailure = error => ({
  type: GET_ALL_POST_FAILURE,
  payload: { error },
});


export function getAllPost(comments) {
  return dispatch => {
    dispatch(getAllPostBegin());

    let apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    return axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else {
          dispatch(getAllPostFailure(response.data));
        }
      })
      .then(posts => {
        let postsWithComments = Array.from(Object.keys(posts).fill(0));
        posts.forEach((post, index) => {
          const postComments = comments.filter(comment => comment.postId == post.id)
          postsWithComments[index] = { ...post, comments: postComments }
        }
        )
        dispatch(getAllPostSuccess(postsWithComments));
      })
      .catch(error => {
        dispatch(getAllPostFailure(error));
      });

  };
}
