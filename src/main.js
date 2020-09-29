import Vue from "vue"
import VueAwesomeSwiper from "vue-awesome-swiper"
import {Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay} from "swiper/swiper.esm"
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter"
import Toasted from "vue-toasted"
import App from "./App.vue"
import router from "./router"
import {BootstrapVue, IconsPlugin} from "bootstrap-vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library, dom} from "@fortawesome/fontawesome-svg-core"
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons"
import {faFontAwesome} from "@fortawesome/free-brands-svg-icons"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../node_modules/material-icons/iconfont/material-icons.css"
import "swiper/swiper-bundle.min.css"

library.add(faExclamationTriangle);
library.add(faFontAwesome);
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toasted);
Vue.use(VueAwesomeSwiper);

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay]);
Vue.use(getAwesomeSwiper(SwiperClass));

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
