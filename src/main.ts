import Vue from "vue";
import App from "./App.vue";
import VueSelect from "vue-select";

Vue.config.productionTip = false;
Vue.component('v-select', VueSelect);

new Vue({
  render: h => h(App)
}).$mount("#app");
