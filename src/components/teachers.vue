<template>
<div>
	<TeacherModal />
	<div v-if="$resize && $mq.above(992)">
		<b-carousel class="teachers" controls :interval="5000">
			<b-carousel-slide v-for="(set, i) in sets" :key="i">
				<template #img>
					<b-card-group deck class="deck">
						<b-card no-body class="card"
							v-for="(item, n) in set" :key="n"
							:class="{bg: n < 2 && i == 0}"
							@click="modal_show(item)">
							<b-card-img v-if="item.img"
								class="img" :src="item.img" :alt="item.alt">
							</b-card-img>

							<b-card-text class="content d-flex">
								<h1 class="m-auto" v-if="item.center">
									{{ item.name }}
								</h1>
								<h1 class="m-auto" v-else>
									Teacher {{ item.name }}
								</h1>
							</b-card-text>
						</b-card>
					</b-card-group>
				</template>
			</b-carousel-slide>
		</b-carousel>
	</div>

	<div v-else>
		<!-- IMPLEMENT LABEL (JUMBOTRON?) -->
		<b-carousel class="teachers"
			controls :interval="3000"
			indicators background="#ababab">
			<b-carousel-slide v-for="(item, i) in teachers_list" :key="i">
				<template #img>
					<b-card-group deck class="deck">
						<b-card no-body class="card">
							<b-card-img v-if="item.img"
								class="img" :src="item.img" :alt="item.alt">
							</b-card-img>

							<b-card-text class="content d-flex">
								<h1 class="m-auto">{{ item.name }}</h1>
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
import img_hazel from "@/assets/images/teachers/hazel.png"
import img_jedson from "@/assets/images/teachers/jedson.png"
import img_julie from "@/assets/images/teachers/julie.png"
import img_vivien from "@/assets/images/teachers/vivien.png"
import img_chris from "@/assets/images/teachers/chris.png"
import img_charizza from "@/assets/images/teachers/charizza.png"
import img_aureeh from "@/assets/images/teachers/aureeh.png"
import TeacherModal from "@/components/teacher_modal.vue"

export default {
	name: "Teachers",
	components: {
		TeacherModal,
	},
	created: function() {
		this.teachers_list = [...this.teachers];

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
				name: "Meet Our Teachers",
				text: "",
			});
			// first.splice(max - 1, 0, {empty: true, name: "", img: "", alt: "", text: ""});
			first.splice(1, 0, {
				center: true,
				name: "dasdsa",
				text: "",
			});

			while (i < this.teachers.length) {
				const arr = this.teachers.splice(i, max);
				this.sets.push(arr);
			}
		}
	},

	methods: {
		modal_show: function(item) {
			this.$modal.show("teacher_modal", item);
		}
	},

	data: function() {
		return {
			sets: [],
			teachers: [
				{
					name: "Hazel",
					img: img_hazel,
					bg: "@/assets/images/teachers/hazel.png",
					text: "Good day everyone, Teacher Hazel here. I’m a TESOL certified ESL tutor for almost 3 years now catered for 4 different nationalities including Koreans. I can teach both Kids and adult professionals covering wide varieties of English lessons. I’m patient, passionate and I’ll make learning fun and exciting. Hope to see you in my class soon"
				},
				{
					name: "Jedson",
					img: img_jedson,
					alt: "img_teacher_jedson",
					text: "Hi. I'm Jedson. I am an experienced ESL teacher for more than 4 years. I have been teaching kids and adults online. In addition, I graduated cum laude in education, a professional licensed teacher and TESOL certified. I enjoy teaching English and I can help you learn English academically. In my classes, I always ensure that my students have enjoyable and productive learning experiences by providing personalized teaching styles, pragmatic drills and practices, and fun activities. I believe with my experiences and passion for teaching, I can effectively improve your English skills in reading, writing, listening and speaking. Hope to see you in class."
				},
				{
					name: "Julie",
					img: img_julie,
					alt: "img_teacher_julie",
					text: "Hello everyone! My name is teacher Julie. I've been teaching ESL/EFL for almost 13 years now. I can handle all student levels regardless of age, nationality and their level of understanding in the English language. We can make English classes very informative but at the same time fun. "
				},
				{
					name: "Vivien",
					img: img_vivien,
					alt: "img_teacher_vivien",
					text: "Hi, I'm Teacher Vien, I'm 23 years old and I've been teaching English as second language for 3 years now for Koreans, Japanese and Chinese students. During my spare time I love to read, see movies and watch videos on You Tube. What I really love about teaching is that I get to meet a lot of people and I get to influence, teach them and help them learn and grow as well. So I hope to see you in my classes"
				},
				{
					name: "Chris",
					img: img_chris,
					alt: "img_teacher_chris",
					text: "TESOL Certified, self-motivated individual seeking to teach children English online. Extensive experience teaching children and adults in Japan, China, and Europe. I look forward to helping your students achieve English fluency."
				},
				{
					name: "Charizza",
					img: img_charizza,
					alt: "img_teacher_charizza",
					text: "I enjoy teaching and I am here to help you develop your skills in speaking the English language. Hope to see you in my class!"
				},
				{
					name: "Aureeh",
					img: img_aureeh,
					alt: "img_teacher_aureeh",
					text: "Hi! My name is teacher Aureeh. I've been teaching online for 3 years. I believe that learning is fun when you are guided by a diligent and helpful teacher. Let me be your partner in your journey as you explore the English language. I can be your teacher and your friend. See you in my class!"
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
		}

		.card {
			border-radius: 16px;
			box-shadow: -8px 8px 16px grey;
			background-color: $burnt_amber;
			padding: 16px;
			cursor: pointer;
		}

		.bg {
			background-color: #00ff00;
		}
	}

	.content {
		padding: $title-gap;
		height: 100%;

		h1 {
			color: white;
			text-shadow: -4px 4px 8px black;
			font-family: "PalanquinDark";
			font-size: 1.25em;
			text-align: center;
		}
	}
}
</style>
