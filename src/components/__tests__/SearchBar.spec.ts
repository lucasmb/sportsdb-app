import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../SearchBar.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('SearchBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e })
        },
      },
    })
    const input = wrapper.find('input')
    await input.setValue('Premier')
    expect(wrapper.props('modelValue')).toBe('Premier')
  })
})
