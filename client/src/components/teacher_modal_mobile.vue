<template>
<modal name="teacher_modal_mobile" v-animate="'slide-up'"
	@before-open="before_open"
	@before-close="on_close"
	:focus-trap="true"
	width="90%"
	height="auto"
	:adaptive="true"
>

	<div class="box">
		<vuescroll>
			<div id="partition-info" class="partition">
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

				<!-- <div class="partition-text"> -->
				<!-- 	<h5> -->
				<!-- 		<font-awesome-icon icon="quote-left" class="icn_quote" /> -->
				<!-- 		{{ text }} -->
				<!-- 		<font-awesome-icon icon="quote-right" class="icn_quote" /> -->
				<!-- 	</h5> -->
				<!-- </div> -->
			</div>
		</vuescroll>
	</div>
</modal>
</template>

<script>
import vuescroll from "vuescroll";

export default {
	name: "TeacherModalMobile",
	components: { vuescroll },
	props: ["on_close"],

	data: function() {
		return {
			name: "",
			text: "",
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
	color: #4b4c4d;
	font-size: 0;

	.partition {
		display: flex;
		flex-direction: column;

		.partition-title {
			padding: 12px;

			h1 {
				font-family: "Montserrat";
				text-align: center;
				font-size: 6vh;
			}
		}

		.partition-details {
			padding: 6px;
			width: 100%;

			ul {
				font-family: "Montserrat";
				text-align: left;
				font-size: 1.5vh;
			}
		}

		.partition-text {
			padding: 12px;

			h5 {
				font-family: "Quicksand";
				text-align: justify;
				font-size: 2.75vh;
				font-weight: 300;
			}

			.icn_quote {
				font-size: 1.5vw;
				margin-bottom: 6px;
			}
		}
	}
}
</style>
