import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SeasonBadgeModal from '../SeasonBadgeModal.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

describe('SeasonBadgeModal.vue', () => {
  it('renders league name when seasons are present', async () => {
    const seasons = [{ idSeason: '1', strSeason: '2021', strBadge: 'badge.png' }]
    const wrapper = mount(SeasonBadgeModal, {
      props: { isOpen: true, seasons, leagueName: 'Test League', loading: false }
    })
    expect(wrapper.text()).toContain('Test League')
    expect(wrapper.find('img').attributes('src')).toBe('badge.png')
  })

  it('shows loading state', () => {
    const wrapper = mount(SeasonBadgeModal, {
      props: { isOpen: true, seasons: [], leagueName: 'Test League', loading: true }
    })
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })
})
