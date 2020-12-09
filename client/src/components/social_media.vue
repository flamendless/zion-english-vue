<template>
<div class="social_media">
	<ShareNetwork v-for="(item, i) in items" :key="i"
		class="network"
		:network="item.network"
		:url="sharing.url"
		:title="sharing.title"
		:description="sharing.description"
		:quote="sharing.quote"
		:hashtags="sharing.hashtags">

	<div class="link">
		<font-awesome-icon :icon="[item.pre, item.icon]" size="sm">
		</font-awesome-icon>
	</div>

	</ShareNetwork>
</div>
</template>

<script>
export default {
	name: "SocialMedia",
	data: function() {
		return {
			sharing: {
				url: "https://zion-english.com",
				title: "Zion English",
				description: "Breaking The Barrier with Zion English",
				quote: "Learning English in the Best Way",
				hashtags: "learn,english,zion-english",
			},
			items: [
				{network: "email", name: "E-Mail", icon: "envelope", color: "#333333", pre: "fas"},
				{network: "facebook", name: "Facebook", icon: "facebook", color: "#1877f2", pre: "fab"},
				{network: "skype", name: "Skype", icon: "skype", color: "#00aff0", pre: "fab"},
				{network: "whatsapp", name: "Whatsapp", icon: "whatsapp", color: "#25d366", pre: "fab"},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.social_media {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;

	.network {
		.link {
			color: white;
			font-size: 2.5em;
			cursor: pointer;
		}
	}
}
</style>
