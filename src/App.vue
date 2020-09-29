<template>
<div id="app">
	<NavBar :site_name="site_name" />

	<div class="content">
		<router-view/>
	</div>
</div>
</template>

<script>
import Data from "@/data.js"
import NavBar from "@/components/navbar.vue"

export default {
	name: "App",
	components: {
		NavBar,
	},
	data: function() {
		return {
			site_name: Data.site_name,
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #777777;
}

.content {
	padding: 16px;
}
</style>
