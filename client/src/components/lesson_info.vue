<template>
<div class="lesson_info">
	<div class="tabContent">
		<b-card class="fileSection">
			<b-card-body style="padding: 8px;">
				<b-row
					v-for="file in files"
					:key="file.file_id"
					class="file_row"
					style="box-shadow: 0px 0px 8px gray; margin-bottom: 16px; padding: 8px;"
				>
					<b-col>
						<b-button
							size="sm"
							variant="primary"
							@click="open_file(file)"
						>
							<b-icon-eye></b-icon-eye>
							View
						</b-button>

						<b-button
							size="sm"
							variant="danger"
							@click="delete_file(file)"
							:disabled="can_submit == false"
						>
							<b-icon-x></b-icon-x>
							Delete
						</b-button>
					</b-col>

					<b-col>
						<b-button
							style="margin: 8px;"
							disabled
							variant="primary"
						>
							<font-awesome-icon
								:icon="get_file_icon(file.filename)"
								size="lg"
								style="margin-right: 8px;"
							>
							</font-awesome-icon>
							{{ file.filename }}
						</b-button>
					</b-col>
				</b-row>
			</b-card-body>

			<b-card-footer>
				<b-button v-if="is_admin"
					variant="success"
					@click="on_add"
					:disabled="can_submit == false"
					style="margin-bottom: 8px;"
				>
					Add Lesson File
				</b-button>

				<b-form-file
					ref="form_file"
					hidden
					plain
					name="file_lesson"
					required
					placeholder="Choose lesson file(s)"
					accept=".doc, .docx, .ppt, .pptx, .pdf"
					no-drop
					style="margin-top: 32px; margin-bottom: 32px;"
					@input="on_file_input"
				>
				</b-form-file>
			</b-card-footer>
		</b-card>

		<b-card class="tableSection">
			<b-button v-if="is_admin"
				variant="danger"
				@click="on_delete"
				:disabled="can_submit == false"
				style="margin-bottom: 8px;"
			>
				Delete Lesson
			</b-button>
			<b-table
				v-if="!is_edit"
				bordered
				stacked
				:items="table_data"
				:fields="fields"
			>
				<template #cell(lesson_id)="data">
					#{{ data.item.lesson_id }}
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
	name: "LessonInfo",

	mounted: async function() {
		const is_admin = sessionStorage["is_admin"];
		const account_id = sessionStorage["account_id"];

		if (is_admin) this.is_admin = true;
		if (account_id) this.account_id = account_id;

		const q = this.$route.query;
		const lesson_id = q.lesson_id;

		this.lesson_id = lesson_id;

		const r_lesson = await Axios.get("/get_lesson_info/" + lesson_id);
		const res = r_lesson.data.results[0];

		for (let i = 0; i < r_lesson.data.results.length; i++) {
			const r = r_lesson.data.results[i];
			const o = {
				file_id: r.file_id,
				filename: r.filename,
			}

			this.files.push(o);
		}

		this.table_data.push(res);
	},

	methods: {
		on_add: function() {
			const form_file = this.$refs.form_file;
			form_file.$el.click();
		},
		on_file_input: async function(file) {
			if (file != null) {
				this.can_submit = false;

				const fd = new FormData();
				fd.append("lesson_id", this.lesson_id);
				fd.append("account_id", this.account_id);
				fd.append("file_lesson", file);

				const r_file = await Axios({
					method: "post",
					url: "/upload_lesson_file",
					data: fd,
					headers: {"Content-Type": "multipart/form-data"}
				});

				if (r_file.data.success) {
					this.can_submit = true;
					location.reload();
				}
			}
		},
		delete_file: async function(file) {
			if (window.confirm("Are you sure you want to delete this file?"))
			{
				this.can_submit = false;
				Axios.post("/delete_file", {
					file_id: file.file_id,
				})
				.then(res => {
					const data = res.data;
					if (data.success) {
						this.can_submit = true;
						location.reload();
					}
				}).catch(err => {
					alert(err);
				});
			}
		},
		open_file: async function(file) {
			const r_file = await Axios.get("/get_file/" + file.filename, {
				responseType: "blob"
			});
			const f = new Blob([r_file.data], {
				type: r_file.headers["content-type"],
			});
			const url = URL.createObjectURL(f);
			window.open(url, "_blank");
		},
		get_file_icon: function(filename) {
			const type = filename.split(".").pop();
			if (type == "pdf")
				return "file-pdf";
			else if (type == "doc")
				return "file-word";
			else if (type == "docx")
				return "file-word";
			else if (type == "ppt")
				return "file-powerpoint";
			else if (type == "pptx")
				return "file-powerpoint";
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
				this.can_submit = false;
				Axios.post("/delete_lesson", {
					lesson_id: this.lesson_id,
				})
				.then(res => {
					const data = res.data;
					if (data.success)
						this.$router.push({name: "Dashboard"});

					this.can_submit = true;
				}).catch(err => {
					alert(err);
				});
			}
		},
		on_submit: async function() {
			this.can_submit = false;
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
			can_submit: true,
			is_admin: false,
			table_data: [],
			files: [],
			form: {
			},
			fields: [
				{key: "lesson_id", label: "Lesson ID"},
				{key: "title", label: "Title"},
				{key: "description", label: "Description"},
				{key: "upload_date", label: "Upload Date"},
				{key: "email", label: "Uploader"},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.lesson_info
{
	padding: 16px;

	.tabContent
	{
		padding: 32px;
		display: flex;
		flex-direction: row;

		.fileSection
		{
			width: 40%;
			box-shadow: 0 0 2px grey;
			margin-right: 32px;

			.file_row
			{
				margin-bottom: 8px;
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
