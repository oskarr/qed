import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import { VueMousetrapPlugin } from '@/utils/VueMousetrapPlugin';
import router from './router';
// import store from './store';
import App from './views/Document';
import './style/main.scss';

(createApp(App)
  // .use(store)
  .use(router)
  .use(VueMousetrapPlugin)
  .use(Vue3TouchEvents)
  .mount('#app'));
