<template>
<div class="contact_us" v-animate="'slide-up'">
	<b-row>
		<b-col>
			<h1><span>Contact Us</span></h1>
		</b-col>
	</b-row>
	<b-row>
		<b-col>
			<h3>Don't be shy, ask <em>Zion English!</em></h3>
		</b-col>
	</b-row>

	<b-card-group deck class="deck">
		<b-card class="card"
			v-for="(item, i) in items" :key="i">

			<b-card-title class="icon">
				<font-awesome-icon
					class="f-icon"
					transform="down-2"
					:icon="[item.pre, item.icon]" size="3x"
					:mask="[item.pre, 'circle']">
				</font-awesome-icon>
			</b-card-title>

			<b-card-title class="title">{{ item.title }}</b-card-title>

			<b-button class="btn" variant="info" @click="on_click(item.id)">{{ item.btn }}</b-button>
		</b-card>
	</b-card-group>
</div>
</template>

<script>
import Toasts from "@/toasts.js"
import Data from "@/data.js"

const BASE = "https://sharer.kakao.com/talk/friends/picker/easylink";
function getKakaoShareLink(appKey, message) {
	const validation_params = {
		link_ver: "4.0",
		template_object: message
	};
	let params = `?app_key=${appKey}&ka=sdk/1.35.0 os/javascript lang/zh-CN device/MacIntel origin/https%3A%2F%2Fdevelopers.kakao.com&validation_action=default&validation_params=${JSON.stringify(validation_params)}`;
	//return `${BASE}${encodeURIComponent(params)}`
	return `${BASE}${params}`
}

export default {
	name: "ContactUs",

	methods: {
		to_clipboard: function(text, fn) {
			this.$copyText(text).then(fn)
		},
		on_click: function(id) {
			const toast = this.$toasted;
			toast.clear();

			if (id == "email")
			{
				this.to_clipboard(Data.fb, function() {
					Toasts.copy_email(toast);
				});
				const href = "mailto:" + Data.email;
				window.open(href, "_blank");
			}
			else if (id == "text")
			{
				this.to_clipboard(Data.number, function() {
					Toasts.copy_number(toast);
				});
				const href = "https://wa.me/639321336162?text=I'm%20interested%20in%20Zion%20English";
				window.open(href, "_blank");
			}
			else if (id == "skype")
			{
				const href = `skype:${Data.skype_id}?call`;
				window.open(href, "_blank");
				this.to_clipboard(Data.skype_id, function() {
					Toasts.copy_skype(toast);
				});
			}
			else if (id == "fb")
			{
				window.open(Data.fb, "_blank");
			}
			else if (id == "ktalk")
			{
				this.to_clipboard(Data.ktalk, function() {
					Toasts.copy_number(toast);
				});

				window.open(getKakaoShareLink("3e786f8df14fcfc89d159421a6a7c9b6", `Message ${Data.ktalk}`), "_blank");
			}
		}
	},

	data: function() {
		return {
			items: [
				{id: "email", title: "drop us a line", btn: "E-Mail", pre: "fas", icon: "envelope"},
				{id: "text", title: "message us", btn: "Text", pre: "fas", icon: "mobile-alt"},
				{id: "skype", title: "reach out to us", btn: "Skype", pre: "fab", icon: "skype"},
				{id: "fb", title: "let us chat", btn: "Facebook", pre: "fab", icon: "facebook-square"},
				{id: "ktalk", title: "kakaotalk", btn: "Kakaotalk", pre: "fas", icon: "mobile-alt"},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.contact_us {
	padding: 32px;
	background-color: white;
	box-shadow: 0px 8px 8px grey;

	h1 {
		font-family: "PalanquinDark";
		text-align: center;
		border-bottom: 2px solid black;
		line-height: 0.1em;
		margin: 10px 0 30px;
		font-size: 2rem;
	}

	h1 span {
		background: white;
		padding: 0 32px;
	}

	h3 {
		font-family: "Quicksand";
		text-align: center;
		font-size: 1.5rem;
	}

	.deck {
		margin-top: 72px;

		.card {
			border-radius: 8px;
			box-shadow: 0 0 8px grey;
			background-color: $khaki_web;
			text-align: center;

			.title {
				font-family: "Quicksand";
			}

			.icon {
				margin-top: -64px;
				margin-bottom: 32px;

				.f-icon {
					color: $golden_brown;
					border-radius: 32px;
					background-color: $khaki_web;
					width: 128px;
				}
			}

			.btn {
				background-color: $golden_brown;
				border: 0;
				color: white;
				font-family: "PalanquinDark";
				font-size: 1.25em;
				margin-top: 32px;
				padding: 8px 32px;
			}
		}
	}
}

@media screen and (max-width: 720px) {
.contact_us {
	.deck {
		.card {
			margin-bottom: 64px;
		}
	}
}
}
</style>
