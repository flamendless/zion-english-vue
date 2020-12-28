<template>
<div class="teacher_info">
	<div class="tabContent">
		<b-card class="pictureSection">
			<b-card-img
				class="itemPic"
				v-if="image"
				:src="typeof image != 'string' ? get_img_url(image) : image"
			/>
			<b-card-img
				class="itemPic"
				v-else
				src="../assets/template_qm.png"
			/>

			<b-card-footer>
				<b-button v-if="is_admin"
					variant="danger"
					@click="on_delete"
				>
					Delete Account
				</b-button>

				<b-button v-if="is_teacher"
					variant="primary"
					@click="on_change_image"
					:disabled="can_change == false"
				>
					Change Image
				</b-button>

				<b-button v-if="is_teacher"
					variant="info"
					@click="on_edit"
					:disabled="can_change == false || is_edit"
				>
					Edit Info
				</b-button>

				<b-form-file
					ref="form_file"
					plain
					name="img_teacher"
					required
					placeholder="Choose image"
					accept="image/*"
					no-drop
					hidden
					@input="on_file_input"
				>
				</b-form-file>
			</b-card-footer>
		</b-card>

		<b-card class="tableSection">
			<b-table
				v-if="!is_edit"
				bordered
				stacked
				:items="table_data"
				:fields="fields"
			>
				<template #cell(account_id)="data">
					#{{ data.item.account_id }}
				</template>
			</b-table>

			<b-button v-if="is_edit"
				variant="danger"
				size="sm"
				@click="on_cancel_edit"
				:disabled="can_change == false"
			>
				X
			</b-button>

			<ValidationObserver ref="observer" v-slot="{handleSubmit}" v-if="is_edit">
				<b-form
					@submit.prevent="handleSubmit(on_submit)"
					enctype="multipart/form-data"
					style="margin: 8px;"
					v-if="is_edit"
				>
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

					<b-row>
						<b-col class="text-center">
							<b-button type="submit" variant="primary" size="md">
								Submit
							</b-button>
						</b-col>
					</b-row>
				</b-form>
			</ValidationObserver>
		</b-card>
	</div>
</div>
</template>

<script>
const Axios = require("axios");

export default {
	name: "TeacherInfo",

	mounted: async function() {
		const is_admin = sessionStorage["is_admin"];
		const is_teacher = sessionStorage["is_teacher"];
		const account_id = sessionStorage["account_id"];

		if (is_admin) this.is_admin = true;
		if (is_teacher) this.is_teacher = true;

		const q = this.$route.query;

		let teacher_id;

		if (account_id) {
			const r_teacher_id = await Axios.get("/get_teacher_id/" + account_id);
			teacher_id = r_teacher_id.data.results[0].teacher_id;
		} else {
			teacher_id = q.teacher_id;
		}

		const r_teacher = await Axios.get("/get_teacher_info/" + teacher_id);
		const res = r_teacher.data.results[0];

		if (res && res.name) {
			const img = require("@/uploads/" + res.name);
			this.image = img;
		}

		this.table_data.push(res);

		this.form.teacher_id = teacher_id;
		this.form.fname = res.fname;
		this.form.mname = res.mname;
		this.form.lname = res.lname;
		this.form.birthdate = new Date(res.birthdate);
	},

	computed: {
		get_current_date: function() {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			return today;
		}
	},

	methods: {
		get_img_url: function(img) {
			return URL.createObjectURL(img);
		},
		on_change_image: function() {
			const e = this.$refs.form_file;
			e.$el.click();
		},
		on_file_input: async function(file) {
			if (file) {
				this.image = file;
				this.can_change = false;

				const fd = new FormData();
				fd.append("picture_id", this.table_data[0].picture_id);
				fd.append("img_teacher", this.image);

				const r_image = await Axios({
					method: "post",
					url: "/update_image_teacher",
					data: fd,
					headers: {"Content-Type": "multipart/form-data"}
				});

				if (r_image.data.success)
					this.can_change = true;

				console.log(r_image)
			}
		},
		on_edit: function() {
			this.is_edit = true;
		},
		on_cancel_edit: function() {
			this.is_edit = false;
			this.form.reset();
		},
		on_delete: function() {
			if (window.confirm("Are you sure you want to delete this account?"))
			{
				Axios.post("/delete_teacher_account", {
					account_id: this.table_data[0].account_id,
					teacher_id: this.table_data[0].teacher_id,
				})
				.then(res => {
					const data = res.data;
					if (data.success)
						this.$router.push({name: "Dashboard"});
				}).catch(err => {
					alert(err);
				});
			}
		},
		on_submit: async function() {
			this.can_change = false;
			this.form.birthdate = this.form.birthdate.toISOString().slice(0, 19).replace("T", " ");

			const r_info = await Axios.post("/update_teacher_info", this.form);

			if (r_info.data.success) {
				location.reload();
			}
		}
	},

	data: function() {
		return {
			is_edit: false,
			can_change: true,
			is_admin: false,
			is_teacher: false,
			image: null,
			table_data: [],
			form: {
				teacher_id: null,
				fname: "",
				mname: "",
				lname: "",
				birthdate: "",
			},
			fields: [
				{key: "account_id", label: "Account ID:"},
				{key: "email", label: "E-Mail:"},
				{key: "email", label: "E-Mail:"},
				{key: "lname", label: "Last Name:"},
				{key: "fname", label: "First Name:"},
				{key: "mname", label: "Middle Name:"},
				{key: "birthdate", label: "Birthdate:"},
				{key: "date_joined", label: "Date Joined:"},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.teacher_info
{
	padding: 16px;

	.tabContent
	{
		padding: 32px;
		display: flex;
		flex-direction: row;

		.image_row
		{
			padding: 8px;
			margin-bottom: 16px;
		}

		.pictureSection
		{
			width: 40%;
			box-shadow: 0 0 2px grey;
			margin-right: 32px;

			.itemPic
			{
				margin-bottom: 16px;
			}

			.card-footer
			{
				border: none;
				padding: 0;
				background-color: white;
				text-align: center;
			}
		}

		.tableSection
		{
			width: 70%;
			box-shadow: 0 0 2px grey;

			.itemText
			{
				text-align: center;
			}
		}
	}

	.btn
	{
		margin-left: 4px;
		margin-right: 4px;
	}
}
</style>
