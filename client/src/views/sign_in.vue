<template>
<div class="sign_in">
	<b-alert v-model="show_alert_fail" variant="danger">
		E-Mail and password does not match
	</b-alert>

	<ValidationObserver ref="observer" v-slot="{handleSubmit}">
		<b-form @submit.prevent="handleSubmit(on_submit)">
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

			<ValidationProvider
				name="Password"
				vid="password"
				rules="required|min:8"
				v-slot="{valid, errors}">
				<b-form-group
					class="form-group"
					label="Password:">
					<b-form-input
						type="password"
						v-model="form.password"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Enter Password">
					</b-form-input>
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
</div>
</template>

<script>
const Axios = require("axios");

export default {
	name: "SignIn",
	data: function() {
		return {
			loading: false,
			show_alert_fail: false,
			form: {
				email: "",
				password: "",
			},
		}
	},

	mounted: function() {
		this.loading = false;
		this.show_alert_fail = false;

		if (sessionStorage["signed_in"])
			this.$router.push({
				name: "Dashboard"
			});
	},

	methods: {
		on_submit: function() {
			this.loading = true;
			this.show_alert_fail = false;

			Axios.post("/sign_in", {
				email: this.form.email,
				password: this.form.password,
			}).then(res => {
				const data = res.data;
				if (data.success && data.email)
				{
					this.loading = false;

					sessionStorage["email"] = data.email;

					if (res.is_admin)
						sessionStorage["is_admin"] = true;

					sessionStorage["signed_in"] = true;
					this.$router.push({
						name: "Dashboard",
						info: res,
					});
				}
				else
				{
					this.loading = false;
					this.show_alert_fail = true;
				}
			});
		}
	},
}
</script>

<style lang="scss" scoped>
.sign_in {
	padding: 16px;
}

.sign_in .form-group {
	width: 50%;
	margin: auto;
	padding: 12px;
}
</style>
