import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LeagueCard from '../LeagueCard.vue'

// Mock i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

describe('LeagueCard.vue', () => {
  const league = {
    idLeague: '4328',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL'
  }

  it('renders league information correctly', () => {
    const wrapper = mount(LeagueCard, {
      props: { league }
    })

    expect(wrapper.text()).toContain('English Premier League')
    expect(wrapper.text()).toContain('Soccer')
    expect(wrapper.text()).toContain('EPL')
  })

  it('emits click event with league ID', async () => {
    const wrapper = mount(LeagueCard, {
      props: { league }
    })

    await wrapper.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')![0]).toEqual(['4328'])
  })
})
