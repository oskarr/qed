import { mount, flushPromises } from '@vue/test-utils';
import Vue3TouchEvents from 'vue3-touch-events';
import jestFetchMock from 'jest-fetch-mock';

import { VueMousetrapPlugin } from '@/utils/VueMousetrapPlugin';
import Document from '@/views/Document';
import router from '@/router';

jestFetchMock.enableMocks();

const MOCK_DOC = `# H1-Titel
Test av __fetstil__ och *kursiv* text, samt $KaTeX$.

\`\`\`qed-toml
title = "Quiz"

[[questions]]
question = "___ $=$ ___"
type = "fill"
blankCount = 1
blanks = [ "$\\sin(a+b)$", "$\\sin(a)\\cos(b) + \\cos(a)\\sin(b)$" ]

[[questions]]
question = "___ $=$ ___"
type = "fill"
blankCount = 1
blanks = [ "$\\cos(a+b)$", "$\\cos(a)\\cos(b) - \\sin(a)\\sin(b)$" ]

[[questions]]
question = "$\\cos(2a)=$ ___"
type = "mcq"
correctAnswers = [
  "$2\\cos^2(a)-1$",
  "$\\cos^2(a)-\\sin^2(a)$",
  "$1-2\\sin^2(a)$"
]
incorrectAnswers = [ "$2\\sin(a)\\cos(a)$", "$1-2\\cos^2(a)$" ]
\`\`\`
`;

test('Doc1', async () => {
  fetchMock.mockOnce(MOCK_DOC);
  const wrapper = mount(Document, { // [store, key],
    global: { plugins: [router, Vue3TouchEvents, VueMousetrapPlugin] },
  });

  router.push('/docs/1');
  await flushPromises();

  // await wrapper.find('[data-test="settingsButtonWrapper"] > button').trigger('click');
  expect(wrapper.html()).toContain('H1-Titel');
  expect((await wrapper.find('em')).html()).toContain('kursiv');
  expect((await wrapper.find('strong')).html()).toContain('fetstil');
});
