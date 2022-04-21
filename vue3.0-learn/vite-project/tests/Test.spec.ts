/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import { mount } from '@vue/test-utils'
import Test from '../src/views/Test.vue'

// eslint-disable-next-line linebreak-style
test('Test.vue', async () => {
  const wrapper = mount(Test)
  expect(wrapper.html()).toContain('Unit Test Page')
  expect(wrapper.html()).toContain('count is :0'))
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('count is:1')
})
