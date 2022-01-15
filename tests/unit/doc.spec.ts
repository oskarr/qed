import { mount, flushPromises } from '@vue/test-utils';
import Vue3TouchEvents from 'vue3-touch-events';
import jestFetchMock from 'jest-fetch-mock';

import { VueMousetrapPlugin } from '@/utils/VueMousetrapPlugin';
import MCQ from '@/components/question/MCQ';
import FillQuestion from '@/components/question/Fill';
import Document from '@/views/Document';
import router from '@/router';

jestFetchMock.enableMocks();

const MOCK_DOC = `# H1-Titel
Test av __fetstil__ och *kursiv* text, samt $KaTeX$.

\`\`\`qed-toml
title = "Quiz-Titel"

[[questions]]
question = "___ = ___"
type = "fill"
blankCount = 1
blanks = [ "blank1", "blank2" ]

[[questions]]
question = "Which answers are correct?"
type = "mcq"
correctAnswers = [ "correct1", "correct2" ]
incorrectAnswers = [ "incorrect1", "incorrect2" ]
\`\`\`
`;

test('Markdown', async () => {
  fetchMock.mockOnce(MOCK_DOC);
  const wrapper = mount(Document, { // [store, key],
    global: { plugins: [router, Vue3TouchEvents, VueMousetrapPlugin] },
  });

  router.push('/docs/1');
  await flushPromises();

  expect(wrapper.html()).toContain('H1-Titel');
  expect((await wrapper.find('em')).html()).toContain('kursiv');
  expect((await wrapper.find('strong')).html()).toContain('fetstil');

  expect(wrapper.findComponent(FillQuestion).exists()).toEqual(true);
  expect(wrapper.findComponent(MCQ).exists()).toEqual(false);

  await wrapper.find('[data-test=cardnav-next]').trigger('click');
  await flushPromises();

  expect(wrapper.findComponent(FillQuestion).exists()).toEqual(false);
  expect(wrapper.findComponent(MCQ).exists()).toEqual(true);
});
