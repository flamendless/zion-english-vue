import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

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
		path: "/services",
		name: "Services",
		component: () => import("../views/About.vue")
	},
	{
		path: "/teachers",
		name: "Teachers",
		component: () => import("../views/About.vue")
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/About.vue")
	},
	{
		path: "/contacts",
		name: "Contacts",
		component: () => import("../views/contacts.vue")
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
