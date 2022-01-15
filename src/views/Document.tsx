import { defineComponent } from 'vue';
import toml from 'toml';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';

import { range } from '@/utils';
import Quiz from './Quiz';

const MARKDOWN_IT = mdi().use(mdk, { displayMode: true });
const QUIZ_BLOCK_REGEXP = new RegExp('```qed-((?:toml)|(?:json))([^]*?)```', 'ig');

export default defineComponent({
  name: 'App',
  render() {
    if (this.loading) {
      return <span data-test="document-loading">Laddar...</span>;
    }
    if (this.error) {
      return <span data-test="document-error">{ this.error }</span>;
    }
    if (!this.data) {
      return <span data-test="document-error-unknown">Okänt fel</span>;
    }
    const quizzes = Array.from(this.data.matchAll(QUIZ_BLOCK_REGEXP));
    const textblocks = this.data.split(QUIZ_BLOCK_REGEXP);
    const arr = range(0, quizzes.length * 2).map((i) => {
      // eslint-disable-next-line no-bitwise
      const j = i >> 1;
      if (i % 2 === 0) { // Text block
        return <div v-html={MARKDOWN_IT.render(textblocks[j])}></div>;
      }
      // Quiz
      const parsedQuiz = (quizzes[j][1] === 'toml') ? toml.parse(quizzes[j][2]) : JSON.parse(quizzes[j][2]);
      return <Quiz quiz={parsedQuiz}/>;
    });
    return (
    <div class="document">{arr}</div>);
  },
  data() {
    return {
      loading: false,
      error: undefined as string | undefined,
      data: undefined as string | undefined,
    };
  },
  watch: { // See https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.error = undefined;
      this.data = undefined;
      this.loading = true;
      const fetchedId = this.$route.params.id;
      fetch(`/doc/${fetchedId}.md`).then(async (res: Response) => {
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.id === fetchedId) {
          this.loading = false;
          this.data = await res.text();
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
