<template>
<div class="add_lesson">
	<div>
		<b-jumbotron
			header="Add Lesson"
			class="text-center"
			fluid
			header-level="4"
			bg-variant="info"
			text-variant="white">
		</b-jumbotron>
	</div>

	<ValidationObserver ref="observer" v-slot="{handleSubmit}">
		<b-form
			@submit.prevent="handleSubmit(on_submit)"
			enctype="multipart/form-data"
		>
			<ValidationProvider
				name="Title"
				rules="required|max:250"
				v-slot="{valid, errors}">
				<b-form-group
					label="Lesson Title"
					label-for="lbl_title">
					<b-form-input
						type="text"
						v-model="form.title"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Lesson Title">
					</b-form-input>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<ValidationProvider
				name="Description"
				rules="required|max:500"
				v-slot="{valid, errors}">
				<b-form-group
					label="Lesson Description"
					label-for="lbl_desc">
					<b-form-input
						type="text"
						v-model="form.desc"
						:state="errors[0] ? false : (valid ? true : null)"
						placeholder="Lesson Description">
					</b-form-input>
					<b-form-invalid-feedback id="input_feedback">
						{{ errors[0] }}
					</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>

			<b-form-file
				name="file_lesson"
				required
				multiple
				placeholder="Choose lesson file(s)"
				v-model="form.files"
				accept=".doc, .docx, .ppt, .pptx, .pdf"
				no-drop
				style="margin-top: 32px; margin-bottom: 32px;"
			>
			</b-form-file>

			<b-badge
				v-for="(file, i) in form.files"
				:key="i"
				variant="primary"
				style="padding: 8px; margin: 16px;"
			>
				<h6>
					<font-awesome-icon
						:icon="get_file_icon(file)"
						size="lg"
						style="margin-right: 8px;"
					>
					</font-awesome-icon>
					{{ file.name }}
				</h6>
				<b-button variant="danger" size="sm"
					@click="remove_file(i)"
				>
					<b-icon-x></b-icon-x>
				</b-button>
			</b-badge>

			<b-row>
				<b-col class="text-center">
					<b-button class="btn" type="submit" variant="primary" size="lg"
						:disabled="loading == true"
					>
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
	name: "AddLesson",

	mounted: function() {
		this.loading = false;

		const account_id = sessionStorage["account_id"];
		if (account_id) this.account_id = account_id;
	},

	methods: {
		get_img_url: function(img) {
			return URL.createObjectURL(img);
		},
		get_file_icon: function(file) {
			const type = file.type;
			if (type == "application/pdf")
				return "file-pdf";
			else if (type == "application/msword")
				return "file-word";
			else if (type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
				return "file-word";
			else if (type == "application/vnd.ms-powerpoint")
				return "file-powerpoint";
			else if (type == "application/vnd.openxmlformats-officedocument.presentationml.presentation")
				return "file-powerpoint";
		},
		remove_file: function(i) {
			this.form.files.splice(i, 1);
		},
		on_submit: async function() {
			this.loading = true;

			const r_lesson = await Axios.post("/add_lesson", {
				title: this.form.title,
				desc: this.form.desc,
			});
			const lesson_id = r_lesson.data.results.insertId;
			const fd = new FormData();
			fd.append("lesson_id", lesson_id);
			fd.append("account_id", this.account_id);

			for (let i = 0; i < this.form.files.length; i++) {
				const file = this.form.files[i];
				fd.append("file_lesson", file);
			}

			const r_file = await Axios({
				method: "post",
				url: "/upload_lesson_file",
				data: fd,
				headers: {"Content-Type": "multipart/form-data"}
			});

			if (r_file.data.success) {
				this.$notify("Lesson added successfully");
				this.$router.push({name: "Dashboard"});
			} else
				this.$notify("Lesson added unsuccessfully");
		},
	},

	data: function() {
		return {
			loading: false,
			form: {
				title: "",
				description: "",
				files: [],
			},
		}
	}
}
</script>

<style lang="scss" scoped>
.add_lesson {
	padding: 16px;
}

.btn {
	margin-left: 32px;
	margin-right: 32px;
}
</style>
