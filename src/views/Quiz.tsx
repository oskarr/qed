import { defineComponent } from 'vue';
import { SwipeIndicatorState } from '@/utils';

import Question from '@/components/Question';
import Swiper from '@/components/Swiper.vue';
import CardNav from '@/components/CardNav';

export default defineComponent({
  name: 'Quiz',
  props: { quiz: Object },
  render() {
    const { quiz } = this;
    if (quiz && quiz.questions.length > 0) {
      return (
        <Swiper swipeHandler={this.swipeHandler} class="quiz-container">
          <header>{quiz.title}</header>
          <Question question={quiz.questions[this.questionIndex]}
            validate={ this.validate } key={this.questionIndex}/>
          <CardNav
            onValidate={() => { this.validate = !this.validate; }}
            onNext={this.next} onPrev={this.prev}
            showCheck={quiz.questions[this.questionIndex].type !== 'number'} />
        </Swiper>
      );
    }
    return <span data-test="quiz-error-invalid">Ogiltigt quiz.</span>;
  },
  data() {
    return {
      questionIndex: 0,
      validate: false,
    };
  },
  methods: {
    next() {
      this.validate = false;
      const cap = (this.quiz) ? (this.quiz.questions.length - 1) : 0;
      this.questionIndex = Math.min(this.questionIndex + 1, cap);
    },
    prev() {
      this.validate = false;
      this.questionIndex = Math.max(0, this.questionIndex - 1);
    },
    swipeHandler(direction: SwipeIndicatorState) {
      // Move up to the main view if the user swipes right
      // (that is, the indicator is shown on the left-hand side, hence the 'left')
      (direction === 'right') && this.next();
      (direction === 'left') && this.prev();
    },
  },
});
