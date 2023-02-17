<template>
<div class="testimonials" v-animate="'slide-up'">
	<b-row>
		<b-col>
			<h1><span>Testimonials</span></h1>
		</b-col>
	</b-row>
	<b-row>
		<b-col>
			<h3>We teach each student the best</h3>
		</b-col>
	</b-row>

	<b-card-group deck class="deck">
		<b-card class="card"
			v-for="(item, i) in items" :key="i">

			<b-card-title class="title">
				{{ item.title }}
			</b-card-title>

			<b-card-body class="body">
				<font-awesome-icon icon="quote-left" class="icn_quote" />
				{{ item.desc }}
				<font-awesome-icon icon="quote-right" class="icn_quote" />
			</b-card-body>

			<template #footer>
				<b-row align-h="center" class="footer-icon">
					<b-avatar :text="item.initials" size="3.5em" variant="info">
					</b-avatar>
				</b-row>

				<b-row align-h="center" class="footer-name">
					{{ item.name }}
				</b-row>
			</template>

		</b-card>
	</b-card-group>
</div>
</template>

<script>
export default {
	name: "Testimonials",

	methods: {
	},

	data: function() {
		return {
			items: [
				{
					name: "EJ, korean student",
					initials: "EJ",
					title: "Learning is Fun",
					desc: "I always enjoy our time in class. My teacher is very kind and funny which makes learning so much fun.",
				},
				{
					name: "HS, korean student",
					initials: "HS",
					title: "Understanding Teachers",
					desc: "The teachers here are very considerate and understanding. They are also easy to approach whenever we have concerns about time of the class and schedules. I really appreciate that.",
				},
				{
					name: "JK, korean student",
					initials: "JK",
					title: "Excellent Teaching",
					desc: "I really like my teacher because he's good and I learned so much from his teaching. I've also improved my English speaking skills a lot and becamse more confident when I enrolled here in Zion Cha's English Academy",
				},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.testimonials {
	padding: 32px;
	background-color: white;
	box-shadow: 0px 8px 8px grey;

	h1 {
		font-family: "PalanquinDark";
		text-align: center;
		border-bottom: 2px solid black;
		line-height: 0.1em;
		margin: 10px 0 30px;
		font-size: 2rem;
	}

	h1 span {
		background: white;
		padding: 0 32px;
	}

	h3 {
		font-family: "Quicksand";
		text-align: center;
		font-size: 1.5rem;
	}

	.deck {
		margin-top: 32px;

		.card {
			text-align: center;
			/* border-radius: 8px; */
			/* box-shadow: 0 0 8px grey; */
			border: none;

			.title {
				font-family: "PalanquinDark";
				font-size: 1.5em;
			}

			.body {
				font-family: "Quicksand";
				font-size: 1.25em;

				.icn_quote {
					font-size: 8px;
					margin-bottom: 12px;
				}
			}

			.card-footer {
				border: none;
				background-color: white;
			}

			.footer-name {
				margin-top: 16px;
				font-family: "Montserrat";
				font-weight: 600;
				font-size: 1.25em;
			}
		}
	}
}
</style>
