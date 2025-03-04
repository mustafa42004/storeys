import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/team`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const fetch = async() => {
    const response = await axios.get(`${API_URL}/team`)
    return response.data
}

const update = async(dataModel) => {
    const response = await axios.put(`${API_URL}/team/${dataModel?.id}`, dataModel?.formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const deleteMember = async(id) => {
    const response = await axios.delete(`${API_URL}/team/${id}`)
    return response.data
}

export { create, update, deleteMember, fetch }