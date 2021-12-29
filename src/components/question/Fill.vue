<!-- Fill in the blank-questions -->

<template>
  <div class="card-content">
    <div class="content">
      <div v-html="renderMD(question.question)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mdi from 'markdown-it';
import mdk from '@traptitech/markdown-it-katex';

const md = mdi().use(mdk, { displayMode: true });

export default defineComponent({
  name: 'FillQuestion',
  props: { question: Object, validate: Boolean },
  methods: {
    renderMD(mdRaw: string) {
      let md2 = mdRaw;
      if (this.$props && this.$props.question) {
        // eslint-disable-next-line no-restricted-syntax
        for (const blank of this.$props.question.blanks as string[]) {
          const replacement = (this.$props.validate) ? blank : ('_'.repeat(blank.length));
          md2 = md2.replace(/___/, replacement);
        }
      }
      return md.render(md2);
    },
  },
});
</script>
