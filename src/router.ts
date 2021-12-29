import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Quiz from '@/views/Quiz.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/quiz/:id(\\d+)',
    name: 'Quiz',
    component: Quiz,
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/quiz/1', // TODO: Make a home view
  },
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
