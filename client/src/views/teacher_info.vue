<template>
<div class="teacher_info">
	<div class="tabContent">
		<b-card class="pictureSection">
			<b-card-img
				class="itemPic"
				v-if="image"
				:src="image ? get_img_url(image)"
			/>
			<b-card-img
				class="itemPic"
				v-else
				src="../assets/template_qm.png"
			/>

			<b-card-footer>
				<b-button v-if="is_admin" variant="danger">
					Delete Account
				</b-button>
				<b-button v-if="is_teacher" variant="primary">
					Change Image
				</b-button>
			</b-card-footer>
		</b-card>

		<b-card class="tableSection">
			<b-table
				bordered
				stacked
				:items="items"
				:fields="fields">
			</b-table>
		</b-card>
	</div>
</div>
</template>

<script>
const Axios = require("axios");

export default {
	name: "ViewItem",

	mounted: async function() {
		const is_admin = sessionStorage["is_admin"];
		const is_teacher = sessionStorage["is_teacher"];
		if (is_admin) this.is_admin = true;
		if (is_teacher) this.is_teacher = true;

		const q = this.$route.query;
		const teacher_id = q.teacher_id;

		const r_teacher = await Axios.get("/get_teacher_info/" + teacher_id);
		const res = r_teacher.data.results;

		if (res && res.name) {
			const img = require("@/uploads/" + res.name);
			this.image = img;
		}
	},

	methods: {
		get_img_url: function(img) {
			return URL.createObjectURL(img);
		},
	},

	data: function() {
		return {
			is_admin: false,
			is_teacher: false,
			image: null,
			fields: [
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

				.badge
				{
					margin-left: 4px;
					margin-right: 4px;
				}
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
}
</style>
