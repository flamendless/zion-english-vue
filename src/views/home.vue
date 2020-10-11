<template>
<div id="home" v-scrollWatch="{name: 'home'}">
	<Header />

	<div class="body">
		<div id="services" v-scrollWatch="{name: 'services'}">
			<Services class="services"/>
		</div>

		<div id="teachers" v-scrollWatch="{name: 'teachers'}">
			<Teachers class="teachers"/>
		</div>
	</div>
</div>
</template>

<script>
import Header from "@/components/header.vue"
import Services from "@/components/services.vue"
import Teachers from "@/components/teachers.vue"

export default {
	name: "Home",
	components: {
		Header,
		Services,
		Teachers,
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	.services, .teachers {
		margin-top: $body-gap;
		margin-bottom: $body-gap;
	}
}

.btn_btt {
	width: 60px;
	height: 60px;
	padding: 10px 16px;
	border-radius: 50%;
	font-size: 22px;
	line-height: 22px;
	background-color: rgba(255, 255, 255, 0.75);
}

@media screen and (max-width: 992px) {
	.body {
		.services, .teachers {
			margin-top: $body-gap-sm;
			margin-bottom: $body-gap-sm;
		}
	}
}
</style>
