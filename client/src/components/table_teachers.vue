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

		<b-button-group>
			<b-button :variant="var_verify" :disabled="is_disabled()"
				@click="on_verify"
			>
				{{ get_verify_text() }}
			</b-button>
		</b-button-group>
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
		:fields="visible_fields"
		:tbody-tr-class="row_class"
	>

		<template #table-caption v-if="unverified">
			* Red highlighted row means the account is unverified
		</template>

		<template #cell(verified)="data">
			<b-badge v-if="data.item.verified == 1" variant="success">
				<b-icon-check> </b-icon-check>
			</b-badge>

			<b-badge v-else variant="warning">
				<b-icon-x></b-icon-x>
			</b-badge>
		</template>

		<template #cell(email)="data">
			<a :href="data.item.teacher">
				{{ data.item.email }}
			</a>
			<br>
			<b-badge v-if="data.item.verified == 0" variant="danger">Unverified</b-badge>
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
	mounted: function() {
		Axios.get("/get_teachers_list/" + this.is_admin)
		.then(res => {
			const data = res.data;
			if (data.success && data.results != null) {
				this.items = data.results;

				const _data = this;

				this.items.forEach(function(item) {
					item.teacher = "/teacher_info?teacher_id=" + item.teacher_id;

					if (item.verified == 0)
						_data.unverified = true;
				});

				this.is_busy = false;
			}
		});
	},

	methods: {
		row_class: function(item, type) {
			if (!item || type !== "row") return
			if (item.verified == "false") return "table-danger"
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
		is_disabled: function() {
			if (this.selected_item == null) return true;

			return false;
		},
		get_verify_text: function() {
			if (this.selected_item == null) {
				return "None Selected";
			}

			if (this.selected_item.verified == 0) {
				return "Verify";
			}

			return "Unverify";
		},
		on_verify: function() {
			if (this.selected_item == null)
				return

			if (this.selected_item.verified == 0)
			{
				if (window.confirm("Are you sure you want to verify this account?"))
				{
					Axios.post("/verify_account", {teacher_id: this.selected_item.teacher_id})
						.then(res => {
							const data = res.data;
							if (data.success) alert("Account verified successfully");
							else alert("Account verified unsuccessfully");

							this.items[this.selected_index].verified = data.success;

							this.selected_item = null;
							this.selected_index = null;
						});
				}
			}
			else
			{
				if (window.confirm("Are you sure you want to unverify this account?"))
				{
					Axios.post("/unverify_account", {teacher_id: this.selected_item.teacher_id})
						.then(res => {
							const data = res.data;
							if (data.success) alert("Account unverified successfully");
							else alert("Account unverified unsuccessfully");

							this.items[this.selected_index].verified = !data.success;

							this.selected_item = null;
							this.selected_index = null;
						});
				}
			}
		},
	},

	watch: {
		selected_item: function() {
			if (this.selected_item) {
				if (this.selected_item.verified == 0)
					this.var_verify = "success";
				else
					this.var_verify = "warning";
			} else {
				this.var_verify = null;
			}
		}
	},

	computed: {
		visible_fields: function() {
			return this.fields.filter(field => field.visible);
		}
	},

	data: function() {
		return {
			unverified: false,
			var_verify: null,
			is_busy: true,
			selected_item: null,
			selected_index: null,
			search: "",
			filter: null,
			fields: [
				{key: "verified", sortable: true, visible: false, label: "Verified", class: "text-center"},
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
