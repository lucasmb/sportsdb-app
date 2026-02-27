import { toRaw } from 'vue'

/**
 * Helper composable to work with browser sessionStorage
 */
export function useSessionStorage() {
  /**
   * Sets an item in sessionStorage.
   */
  const setItem = (key: string, value: any) => {
    try {
      const rawValue = toRaw(value)
      sessionStorage.setItem(key, JSON.stringify(rawValue))
    } catch (e) {
      console.error(`[useSessionStorage] Failed to set key "${key}":`, e)
    }
  }

  /**
   * Gets an item from sessionStorage.
   * Returns the fallback value if the key doesn't exist or parsing fails.
   */
  const getItem = <T>(key: string, fallback: T): T => {
    try {
      const saved = sessionStorage.getItem(key)
      if (!saved) return fallback
      return JSON.parse(saved) as T
    } catch (e) {
      console.error(`[useSessionStorage] Failed to get key "${key}":`, e)
      return fallback
    }
  }

  /**
   * Removes an item from sessionStorage.
   */
  const removeItem = (key: string) => {
    try {
      sessionStorage.removeItem(key)
    } catch (e) {
      console.error(`[useSessionStorage] Failed to remove key "${key}":`, e)
    }
  }

  return {
    setItem,
    getItem,
    removeItem,
  }
}
