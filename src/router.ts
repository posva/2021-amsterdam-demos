import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getMemes, Meme } from './api/imgflip'
import { getRandomJoke, Joke } from './api/jokes'
import NotFound from './views/not-found.vue'

const modules = import.meta.glob('./views/*.vue')

const ROUTES_TO_SKIP = [
  'not-found',
  // 'go-back',
  // 'ref-vs-shallow'
].map((name) => `./views/${name}.vue`)

export const staticRoutes: RouteRecordRaw[] = Object.keys(modules)
  .filter((path) => !ROUTES_TO_SKIP.includes(path))
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

router.beforeResolve(async (to) => {
  if (to.name === 'data-fetching-meta') {
    to.meta.memes = await getMemes()
  } else if (to.name === 'data-fetching-jokes') {
    to.meta.joke = await getRandomJoke()
  }
})

declare module 'vue-router' {
  export interface RouteMeta {
    memes: Meme[]
    joke: Joke
  }
}
