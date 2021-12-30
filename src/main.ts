import { createApp, App as AppType } from 'vue';
import mousetrap, { MousetrapStatic } from 'mousetrap';
import Vue3TouchEvents from 'vue3-touch-events';
import router from './router';
// import store from './store';
import App from './App.vue';

// Based on https://www.npmjs.com/package/vue-mousetrap
// but typed with https://v3.vuejs.org/guide/typescript-support.html#augmenting-types-for-globalproperties
const VueMousetrapPlugin = {
  install(app: AppType): void {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$mousetrap = mousetrap;
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $mousetrap: MousetrapStatic
  }
}

(createApp(App)
  // .use(store)
  .use(router)
  .use(VueMousetrapPlugin)
  .use(Vue3TouchEvents)
  .mount('#app'));
