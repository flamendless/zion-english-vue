<template>
	<b-row class="justify-content-md-center">
		<b-col cols="6" md="auto">
			<div v-if="!is_loading">
				<v-calendar
					:attributes="attributes"
				>
					<template #day-popover="{day, dayTitle, attributes}">
						<div>
							<div class="text-xs text-gray-300 font-semibold text-center">
								{{ dayTitle }}
							</div>
						</div>
						<popover-row
							v-for="attr in attributes"
							:key="attr.key"
							:attributes="attr"
						>
							teacher: {{ attr.customData.email }}
							time: {{ attr.customData.start_time }} - {{ attr.customData.end_time }}
						</popover-row>
					</template>
				</v-calendar>
			</div>

			<div class="text-center text-danger my-2" v-else>
				<b-spinner class="align-middle"></b-spinner>
				<strong>Fetching data</strong>
			</div>
		</b-col>

		<b-col cols="6" md="auto">
			<div style="padding: 16px; border: 1px solid rgb(0.1, 0.1, 0.1, 0.25); border-radius: 8px;">
				<h3 style="text-align: center">
					List of Schedule
				</h3>

				<ul>
					<li
						v-for="(event, i) in attributes"
						:key="i"
					>
						<b-badge variant="info">
							{{ event.customData.date }}
							:
							{{ event.customData.start_time }}
							-
							{{ event.customData.end_time }}
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
	</b-row>
</template>

<script>
const Axios = require("axios");
const Moment = require("moment");
// import PopoverRow from "v-calendar/lib/components/popover-row.umd.min";

export default {
	name: "Scheduler",
	components: {
		// PopoverRow,
	},

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

				const o = {
					key: e.date_key,
					dot: true,
					content: "red",
					dates: e.date,
					popover: {
						visibility: "hover",
					},
					customData: {
						date: e.date,
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
			config_edit: {
				title: "Set Available Schedule",
				createButtonLabel: "Save",
			},
			config_view: {
				title: "Schedule View",
				createButtonLabel: "Done",
			}
		}
	},
}
</script>
