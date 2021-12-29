<template>
  <!-- Multiple-choice questions -->
  <MCQ v-if="question.type == 'mcq'" :question="question" :validate="validate" />
  <!-- Numerical input questions -->
  <NumberQuestion v-if="question.type == 'number'" :question="question" />
  <!-- Fill in the blank-questions -->
  <Fill v-if="question.type == 'fill'" :question="question" :validate="validate" />

  <!-- Relays events up to the Quiz view. -->
  <CardNav
    @validate="validate = !validate"
    @next="$emit('next'); validate = false;"
    @prev="$emit('prev'); validate = false;"
    :showCheck="question.type !== 'number'" />
</template>

<script lang="ts">
// Libraries
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';

// Components
import CardNav from './CardNav.vue';
import MCQ from './question/MCQ.vue';
import NumberQuestion from './question/Number.vue';
import Fill from './question/Fill.vue';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'Card',
  emits: ['prev', 'next'],
  components: {
    CardNav, MCQ, Fill, NumberQuestion,
  },
  props: { question: Object },
  data() {
    return {
      validate: false,
    };
  },
  methods: {
    renderMD(mdRaw: string) {
      return md.render(mdRaw);
    },
  },
});
</script>

<style scoped lang="scss">
.mcq-option {
  min-height: 3em;
  width: 100%;

  & span {
    display: inline-block;
    margin-left: 0.5em;
  }
}
</style>
