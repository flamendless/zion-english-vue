<template>
<div :id="id">
	<NavBar :site_name="site_name" v-if="!in_backend" />
	<NavBarDashboard v-else />

	<div class="content">
		<router-view/>
	</div>

	<Footer v-if="!in_backend" />
</div>
</template>

<script>
import Data from "@/data.js"
import NavBar from "@/components/navbar.vue"
import Footer from "@/components/footer.vue"

import NavBarDashboard from "@/components/navbar_dashboard.vue"

export default {
	name: "App",
	components: {
		NavBar,
		Footer,
		NavBarDashboard,
	},

	mounted: function() {
		const name = this.$route.name;

		if (name == "Root" || name == "Home")
		{
			this.in_backend = false;
			this.id = "app";
		}
		else
		{
			this.in_backend = true;
			this.id = "backend";
		}
	},

	data: function() {
		return {
			id: "app",
			in_backend: false,
			site_name: Data.site_name,
		}
	},

	meta_info: {
		titleTemplate: "Zion English 사온 영어",
		meta: [
			{charset: "utf-8"},
			{name: "viewport", content: "width=device-width, initial-scale=1"},
			{name: "description", content: "Learn English with our quality service made affordable to everyone"},
			{name: "keywords", content: "learn,english,tutor,asia,teach,education"},
			{name: "robots", content: "index,follow"},
			{property: "og:title", content: "Zion English 사온 영어"},
			{property: "og:description", content: "Learn English with our quality service made affordable to everyone"},
			{property: "og:site_name", content: "Zion English 사온 영어"},
			{property: "og:type", content: "website"},
			{property: "og:image", content: "https://zion-english.com/assets/twitter_card.jpg"},

			{property: "twitter:site", content: "@flamendless"},
			{property: "twitter:author", content: "Brandon B. Lim-it"},
			{property: "twitter:card", content: "summary"},
			{property: "twitter:url", content: "https://zion-english.com"},
			{property: "twitter:title", content: "Learn English with Zion English 사온 영어"},
			{property: "twitter:description", content: "Learn English with our quality service made affordable to everyone"},
			{property: "twitter:image", content: "https://zion-english.com/assets/twitter_card.jpg"},
		]
	},
}
</script>

<style lang="scss">
@import "assets/styles/fonts.css";
@import "@/assets/styles/variables.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif,
		Montserrat, Quicksand, PalanquinDark;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: $khaki_web;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif,
		Montserrat, Quicksand, PalanquinDark;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.animate {
	transition-delay: .05s;
	transition-duration: .1s;
	transition-timing-function: ease-in;
}

.slide-up {
	transform: translateY(256px);
}

.slide-up.animate-active {
	transform: translateY(0);
}

</style>
