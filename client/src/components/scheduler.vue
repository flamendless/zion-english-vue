<template>
	<b-row class="justify-content-md-center">
		<b-col cols="6" md="auto">
			<div v-if="!is_loading">
				<v-calendar
					:attributes="attributes"
				>
					<div
						slot="day-popover"
						slot-scope="{ day, dayTitle, attributes }"
					>
						<div class="text-xs text-gray-300 font-font-semibold text-center">
							{{ dayTitle }}
						</div>
						<ul
							v-for="{key, customData} in attributes"
							:key="key"
						>
							<li v-if="date_past(customData.date_obj)">
								<b-badge variant="warning">
									Date is Past Already
								</b-badge>
							</li>
							<li>
								Teacher: {{ customData.email }}
							</li>
							<li v-if="customData.student_email">
								Student: {{ customData.student_email }}
							</li>
							<li v-if="customData.lesson_title">
								Lesson Title: {{ customData.lesson_title }}
							</li>
							<li>
								Time: {{ customData.start_time }} - {{ customData.end_time }}
							</li>
						</ul>
					</div>
				</v-calendar>
			</div>

			<div class="text-center text-danger my-2" v-else>
				<b-spinner class="align-middle"></b-spinner>
				<strong>Fetching data</strong>
			</div>
		</b-col>

		<b-col cols="6" md="auto">
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

						<b-badge variant="info"
							style="margin-left: 16px;"
						>
							{{ calc_remaining_hours(event.customData) }}
							hrs. remaining
						</b-badge>

						<b-badge variant="danger"
							style="cursor: pointer; margin-left: 16px;"
							@click="delete_date(event, i)"
						>
							Delete
						</b-badge>
					</li>
				</ul>
			</div>
		</b-col>

		<b-col>
			<div
				style="padding: 16px;
					border: 1px solid rgb(0.1, 0.1, 0.1, 0.25);
					border-radius: 8px;
					margin-top: 12px;
					margin-left: auto; margin-right: auto;"
			>
				<h3 style="text-align: center">
					New Schedule
				</h3>
				<hr>

				Date:
				<v-date-picker
					v-model="form.date"
					is-required
					style="margin-top: 32px;"
					:min-date="new Date()"
					@input="on_date_select"
				>
					<template v-slot="{ inputValue, inputEvents }">
						<input
							class="bg-white border px-2 py-1 rounded"
							:value="inputValue"
							v-on="inputEvents"
						/>
					</template>
				</v-date-picker>
				<hr>

				Start Time:
				<v-date-picker mode="time" v-model="form.start_time" />
				<hr>

				End Time:
				<v-date-picker mode="time" v-model="form.end_time" />

				<b-row>
					<b-col class="text-center">
						<b-button variant="primary"
							style="margin-top: 32px;"
							align-middle
							:disabled="check_date()"
							@click="on_add_schedule"
						>
							Add Schedule
						</b-button>
					</b-col>
				</b-row>
			</div>
		</b-col>
	</b-row>
</template>

<script>
const Axios = require("axios");
const Moment = require("moment");

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
		}

		const r_sessions = await Axios.get("/get_sessions/" + this.teacher_id)
		if (r_sessions.data.success && r_sessions.data.results.length > 0) {
			for (let i = 0; i < r_sessions.data.results.length; i++) {
				const d = r_sessions.data.results[i];

				this.add_event({
					key: d.date_key,
					date: d.date,
					start_time: d.session_start,
					end_time: d.session_end,
					start_hr: d.start_hr,
					start_min: d.start_min,
					end_hr: d.end_hr,
					end_min: d.end_min,
					email: d.teacher_email,
					lesson_title: d.lesson_title,
					student_email: d.student_email,
					session_id: d.session_id,
				});
			}
		}

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
					lesson_title: e.lesson_title,
					student_email: e.student_email,
					session_id: e.session_id,
				},
			};

			this.attributes.push(o);
		},
		calc_remaining_hours: function(d) {
			const today = new Date();
			const diff = d.date_obj - today;

			if (diff < 0)
				return 0;

			const d_days = Math.floor(diff / 86400000);
			let d_hr = Math.floor((diff % 86400000) / 3600000);

			d_hr = d_hr + (d_days * 24);

			return d_hr;
		},
		check_date: function() {
			const f = this.form;

			if (f.date == null || f.start_time == null || f.end_time == null)
				return true;

			if (!(f.end_time > f.start_time))
				return true;

			return false;
		},
		on_date_select: function(date) {
			this.form.start_time = date;
			this.form.end_time = date;
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
				return "primary";
		},
		delete_date: async function(e, i) {
			if (window.confirm("Are you sure you want to delete this?")) {
				if (this.is_loading == false) {
					this.is_loading = true;

					const r_del = await Axios.post("/delete_schedule", {
						schedule_id: e.customData.schedule_id,
					});

					if (r_del.data.success) {
						this.attributes.splice(i, 1);
						this.$notify("Schedule removed successfully");
					} else
						this.$notify("Schedule removed unsuccessfully");

					this.is_loading = false;
				}
			}
		},
		on_add_schedule: async function() {
			const f = this.form;

			if (f.date == null || f.start_time == null || f.end_time == null)
				return false;

			this.is_loading = true;

			const r_sched = await Axios.post("/add_schedule", {
				date: Moment(f.date).format("YYYY-MM-DD HH:mm:ss"),
				start_time: Moment(f.start_time).format("HH:mm:ss"),
				end_time: Moment(f.end_time).format("HH:mm:ss"),
				account_id: this.account_id,
				teacher_id: this.teacher_id,
			});

			if (r_sched.data.success) {
				this.$notify("Schedule set successfully");
				this.add_event({
					date: Moment(f.date).format("MM/DD/YYYY"),
					start_time: Moment(f.start_time).format("HH:mm"),
					end_time: Moment(f.end_time).format("HH:mm"),
					start: [f.start_time.getHours(), f.start_time.getMinutes()],
					end: [f.end_time.getHours(), f.end_time.getMinutes()],
					email: this.email,
				});
			}

			this.is_loading = false;
		},
	},

	data: function() {
		return {
			is_loading: false,
			email: null,
			attributes: [],
			upcoming: [],
			form: {
				date: null,
				start_time: null,
				end_time: null,
			},
		}
	},
}
</script>
