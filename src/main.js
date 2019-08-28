import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import client from './plugins/axios';

Vue.config.productionTip = false;

Vue.use(client);
Vue.use(VueI18n);

const messages = {
  en: {
    header: {
      login: 'login'
    }
  },
  ja: {
    header: {
      login: 'こんにちは、世界'
    }
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem('current-locale') || 'en',
  messages,
});

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
