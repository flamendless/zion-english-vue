<template>
<div class="dashboard">
	<b-tabs content-class="mt-3" v-if="signed_in && is_admin"
		align="center"
	>
		<b-tab title="Overview" active>
			<Schedules />
		</b-tab>

		<b-tab title="Teachers" lazy>
			<TableTeachers />
		</b-tab>

		<b-tab title="Lessons" lazy>
			<TableLessons />
		</b-tab>
	</b-tabs>

	<b-tabs content-class="mt-3" v-if="signed_in && is_teacher"
		align="center"
	>
		<b-tab title="Overview" lazy active>
			<TeacherInfo />
		</b-tab>

		<b-tab title="My Lessons" lazy>
			<TableLessons />
		</b-tab>

		<b-tab title="My Schedule" lazy>
			<Scheduler />
		</b-tab>
	</b-tabs>
</div>
</template>

<script>
import TableTeachers from "@/components/table_teachers.vue"
import TableLessons from "@/components/table_lessons.vue"
import TeacherInfo from "@/components/teacher_info.vue"
import Scheduler from "@/components/scheduler.vue"
import Schedules from "@/components/schedules.vue"

export default {
	name: "Dashboard",
	components: {
		TableTeachers,
		TeacherInfo,
		TableLessons,
		Scheduler,
		Schedules,
	},

	mounted: function() {
		this.email = sessionStorage["email"];
		this.signed_in = sessionStorage["signed_in"];

		if (!this.signed_in) {
			this.$notify("You must sign in first");
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
