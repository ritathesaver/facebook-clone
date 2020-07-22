import axios from 'axios';

const API_URL = 'http://localhost:5000'

export const getRequest = async (url, options = {}) => {
  const response = await axios.get(`${API_URL}${url}`, options)
  return response
}


export const postRequest = async (url, data, options) => {
  const response = await axios.post(`${API_URL}${url}`, data, options)
  return response
}

export const deleteRequest = async (url, options) => {
  const response = await axios.delete(`${API_URL}${url}`, options)
  return response
}
