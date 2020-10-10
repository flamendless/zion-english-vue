<template>
<div class="social_media">
	<ShareNetwork v-for="(item, i) in items" :key="i"
		class="network"
		:network="item.network"
		:url="sharing.url"
		:title="sharing.title"
		:description="sharing.description"
		:quote="sharing.quote"
		:hashtags="sharing.hashtags"
		:twitterUser="sharing.twitterUser">

	<div class="link">
		<font-awesome-icon :icon="[item.pre, item.icon]" size="lg">
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
				quote: "Breaking The Barrier with Zion English",
				hashtags: "english,zion-english,learn",
				twitterUser: "flam8studio",
			},
			items: [
				{network: "email", name: "E-Mail", icon: "envelope", color: "#333333", pre: "fas"},
				{network: "facebook", name: "Facebook", icon: "facebook", color: "#1877f2", pre: "fab"},
				{network: "skype", name: "Skype", icon: "skype", color: "#00aff0", pre: "fab"},
				{network: "twitter", name: "Twitter", icon: "twitter", color: "#1da1f2", pre: "fab"},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.social_media {
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	.network {
		.link {
			color: white;
			font-size: 2em;
			cursor: pointer;
		}
	}
}
</style>
