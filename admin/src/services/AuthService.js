import { API_URL } from '../util/API_URL'
import axios from 'axios'

const signin = async(formData) => {
    const response = await axios.post(`${API_URL}`, formData)
    return response.data
}

export { signin }