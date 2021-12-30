<!-- Fill in the blank-questions -->

<template>
  <div class="card-content">
    <div v-html="renderMD(question.question)" class="fillq-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';
import { shuffle, range, replaceNth } from '@/utils';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'FillQuestion',
  props: { question: Object, validate: Boolean },
  methods: {
    renderMD(mdRaw: string) {
      let md2 = mdRaw;
      if (this.$props && this.$props.question) {
        const q = this.$props.question;
        const blanksToHideByIndex: number[] = shuffle(range(0, q.blanks.length)).slice(q.blankCount || q.blanks.length);
        // We do a backwards loop in order for replaceNth to work properly.
        for (let blankIndex = q.blanks.length - 1; blankIndex >= 0; blankIndex -= 1) {
          const blank = q.blanks[blankIndex];
          const replacement = (blanksToHideByIndex.includes(blankIndex) && !this.$props.validate)
            ? ('_'.repeat(blank.length)) : blank; // `<u>${blank}</u>`
          md2 = replaceNth(md2, '___', replacement, blankIndex + 1);
        }
      }
      return md.render(md2); // .replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>');
    },
  },
});
</script>

<style lang="scss">
  /* div.fillq-container u {
    border-bottom: 1px solid #000000AA;
  } */
</style>
