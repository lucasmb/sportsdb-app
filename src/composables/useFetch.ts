import { ref } from 'vue'
/**
 * simple useFetch composable to be reused in store,
 * handles errors and json data
 * returns data as passed type
 */
export function useFetch<T>() {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    return String(error)
  }

  const doFetch = async (url: string) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Client Error: ${response.status}`)
        } else if (response.status >= 500) {
          throw new Error(`Server Error: ${response.status}`)
        }
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const json = await response.json()
      data.value = json as T
      return data.value
    } catch (e) {
      const message = getErrorMessage(e)
      console.error(message)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    doFetch,
  }
}
