import axios from 'axios'
const BASE_URL = 'https://kurtisncnews.herokuapp.com/api'


export const getArticles = async (topic) => {
    const url = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`
    const { data } = await axios.get(url)
    return data
}