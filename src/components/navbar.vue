<template>
<b-navbar toggleable="lg" type="light" variant="light" :sticky=true>
	<b-navbar-brand href="/home">{{ title }}</b-navbar-brand>
	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav class="ml-auto">
			<b-nav-item
				v-for="(item, i) in items" :key="i"
				:to="item.route"
				:active="get_route == item.route || get_route == item.route2">
				{{ item.title }}
			</b-nav-item>
		</b-navbar-nav>
	</b-collapse>
</b-navbar>
</template>

<script>
export default {
	name: "NavBar",
	props: {
		title: String,
	},

	computed: {
		get_route() {
			return this.$route.name;
		}
	},

	data: function() {
		return {
			items: [
				{
					route: "/home",
					route2: "",
					title: "Home",
				},
				{
					route: "/services",
					title: "Services",
				},
				{
					route: "/teachers",
					title: "Teachers",
				},
				{
					route: "/about",
					title: "About",
				},
				{
					route: "/contacts",
					title: "Contacts",
				},
			],
		}
	}
}
</script>

<style scoped>
</style>
