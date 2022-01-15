<!-- Numerical input questions -->

<template>
  <div class="card-content">
    <div v-html="renderMD(question.question)"></div>
    <hr>
    <div>
      <div class="field">
        <p class="control has-icons-right">
        <input class="input" type="number" placeholder="T.ex. 17.23" v-model="numericInput"
         v-bind:class="{'is-success':isCorrect(numericInput),'is-danger':!isCorrect(numericInput)}">
        <span class="icon is-right has-text-success">
          <span v-if="isCorrect(numericInput)" class="has-text-success">&check;</span>
          <span v-if="!isCorrect(numericInput)" class="has-text-danger">&cross;</span>
        </span>
        <span style="font-size: 0.6em;float:right;">(Nummerinmatning är experimentellt)</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';
import { shuffle } from '@/utils';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'NumberQuestion',
  props: {
    question: Object,
  },
  data() {
    return {
      numericInput: NaN as number,
    };
  },
  methods: {
    renderMD(mdRaw: string) {
      return md.render(mdRaw);
    },
    shuffle,
    isCorrect(answer: number): boolean {
      const q = this.$props?.question;
      return (q !== undefined) && (q.answer === answer);
    },
  },
});
</script>
