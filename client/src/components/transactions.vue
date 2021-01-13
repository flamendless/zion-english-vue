<template>
<div class="transactions">
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
				<b-dropdown-form v-for="field in fields" :key="field.session_id">
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
		selected-variant=""
		:filter="filter"
		:busy="is_busy"
		:items="items"
		:fields="visible_fields">

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
	name: "Transactions",
	computed: {
		visible_fields: function() {
			return this.fields.filter(field => field.visible);
		}
	},

	methods: {
		on_search_change: function() {
			if (this.search.length > 0) this.filter = this.search;
			else this.filter = null;
		},
	},

	mounted: async function() {
		this.is_admin = sessionStorage["is_admin"];
		this.account_id = sessionStorage["account_id"];
		this.teacher_id = sessionStorage["teacher_id"];

		let path;
		if (this.is_admin) {
			this.fields = this.admin_fields;
			path = "/get_transactions_list";
		}
		else {
			this.fields = this.teachers_fields;
			path = "/get_transactions/" + this.teacher_id;
		}

		const res = await Axios.get(path);

		if (res.data.success) {
			const data = res.data.results;
			this.items = data;
		}

		this.is_busy = false;
	},

	data: function() {
		return {
			is_busy: true,
			search: "",
			filter: null,
			items: [],
			fields: [],
			admin_fields: [
				{key: "session_id", sortable: true, visible: true, label: "Session ID", class: "text-center"},
				{key: "teacher_email", sortable: true, visible: true, label: "Teacher E-Mail"},
				{key: "student_email", sortable: true, visible: true, label: "Student E-Mail"},
				{key: "date", sortable: true, visible: true, label: "Date"},
				{key: "start_time", sortable: true, visible: true, label: "Start Time"},
				{key: "end_time", sortable: true, visible: true, label: "End Time"},
				{key: "lesson_title", sortable: true, visible: true, label: "Lesson Title"},
				{key: "amount", sortable: true, visible: true, label: "Amount"},
			],
			teachers_fields: [
				{key: "session_id", sortable: true, visible: true, label: "Session ID", class: "text-center"},
				{key: "student_email", sortable: true, visible: true, label: "Student E-Mail"},
				{key: "date", sortable: true, visible: true, label: "Date"},
				{key: "start_time", sortable: true, visible: true, label: "Start Time"},
				{key: "end_time", sortable: true, visible: true, label: "End Time"},
				{key: "lesson_title", sortable: true, visible: true, label: "Lesson Title"},
				{key: "amount", sortable: true, visible: true, label: "Amount"},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.transactions {
	.btn_toolbar {
		margin-bottom: 32px;
	}
}
</style>
