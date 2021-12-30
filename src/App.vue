<template>
  <Quiz />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Quiz from './views/Quiz.vue';

export default defineComponent({
  name: 'App',
  components: {
    Quiz,
  },
});
</script>

<style lang="css" scoped>
  .container {
    min-height: 100vh;
  }
</style>

<style lang="scss">
body, #app {min-height: 100vh; width: 100%;}
/* Bulma imports */
@import "@/assets/bulma-overrides.scss";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/base/_all.sass";

/* Slim (production) */
/* @import "bulma/sass/components/card.sass"; */
/* @import "bulma/sass/elements/container.sass"; */
/* @import "bulma/sass/helpers/color.sass"; */

/* Everything (development) */
@import "bulma/bulma.sass";
/* @import "bulma/sass/components/_all.sass"; */
/* @import "bulma/sass/elements/_all.sass"; */
/* @import "bulma/sass/form/_all.sass"; */
/* @import "bulma/sass/grid/_all.sass"; */
/* @import "bulma/sass/helpers/_all.sass"; */
/* @import "bulma/sass/layout/_all.sass"; */

/* KaTeX */
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.1/katex.min.css");
</style>
