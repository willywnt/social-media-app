import axios from 'axios';

// Get List Post, Comment Post, User Post
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_POSTS_BEGIN = 'GET_POSTS_BEGIN';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
export const GET_POSTS_LOADED = 'GET_POSTS_LOADED';
export const GET_POSTS_MORE_LOAD = 'GET_POSTS_MORE_LOAD';

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: { users },
});

export const getPostsBegin = () => ({
  type: GET_POSTS_BEGIN,
})

export const getPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  payload: { posts },
});

export const getPostsFailure = error => ({
  type: GET_POSTS_FAILURE,
  payload: { error },
});

export const getPostsLoaded = () => ({
  type: GET_POSTS_LOADED,
});

export const getPostsMoreLoad = hasMoreToLoad => ({
  type: GET_POSTS_MORE_LOAD,
  payload: { hasMoreToLoad },
});

const getComments = async (ids) => {
  let apiUrl = `https://jsonplaceholder.typicode.com/comments?postId=${ids}`;
  return await axios.get(apiUrl).then(res => res.data);
}

const getUsers = async (ids) => {
  let apiUrl = `https://jsonplaceholder.typicode.com/users?id=${ids}`;
  return await axios.get(apiUrl).then(res => res.data);
}

const getPictureUsers = async (userIdLength) => {
  let apiUrl = `https://randomuser.me/api/?results=${userIdLength}&inc=picture&noinfo`;
  return await axios.get(apiUrl).then(res => res.data.results);
}

export function getPosts(page) {
  return (dispatch, getState) => {
    const { postReducer } = getState();
    const currentPosts = postReducer.posts;
    const currentUsers = postReducer.users;
    const hasMoreToLoad = postReducer.hasMoreToLoad;
    if (hasMoreToLoad) {
      dispatch(getPostsBegin());
    } else {
      return 0;
    }

    let apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`;
    return axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          if (response.data.length > 0) {
            return response.data;
          } else {
            dispatch(getPostsMoreLoad(false));
          }
        } else {
          dispatch(getPostsFailure(response.data));
        }
      })
      .then(async (posts) => {
        let newPosts = Array.from(Object.keys(posts).fill(0));

        // fetch data comment by postIds
        let postIds = posts
          .map(item => {
            return item.id;
          })
          .join('&postId=');
        const postComments = await getComments(postIds);

        let userId = [];
        posts.forEach((post, index) => {
          // filter postComments if match post id then append to newPosts
          const comments = postComments.filter(comment => comment.postId === post.id);
          newPosts[index] = { ...post, comments };

          // temporarily save userId but no duplicates in fetching data post
          let i = userId.findIndex(x => x.id === post.userId);
          if (i <= -1) {
            userId.push({ id: post.userId });
          }
        });
        // insert newPosts into currentPosts
        newPosts = [...currentPosts, ...newPosts];

        if (!currentUsers.length) {
          // first data fetching, no need check if user id already existing
          let userIds = userId
            .map(item => {
              return item.id;
            })
            .join('&id=');
          let newUsers = await getUsers(userIds);
          let userPicture = await getPictureUsers(userId.length);
          let newUsersWithPicture = newUsers.map((item, index) => ({ ...item, picture: userPicture[index].picture }));

          dispatch(getUsersSuccess(newUsersWithPicture));
        } else {
          // check if userIds no duplicate by currentUsers id
          let userIdFilted = userId.filter(item => !currentUsers.find(users => users.id === item.id));
          let userIds = userIdFilted
            .map(item => {
              return item.id;
            })
            .join('&id=');
          let newUsers = await getUsers(userIds);
          let userPicture = await getPictureUsers(userIdFilted.length);
          let newUsersWithPicture = newUsers.map((item, index) => ({ ...item, picture: userPicture[index].picture }));
          // insert newUsersWithPicture into currentUsers
          newUsersWithPicture = [...currentUsers, ...newUsersWithPicture];

          dispatch(getUsersSuccess(newUsersWithPicture));
        }

        // after data users was fetched
        dispatch(getPostsSuccess(newPosts));
        dispatch(getPostsLoaded());
      })
      .catch(error => {
        dispatch(getPostsFailure(error));
      });
  };
}
