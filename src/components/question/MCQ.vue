<template>
  <div class="card-content">
    <div v-html="renderMD(question.question)"></div>
    <hr>
    <div>
      <label v-bind:key="key" class="mcq-option checkbox" v-for="option, key in shuffledOptions">
        <input type="checkbox" v-model="checkedOptions[key]">
        <span v-html="renderMD(option)"></span>
        <span v-if="validate" style="float: right;">
          <span v-if="checkedOptions[key] == isCorrect(option)" title="Du valde rätt!"
            class="has-text-success">&check;</span>
          <span v-if="checkedOptions[key] != isCorrect(option)" v-bind:title="isCorrect(option) ?
                'Det här alternativet ska vara valt.' : 'Det här alternativet ska inte vara valt.'"
            class="has-text-danger">&cross;</span>
        </span>
      </label>
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
  name: 'MCQuestion',
  props: {
    question: Object,
    validate: Boolean,
  },
  data() {
    const q = this.$props.question;
    const shuffledOptions = shuffle([...q?.correctAnswers, ...q?.incorrectAnswers]) || [];
    return {
      shuffledOptions,
      showChecks: true,
      checkedOptions: Array(shuffledOptions.length).fill(false),
      numericInput: NaN as number,
    };
  },
  methods: {
    renderMD(mdRaw: string) {
      return md.render(mdRaw);
    },
    shuffle,
    isCorrect(answer: string): boolean {
      const q = this.$props?.question;
      return (q !== undefined) && (q.correctAnswers.indexOf(answer) > -1);
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
