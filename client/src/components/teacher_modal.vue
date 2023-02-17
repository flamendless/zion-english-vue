<template>
<modal name="teacher_modal" v-animate="'slide-up'"
	@before-open="before_open"
	@before-close="on_close"
	:focus-trap="true"
	:adaptive="true"
	:width="960"
	:height="720"
>

	<div class="box">
		<div id="bp-left" class="box-part">
			<div id="partition-info" class="partition">
				<vuescroll>
					<div class="partition-title">
						<h1>{{ name }}</h1>
					</div>

					<div class="partition-details">
						<ul>
							<li v-for="(str, i) in text" :key="i">
								{{ str }}
							</li>
						</ul>
					</div>

					<div class="partition-text">
						<!-- <h5> -->
						<!-- 	<font-awesome-icon icon="quote-left" class="icn_quote" /> -->
						<!-- 	{{ text }} -->
						<!-- 	<font-awesome-icon icon="quote-right" class="icn_quote" /> -->
						<!-- </h5> -->
					</div>
				</vuescroll>
			</div>
		</div>

		<div id="bp-right" class="box-part"
			:style="{'background-image': `url(${bg})`}">
		</div>
	</div>
</modal>
</template>

<script>
import vuescroll from "vuescroll";

export default {
	name: "TeacherModal",
	components: { vuescroll },
	props: ["on_close"],

	data: function() {
		return {
			name: "",
			text: [],
			bg: "",
		}
	},

	methods: {
		before_open: function(item) {
			const params = item.params;
			this.name = params.name;
			this.text = params.text;
			this.bg = params.img;
		}
	},
}
</script>

<style lang="scss" scoped>
$background_color: #404142;

.box {
	background: white;
	overflow: hidden;
	box-sizing: border-box;
	box-shadow: 0 0 16px black;
	color: #4b4c4d;
	font-size: 0;
	width: 960px;
	height: 720px;

	.box-part {
		display: inline-block;
		position: relative;
		vertical-align: top;
		box-sizing: border-box;
		height: 100%;
		width: 50%;

		&#bp-right {
			box-shadow: 0px 0px 8px grey;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
			border-left: 1px solid #eee;
		}
	}

	.partition {
		width: 100%;
		height: 100%;

		.partition-title {
			padding: 24px;
			width: 100%;

			h1 {
				font-family: "Montserrat";
				text-align: center;
				font-size: 6vh;
			}
		}

		.partition-details {
			padding: 8px;
			width: 100%;

			ul {
				font-family: "Montserrat";
				text-align: left;
				font-size: 3vh;
			}
		}

		.partition-text {
			padding: 32px;
			width: 100%;

			h5 {
				font-family: "Quicksand";
				text-align: justify;
				font-size: 1.75vw;
				font-weight: 300;
			}

			.icn_quote {
				font-size: 12px;
				margin-bottom: 12px;
			}
		}
	}
}
</style>
