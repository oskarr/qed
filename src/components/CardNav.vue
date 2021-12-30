<template>
  <footer class="card-footer has-background-light">
    <a class="card-footer-item" v-bind:class="{ 'has-text-light': hasPrev }"
      @click="$emit('prev')">⬅</a>
    <a class="card-footer-item" v-if="showCheck"
      @click="$emit('validate')">&check;</a>
    <a class="card-footer-item" v-bind:class="{ 'has-text-light': hasNext }"
      @click="$emit('next')">➡</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardNav',
  props: {
    hasPrev: Boolean,
    hasNext: Boolean,
    showCheck: Boolean,
  },
  emits: ['prev', 'next', 'validate'],
  mounted() {
    this.$mousetrap
      .bind(['enter', 'space'], () => this.$emit('validate'))
      .bind('left', () => this.$emit('prev'))
      .bind('right', () => this.$emit('next'));
  },
});
</script>

<style lang="scss">
/* @media only screen and (max-width: 960px) { */
  .card-footer {
    position: absolute;
    bottom: 0;
    font-size: 3vh;
    width: 100%;
    min-height: 10vh;
  }
/* } */
</style>
