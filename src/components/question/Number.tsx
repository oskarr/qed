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
    shuffle,
    isCorrect(answer: number): boolean {
      const q = this.$props?.question;
      return (q !== undefined) && (q.answer === answer);
    },
  },
  render() {
    return (
      <div class="card-content">
        <div v-html={md.render((this.$props?.question && this.$props.question.question) || 'Okänt fel')}></div>
        <hr />
        <div>
          <div class="field">
            <p>
              <input type="number" placeholder="T.ex. 17.23" v-model={this.numericInput}
                class={{ 'is-success': this.isCorrect(this.numericInput), 'is-danger': !this.isCorrect(this.numericInput) }} />
                <span>
                  {this.isCorrect(this.numericInput) && <span>✓</span>}
                  {!this.isCorrect(this.numericInput) && <span>✗</span>}
                </span>
                <span style="font-size: 0.6em;float:right;">(Nummerinmatning är experimentellt)</span>
            </p>
          </div>
        </div>
      </div>
    );
  },
});
