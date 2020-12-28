<template>
<b-navbar toggleable="lg" type="dark" variant="info" :sticky=true>
	<b-navbar-brand :href="home">
		Zion English Dashboard
	</b-navbar-brand>

	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav class="ml-auto">
			<b-nav-item
				v-for="(item, i) in items" :key="i"
				:to="item.route"
				:title="item.title"
				:active="current_route == item.route || current_route == item.route2"
			>
				{{item.title}}
			</b-nav-item>

			<b-nav-item-dropdown right v-if="signed_in && is_admin">
				<template #button-content>Lesson</template>
				<b-dropdown-item :to="/add_lesson">Add Lesson</b-dropdown-item>
			</b-nav-item-dropdown>

			<b-nav-item-dropdown right>
				<template #button-content>Account</template>

				<div v-if="signed_in">
					<b-dropdown-item @click="on_sign_out">Sign Out</b-dropdown-item>
				</div>

				<div v-else>
					<b-dropdown-item :to="href_sign_in">Sign In</b-dropdown-item>
					<b-dropdown-item :to="href_sign_up">Sign Up</b-dropdown-item>
				</div>
			</b-nav-item-dropdown>
		</b-navbar-nav>
	</b-collapse>
</b-navbar>
</template>

<script>
export default {
	name: "NavBarDashboard",
	props: {
		website_name: String,
	},

	computed: {
		current_route() {
			return this.$route.path;
		}
	},

	mounted: function() {
		this.check_signed_in();
	},

	watch: {
		$route(to) {
			if (to.hash == "#home") {
				this.$router.push({name: "Dashboard"});
			}
		}
	},

	methods: {
		check_signed_in: function() {
			const email = sessionStorage["email"];
			const is_admin = sessionStorage["is_admin"];

			if (email) this.signed_in = true;
			if (is_admin) this.is_admin = true;
		},

		on_sign_out: function() {
			if (window.confirm("Are you sure you want to sign out?"))
			{
				sessionStorage.clear();
				window.location.href = "/join_us";
			}
		},
	},

	updated: function() {
		this.$nextTick(function() {
			this.check_signed_in();
		});
	},

	data: function() {
		return {
			home: "/join_us",
			href_sign_in: "/sign_in",
			href_sign_up: "/sign_up",
			signed_in: false,
			is_admin: false,
			items: [
				{
					route: "#home",
					route2: "/join_us",
					title: "Dashboard",
				},
			],
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar-brand {
	font-weight: 900;
}

.nav-item {
	font-weight: bold;
	margin-left: 8px;
	margin-right: 8px;
}
</style>
