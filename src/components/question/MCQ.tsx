import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';
import { shuffle } from '@/utils';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'MCQ',
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
    };
  },
  methods: {
    isCorrect(answer: string): boolean {
      const q = this.$props?.question;
      return (q !== undefined) && (q.correctAnswers.indexOf(answer) > -1);
    },
  },
  render() {
    return (
      <div class="card-content">
        <div v-html={md.render(this.question?.question)}></div>
        <hr />
        <table>
          { // List of options
           this.shuffledOptions.map(
             (option, key) => <tr>
              <td>
                <input type="checkbox" v-model={this.checkedOptions[key]} id={`mcq-${key}`}/>
              </td>
              <td>
                <label class="mcq-option checkbox" for={`mcq-${key}`}>
                  <div v-html={md.render(option)}></div>
                </label>
              </td>
              {this.validate && <td class="mcq-validation">
                {this.checkedOptions[key] === this.isCorrect(option)
                  && <div title="Du valde rätt!">✓</div>}
                {this.checkedOptions[key] !== this.isCorrect(option)
                  && <div title={this.isCorrect(option)
                    ? 'Det här alternativet ska vara valt.' : 'Det här alternativet ska inte vara valt.'}
                  >✗</div>}
              </td>}
            </tr>,
           ) }
        </table>
        {this.validate && <span class="mcq-score">
          { this.shuffledOptions.reduce((acc, cur) => acc + this.isCorrect(cur), 0) }
          /
          { this.shuffledOptions.length }
          </span>}
      </div>
    );
  },
});
