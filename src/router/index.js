import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SolutionsView from '../views/SolutionsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/solucoes',
      name: 'solutions',
      component: SolutionsView,
    },

    {
      path: '/projetos',
      name: 'projects',
      component: ProjectsView,
    },

    {
      path: '/sobre',
      name: 'about',
      component: AboutView,
    },

    {
      path: '/contato',
      name: 'contact',
      component: ContactView,
    },

    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },

    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView,
    },
  ],
})

export default router
