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

		<div id="testimonials" v-scrollWatch="{name: 'testimonials'}">
			<Testimonials class="testimonials"/>
		</div>

		<div id="contact_us" v-scrollWatch="{name: 'contact_us'}">
			<ContactUs class="contact_us"/>
		</div>
	</div>
</div>
</template>

<script>
import Header from "@/components/header.vue"
import Services from "@/components/services.vue"
import Teachers from "@/components/teachers.vue"
import Testimonials from "@/components/testimonials.vue"
import ContactUs from "@/components/contact_us.vue"

export default {
	name: "Home",
	components: {
		Header,
		Services,
		Teachers,
		Testimonials,
		ContactUs,
	},

	created: function() {
		const t = this;

		this.$notify({
			// message: "Schedule A Lesson Now",
			showClose: true,
			actionText: "Schedule A Lesson Now",
			onActionClick: function() {
				t.$router.push({name: "StudentApply"});
			},
			closeDelay: Number.MAX_SAFE_INTEGER/10,
		});
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	.services, .teachers, .contact_us, .testimonials {
		margin-top: $body-gap;
		margin-bottom: $body-gap;
	}
}

@media screen and (max-width: 992px) {
	.body {
		.services, .teachers, .contact_us, .testimonials {
			margin-top: $body-gap-sm;
			margin-bottom: $body-gap-sm;
		}
	}
}
</style>
