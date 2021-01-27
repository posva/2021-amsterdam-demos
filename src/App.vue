<template>
  <header>
    <h1>Tips and Tricks ✨</h1>
    <p>... with Vue 3</p>
  </header>

  <template v-if="$route.path !== '/'">
    <router-link to="/">→ List of demos</router-link>
    <hr
  /></template>

  <router-view />
</template>
