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
	},

	meta_info: {
		titleTemplate: "%s | Zion English",
		meta: [
			{charset: "utf-8"},
			{name: "viewport", content: "width=device-width, initial-scale=1"},
			{name: "description", content: "Learn English with our quality service made affordable to everyone"},
			{name: "keywords", content: "learn,english,tutor,asia,teach,education"},
			{name: "robots", content: "index,follow"},
			{property: "og:title", content: "Zion English"},
			{property: "og:site_name", content: "Zion English"},
			{property: "og:type", content: "website"},

			{property: "twitter:site", content: "@flamendless"},
			{property: "twitter:author", content: "Brandon B. Lim-it"},
			{property: "twitter:card", content: "summary"},
			{property: "twitter:url", content: "https://zion-english.com"},
			{property: "twitter:title", content: "Learn English with Zion English"},
			{property: "twitter:description", content: "Learn English with our quality service made affordable to everyone"},
			{property: "twitter:image", content: "https://zion-english.com/assets/twitter_card.jpg"},
		]
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #333333;
	height: 1000px;
}
</style>
