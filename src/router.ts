import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Quiz from '@/views/Quiz.vue';

// Certain components may benefit from async loading. For now (v1.0) this adds about 3 KiB to the total size (transferred)
// while reducing the entrypoint size by about 30 KiB. Hence the difference is pretty negligible for now, especially since
// all users will use the Song component, and most will use the Search component.

const routes: Array<RouteRecordRaw> = [
  //
  // Chapter views
  //
  {
    path: '/quiz/:id(\\d+)',
    name: 'Quiz',
    component: Quiz,
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/quiz/1', // TODO: ...
  },
  //
  // Other
  //
  { // Redirect 404:s to the start page.
    path: '/:pathMatch(.*)*',
    redirect: '/',
    name: 'Unmatched',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
