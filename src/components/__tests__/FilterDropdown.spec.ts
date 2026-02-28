import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FilterDropdown from '../FilterDropdown.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('FilterDropdown.vue', () => {
  const sports = ['Soccer', 'Basketball']

  it('renders correctly with sport options', () => {
    const wrapper = mount(FilterDropdown, {
      props: {
        sports,
        modelValue: 'all_leagues',
      },
    })

    const options = wrapper.findAll('option')
    // "All leagues" + dynamic sports (Soccer, Basketball) + any extra priority sports hardcoded in component
    // Component adds Soccer, Motorsport, Basketball if not in prop.
    // In prop we gave Soccer, Basketball.
    // Total: 1 (All) + 2 (Prop) = 3
    expect(options).toHaveLength(3)
    expect(options[0]?.element.value).toBe('all_leagues')
  })

  it('updates model value when selecting a sport', async () => {
    const wrapper = mount(FilterDropdown, {
      props: {
        sports,
        modelValue: 'all_leagues',
      },
    })

    const select = wrapper.find('select')
    await select.setValue('Soccer')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Soccer'])
  })
})
