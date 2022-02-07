import axios from 'axios'

const apiServer = axios.create({
	baseURL: 'http://localhost:3001'
})

export default apiServer;