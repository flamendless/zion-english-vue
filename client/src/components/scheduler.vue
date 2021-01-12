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
								teacher: {{ customData.email }}
							</li>
							<li>
								time: {{ customData.start_time }} - {{ customData.end_time }}
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

						<b-badge variant="success"
							style="cursor: pointer; margin-left: 16px;"
							@click="edit_date(event, i)"
						>
							Edit
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

		let req;
		if (is_admin) {
			this.view_only = true;
			req = "/get_all_events";
		} else {
			req = "/get_events/" + this.account_id;
		}

		this.is_loading = true;
		const r_events = await Axios.get(req);

		if (r_events.data.results.length > 0) {
			for (let i = 0; i < r_events.data.results.length; i++) {
				const e = r_events.data.results[i];
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
					},
				};

				this.attributes.push(o);
			}
		}
		this.is_loading = false;
	},

	methods: {
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
				return "info";
		},
		on_day_click: function(day) {
			const key = day.id;

			for (let i = 0; i < this.attributes.length; i++) {
				const e = this.attributes[i];

				if (key == e.key) {
					this.date_range.start.setHours(...e.customData.start);
					this.date_range.end.setHours(...e.customData.end);

					// console.log(...e.customData.start)
					// console.log(this.date_range.start)
					break;
				}
			}
		},
		edit_date: function(e, i) {
			alert(e, i);
		},

		event_created_edit: async function(obj) {
			this.is_loading = true;
			const date = Moment(obj.date).format("YYYY/MM/DD HH:mm:ss");

			const r_event = await Axios.post("/add_schedule", {
				date: date,
				start_time: obj.startTime,
				end_time: obj.endTime,
				account_id: this.account_id,
				teacher_id: this.teacher_id,
			});

			if (r_event.data.success)
				this.$notify("Schedule set successfully");

			this.is_loading = false;
		},
	},

	data: function() {
		return {
			is_loading: false,
			view_only: false,
			attributes: [],
			form: {
				date: null,
				start_time: null,
				end_time: null,
			},
		}
	},
}
</script>
