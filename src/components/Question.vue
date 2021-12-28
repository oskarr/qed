<template>
  <div class="card-content">
    <div class="content">
      <div v-html="renderMD(question.question)"></div>
    </div>
    <hr>
    <!-- Multiple-choice questions -->
    <div v-if="question.type == 'mcq'">
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
    <!-- Numerical input questions -->
    <div v-if="$props.question.type == 'number'">
      <div class="field">
        <p class="control has-icons-right">
        <input class="input" type="number" placeholder="T.ex. 17.23" v-model="numericInput"
        v-bind:class="{'is-success': isCorrect(numericInput), 'is-danger': !isCorrect(numericInput)}">
        <span class="icon is-right has-text-success">
          <span v-if="isCorrect(numericInput)" class="has-text-success">&check;</span>
          <span v-if="!isCorrect(numericInput)" class="has-text-danger">&cross;</span>
        </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';
import { Question } from '@/types';
import { shuffle } from '@/utils';

const md = mdi();
md.use(mdk, { displayMode: true });

export default defineComponent({
  name: 'Card',
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
    isCorrect(answer: any): boolean {
      const q = this.$props?.question;
      if (!q) { return false; }
      switch ((q as Question).type) {
        case 'mcq':
          return (q.correctAnswers.indexOf(answer as string) > -1);
        case 'number':
          // Alt. Math.abs(((answer as number) / q.answer) - 1) < tol
          return q.answer === (answer as number);
        default:
          return false;
      }
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
