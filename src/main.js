import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import { getFormValidators } from "./globalValidator";

getFormValidators();

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
// appInstance.use(VueJWT);
appInstance.mount("#app");
