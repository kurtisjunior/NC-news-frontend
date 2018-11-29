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
export const postComment = async (body, id) => {
    console.log(body, id, 'here')
}


export const getUser = async (user) => {
    const { data } = await axios.get(`${BASE_URL}/users/${user}`)
    return data
}


