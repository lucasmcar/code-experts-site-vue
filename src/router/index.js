import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SolutionsView from '@/views/SolutionsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'

import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'

import LoginView from '@/views/admin/LoginView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import PostsView from '@/views/admin/PostsView.vue'
import PostCreateView from '@/views/admin/PostCreateView.vue'
import PostEditView from '@/views/admin/PostEditView.vue'

import { supabase } from '@/services/supabase'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/sobre',
      name: 'about',
      component: AboutView,
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
      path: '/contato',
      name: 'contact',
      component: ContactView,
    },

    // BLOG

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

    // ADMIN

    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginView,
    },

    ,
    /*{
      path: '/admin/posts',
      name: 'admin-posts',
      component: PostsView,
      meta: { requiresAuth: true },
    }*/ {
      path: '/admin/posts/new',
      name: 'admin-post-new',
      component: PostCreateView,
      meta: { requiresAuth: true },
    },
    /*{
      path: '/admin/posts/:id/edit',
      name: 'admin-post-edit',
      component: PostEditView,
      meta: { requiresAuth: true },
    },*/

    {
      path: '/admin',
      name: 'admin',
      component: DashboardView,

      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return '/admin/login'
  }

  return true
})

export default router
