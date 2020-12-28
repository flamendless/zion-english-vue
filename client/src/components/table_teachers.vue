<template>
<div class="tbl_teachers">
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

		<template #cell(email)="data">
			<a :href="data.item.teacher">
				{{ data.item.email }}
			</a>
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
	name: "TableTeachers",
	props: {
		is_admin: Boolean,
	},

	mounted: function() {
		Axios.get("/get_teachers_list/" + this.is_admin)
		.then(res => {
			const data = res.data;
			if (data.success && data.results != null) {
				this.items = data.results;
				this.items.forEach(function(item) {
					item.teacher = "/teacher_info?teacher_id=" + item.teacher_id;
				});

				this.is_busy = false;
			}
		});
	},

	methods: {
		on_row_click: function(item, i, e) {
			this.selected_item = item;
			this.selected_index = i;
			e.stopPropagation();
		},
		on_search_change: function() {
			if (this.search.length > 0) this.filter = this.search;
			else this.filter = null;
		},
		is_disabled: function() {
			if (this.selected_item == null) return true;
			return false;
		},
	},

	computed: {
		visible_fields: function() {
			return this.fields.filter(field => field.visible);
		}
	},

	data: function() {
		return {
			is_busy: true,
			selected_item: null,
			selected_index: null,
			search: "",
			filter: null,
			fields: [
				{key: "email", sortable: true, visible: true, label: "E-Mail"},
				{key: "lname", sortable: true, visible: true, label: "Last Name"},
				{key: "mname", sortable: true, visible: true, label: "Middle Name"},
				{key: "fname", sortable: true, visible: true, label: "First Name"},
				{key: "birthdate", sortable: true, visible: true, label: "Birthdate"},
				{key: "date_joined", sortable: true, visible: true, label: "Date Joined"},
			],
			items: [],
		}
	},
}
</script>

<style lang="scss" scoped>
.tbl_teachers {
	.btn_toolbar {
		margin-bottom: 32px;
	}
}
</style>
