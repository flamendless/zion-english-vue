<template>
	<div id="app">
		<NavBar :title="title" />
		<router-view/>
	</div>
</template>

<script>
import NavBar from "@/components/navbar.vue"

export default {
	name: "App",
	components: {
		NavBar,
	},
	data: function() {
		return {
			title: "Zion English",
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 1000px;
}
</style>
