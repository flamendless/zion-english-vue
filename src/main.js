import Vue from "vue"
import VueAnimate from "vue-animate-scroll"
import VueAwesomeSwiper from "vue-awesome-swiper"
import VModal from "vue-js-modal/dist/index.nocss.js"
import VRipple from "v-ripple-directive"
import VueGtag from "vue-gtag"
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
import {faQuoteLeft, faQuoteRight, faEnvelope, faEnvelopeSquare, faMobileAlt}
	from "@fortawesome/free-solid-svg-icons"
import {faFontAwesome, faFacebook, faFacebookSquare, faTwitter, faSkype, faWhatsapp}
	from "@fortawesome/free-brands-svg-icons"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../node_modules/material-icons/iconfont/material-icons.css"
import "swiper/swiper-bundle.min.css"
import "vue-js-modal/dist/styles.css"
import "v-ripple-directive/src/index.scss";

library.add([faFontAwesome, faFacebook, faTwitter, faSkype, faEnvelope, faEnvelopeSquare,
	faMobileAlt, faFacebookSquare, faQuoteLeft, faQuoteRight, faWhatsapp]);
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

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueGtag, {
	config: {id: "UA-141260881-2"},
});
Vue.use(Meta, {
	keyName: "meta_info",
	refreshOnceOnNavigation: true,
});

const mq = new MediaQueries({bands: CommonBands.Bootstrap4});
Vue.use(mq);

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay, Parallax, EffectFade]);
Vue.use(getAwesomeSwiper(SwiperClass));

Vue.config.productionTip = false;

new Vue({
    router,
    mediaQueries: mq,
    mixins: [CommonBands.Bootstrap4.mixin],
    render: h => h(App)
}).$mount("#app")
