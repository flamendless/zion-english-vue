<template>
<b-card class="services" no-body v-animate="'slide-up'">
	<b-row no-gutters>
		<b-col md="8">
			<b-card-img src="@/assets/images/learn_with_us.png" alt="img_learn">
			</b-card-img>
		</b-col>

		<b-col md="4" align-self="center">
			<b-card-body>
				<b-card-text class="content">
					<h1>
						<span>
							{{ title }}
						</span>
					</h1>
					<h5>{{ subtitle }}</h5>
					<ul class="list"
						v-for="(item, i) in items" :key="i">
						<li>{{ item }}</li>
					</ul>

					<div class="text-center">
						<b-button variant="primary" v-ripple
							@click="on_click"
						>
							<b-icon-info-circle class="icon"></b-icon-info-circle>
							{{ button.title }}
						</b-button>
					</div>
				</b-card-text>
			</b-card-body>
		</b-col>
	</b-row>
</b-card>
</template>

<script>
export default {
	name: "Services",
	methods: {
		on_click: function() {
			this.$router.push({name: "StudentApply"});
		}
	},
	data: function() {
		return {
			title: "What We Offer",
			subtitle: "List of the courses we provide",
			items: [
				"Phonetic and alphabet",
				"Daily conversational topics for adults and young learners",
				"Job interviews",
				"Reading (beginner to advance)",
				"English proficiency exams like IELTS (Speaking and writing) TOIEC, TOFL and CELPIP, etc.",
				"Business English",
				"Accent/ pronunciation training",
				"Grammar",
			],
			button: {
				title: "Schedule A Lesson",
				href: "/services"
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$title-gap: 16px;

.services {
	box-shadow: 0px 8px 8px grey;

	.content {
		padding: $title-gap;

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
			padding: 0 10px;
		}

		h5 {
			font-size: 1.25rem;
			font-family: "PalanquinDark";
			text-align: center;
			margin-bottom: 24px;
		}

		.list {
			font-family: "Quicksand";
			font-weight: 500;
		}

		.icon {
			margin-right: 4px;
		}
	}
}
</style>
