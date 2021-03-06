import axios from 'axios';
import store from 'store';

export const register = newUser => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
    // return axios.post('/users/register', {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password,
       
  }, {withCredentials: true})
  .then(res => {
    console.log('Registered!, now what? I am from UserFunctions');
  })
  .catch(err => {
    console.log(err);
  });
};

export const login = user => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
    // return axios.post(`/users/login`, {
    email: user.email,
    password: user.password
  },  {withCredentials: true})
  .then(res => {
   let tokenix = JSON.stringify(res.data);
    localStorage.setItem('usertoken', tokenix)
    return res.data;
  })
  .catch(err => {
    console.log(err);
  })
}

export const articles = newArticle => {
  return axios.post(`${process.env.REACT_APP_API_URL}/articles`, {
    // return axios.post(`/articles`, {
    title: newArticle.title,
    // author: newArticle.author,
    body: newArticle.body,
    imageUrl: newArticle.imageUrl,
    userId: newArticle.userId
  }, {withCredentials: true})
  .then(res => {
    console.log('Article added!');
  });
};


export const handleUpload = theFile => {

    // console.log('file in service: ', theFile);
  return  axios.post(`${process.env.REACT_APP_API_URL}/upload`, theFile,  {withCredentials: true})
  // return  axios.post(`/upload`, theFile,  {withCredentials: true})
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      });
};

export const logOut = () => (e) => {
  e.preventDefault();
  axios.post(`${process.env.REACT_APP_API_URL}/`,  {withCredentials: true});
  // axios.post(`/`,  {withCredentials: true});
  localStorage.removeItem('usertoken');
  store.remove('loggedIn');
  console.log('you have been logged out. boo!');
};

//  export const like = (params, credentials, articleId) => {
//   return fetch('/articles/like/', {
//     method: 'PUT',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + credentials.t
//     },
//     body: JSON.stringify({userId:params.userId, articleId: articleId})
//   }).then((response) => {
//     return response.json()
//   }).catch((err) => {
//     console.log(err)
//   })
// }




// export const unlike = (params, credentials, articleId) => {
//   return fetch('/articles/unlike/', {
//     method: 'PUT',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + credentials.t
//     },
//     body: JSON.stringify({userId:params.userId, articleId: articleId})
//   }).then((response) => {
//     return response.json()
//   }).catch((err) => {
//     console.log(err)
//   })
// }
