<template>
	<div v-if="!is_loading">
		<vue-scheduler
			v-if="view_only"
			:events="events"
			:event-dialog-config="config_view"
			@event-created="event_created_view"
		/>
		<vue-scheduler
			v-else
			:events="events"
			:event-dialog-config="config_edit"
			@event-created="event_created_edit"
		/>
	</div>
	<div class="text-center text-danger my-2" v-else>
		<b-spinner class="align-middle"></b-spinner>
		<strong>Fetching data</strong>
	</div>
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

				const o = {
					date: new Date(e.date),
					startTime: e.start_time,
					endTime: e.end_time,
				};

				this.events.push(o);
			}
		}
		this.is_loading = false;
	},

	methods: {
		event_created_view: function(obj) {
			console.log(obj);
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
			events: [],
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
