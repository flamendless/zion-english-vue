<template>
<div>
	<TeacherModal v-if="$resize && $mq.above(720)" :on_close="show_navbar" />
	<TeacherModalMobile v-else :on_close="show_navbar" />

	<div v-if="$resize && $mq.above(992)">
		<div class="label">
			<h1>
				<span>{{ header1 }}</span>
			</h1>
		</div>
		<b-carousel class="teachers" controls :interval="5000">
			<b-carousel-slide v-for="(set, i) in sets" :key="i">
				<template #img>
					<b-card-group deck class="deck">
						<b-card no-body class="card"
							v-for="(item, n) in set" :key="n"
							:class="{bg: false & n < 2 && i == 0}"
							@click="modal_show(item)"
						>
							<b-card-img v-if="item.img"
								class="img" :src="item.img" :alt="item.alt">
							</b-card-img>

							<b-card-text class="content d-flex">
								<!-- <h1 class="header-card m-auto" v-if="item.center" -->
								<!-- 	:class="{header1: n == 0}" -->
								<!-- > -->
								<!-- 	{{ item.name }} -->
								<!-- </h1> -->
								<h1 class="m-auto">
									{{ item.name }}
								</h1>
								<h2 class="m-auto">
									{{ item.title }}
								</h2>
							</b-card-text>
						</b-card>
					</b-card-group>
				</template>
			</b-carousel-slide>
		</b-carousel>
	</div>

	<div v-else>
		<div class="label">
			<h1>
				<span>{{ header1 }}</span>
			</h1>
			<h4>{{ header2 }}</h4>
		</div>
		<b-carousel class="teachers"
			:interval="3000"
			indicators background="#ababab">
			<b-carousel-slide v-for="(item, i) in teachers_list" :key="i">
				<template #img>
					<b-card-group deck class="deck">
						<b-card no-body class="card"
							@click="modal_show_mobile(item)"
						>
							<b-card-img v-if="item.img"
								class="img" :src="item.img" :alt="item.alt">
							</b-card-img>

							<b-card-text class="content d-flex">
								<h1 class="m-auto">
									{{ item.name }}
								</h1>
								<h2 class="m-auto">
									{{ item.title }}
								</h2>
							</b-card-text>
						</b-card>
					</b-card-group>
				</template>
			</b-carousel-slide>
		</b-carousel>
	</div>
</div>
</template>

<script>
import Data from "@/data.js"
import TeacherModal from "@/components/teacher_modal.vue"
import TeacherModalMobile from "@/components/teacher_modal_mobile.vue"

const files = require.context(
  "@/assets/images/teachers",
  true,
  /^.*\.jpg$/
).keys()

const images = {}
for (let i = 0; i < files.length; i++) {
	let orig = files[i]
	let filename = orig.substring(2)
	let name = orig.substring(2, orig.length - 4)
	images[name] = require(`@/assets/images/teachers/${filename}`);
}

