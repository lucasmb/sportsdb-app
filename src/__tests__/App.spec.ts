import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    setActivePinia(createPinia())
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-link': true,
          'router-view': true,
          ThemeLangSwitcher: true,
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
