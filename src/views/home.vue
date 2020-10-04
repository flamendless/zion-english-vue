<template>
<div id="home">
	<Header />

	<div class="body">
		<b-container fluid="md">
			<!-- <Services /> -->
		</b-container>
	</div>
</div>
</template>

<script>
import Header from "@/components/header.vue"
// import Services from "@/components/services.vue"

export default {
	name: "Home",
	components: {
		Header,
		// Services,
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	margin: $body-gap;
}

@media screen and (max-width: 992px) {
	.body {
		margin: $body-gap-sm;
	}
}
</style>
