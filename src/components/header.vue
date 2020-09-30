<template>
<div class="header">
	<swiper class="swiper" :options="swiper_option">
		<div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%"></div>
		<swiper-slide v-for="(item, i) in carousel" :key="i">
			<div class="title" data-swiper-parallax="-100">{{ item.title }}</div>
			<div class="subtitle" data-swiper-parallax="-240">{{ item.subtitle }}</div>
			<div class="caption" data-swiper-parallax="-360">{{ item.caption }}</div>
		</swiper-slide>

		<div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
		<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
		<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
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
				},
				{
					title: "Slide 2",
					subtitle: "Subtitle 2",
					caption: "Text 2",
				},
				{
					title: "Slide 3",
					subtitle: "Subtitle 3",
					caption: "Text 3",
				},
			],
			swiper_option: {
				speed: 600,
				parallax: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
					dynamicBullets: true,
					dynamicMainBullets: 1,
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

.parallax-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 130%;
	height: 100%;
	background-size: cover;
	background-position: left;
	background-image: url("../assets/images/sample.jpg");
}

.swiper {
	width: 100%;
	height: 380px;

	.swiper-slide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: $white;
		box-sizing: border-box;
		padding: 0 80px;
		background-color: transparent;

		.title {
			margin-bottom: $lg-gap;
			font-size: $font-size-huge * 2;
			font-weight: bold;
		}

		.subtitle {
			margin-bottom: $gap;
			font-size: $font-size-base * 2;
		}

		.caption {
			max-width: 430px;
			line-height: 1.32;
		}
	}
}
</style>
