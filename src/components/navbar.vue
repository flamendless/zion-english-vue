<template>
<b-navbar toggleable="lg" type="dark" :sticky=true>
	<b-navbar-brand :href="home" v-ripple>{{ site_name }}</b-navbar-brand>
	<b-navbar-toggle target="nav-collapse">
		<template v-slot:default="{ expanded }">
			<b-icon v-if="expanded" icon="caret-up-fill"></b-icon>
			<b-icon v-else icon="caret-down-fill"></b-icon>
		</template>
	</b-navbar-toggle>

	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav class="ml-auto">
			<b-nav-item
				v-ripple
				v-for="(item, i) in items" :key="i"
				:href="item.route"
				:title="item.title"
				:active="get_route == item.route || get_route == item.route2">
				<b-icon class="nav-icon" :icon="item.icon"></b-icon>
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
		site_name: String,
	},

	computed: {
		get_route() {
			return this.$route.path;
		}
	},

	data: function() {
		return {
			home: "/",
			items: [
				{
					route: "#home",
					route2: "",
					title: "Home",
					icon: "house-fill",
				},
				{
					route: "#services",
					title: "Services",
					icon: "briefcase-fill",
				},
				{
					route: "#teachers",
					title: "Teachers",
					icon: "people-fill",
				},
				{
					route: "#about",
					title: "About",
					icon: "info-circle-fill",
				},
				{
					route: "#contacts",
					title: "Contacts",
					icon: "telephone-fill",
				},
			],
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

$navbar-dark-active-color: red;
$navbar-light-active-color: red;
$navbar-light-brand-color: red;
$navbar-light-brand-hover-color: red;
$navbar-dark-brand-color: red;
$navbar-dark-brand-hover-color: red;

.navbar {
	background-color: $golden_brown;
	box-shadow: 0px 8px 16px grey;
}

.navbar-brand {
	font-family: "Montserrat";
	font-weight: 900;
}

.nav-icon {
	transition: opacity 1s;
	color: white;
	opacity: 0.8;
}

.nav-item {
	font-family: "Quicksand";
	font-weight: bold;
	margin-left: 8px;
	margin-right: 8px;
}

.nav-item:hover .nav-icon {
	opacity: 1;
}
</style>
