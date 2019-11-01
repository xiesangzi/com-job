import {
	getToken
} from '@/utils/auth'

import {
	Message
} from 'iview'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
})

// request interceptor
service.interceptors.request.use(
	config => {
		var token = getToken();
		if (token && token != 'undefined') {
			config.headers['Authorization'] = getToken()
		} else {
			config.headers['Authorization'] = "Basic dnVlOnZ1ZQ=="
		}
		return config
	},
	error => {
		window.console.log(error)
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		const res = response.data
		return res;
	},
	error => {

		Message.error(error.response.data.msg);
		return Promise.reject(error)
	}
)

export default service
