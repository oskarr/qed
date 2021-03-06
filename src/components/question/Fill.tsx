import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';
import { shuffle, range, replaceNth } from '@/utils';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'FillQuestion',
  props: { question: Object, validate: Boolean },
  data() {
    if (this.$props && this.$props.question) {
      const q = this.$props.question;
      const blankCount = (q.blankCount !== undefined) ? q.blankCount : q.blanks.length;
      const blanksToHideByIndex: number[] = shuffle(range(0, q.blanks.length)).slice(-blankCount);
      return { blanksToHideByIndex };
    }
    return { blanksToHideByIndex: undefined };
  },
  methods: {
    renderMD(mdRaw: string) {
      let md2 = `${mdRaw}`;
      if (this.$props && this.$props.question) {
        const q = this.$props.question;
        // We do a backwards loop in order for replaceNth to work properly.
        for (let blankIndex = q.blanks.length - 1; blankIndex >= 0; blankIndex -= 1) {
          const blank = q.blanks[blankIndex];
          const replacement = (
            (this.blanksToHideByIndex?.includes(blankIndex) || !q.blankCount)
              && !this.$props.validate
          ) ? `<u>${blank}</u>` : blank;
          md2 = replaceNth(md2, '___', replacement, blankIndex + 1);
        }
      }
      return md.render(md2).replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>');
    },
  },
  render() {
    return (
    <div class="card-content">
      <div v-html={this.renderMD(this.question?.question)} class="fillq-container"></div>
    </div>
    );
  },
});
