import { createRouter, createWebHistory } from 'vue-router'
import RefsVsShallow from './views/ref-vs-shallow.vue'
import NotFound from './views/not-found.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/ref-vs-shallow', component: RefsVsShallow },
    { path: '/:catchAll(.*)', component: NotFound },
  ],
})
