import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import VueClickAway from "vue3-click-away";

import App from "./views/App.vue";
import "./config/registerServiceWorker";
import router from "./services/router";
// import store from "./services/store";

import en from "./assets/translations/en.json";
import fr from "./assets/translations/fr.json";

/**
 ** Store every JSON translations files
 ** and i18n configuration in variable
 ** to be used in Vue app
 */
export const i18n = createI18n({
	messages: {
		en: en,
		fr: fr
	},
	locale: "en",
	fallbackLocale: "en"
});

/**
 ** Creates new Vue app
 ** w/ store, router & i18n used.
 *! Must be mounted in #portfolio HTML tag.
 */
createApp(App)
	// .use(store) // inject vuex store
	.use(router) // inject vue router
	.use(i18n) // inject $t()  in comopnents
	.use(VueClickAway) // enables v-click-away directive
	.mount("#portfolio");
