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

  <hr />

  <footer>
    <a href="https://github.com/posva/2021-amsterdam-demos">Source Code</a> |
    <a href="https://2021-02-amsterdam-tips-and-tricks.netlify.app">Slides</a>
  </footer>
</template>
