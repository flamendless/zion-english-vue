<template>
<div class="dashboard">
	<b-tabs content-class="mt-3" v-if="signed_in && is_admin"
		align="center"
	>

		<b-tab title="Teachers" active>
			<TableTeachers />
		</b-tab>

		<b-tab title="Lessons" lazy>
			<!-- <TableLessons /> -->
		</b-tab>
	</b-tabs>

	<b-tabs content-class="mt-3" v-if="signed_in && is_teacher">
		<b-tab title="Overview" lazy active>
		</b-tab>
	</b-tabs>
</div>
</template>

<script>
import TableTeachers from "@/components/table_teachers.vue"
// import TableLessons from "@/components/table_lessons.vue"

export default {
	name: "Dashboard",
	components: {
		TableTeachers,
		// TableLessons,
	},

	mounted: function() {
		this.email = sessionStorage["email"];
		this.signed_in = sessionStorage["signed_in"];

		if (!this.signed_in) {
			alert("You must sign in first");
			this.$router.push({name: "SignIn"});
		}

		if (sessionStorage["is_admin"])
			this.is_admin = true;
		else if (sessionStorage["is_teacher"])
			this.is_teacher = true;
	},

	methods: {
	},

	data: function() {
		return {
			is_admin: false,
			is_teacher: false,
			signed_in: false,
			email: null,
		}
	},
}
</script>

<style lang="scss" scoped>
.dashboard {
	padding: 16px;
}
</style>
