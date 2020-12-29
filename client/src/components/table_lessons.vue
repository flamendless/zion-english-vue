<template>
<div class="tbl_lessons">
	<b-button-toolbar aria-label="Actions Toolbar" justify class="btn_toolbar">
		<b-form-group>
			<b-input-group>
				<b-form-input
					v-model="search" placeholder="Search here"
					@update="on_search_change">
				</b-form-input>
				<b-input-group-append>
					<b-input-group-text>
						<font-awesome-icon icon="search" />
					</b-input-group-text>
				</b-input-group-append>
			</b-input-group>
		</b-form-group>

		<b-form-group>
			<b-dropdown right text="views">
				<b-dropdown-form v-for="field in fields" :key="field.teacher_id">
					<b-form-checkbox :disabled="visible_fields.length == 1 && field.visible"
						v-model="field.visible">
						{{ field.label }}
					</b-form-checkbox>
				</b-dropdown-form>
			</b-dropdown>
		</b-form-group>
	</b-button-toolbar>

	<b-table
		responsive
		bordered
		hover
		caption-top
		selectable
		select-mode="single"
		selected-variant=""
		@row-clicked="on_row_click"
		:filter="filter"
		:busy="is_busy"
		:items="items"
		:fields="visible_fields">

		<template #cell(lesson_id)="data">
			<a :href="data.item.href_lesson">
				#{{ data.item.lesson_id }}
			</a>
		</template>

		<template #cell(email)="data">
			<a :href="data.item.href_email">
				{{ data.item.email }}
			</a>
		</template>

		<template #cell(arr_files)="data">
			<b-badge
				v-for="(filename, i) in data.item.arr_files"
				:key="i"
				style="margin-right: 8px; margin-bottom: 8px;"
			>
				<font-awesome-icon
					:icon="get_file_icon(filename)"
					size="lg"
					style="margin-right: 8px;"
				>
				</font-awesome-icon>
				{{ get_file_name(filename) }}
			</b-badge>
		</template>

		<template #table-busy>
			<div class="text-center text-danger my-2">
				<b-spinner class="align-middle"></b-spinner>
				<strong>Fetching data</strong>
			</div>
		</template>
	</b-table>
</div>
</template>

<script>
const Axios = require("axios");

export default {
	name: "TableLessons",

	mounted: function() {
		if (sessionStorage["is_admin"] == null) {
			alert("Admin can only view this");
			this.$router.push({name: "Dashboard"});
		}

		Axios.get("/get_lessons_list/" + this.is_admin)
		.then(res => {
			const data = res.data;

			if (data.success && data.results != null) {
				const t = this;

				data.results.forEach(function(item) {
					item.href_email = "/teacher_info?teacher_id=" + item.teacher_id;
					item.href_lesson = "/lesson_info?lesson_id=" + item.lesson_id;

					const desc = item.description;
					if (desc.length > t.max_length)
						item.desc = desc.substring(0, t.max_length - 3) + "...";
					else
						item.desc = desc;

					if (item.arr_files == null)
						item.arr_files = [];

					let found = false;

					for (let i = 0; i < t.items.length; i++) {
						const _item = t.items[i];

						if (_item.lesson_id == item.lesson_id) {
							found = true;
							_item.arr_files.push(item.filename);

							break;
						}
					}

					if (!found) {
						item.arr_files.push(item.filename);
						t.items.push(item);
					}
				});

				this.is_busy = false;
			}
		});
	},

	methods: {
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
		get_file_name: function(filename) {
			const type = filename.split(".").pop();
			return filename.substring(0, 10) + "..." + type;
		},
		on_row_click: function(item, i, e) {
			this.selected_item = item;
			this.selected_index = i;
			e.stopPropagation();
		},
		on_search_change: function() {
			if (this.search.length > 0) this.filter = this.search;
			else this.filter = null;
		},
	},

	computed: {
		visible_fields: function() {
			return this.fields.filter(field => field.visible);
		}
	},

	data: function() {
		return {
			max_length: 25,
			is_busy: true,
			selected_item: null,
			selected_index: null,
			search: "",
			filter: null,
			fields: [
				{key: "lesson_id", sortable: true, visible: true, label: "Lesson ID", class: "text-center"},
				{key: "title", sortable: true, visible: true, label: "Title"},
				{key: "desc", sortable: true, visible: true, label: "Description"},
				{key: "upload_date", sortable: true, visible: true, label: "Upload Date"},
				{key: "email", sortable: true, visible: true, label: "Uploader"},
				{key: "arr_files", sortable: true, visible: true, label: "Files"},
			],
			items: [],
		}
	},
}
</script>

<style lang="scss" scoped>
.tbl_lessons {
	.btn_toolbar {
		margin-bottom: 32px;
	}
}
</style>
