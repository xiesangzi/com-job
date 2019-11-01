

export const constantRoutes = [
	{
		path: '/',
		component: () => import('@/views/index'),
		hidden: true,
	},
	{
		path: '/login',
		component: () => import('@/views/login'),
		hidden: true
	},
	{
		path: '/index',
		component: () => import('@/views/index/index'),
		hidden: true
	},
	{
		path: '/register',
		component: () => import('@/views/register/register'),
		hidden: true,
		meta: {
			noAuth: true
		}
	},
	{
		path: '/writeinfo',
		component: () => import('@/views/writeinfo/writeinfo'),
		hidden: true
	},
	{
		path: '/editinfo',
		component: () => import('@/views/writeinfo/editinfo'),
		hidden: true
	},
	{
		path: '/invite',
		component: () => import('@/views/invite/invite'),
		hidden: true
	},
	{
		path: '/addinvite',
		component: () => import('@/views/invite/addinvite'),
		hidden: true
	},
	{
		path: '/invitemanger',
		component: () => import('@/views/invite/invitemanger'),
		hidden: true
	},
	{
		path: '/queryuser',
		component: () => import('@/views/invite/queryuser'),
		hidden: true
	},
	{
		path: '/resumecollect',
		component: () => import('@/views/invite/resumecollect'),
		hidden: true
	},
	{
		path: '/resources',
		component: () => import('@/views/resources/resources'),
		hidden: true
	},
	{
		path: '/setting',
		component: () => import('@/views/setting/setting'),
		hidden: true
	},
	{
		path: '/cooperate',
		component: () => import('@/views/cooperate/cooperate'),
		hidden: true
	},
	
	{
		path: '/test',
		component: () => import('@/views/test'),
		hidden: true
	},
	{
		path: '/test2',
		component: () => import('@/views/test2'),
		hidden: true
	}
]


const createRouter = () => new VueRouter({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}
export default router
