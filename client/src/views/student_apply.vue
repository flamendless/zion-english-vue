<template>
<div v-if="!result">
	<b-jumbotron
		header="Every Lesson is a Step Towards Success"
		lead="We are looking forward to teach you, dear student"
		lead-tag="h1"
		class="text-center">
	</b-jumbotron>

	<ValidationObserver ref="observer" v-slot="{handleSubmit}">
		<b-form @submit.prevent="handleSubmit(on_submit)"
			style="padding: 32px;"
		>
			<ValidationProvider
				name="E-Mail"
				rules="required|email"
				v-slot="{valid, errors}">
				<b-form-group
					class="form-group"
					label="Email Address:"
					label-for="lbl_email">
					<b-form-input
						type="email"
						v-model="form.email"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Enter E-Mail">
					</b-form-input>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<b-row>
				<b-col>
					<ValidationProvider
						name="First Name"
						:rules="{ required: true, regex: /^[a-zA-Z- ]+$/ }"
						v-slot="{valid, errors}">
						<b-form-group
							label="First Name:"
							label-for="lbl_fname">
							<b-form-input
								type="text"
								v-model="form.fname"
								:state="errors[0] ? false : (valid ? true : null)"
								placeholder="Enter First Name">
							</b-form-input>
							<b-form-invalid-feedback id="input_feedback">
								{{ errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</ValidationProvider>
				</b-col>

				<b-col>
					<ValidationProvider
						name="Middle Name"
						:rules="{ required: true, regex: /^[a-zA-Z- ]+$/ }"
						v-slot="{valid, errors}">
						<b-form-group
							label="Middle Name:"
							label-for="lbl_mname">
							<b-form-input
								type="text"
								v-model="form.mname"
								:state="errors[0] ? false : (valid ? true : null)"
								placeholder="Enter Middle Name">
							</b-form-input>
							<b-form-invalid-feedback id="input_feedback">
								{{ errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</ValidationProvider>
				</b-col>
			</b-row>

			<ValidationProvider
				name="Last Name"
				:rules="{ required: true, regex: /^[a-zA-Z- ]+$/ }"
				v-slot="{valid, errors}">
				<b-form-group
					label="Last Name:"
					label-for="lbl_lname">
					<b-form-input
						type="text"
						v-model="form.lname"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Enter Last Name">
					</b-form-input>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<b-row>
				<b-col>
					<ValidationProvider
						name="Birthdate"
						rules="required"
						v-slot="{valid, errors}">
						<b-form-group
							label="Birthdate:"
							label-for="lbl_birthdate">
							<b-form-datepicker
								show-decade-nav
								no-flip
								:max="get_current_date"
								v-model="form.birthdate"
								:state="errors[0] ? false : (valid ? true : null)">
							</b-form-datepicker>
							<b-form-invalid-feedback id="input_feedback">
								{{ errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</ValidationProvider>
				</b-col>
			</b-row>

			<ValidationProvider
				name="Country"
				rules="required"
				v-slot="{valid, errors}">
				<b-form-group
					class="form-group"
					label="Country:"
					label-for="lbl_country">
					<b-form-input
						list="input_countries"
						id="countries"
						v-model="form.country"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Enter Country">
					</b-form-input>
					<b-form-datalist
						id="input_countries"
						:options="countries"
					>
					</b-form-datalist>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<ValidationProvider
				name="Teacher"
				rules="required"
				v-slot="{valid, errors}">
				<b-form-group
					class="form-group"
					label="Teacher:"
					label-for="lbl_teacher">
					<b-form-input
						list="input_teachers"
						id="teachers"
						v-model="form.teacher.name"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Enter Teacher"
						@change="on_teacher_change"
					>
					</b-form-input>
					<b-form-datalist
						id="input_teachers"
						:options="teachers"
					>
					</b-form-datalist>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<b-row>
				<b-col>
					<ValidationProvider
						name="Lesson"
						rules="required"
						v-slot="{valid, errors}">
						<b-form-group
							class="form-group"
							label="Lesson:"
							label-for="lbl_lesson">
							<b-form-input
								list="input_lessons"
								id="lessons"
								v-model="form.lesson.title"
								:state="errors[0] ? false : (valid ? true : null)"
								placeholder="Select Lesson:"
								@change="on_lesson_change"
							>
							</b-form-input>
							<b-form-datalist
								id="input_lessons"
								:options="lessons"
							>
							</b-form-datalist>
							<b-form-invalid-feedback id="input_feedback">
								{{ errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</ValidationProvider>
				</b-col>

				<b-col>
					<ValidationProvider
						name="Amount"
						rules="required"
						v-slot="{valid, errors}">
						<b-form-group
							class="form-group"
							label="Amount:"
							label-for="lbl_amount">
							<b-input-group append="CAD">
								<b-form-input
									type="number"
									readonly
									v-model="form.amount"
									:state="errors[0] ? false : (valid ? true : null)"
									placeholder="Amount:"
								>
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback id="input_feedback">
								{{ errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</ValidationProvider>
				</b-col>
			</b-row>

			<div class="w-full max-w-sm">
				<label class="block text-gray-600 text-sm font-bold mb-2" for="date">
					Date:
				</label>

				<div class="flex w-full">
					<v-date-picker
						v-model="form.date"
						is-required
						style="margin-top: 32px; margin-bottom: 32px;"
						:min-date="new Date()"
						@input="on_date_select"
					>
						<template v-slot="{ inputValue, inputEvents }">
							<input
								id="date"
								class="bg-white border px-2 py-1 rounded w-full"
								:value="inputValue"
								v-on="inputEvents"
							/>
						</template>
					</v-date-picker>
				</div>

				<p class="text-red-600 text-xs italic mt-1" v-if="errorMessage"
					style="color: red;"
				>
					{{ errorMessage }}
				</p>
			</div>

			<b-row style="margin-top: 32px; margin-bottom: 32px;">
				<b-col>
					<label class="block text-gray-600 text-sm font-bold mb-2">
						Start Time:
					</label>
					<div class="flex w-full">
						<v-date-picker mode="time" v-model="form.start_time" />
					</div>
					<p class="text-red-600 text-xs italic mt-1" v-if="time_check()"
						style="color: red;"
					>
						{{ time_check() }}
					</p>
				</b-col>

				<b-col>
					<label class="block text-gray-600 text-sm font-bold mb-2">
						End Time:
					</label>
					<div class="flex w-full">
						<v-date-picker mode="time" v-model="form.end_time" />
					</div>
				</b-col>
			</b-row>

			<b-row>
				<b-col class="text-center">
					<b-button class="btn" type="submit" variant="primary" size="lg">
						<b-spinner small v-if="loading"></b-spinner>
						Submit
					</b-button>
				</b-col>
			</b-row>
		</b-form>
	</ValidationObserver>

	<div class="body">
		<div id="contact_us" v-scrollWatch="{name: 'contact_us'}">
			<ContactUs class="contact_us"/>
		</div>
	</div>
</div>
<div v-else>
	<b-jumbotron
		header="Great! You have scheduled a lesson"
		lead="Our staff will contact you as soon possible"
		lead-tag="h1"
		class="text-center">

		<hr class="my-4">

		<b-button variant="primary" class="btn" size="lg"
			@click="return_to_home"
		>
			Return to Website
		</b-button>

		<b-button variant="info" class="btn" size="lg"
			@click="schedule_again"
		>
			Schedule Again
		</b-button>
	</b-jumbotron>
	<div class="body">
		<div id="contact_us" v-scrollWatch="{name: 'contact_us'}">
			<ContactUs class="contact_us"/>
		</div>
	</div>
</div>
</template>

<script>
const Axios = require("axios");
const Moment = require("moment");

import ContactUs from "@/components/contact_us.vue"

export default {
	name: "Home",
	components: {
		ContactUs,
	},

	mounted: async function() {
		const r_teachers = await Axios.get("/get_teachers_list/" + false);
		const r_lessons = await Axios.get("/get_lessons_list/" + false);

		if (r_teachers.data.success) {
			const data = r_teachers.data.results;

			for (let i = 0; i < data.length; i++) {
				const d = data[i];

				this.teachers.push(d.fullname);
				this.teachers_data.push(d);
			}
		}

		if (r_lessons.data.success) {
			const data = r_lessons.data.results;

			for (let i = 0; i < data.length; i++) {
				const d = data[i];

				this.lessons.push(d.title);
				this.lessons_data.push(d);
			}
		}
	},

	computed: {
		get_current_date: function() {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			return today;
		},
		errorMessage: function() {
			if (!this.form.date) return "Date is required";
			return "";
		},
	},

	watch: {
		"form.end_time": function() {
			if (!this.check_date()) {
				const end = this.form.end_time;
				const start = this.form.start_time;
				const d_ms = end - start;
				const d_min = Math.round(((d_ms % 86400000) % 3600000) / 60000);

				this.form.amount = (d_min/25) * 4.9;
			}
		},
	},

	methods: {
		time_check: function() {
			if (!this.check_date()) return "";
			return "Invalid time range";
		},
		check_date: function() {
			const f = this.form;

			if (f.date == null || f.start_time == null || f.end_time == null)
				return true;

			if (!(f.end_time > f.start_time))
				return true;

			return false;
		},
		on_date_select: function(date) {
			this.form.start_time = date;
			this.form.end_time = date;
		},
		return_to_home: function() {
			this.$router.push({name: "Home"});
		},
		schedule_again: function() {
			location.reload();
		},
		on_teacher_change: function(o) {
			for (let i = 0; i < this.teachers_data.length; i++) {
				const t = this.teachers_data[i];

				if (t.fullname == o) {
					this.form.teacher.id = t.teacher_id;
					break
				}
			}
		},
		on_lesson_change: function(o) {
			for (let i = 0; i < this.lessons_data.length; i++) {
				const t = this.lessons_data[i];

				if (t.title == o) {
					this.form.lesson.id = t.lesson_id;
					break
				}
			}
		},
		on_submit: async function() {
			this.loading = true;

			const f = this.form;
			const r_reg = await Axios.post("/register_student", {
				email: f.email,
				fname: f.name,
				mname: f.mname,
				lname: f.lname,
				birthdate: f.birthdate,
				country: f.country,
			});

			if (r_reg.data.success) {
				console.log(r_reg)
				const student_id = r_reg.data.results.insertId;

				const r_session = await Axios.post("/register_session", {
					student_id: student_id,
					teacher_id: f.teacher.id,
					lesson_id: f.lesson.id,
					session_start: Moment(f.start_time).format("HH:mm:ss"),
					session_end: Moment(f.end_time).format("HH:mm:ss"),
					amount: f.amount,
				});

				if (r_session.data.success) {
					this.$notify("Application submitted successfully");
					this.result = true;
				} else
					this.$notify("Application submitted unsuccessfully");
			} else
				this.$notify("Application submitted unsuccessfully");

			this.loading = false;
		}
	},

	data: function() {
		return {
			result: false,
			loading: false,
			form: {
				email: "",
				fname: "",
				mname: "",
				lname: "",
				birthdate: "",
				country: "",
				amount: null,
				teacher: {
					id: null,
					name: "",
				},
				lesson: {
					id: null,
					title: "",
				},
				start_time: null,
				end_time: null,
				date: null,
			},

			teachers: [],
			teachers_data: [],
			lessons: [],
			lessons_data: [],
			amount_data: [],
			countries: [
				"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps",
				"Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
				"Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
				"Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei",
				"Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
				"Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros",
				"Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus",
				"Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
				"East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
				"Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
				"Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
				"Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
				"India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy",
				"Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
				"Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
				"Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
				"Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia",
				"Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
				"Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
				"Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal",
				"Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
				"Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
				"Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation",
				"Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines",
				"Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal",
				"Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
				"Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
				"Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria",
				"Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago",
				"Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
				"United Arab Emirates", "United Kingdom", "United States", "Uruguay",
				"Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
				"Zambia", "Zimbabwe",
			]
		}
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	.services, .teachers, .contact_us, .testimonials {
		margin-top: $body-gap;
		margin-bottom: $body-gap;
	}
}

@media screen and (max-width: 992px) {
	.body {
		.services, .teachers, .contact_us, .testimonials {
			margin-top: $body-gap-sm;
			margin-bottom: $body-gap-sm;
		}
	}
}

.btn {
	margin-left: 32px;
	margin-right: 32px;
}
</style>
