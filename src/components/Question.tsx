// Libraries
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';

// Components
import MCQ from './question/MCQ';
import NumberQuestion from './question/Number';
import Fill from './question/Fill';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'Card',
  props: {
    question: Object,
    validate: Boolean,
  },
  methods: {
    renderMD(mdRaw: string) {
      return md.render(mdRaw);
    },
  },
  render() {
    const question = this.question || { type: '' };
    const { validate } = this;
    return <div class="question-container">
      {/* <!-- Multiple-choice questions (And single-choice, for now) --> */
        (question.type === 'mcq' || question.type === 'scq')
        && <MCQ question={question} validate={validate}/>}
      {/* <!-- Numerical input questions --> */
        question.type === 'number' && <NumberQuestion question={question} />}
      {/* <!-- Fill in the blank-questions --> */
        question.type === 'fill' && <Fill question={question} validate={validate} />}
    </div>;
  },
});
