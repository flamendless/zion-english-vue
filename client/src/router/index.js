import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Root",
		component: Home
	},
	{
		path: "/home",
		name: "Home",
		component: Home
	},
	{
		path: "/backend",
		name: "Backend",
		component: () => import("../views/backend.vue")
	},
	// {
	// 	path: "/dashboard",
	// 	name: "Dashboard",
	// 	component: () => import("../views/dashboard.vue")
	// },
	{
		path: "/sign_in",
		name: "SignIn",
		component: () => import("../views/sign_in.vue")
	},
	{
		path: "/sign_up",
		name: "SignUp",
		component: () => import("../views/sign_up.vue")
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
