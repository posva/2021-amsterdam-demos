<template>
  <div>Data fetching</div>
  <section class="masonry">
    <div v-for="meme in memes" class="item">
      <img class="item__content" :src="meme.url" :alt="meme.name" />
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const memes = computed(() => route.meta.memes)
    return { memes }
  },
}
</script>

<style scoped>
/* .masonry {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-auto-rows: 250px;
} */

.masonry {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 800px;
  overflow: auto;
}

.item {
  box-sizing: border-box;
  padding: 10px;
  counter-increment: item-counter;
}

.item__content {
  background: purple;
}

.masonry img {
  width: 128px;
}
</style>
