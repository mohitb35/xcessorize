import axios from 'axios'

const apiServer = axios.create({
	// baseURL: 'http://localhost:3001'
	baseURL: 'https://xcessorize-api.herokuapp.com'
})

export default apiServer;