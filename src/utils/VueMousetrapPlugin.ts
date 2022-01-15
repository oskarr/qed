import { App as AppType } from 'vue';
import mousetrap, { MousetrapStatic } from 'mousetrap';

// Based on https://www.npmjs.com/package/vue-mousetrap
// but typed with https://v3.vuejs.org/guide/typescript-support.html#augmenting-types-for-globalproperties
export const VueMousetrapPlugin = {
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
