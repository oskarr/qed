<template>
  <Swiper :swipeHandler="swipeHandler" v-if="quiz && quiz.questions.length > 0" style="min-height: 100vh;">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          {{ quiz.title }}
        </div>
        <router-link :to="'/'" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link :to="'/'" role="button" class="navbar-item">☰</router-link>
        </div>
      </div>
    </nav>
    <Question :question="quiz.questions[questionIndex]" @next="next" @prev="prev" />
  </Swiper>
  <span v-if="quiz && quiz.questions.length == 0">Quizet är tomt.</span>
  <span v-if="loading">Laddar...</span>
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Quiz } from '@/types';
import Question from '@/components/Question.vue';
import Swiper from '@/components/Swiper.vue';
import { SwipeIndicatorState } from '@/utils';

export default defineComponent({
  name: 'Quiz',
  components: {
    Question, Swiper,
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
    swipeHandler(direction: SwipeIndicatorState) {
      // Move up to the main view if the user swipes right
      // (that is, the indicator is shown on the left-hand side, hence the 'left')
      (direction === 'right') && this.next();
      (direction === 'left') && this.prev();
    },
    fetchData() {
      this.error = undefined;
      this.quiz = undefined;
      this.loading = true;
      const fetchedId = this.$route.params.id;
      fetch(`/quiz/${fetchedId}.json`).then(async (res: Response) => {
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

<style scoped lang="scss">
  .card {
    height: 100%;
    width: 100%;
  }
/* @media only screen and (min-width: 960px) {
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: max-content;
    min-width: min(10cm, 100vw);
  }
}

@media only screen and (max-width: 960px) {
  .card {
    min-height: 100vh;
  }
} */
</style>
