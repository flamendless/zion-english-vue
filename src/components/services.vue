<template>
<b-card id="services" class="services" no-body>
	<b-row no-gutters>
		<b-col md="8">
			<b-card-img src="@/assets/images/learn_with_us.png" alt="img_learn">
			</b-card-img>
		</b-col>

		<b-col md="4" align-self="center">
			<b-card-body>
				<b-card-text class="content">
					<h1>{{ title }}</h1>
					<hr>
					<h5>{{ subtitle }}</h5>
					<ul class="list"
						v-for="(item, i) in items" :key="i">
						<li>{{ item }}</li>
					</ul>

					<b-button class="btn" :href="button.href" variant="primary">
						<b-icon-info-circle class="icon"></b-icon-info-circle>
						{{ button.title }}
					</b-button>
				</b-card-text>
			</b-card-body>
		</b-col>
	</b-row>
</b-card>
</template>

<script>
export default {
	name: "Services",
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
				title: "Learn More",
				href: "/services"
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$title-gap: 16px;

.services {
	.content {
		padding: $title-gap;

		h1 {
			font-family: "PalanquinDark";
			text-align: center;
		}

		h5 {
			font-family: "PalanquinDark";
			text-align: center;
			margin-bottom: 24px;
		}

		.list {
			font-family: "Quicksand";
			font-weight: 500;
		}

		.btn {
			padding: 8px;
		}

		.icon {
			margin-right: 4px;
		}
	}
}
</style>
