import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('sky_access_token') || null)
  const refreshToken = ref(localStorage.getItem('sky_refresh_token') || null)
  const tokenExpiry = ref(localStorage.getItem('sky_token_expiry') || null)
  const subscriptionKey = ref(localStorage.getItem('sky_subscription_key') || null)

  const isAuthenticated = computed(() => {
    if (!accessToken.value || !tokenExpiry.value) return false
    return new Date(tokenExpiry.value) > new Date()
  })

  const isTokenExpiringSoon = computed(() => {
    if (!tokenExpiry.value) return true
    const expiryDate = new Date(tokenExpiry.value)
    const now = new Date()
    const fiveMinutes = 5 * 60 * 1000
    return (expiryDate - now) < fiveMinutes
  })

  function setTokens(access, refresh, expiresIn) {
    accessToken.value = access
    refreshToken.value = refresh

    const expiry = new Date()
    expiry.setSeconds(expiry.getSeconds() + expiresIn)
    tokenExpiry.value = expiry.toISOString()

    localStorage.setItem('sky_access_token', access)
    localStorage.setItem('sky_refresh_token', refresh)
    localStorage.setItem('sky_token_expiry', tokenExpiry.value)
  }

  function setSubscriptionKey(key) {
    subscriptionKey.value = key
    localStorage.setItem('sky_subscription_key', key)
  }

  function clearAuth() {
    accessToken.value = null
    refreshToken.value = null
    tokenExpiry.value = null
    subscriptionKey.value = null

    localStorage.removeItem('sky_access_token')
    localStorage.removeItem('sky_refresh_token')
    localStorage.removeItem('sky_token_expiry')
    localStorage.removeItem('sky_subscription_key')
  }

  function getAuthHeaders() {
    return {
      'Authorization': `Bearer ${accessToken.value}`,
      'Bb-Api-Subscription-Key': subscriptionKey.value
    }
  }

  return {
    accessToken,
    refreshToken,
    tokenExpiry,
    subscriptionKey,
    isAuthenticated,
    isTokenExpiringSoon,
    setTokens,
    setSubscriptionKey,
    clearAuth,
    getAuthHeaders
  }
})
