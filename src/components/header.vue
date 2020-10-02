<template>
<div class="header">
	<swiper class="swiper" :options="swiper_option">
		<swiper-slide v-for="(item, i) in carousel" :key="i" :class="'slide-' + i">
			<div class="title">{{ item.title }}</div>
			<div class="subtitle">{{ item.subtitle }}</div>
			<div class="caption">{{ item.caption }}</div>
		</swiper-slide>

		<div class="swiper-pagination swiper-pagination-black" slot="pagination"></div>
		<div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
		<div class="swiper-button-next swiper-button-black" slot="button-next"></div>
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
					title: "Slide 1",
					subtitle: "Subtitle 1",
					caption: "Text 1",
					image: "../assets/images/header.jpg",
				},
				{
					title: "Slide 2",
					subtitle: "Subtitle 2",
					caption: "Text 2",
					image: "../assets/images/header.jpg",
				},
				{
					title: "Slide 3",
					subtitle: "Subtitle 3",
					caption: "Text 3",
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
				}
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

.swiper {
	width: 100%;
	height: 720px;

	.swiper-slide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: $black;
		box-sizing: border-box;
		padding: 0 120px;
		background-size: cover;

		&.slide-0 {
			background-image: url("../assets/images/header.jpg");
		}

		&.slide-1 {
			background-image: url("../assets/images/header.jpg");
		}

		&.slide-2 {
			background-image: url("../assets/images/header.jpg");
		}

		.title {
			margin-bottom: $lg-gap;
			font-family: "PalanquinDark";
			font-size: $font-size-huge * 3;
			font-weight: bold;
		}

		.subtitle {
			margin-bottom: $lg-gap;
			font-family: "PalanquinDark";
			font-size: $font-size-base * 2;
		}

		.caption {
			max-width: 430px;
			line-height: 1.32;
		}
	}
}
</style>
