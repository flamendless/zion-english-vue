import Vue from "vue"
import VueAnimate from "vue-animate-scroll"
import VueAwesomeSwiper from "vue-awesome-swiper"
import VModal from "vue-js-modal/dist/index.nocss.js"
import VRipple from "v-ripple-directive"
import vmodal from "vue-js-modal"
import VueSocialSharing from "vue-social-sharing"
import vueScrollwatch from "vue-scrollwatch"
import VueClipboard from "vue-clipboard2"
import Meta from "vue-meta"
import {Swiper as SwiperClass, Pagination, Navigation,
	Mousewheel, Autoplay, Parallax, EffectFade} from "swiper/swiper.esm"
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter"
import Toasted from "vue-toasted"
import App from "./app.vue"
import router from "./router"
import {BootstrapVue, IconsPlugin} from "bootstrap-vue"
import {MediaQueries, CommonBands} from "vue-media-queries"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library, dom} from "@fortawesome/fontawesome-svg-core"
import {faQuoteLeft, faQuoteRight, faEnvelope, faEnvelopeSquare, faMobileAlt, faSearch,
	faFileWord, faFilePdf, faFilePowerpoint,}
	from "@fortawesome/free-solid-svg-icons"
import {faFontAwesome, faFacebook, faFacebookSquare, faTwitter, faSkype, faWhatsapp}
	from "@fortawesome/free-brands-svg-icons"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../node_modules/material-icons/iconfont/material-icons.css"
import "swiper/swiper-bundle.min.css"
import "vue-js-modal/dist/styles.css"
import "v-ripple-directive/src/index.scss";
import VueNotification from "@mathieustan/vue-notification";
import VueScheduler from "v-calendar-scheduler";
import "v-calendar-scheduler/lib/main.css";

library.add([faFontAwesome, faFacebook, faTwitter, faSkype, faEnvelope, faEnvelopeSquare,
	faMobileAlt, faFacebookSquare, faQuoteLeft, faQuoteRight, faWhatsapp, faSearch,
	faFileWord, faFilePdf, faFilePowerpoint]);
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toasted);
Vue.use(VueAnimate);
Vue.use(VueAwesomeSwiper);
Vue.use(VModal);
Vue.use(VRipple);
Vue.use(vmodal);
Vue.use(VueSocialSharing);
Vue.use(vueScrollwatch);
Vue.use(VueNotification, {
	theme: {
		colors: {
			success: "#54d861",
			darkenSuccess: "#2d8e36",
			info: "#5d6a89",
			darkenInfo: "#535f7b",
			warning: "#f8a623",
			darkenWarning: "#f69a07",
			error: "#ff4577",
			darkenError: "#ff245f",
			offline: "#ff4577",
			darkenOffline: "#ff245f",
		},
		boxShadow: "10px 5px 5px red",
	},
	breakpoints: {
		0: { bottom: true },
		480: { bottom: true, right: true },
	},
});

Vue.use(VueScheduler);

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(Meta, {
	keyName: "meta_info",
	refreshOnceOnNavigation: true,
});

const mq = new MediaQueries({bands: CommonBands.Bootstrap4});
Vue.use(mq);

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay, Parallax, EffectFade]);
Vue.use(getAwesomeSwiper(SwiperClass));

import {
  ValidationObserver,
  ValidationProvider,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules"
import "@/vee_validate.js"

Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule]);
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

const axios = require("axios");
axios.defaults.baseURL = "http://localhost:4000";

new Vue({
    router,
    mediaQueries: mq,
    mixins: [CommonBands.Bootstrap4.mixin],
    render: h => h(App)
}).$mount("#app")
