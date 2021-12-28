<template>
  <div v-if="quiz && quiz.questions.length > 0">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-light">
          <!-- ℚ𝔼𝔻 -->
          {{ quiz.title }}
        </p>
      </header>
      <Question :question="quiz.questions[questionIndex]" :validate="validate"/>
      <footer class="card-footer">
        <a v-bind:class="{ 'has-text-light': questionIndex==0 }"
          href="#" class="card-footer-item" @click="prev">⬅</a>
        <a v-if="quiz.questions[questionIndex].type != 'number'"
          href="#" class="card-footer-item" @click="validate = !validate">&check;</a>
        <a v-bind:class="{ 'has-text-light': questionIndex == quiz.questions.length-1 }"
          href="#" class="card-footer-item" @click="next">➡</a>
      </footer>
    </div>
  </div>
  <span v-if="quiz && quiz.questions.length == 0">Quizet är tomt.</span>
  <span v-if="loading">Laddar...</span>
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Quiz } from '@/types';
import Question from '@/components/Question.vue';

export default defineComponent({
  name: 'Quiz',
  components: {
    Question,
  },
  data() {
    return {
      loading: false,
      quiz: undefined as Quiz | undefined,
      error: undefined,
      questionIndex: 0,
      validate: false,
    };
  },
  watch: { // See https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    $route: 'fetchData',
  },
  created() {
    this.fetchData();
  },
  methods: {
    next() {
      const cap = (this.quiz) ? (this.quiz.questions.length - 1) : 0;
      this.questionIndex = Math.min(this.questionIndex + 1, cap);
    },
    prev() {
      this.questionIndex = Math.max(0, this.questionIndex - 1);
    },
    fetchData() {
      this.error = undefined;
      this.quiz = undefined;
      this.loading = true;
      const fetchedId = this.$route.params.id;
      fetch(`/quiz/${fetchedId}.json`).then(async (res: any) => {
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.id === fetchedId) {
          this.loading = false;
          this.quiz = await res.json();
          this.questionIndex = 0;
        }
      }).catch((err) => {
        this.loading = false;
        if (this.$route.params.id === fetchedId) {
          this.error = err.toString();
        }
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: max-content;
    min-width: min(10cm, 100vh);
  }
</style>
