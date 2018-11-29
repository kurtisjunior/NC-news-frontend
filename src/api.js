import axios from 'axios'
const BASE_URL = 'https://kurtisncnews.herokuapp.com/api'


export const getArticles = async (topic) => {
    const url = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`
    const { data } = await axios.get(url)
    return data
}


export const getArticle = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}`)
    return data
}


export const getComments = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`)
    return data
}


// WAITING FOR LOG-IN
export const postComment = async (body, userId, articleId) => {
    // console.log(body, articleId, userId, 'here')
    const newComment = {
        body: body,
        created_by: userId
    }

    const { data } = await axios.post(`${BASE_URL}/articles/${articleId}/comments`, newComment)
    console.log(data)
}


export const getUser = async (user) => {
    const { data } = await axios.get(`${BASE_URL}/users/${user}`)
    return data
}


