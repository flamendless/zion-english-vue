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
	// {
	// 	path: "/services",
	// 	name: "Services",
	// 	component: () => import("../views/about.vue")
	// },
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
