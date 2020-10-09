<template>
<modal name="teacher_modal" transition="pop-out"
	@before-open="before_open"
	:focus-trap="true"
	:adaptive="true"
	:width="720"
	:height="480">
	<div class="box">
		<div id="bp-left" class="box-part">
			<div id="partition-info" class="partition">
				<vuescroll>
					<div class="partition-title">
						<h1>{{ name }}</h1>
					</div>

					<div class="partition-text">
						<h5>
							<font-awesome-icon icon="quote-left" />
							{{ text }}
							<font-awesome-icon icon="quote-right" />
						</h5>
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
	border-radius: 2px;
	box-sizing: border-box;
	box-shadow: 0 0 16px black;
	color: #4b4c4d;
	font-size: 0;
	width: 720px;
	height: 480px;

	.box-part {
		display: inline-block;
		position: relative;
		vertical-align: top;
		box-sizing: border-box;
		height: 100%;
		width: 50%;

		&#bp-right {
			background-repeat: no-repeat;
			background-size: auto;
			background-position: center;
			border-left: 1px solid #eee;
		}
	}

	.partition {
		width: 100%;
		height: 100%;

		.partition-title {
			box-shadow: 0 0 8px grey;
			box-sizing: border-box;
			padding: 24px;
			width: 100%;

			h1 {
				font-family: "Montserrat";
				text-align: center;
				font-size: 6vh;
			}
		}

		.partition-text {
			box-shadow: 0 4px 8px grey;
			box-sizing: border-box;
			padding: 16px;
			width: 100%;

			h5 {
				font-family: "Quicksand";
				text-align: center;
				font-size: 1.75vw;
				font-weight: 300;
			}
		}
	}
}

.pop-out-enter-active,
	.pop-out-leave-active {
	transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
	opacity: 0;
	transform: translateY(24px);
}
</style>
