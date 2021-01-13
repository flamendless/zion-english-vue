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

import ContactUs from "@/components/contact_us.vue"

export default {
	name: "Home",
	components: {
		ContactUs,
	},

	computed: {
		get_current_date: function() {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			return today;
		}
	},

	methods: {
		return_to_home: function() {
			this.$router.push({name: "Home"});
		},
		schedule_again: function() {
			location.reload();
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
				this.$notify("Application submitted successfully");
				this.result = true;
			}

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
			},
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