export default {
	name: "Teachers",
	components: {
		TeacherModal,
		TeacherModalMobile,
	},

	created: function() {
		this.teachers_list = [...this.teachers];

		for (let i = 0; i < this.teachers_list.length; i++) {
			let obj = this.teachers_list[i];
			let alt = obj["alt"];
			obj["img"] = images[alt];
		}

		const max = 3;
		let i = 0;

		if (this.teachers.length % 2 == 0) {
			while (i < this.teachers.length) {
				const arr = this.teachers.splice(i, max);
				this.sets.push(arr);
			}
		} else {
			this.sets.push(this.teachers.splice(0, 1));
			const first = this.sets[0]
			// first.splice(0, 0, {empty: true, name: "", img: "", alt: "", text: ""});
			first.splice(0, 0, {
				center: true,
				// name: "Meet Our Teachers",
				name: this.header1,
				text: [],
			});
			// first.splice(max - 1, 0, {empty: true, name: "", img: "", alt: "", text: ""});
			first.splice(1, 0, {
				center: true,
				// name: "Our teachers are skilled English tutors with years of experience in online teaching and are carefully selected to ensure quality teaching",
				name: this.header2,
				text: [],
			});

			while (i < this.teachers.length) {
				const arr = this.teachers.splice(i, max);
				this.sets.push(arr);
			}
		}
	},

	methods: {
		modal_show: function(item) {
			if (item.text)
				this.$modal.show("teacher_modal", item);
				this.hide_navbar();
		},
		modal_show_mobile: function(item) {
			this.$modal.show("teacher_modal_mobile", item);
			this.hide_navbar();
		},
		show_navbar: function() {
			const navbar = Data.navbar;
			if (navbar)
				navbar.shown = true;
		},
		hide_navbar: function() {
			const navbar = Data.navbar;
			if (navbar)
				navbar.shown = false;
		},
	},

	data: function() {
		return {
			sets: [],
			header1: "Meet Our Teachers",
			header2: "Our teachers are skilled English tutors with years of experience in online teaching and are carefully selected to ensure quality teaching",

			teachers: [
				{
					name: "HAZEL TAMAYO",
					alt: "hazel_tamayo",
					title: "Filipino Manager",
					text: [
						"Bachelor of Science in Business Administration",
						"TESOL Certified",
						"5 years of Teaching Experience to Koreans, Chinese, Vietnamese and Taiwanese",
						"Specializes in Reading, Writing , Phonics for young learners, speaking/daily conversation enhancement for kids and teenagers..",
						"Daily conversation for adults, accent modification, English proficiency exam preparations such as:  IELTS, TOEFL and CELPIP.",
					],
				},
				{
					name: "MA. KRISTINE URRIZA-MADERAL",
					alt: "ma_maderal",
					text: [
						"BS PSYCHOLOGY",
						"TESOL & TEYL CERTIFIED",
						"Experience: 3 yrs",
						"Specialization: Reading and Phonics, Speaking, Grammar, Conversation, and Vocabulary Enrichment for young and adult learners",
					],
				},
				{
					name: "CHARLENE ANN EBITE",
					alt: "charlene_ebite",
					text: [
						"International Business",
						"Years of teaching: 2 years",
						"American accent training, Native accent reduction training, Reading, Essay writing, Speech writing, Conversational English for junior and adult learners, and General Academic English for junior and beginner learners",
					],
				},
				{
					name: "ANDRE MICO URRIZA",
					alt: "andre_urriza",
					text: [
						"Course: AB Philosophy",
						"Years of Experience: 1 year",
						"Specialization: English for Young and Adult Levels, Conversation, Grammar, Speaking and Writing, Research Writing and Presentation",
					]
				},
				{
					name: "CHARISMA MONTIANO",
					alt: "charisma_montiano",
					text: [
						"Course: AB English",
						"Years of Experience: 5 years",
						"Specialization: Reading, Grammar, Word Enunciation, Conversation, and Vocabulary Enrichment for young and adult learners",
					]
				},
				{
					name: "MARGIE HAGOS",
					alt: "margie_hagos",
					text: [
						"Course: Bachelor of Science in Elementary Education",
						"Years of Experience: 4 years ( offline school) 4 years - online teaching",
						"Specialization : Phonics,Reading,Grammar,Word Enunciation,Conversation and Vocabulary Enrichment for young and adult learners.",
					],
				},
				{
					name: "CHERRIE ANN DECENA",
					alt: "cherrie_decena",
					text: [
						"Course: BACHELOR OF ARTS MAJOR IN ENGLISH",
						"Years of Experience: 5",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Pronunciation modification, Daily Conversation, Vocabulary Enrichment, Freetalk and Conversation, Business English, IELTS Speaking",
					],
				},
				{
					name: "ROGELYN AMIL",
					alt: "rogelyn_amil",
					text: [
						"Course: BACHELOR OF SECONDARY EDUCATION, MAJOR IN TLE",
						"Years of Experience: 3 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Reading for beginners and advanced learners, Pronunciation modification, Vocabulary Enrichment, Freetalk and Daily Conversation",
					],
				},
				{
					name: "MARY ROSE CASTILLO",
					alt: "mary_castillo",
					text: [
						"Course: BACHELOR OF SECONDARY EDUCATION, MAJOR IN ENGLISH",
						"Years of Experience: 8 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Reading for beginners and advanced learners, Pronunciation modification, Vocabulary Enrichment,  Freetalk and Conversation, Daily Conversation, Test Preparation (IELTS, TOEFL, TOEIC, CELPIP)",
					],
				},
				{
					name: "RICHIE CORDON",
					alt: "richie_cordon",
					text: [
						"Course: BACHELOR OF SCIENCE IN BUSINESS MANAGEMENT",
						"Years of Experience: 7 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Reading for beginners and advanced learners, Vocabulary Enrichment,  Freetalk and Conversation, Daily Conversation, Business English",
					],
				},
				{
					name: "ROMA PAULA LAZARO",
					alt: "roma_lazaro",
					text: [
						"Course: AB COMMUNICATION",
						"Years of Experience: 7 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Reading for beginners and advanced learners, Vocabulary Enrichment,  Freetalk and Conversation, Daily Conversation",
					],
				},
				{
					name: "AIREEN MAE MARTIZANO",
					alt: "aireen_martizano",
					text: [
						"Course: BACHELOR OF ARTS, MAJOR IN ENGLISH",
						"Years of Experience: 7 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Pronunciation modification, Daily Conversation, Vocabulary Enrichment, Freetalk and Conversation, Business English, IELTS Speaking",
					],
				},
				{
					name: "YVONNE MAGALLANES",
					alt: "yvonne_magallanes",
					text: [
						"Course: BACHELOR OF ARTS, MAJOR IN POLITICAL SCIENCE",
						"Years of Experience: 7 years",
						"Specialization: Phonics for Beginners, Grammar and Sentence Construction, Pronunciation modification, Daily Conversation, Vocabulary Enrichment, Freetalk and Conversation, Business English, IELTS Speaking",
					],
				},
				{
					name: "RHEA DUERO",
					alt: "rhea_duero",
					text: [
						"Course: BS COMPUTER SCIENCE",
						"Years of Experience: 13 years",
						"Specialization:  Grammar and Sentence Construction, Reading for beginners and advanced learners, Pronunciation modification, Vocabulary Enrichment,  Freetalk and Conversation, Daily Conversation, Test Preparation (IELTS)",
					],
				},
				{
					name: "ANN WILNER JHOY BERTOLANO",
					alt: "ann_bertolano",
					text: [
						"Bachelor of Secondary Education with Specialization in English",
						"Five (5) years as an ESL Teacher",
						"Specialization: Conversational English for Young and Adult Learners, Academic English Grammar (middle and high school), Interactive General English, Reading Comprehension",
					],
				},
				{
					name: "JENNA GEPANAGA",
					alt: "jenna_gepanaga",
					text: [
						"AB in Foreign Service Major in Diplomacy",
						"TEFL Certified",
						"10 years of teaching My specializations include pronunciation, broaden your vocabulary words, listening skills, and writing skills. My top priority is to teach the proper usage of grammar rules from basic level to advanced students.",
					],
				},
				{
					name: "KARL JANETH ARO",
					alt: "karl_aro",
					title: "English Consultant",
					text: [
						"Bachelor of Science in Agribusiness Economics",
						"University of the Philippines",
						"TEFL and TESOL Certified",
						"12 years of Teaching Experience to Korean, Chinese, Japanese, and Vietnamese",
						"Specializes in Grammar, Phonics for young learners, enhancing speaking skill for kids and teenagers",
						"Grammar, Daily Conversation, Business English and English proficiency exam for adults: TOEIC, IELT",
					],
				},
				{
					name: "Journey Balares",
					alt: "journey_balares",
					text: [
						"Course: Midwifery & Bachelor of Science in Secondary Education Major in English",
						"Specialization: Teaching kids with Special Needs (Dyslexia, Dysgraphia, Down Syndrome, with ADHD) Reading and Comprehension, Grammar, Writing, Conversational, Vocabulary, Good Listening skills, Communication skills and Speaking in English confidently",
					],
				},
			]
		}
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
$title-gap: 16px;

.teachers {
	box-shadow: 0px 8px 8px grey;

	.deck {
		padding: 32px;
		background-color: white;

		.img {
			box-shadow: 0px 8px 16px black;
			border-radius: 50%;
			height: 240px;
			width: 240px;
			align-self: center;
		}

		.card {
			/* border-radius: 16px; */
			/* box-shadow: -8px 8px 16px grey; */
			/* background-color: $burnt_amber; */
			border-color: transparent;
			padding: 16px;
			cursor: pointer;
		}

		.bg {
			background-color: $golden_brown;
			border-radius: 16px;
			/* border-radius: 50%; */
			box-shadow: -8px 8px 16px grey;
		}
	}

	.content {
		padding: $title-gap;
		height: 100%;
		flex-direction: column;

		.header-card {
			text-align: justify;
			color: white;
			text-shadow: -4px 4px 8px black;
		}

		.header1 {
			text-align: center;
			color: white;
			font-size: 6vw;
		}

		h1 {
			color: $burnt_amber;
			/* text-shadow: -4px 4px 8px grey; */
			font-family: "PalanquinDark";
			font-size: 1.75em;
			text-align: center;
		}
		h2 {
			font-family: "PalanquinDark";
			font-size: 1.25em;
			text-align: center;
		}
	}

	.label {
		background-color: white;
		text-align: center;
		font-family: "PalanquinDark";
		padding: 16px;

		h1 {
			font-size: 2rem;
			border-bottom: 2px solid black;
			line-height: 0.1em;
			margin: 32px 30px 30px;
		}

		h1 span {
			background: white;
			padding: 0 32px;
		}

		h4 {
			font-family: "Quicksand";
			padding: 8px;
			font-size: 1rem;
		}
	}
}

@media screen and (max-width: 720px) {
	.teachers {
		.deck {
			padding: 16px;
		}

		.card {
			padding: 8px;
		}
	}

	.content {
		padding: $title-gap/2;
		height: 100%;
		flex-direction: column;
	}

	.label {
		background-color: white;
		text-align: center;
		font-family: "Montserrat";
		padding: 16px;

		h1 {
			font-size: 1.75rem;
			border-bottom: 2px solid black;
			line-height: 0.1em;
			margin: 10px 0 30px;
		}

		h1 span {
			background: white;
			padding: 0 32px;
		}

		h4 {
			font-family: "Quicksand";
			padding: 8px;
			font-size: 1rem;
		}
	}
}
</style>
