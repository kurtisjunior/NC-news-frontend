import axios from "axios";
const BASE_URL = "https://kurtisncnews.herokuapp.com/api";

export const getArticles = async topic => {
  const url = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(url);
  return data;
};

export const getArticle = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data;
};

export const getComments = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data;
};

// WAITING FOR LOG-IN
export const postComment = async (body, userId, articleId) => {
  const newComment = {
    body: body,
    created_by: userId
  };

  const { data } = await axios.post(`${BASE_URL}/articles/${articleId}/comments`, newComment);
  return data;
};

export const getUser = async user => {
  const { data } = await axios.get(`${BASE_URL}/users/${user}`);
  return data.user;
};

export const makeVote = async (id, direction, section) => {
  const { data } = await axios.patch(`${BASE_URL}/${section}/${id}?vote=${direction}`);
  return data;
};

export const postArticle = async (article, id) => {
  article.created_by = id;
  const { data } = await axios.post(`${BASE_URL}/topics/${article.belongs_to}/articles`, article);
  return data;
};

export const deleteSomething = async id => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${id}`);
  return data;
};

// POST /api/topics/:topic_slug/articles

// https://kurtisncnews.herokuapp.com/api/comments/5bd324bda2eb70f78abd4de0?vote=up
