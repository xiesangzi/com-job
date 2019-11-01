import App from './App'
import store from './store'
import router from './router'
import { getToken } from '@/utils/auth'

router.beforeEach((to, from, next) => {
	// debugger
	if (to.meta && to.meta.noAuth) {
		next()
	} else {
		if (getToken()) {
			if (store.getters.openId == '') {
				store.dispatch('getInfo').then(res => {
					next({
						path: "/index"
					})
				})
			} else {
				next()
			}
		} else {
			if (to.path === "/login") {
				next()
			} else {
				next({
					path: "/login",
					query: {
						redirect: to.fullPath
					}
				})
			}
		}
	}
})
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
