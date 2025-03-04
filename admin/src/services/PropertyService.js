import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/property`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const update = async(dataModel) => {
    const { id, formData } = dataModel
    const response = await axios.put(`${API_URL}/property/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const deleteProperty = async(id) => {
    const response = await axios.delete(`${API_URL}/property/${id}`)
    return response.data
}

const fetch = async() => {
    const response = await axios.get(`${API_URL}/property`)
    return response.data
}

const fetchById = async(id) => {
    const response = await axios.get(`${API_URL}/property/${id}`)
    return response.data
}

export { create, update, deleteProperty, fetch, fetchById } 