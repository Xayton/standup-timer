import {expect, test} from 'vitest';
import {mount} from "@vue/test-utils";

import Footer from "../src/components/Footer.vue";
import {secToTime} from "../src/composables/secToTime";

test('mount component', async () => {
  expect(Footer).toBeTruthy()

  const wrapper = mount(Footer, {
    props: {totalUsers: 10, totalTime: 120},
  })

  expect(wrapper.text()).toContain('10 users')
  expect(wrapper.text()).toContain(`(${secToTime(120)})`)


  await wrapper.get('img').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('randomize')

  await wrapper.setProps({totalUsers: 2, totalTime: 15})
  expect(wrapper.text()).toContain('2 users')
  expect(wrapper.text()).toContain(`(${secToTime(15)})`)
})
