<template>
	<div id="home">
		<Header />

		<div class="body">
			<b-container fluid="md">
			</b-container>
		</div>
	</div>
</template>

<script>
import Header from "@/components/header.vue"

export default {
	name: "Home",
	components: {
		Header,
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	margin: $body-gap;

	height: 320px;
	background-color: red;
}

@media screen and (max-width: 992px) {
	.body {
		margin: $body-gap-sm;
	}
}
</style>
