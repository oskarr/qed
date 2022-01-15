import { defineComponent } from 'vue';
import Quiz from './views/Quiz.vue';
import './App.scss';

export default defineComponent({
  name: 'App',
  render() {
    return <Quiz/>;
  },
});
