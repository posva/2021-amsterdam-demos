<template>
  <div>Data fetching</div>
  <section class="masonry">
    <figure
      v-for="meme in memes"
      class="item"
      :id="`${meme.name}_${meme.id}`"
      :title="meme.name"
      :key="meme.id"
    >
      <img class="item__content" :src="meme.url" :alt="meme.name" />
      <figcaption>
        <a :href="`#${meme.name}_${meme.id}`">{{ meme.name }}</a>
      </figcaption>
    </figure>
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
img {
  max-width: 100%;
  display: block;
  margin-bottom: 0;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}

figure a {
  color: black;
  text-decoration: none;
}

figcaption {
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.2em 0.5em;
  justify-self: start;
}

.masonry {
  column-count: 3;
  column-gap: 10px;
}

@media screen and (max-width: 1024px) {
  .masonry {
    column-count: 2;
  }
}

@media screen and (max-width: 500px) {
  .masonry {
    column-count: 1;
  }
}
</style>
