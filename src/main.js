import Vue from "vue"
import VueAwesomeSwiper from "vue-awesome-swiper"
import VModal from "vue-js-modal/dist/index.nocss.js"
import VRipple from "v-ripple-directive"
import VueGtag from "vue-gtag"
import Meta from "vue-meta"
import {Swiper as SwiperClass, Pagination, Navigation,
	Mousewheel, Autoplay, Parallax, EffectFade}
	from "swiper/swiper.esm"
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter"
import Toasted from "vue-toasted"
import App from "./app.vue"
import router from "./router"
import {BootstrapVue, IconsPlugin} from "bootstrap-vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library, dom} from "@fortawesome/fontawesome-svg-core"
import {faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons"
import {faFontAwesome} from "@fortawesome/free-brands-svg-icons"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../node_modules/material-icons/iconfont/material-icons.css"
import "swiper/swiper-bundle.min.css"
import "vue-js-modal/dist/styles.css"
import "v-ripple-directive/src/index.scss";

library.add(faFontAwesome);
library.add(faQuoteLeft);
library.add(faQuoteRight);
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toasted);
Vue.use(VueAwesomeSwiper);
Vue.use(VModal);
Vue.use(VRipple);
Vue.use(VueGtag, {
	config: {id: "UA-141260881-2"},
});
Vue.use(Meta, {
	keyName: "meta_info",
	refreshOnceOnNavigation: true,
});

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay, Parallax, EffectFade]);
Vue.use(getAwesomeSwiper(SwiperClass));

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
