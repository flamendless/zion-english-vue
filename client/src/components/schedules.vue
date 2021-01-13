<template>
	<b-row class="justify-content-md-center">
		<b-col cols="6">
			<div v-if="!is_loading">
				<v-calendar
					is-expanded
					:attributes="attributes"
				>
					<div
						slot="day-popover"
						slot-scope="{ day, dayTitle }"
					>
						<div class="text-xs text-gray-300 font-font-semibold text-center">
							{{ dayTitle }}
						</div>
						<ul
							v-for="(attr, i) in attributes"
							:key="i"
						>
							<div v-if="day.id == attr.key">
								<li v-if="date_past(attr.customData.date_obj)">
									<b-badge variant="warning">
										Date is Past Already
									</b-badge>
								</li>
								<li>
									teacher: {{ attr.customData.email }}
								</li>
								<li>
									time: {{ attr.customData.start_time }} - {{ attr.customData.end_time }}
								</li>
							</div>
						</ul>
					</div>
				</v-calendar>
			</div>

			<div class="text-center text-danger my-2" v-else>
				<b-spinner class="align-middle"></b-spinner>
				<strong>Fetching data</strong>
			</div>
		</b-col>

		<b-col cols="6">
			<div style="padding: 16px;
				border: 1px solid rgb(0.1, 0.1, 0.1, 0.25);
				border-radius: 8px;
				margin-left: auto; margin-right: auto;"
			>
				<h3 style="text-align: center">
					List of Schedule
				</h3>
				<hr>

				<ul>
					<li
						v-for="(event, i) in attributes"
						:key="i"
					>
						<div v-if="Array.isArray(event)">
							<b-badge :variant="get_variant(event[0].customData)">
								<del v-if="date_past(event[0].customData.date_obj)">
									{{ event[0].customData.date }}
									:
									{{ event[0].customData.start_time }}
									-
									{{ event[0].customData.end_time }}
								</del>
								<div v-else>
									{{ event[0].customData.date }}
									:
									{{ event[0].customData.start_time }}
									-
									{{ event[0].customData.end_time }}
								</div>
							</b-badge>

							<a :href="event[0].customData.href">
								<b-badge variant="info"
									style="cursor: pointer; margin-left: 16px;"
								>
									{{ event[0].customData.email }}
								</b-badge>
							</a>
						</div>

						<div v-else>
							<b-badge :variant="get_variant(event.customData)">
								<del v-if="date_past(event.customData.date_obj)">
									{{ event.customData.date }}
									:
									{{ event.customData.start_time }}
									-
									{{ event.customData.end_time }}
								</del>
								<div v-else>
									{{ event.customData.date }}
									:
									{{ event.customData.start_time }}
									-
									{{ event.customData.end_time }}
								</div>
							</b-badge>

							<a :href="event.customData.href">
								<b-badge variant="info"
									style="cursor: pointer; margin-left: 16px;"
								>
									{{ event.customData.email }}
								</b-badge>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</b-col>
	</b-row>
</template>

<script>
const Axios = require("axios");

export default {
	name: "Scheduler",

	mounted: async function() {
		const is_admin = sessionStorage["is_admin"];
		this.account_id = sessionStorage["account_id"];
		this.teacher_id = sessionStorage["teacher_id"];
		this.email = sessionStorage["email"];

		let req;
		if (is_admin) {
			req = "/get_all_events";
		} else {
			req = "/get_events/" + this.account_id;
		}

		this.is_loading = true;
		const r_events = await Axios.get(req);

		if (r_events.data.results.length > 0) {
			for (let i = 0; i < r_events.data.results.length; i++) {
				const e = r_events.data.results[i];

				this.add_event(e);
			}

			this.combine();
		}
		console.log(this.attributes)

		this.is_loading = false;
	},

	methods: {
		add_event: function(e) {
			const date = new Date(e.date);
			date.setHours(e.start_hr, e.start_min);

			let is_today;
			if (this.is_today(date)) {
				is_today = {
					color: "green",
					fillMode: "light"
				}
			}

			const past = this.date_past(date);
			let color;

			if (past) color = "red";
			else color = "green";

			const o = {
				key: e.date_key,
				dates: e.date,
				dot: color,
				highlight: is_today,
				content: color,
				popover: {
					visibility: "hover",
				},
				customData: {
					date: e.date,
					date_obj: date,
					start_time: e.start_time,
					end_time: e.end_time,
					start: [e.start_hr, e.start_min],
					end: [e.end_hr, e.end_min],
					email: e.email,
					schedule_id: e.schedule_id,
					href: "/teacher_info?teacher_id=" + e.teacher_id,
				},
			};

			this.temp.push(o);
		},
		combine: function() {
			const new_arr = this.attributes;

			for (let i = 0; i < this.temp.length; i++) {
				const a = this.temp[i];
				let matched = false;

				for (let j = i; j < this.temp.length; j++) {
					const b = this.temp[j];

					if (i != j && a.key == b.key) {
						const arr = [];
						arr.push(a);
						arr.push(b);

						new_arr.push(arr);
						matched = true;
					}
				}

				if (!matched)
					new_arr.push(a)
			}
		},
		is_today: function(date) {
			const now = new Date();
			const temp = new Date(date);

			now.setHours(0, 0, 0, 0);
			temp.setHours(0, 0, 0, 0);

			if (now.setHours(0, 0, 0, 0) == temp.setHours(0, 0, 0, 0))
				return true;

			return false;
		},
		date_past: function(date) {
			const now = new Date();
			now.setHours(0, 0, 0, 0);

			return date < now;
		},
		get_variant: function(data) {
			const past = this.date_past(data.date_obj);

			if (past)
				return "warning";
			else
				return "info";
		},
	},

	data: function() {
		return {
			is_loading: false,
			email: null,
			attributes: [],
			temp: [],
		}
	},
}
</script>
