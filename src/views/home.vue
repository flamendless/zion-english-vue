<template>
	<div id="home">
		<Header />

		<div class="body">
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
	margin-top: $body-gap;
	margin-left: $body-gap;
	margin-right: $body-gap;

	height: 320px;
	background-color: red;
}
</style>
