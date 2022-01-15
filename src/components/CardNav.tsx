import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardNav',
  props: {
    hasPrev: Boolean,
    hasNext: Boolean,
    showCheck: Boolean,
  },
  emits: ['prev', 'next', 'validate'],
  mounted() {
    this.$mousetrap
      .bind(['enter', 'space'], () => this.$emit('validate'))
      .bind('left', () => this.$emit('prev'))
      .bind('right', () => this.$emit('next'));
  },
  render() {
    return (
      <footer>
        <a onClick={() => this.$emit('prev')} data-test="cardnav-prev">⬅</a>
        {this.showCheck && <a onClick={() => this.$emit('validate')} data-test="cardnav-validate">✓</a>}
        <a onClick={() => this.$emit('next')} data-test="cardnav-next">➡</a>
      </footer>
    );
  },
});
