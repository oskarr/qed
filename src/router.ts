import {
  createRouter, createWebHashHistory, RouteLocation, RouteRecordRaw,
} from 'vue-router';
import Document from '@/views/Document';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/docs/:id',
    name: 'Document',
    component: Document,
  },
  {
    path: '/doc/:id',
    redirect: (to: RouteLocation) => `/docs/${to.params.id}`,
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/docs/1', // TODO: Make a home view
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
