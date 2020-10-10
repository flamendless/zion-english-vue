<template>
<div class="footer">
	<div class="info">
		<h3>Zion English</h3>
		<h5>Philippines</h5>
		<h5> ©️  zion-english 2020-2021 </h5>
	</div>

	<div class="logo" v-if="$resize && $mq.above(640)">
		<b-img src="@/assets/images/logo.png" width="96" class="logo">
		</b-img>
	</div>

	<div class="social_media">
		<h3>
			Share Us
		</h3>
		<SocialMedia />
	</div>
</div>
</template>

<script>
import SocialMedia from "@/components/social_media.vue"

export default {
	name: "Footer",
	components: { SocialMedia },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.footer {
	padding: 16px;
	background-color: $golden_brown;
	box-shadow: 0px -8px 16px grey;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;

	.info {
		flex-basis: 40%;
		font-family: "Quicksand";
		text-align: center;
		color: white;

		h3 {
			font-weight: bold;
		}

		h5 {
			font-size: 1em;
		}
	}

	.logo {
		align-self: center;
	}

	.social_media {
		flex-basis: 40%;
		align-self: center;

		h3 {
			font-family: "Quicksand";
			font-weight: bold;
			text-align: center;
			color: white;
		}
	}
}
</style>
