<template>
<div class="join_us">
	<div class="body" v-if="signed_in == false">
		<b-jumbotron
			header="Zion English Dashboard"
			lead="Welcome, Teacher"
			lead-tag="h1"
			class="text-center">

			<hr class="my-4">

			<b-button variant="primary" :href="href_sign_in" class="btn" size="lg">
				Sign In
			</b-button>

			<b-button variant="info" :href="href_sign_up" class="btn" size="lg">
				Sign Up
			</b-button>
		</b-jumbotron>
	</div>
</div>
</template>

<script>
export default {
	name: "JoinUs",

	mounted: function() {
		if (sessionStorage["signed_in"])
		{
			this.signed_in = true;
			this.$router.push({
				name: "Dashboard",
			});
		}
	},

	data: function() {
		return {
			signed_in: false,
			href_sign_in: "/sign_in",
			href_sign_up: "/sign_up",
		}
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.join_us {
	padding: 32px;
}

.btn {
	margin-left: 32px;
	margin-right: 32px;
}
</style>
