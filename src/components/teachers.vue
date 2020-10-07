<template>
<b-carousel id="teachers" class="teachers"
	controls
	:interval="3000"
	indicators background="#ababab"
>
	<b-carousel-slide v-for="(set, i) in sets" :key="i">
		<template #img>
			<b-card-group deck class="deck">
				<b-card no-body class="card" v-for="(item, n) in set" :key="n"
					:class="{empty: item.empty}">
					<b-card-img :src="item.img" :alt="item.alt">
					</b-card-img>

					<b-card-text class="content">
						<h1>{{ item.name }}</h1>
						<!-- <h5> -->
						<!-- 	<font&#45;awesome&#45;icon icon="quote&#45;left" /> -->
						<!-- 	{{ item.text }} -->
						<!-- 	<font&#45;awesome&#45;icon icon="quote&#45;right" /> -->
						<!-- </h5> -->
					</b-card-text>
				</b-card>
			</b-card-group>
		</template>
	</b-carousel-slide>
</b-carousel>
</template>

<script>
import img_jedson from "@/assets/images/teachers/jedson.png"
import img_julie from "@/assets/images/teachers/julie.png"
import img_hazel from "@/assets/images/teachers/hazel.png"
import img_vivien from "@/assets/images/teachers/vivien.png"
import img_chris from "@/assets/images/teachers/chris.png"
import img_charizza from "@/assets/images/teachers/charizza.png"
import img_aureeh from "@/assets/images/teachers/aureeh.png"

export default {
	name: "Teachers",
	created: function() {
		this.sets = [];
		const max = 3;
		let i = 0;

		while (i < this.teachers.length) {
			const arr = this.teachers.splice(i, max);
			this.sets.push(arr);
		}

		const last = this.sets[this.sets.length - 1];
		if (last.length < max) {
			last.splice(0, 0, {empty: true, name: "", img: "", alt: "", text: ""});
			last.splice(max - 1, 0, {empty: true, name: "", img: "", alt: "", text: ""});
		}
	},

	data: function() {
		return {
			teachers: [
				{
					name: "Teacher Jedson",
					img: img_jedson,
					alt: "img_teacher_jedson",
					text: "Hi. I'm Jedson. I am an experienced ESL teacher for more than 4 years. I have been teaching kids and adults online. In addition, I graduated cum laude in education, a professional licensed teacher and TESOL certified. I enjoy teaching English and I can help you learn English academically. In my classes, I always ensure that my students have enjoyable and productive learning experiences by providing personalized teaching styles, pragmatic drills and practices, and fun activities. I believe with my experiences and passion for teaching, I can effectively improve your English skills in reading, writing, listening and speaking. Hope to see you in class."
				},
				{
					name: "Teacher Julie",
					img: img_julie,
					alt: "img_teacher_julie",
					text: "Hello everyone! My name is teacher Julie. I've been teaching ESL/EFL for almost 13 years now. I can handle all student levels regardless of age, nationality and their level of understanding in the English language. We can make English classes very informative but at the same time fun. "
				},
				{
					name: "Teacher Hazel",
					img: img_hazel,
					alt: "img_teacher_hazel",
					text: "Good day everyone, Teacher Hazel here. I’m a TESOL certified ESL tutor for almost 3 years now catered for 4 different nationalities including Koreans. I can teach both Kids and adult professionals covering wide varieties of English lessons. I’m patient, passionate and I’ll make learning fun and exciting. Hope to see you in my class soon"
				},
				{
					name: "Teacher Vivien",
					img: img_vivien,
					alt: "img_teacher_vivien",
					text: "Hi, I'm Teacher Vien, I'm 23 years old and I've been teaching English as second language for 3 years now for Koreans, Japanese and Chinese students. During my spare time I love to read, see movies and watch videos on You Tube. What I really love about teaching is that I get to meet a lot of people and I get to influence, teach them and help them learn and grow as well. So I hope to see you in my classes"
				},
				{
					name: "Teacher Chris",
					img: img_chris,
					alt: "img_teacher_chris",
					text: "TESOL Certified, self-motivated individual seeking to teach children English online. Extensive experience teaching children and adults in Japan, China, and Europe. I look forward to helping your students achieve English fluency."
				},
				{
					name: "Teacher Charizza",
					img: img_charizza,
					alt: "img_teacher_charizza",
					text: "I enjoy teaching and I am here to help you develop your skills in speaking the English language. Hope to see you in my class!"
				},
				{
					name: "Teacher Aureeh",
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
$title-gap: 16px;

.teachers {
	.deck {
		background-color: #ffffff;
		padding: 32px;

		.card {
			box-shadow: -8px 8px 16px grey;
			background-color: #ffffff;
			padding: 16px;
		}

		.empty {
			visibility: hidden;
		}
	}

	.content {
		padding: $title-gap;

		h1 {
			font-family: "PalanquinDark";
			text-align: center;
		}
	}
}
</style>
