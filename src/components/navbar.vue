<template>
<b-navbar toggleable="lg" type="light" variant="light" :sticky=true>
	<b-navbar-brand href="#">{{ title }}</b-navbar-brand>
	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav class="ml-auto">
			<b-nav-item :href="links.home">Home</b-nav-item>
			<b-nav-item :href="links.services">Services</b-nav-item>
			<b-nav-item :href="links.teachers">Teachers</b-nav-item>
			<b-nav-item :href="links.about_us">About Us</b-nav-item>

			<b-nav-item-dropdown text="Contact Us" right>
				<b-dropdown-item :href="links.email">E-Mail</b-dropdown-item>
				<b-dropdown-item :href="links.skype">Skype</b-dropdown-item>
			</b-nav-item-dropdown>
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
	data: function() {
		return {
			links: {
				home: "#",
				services: "#services",
				teachers: "#teachers",
				about_us: "#about_us",
				email: "#email",
				skype: "#skype",
			},
		}
	}
}
</script>

<style scoped>
</style>
