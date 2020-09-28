<template>
<b-navbar toggleable="lg" type="light" variant="light" :sticky=true>
	<b-navbar-brand href="#home">{{ title }}</b-navbar-brand>
	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav class="ml-auto">
			<b-nav-item
				v-for="(item, i) in items" :key="i"
				:href="item.hash"
				:active="hash == item.hash || hash == item.hash2"
				v-on:click="click">
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

	methods: {
		click: function(event) {
			this.hash = window.location.hash;
			// const items = this.$el.querySelectorAll(".nav-item");
			// items.forEach(function(item) {
			// 	item.classList.remove("active");
			// });
			event.target.classList.add("active");
		}
	},

	data: function() {
		return {
			hash: window.location.hash,
			items: [
				{
					hash: "#home",
					hash2: "",
					title: "Home",
				},
				{
					hash: "#services",
					title: "Services",
				},
				{
					hash: "#teachers",
					title: "Teachers",
				},
				{
					hash: "#about",
					title: "About",
				},
				{
					hash: "#contacts",
					title: "Contacts",
				},
			],
		}
	}
}
</script>

<style scoped>
</style>
