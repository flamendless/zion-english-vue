<template>
	<div class="contacts">
	</div>
</template>

<script>
import Toasts from "@/toasts.js"

export default {
	methods: {
		on_click: function(name) {
			if (name == "Contacts")
			{
				this.$toasted.clear();
				Toasts.copy_email(this.$toasted);
				Toasts.copy_skype(this.$toasted);
			}
		}
	},

	meta_info: {
		title: "Contacts",
	},
}
</script>
