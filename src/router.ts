import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RefsVsShallow from './views/ref-vs-shallow.vue'
import NotFound from './views/not-found.vue'

const modules = import.meta.glob('./views/*.vue')

const staticRoutes: RouteRecordRaw[] = Object.keys(modules)
  .filter((path) => path !== './views/not-found.vue')
  .map((path) => ({
    // remove /views and .vue
    path: path.slice(7, -4),
    // same but without leading slash
    name: path.slice(8, -4),
    component: modules[path],
  }))

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...staticRoutes,
    // { path: '/ref-vs-shallow', component: RefsVsShallow },
    { path: '/:catchAll(.*)', component: NotFound },
  ],
})
