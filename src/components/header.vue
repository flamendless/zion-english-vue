<template>
<div class="header">
	<swiper class="swiper" :options="swiper_option">
		<swiper-slide v-for="(item, i) in carousel" :key="i" :class="'slide-' + i">
			<div class="title">{{ item.title }}</div>
			<div class="subtitle">{{ item.subtitle }}</div>
			<div class="caption">{{ item.caption }}</div>
		</swiper-slide>

		<div class="swiper-pagination swiper-pagination-black" slot="pagination"></div>
		<div
			class="swiper-button-prev swiper-button-black d-none d-md-block"
			slot="button-prev">
		</div>
		<div
			class="swiper-button-next swiper-button-black d-none d-md-block"
			slot="button-next">
		</div>
	</swiper>
</div>
</template>

<script>
export default {
	name: "Header",
	data: function() {
		return {
			carousel: [
				{
					title: "Let's Break The Barriers...",
					subtitle: "with Zion English",
					caption: "It is our goal to help students learn English language with our quality service/teaching yet made affordable to everyone.",
					image: "../assets/images/header.jpg",
				},
				{
					title: "Learn With Best Quality...",
					subtitle: "with Zion English",
					caption: "We hire only experienced Filipino online teachers with wide experience of teaching and variety of specialties.",
					image: "../assets/images/header.jpg",
				},
				{
					title: "Love The Language...",
					subtitle: "with Zion English",
					caption: "We hope to meet and even exceed our learner’s expectation. We cater to all ages from zero beginners to adult professional covering wide range of topics.",
					image: "../assets/images/header.jpg",
				},
			],

			swiper_option: {
				speed: 600,
				effect: "fade",
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			}
		}
	},

	meta_info: {
		title: "Learn English With Us",
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.header {
	box-shadow: 0px 8px 8px grey;
}

.swiper {
	width: 100%;
	height: 540px;
	background-color: white;

	.swiper-slide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: $black;
		box-sizing: border-box;
		padding: 0 60px;
		background-position: right;
		background-size: 1280px 540px;
		background-repeat: no-repeat;

		&.slide-0 {
			background-image: url("../assets/images/header1.jpg");
		}

		&.slide-1 {
			background-image: url("../assets/images/header2.jpg");
		}

		&.slide-2 {
			background-image: url("../assets/images/header3.jpg");
		}

		.title, .subtitle, .caption {
			color: black;
		}

		.title {
			margin-bottom: $lg-gap;
			font-family: "PalanquinDark";
			font-size: $font-size-huge * 3;
			font-weight: 600;
			max-width: 430px;
			line-height: 1;
		}

		.subtitle {
			margin-bottom: $lg-gap;
			font-family: "Quicksand";
			font-weight: 500;
			font-size: $font-size-huge * 2;
		}

		.caption {
			font-family: "Quicksand";
			font-size: $font-size-base * 1.5;
			max-width: 320px;
			line-height: 1.32;
		}
	}
}

@media screen and (max-width: 992px) {
	.swiper .swiper-slide {
		padding: 0px 32px;
		text-align: center;

		.title, .caption {
			max-width: 100%;
		}
	}
}
</style>
