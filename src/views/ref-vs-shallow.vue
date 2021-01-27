<template>
  <h2>Ref vs Shallow Ref</h2>

  <p>
    This demo setups the same data using <code>ref()</code> and
    <code>shallowRef()</code> with complex objects to measure memory consumption
    and speed.
  </p>

  <ViewRefs></ViewRefs>
</template>

<script>
import ViewRefs from '../components/ref-vs-shallow/refs.vue'

export default {
  components: { ViewRefs },
  setup() {
    return {}
  },
}
</script>
