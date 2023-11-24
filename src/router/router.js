import {createRouter, createWebHistory} from 'vue-router';
import PostPage from '@/pages/PostPage';
import PostsPage from '@/pages/PostsPage';
import NotFoundPage from '@/pages/NotFoundPage';

const routes = [
  {
    path: '/',
    component: PostsPage
  },
  {
    path: '/post/:id',
    component: PostPage
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
