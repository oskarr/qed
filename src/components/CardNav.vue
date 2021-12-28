<template>
  <footer class="card-footer">
    <a v-bind:class="{ 'has-text-light': hasPrev }"
      href="#" class="card-footer-item" @click="$emit('prev')">⬅</a>
    <a v-if="showCheck"
      href="#" class="card-footer-item" @click="$emit('validate')">&check;</a>
    <a v-bind:class="{ 'has-text-light': hasNext }"
      href="#" class="card-footer-item" @click="$emit('next')">➡</a>
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
