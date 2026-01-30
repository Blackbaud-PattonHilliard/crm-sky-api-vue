import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const BASE_URL = 'https://api.sky.blackbaud.com'

const skyApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth headers
skyApi.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }
    if (authStore.subscriptionKey) {
      config.headers['Bb-Api-Subscription-Key'] = authStore.subscriptionKey
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
skyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    if (error.response?.status === 401) {
      // Token expired - could implement auto-refresh here
      console.warn('SKY API: Unauthorized - token may be expired')
    }

    if (error.response?.status === 429) {
      console.warn('SKY API: Rate limited - too many requests')
    }

    return Promise.reject(error)
  }
)

// Constituent API
export const constituentApi = {
  search: (params) => skyApi.get('/constituent/v1/constituents/search', { params }),
  get: (id) => skyApi.get(`/constituent/v1/constituents/${id}`),
  create: (data) => skyApi.post('/constituent/v1/constituents', data),
  update: (id, data) => skyApi.patch(`/constituent/v1/constituents/${id}`, data),
  delete: (id) => skyApi.delete(`/constituent/v1/constituents/${id}`),

  // Addresses
  getAddresses: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/addresses`),
  createAddress: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/addresses`, data),
  updateAddress: (addressId, data) => skyApi.patch(`/constituent/v1/addresses/${addressId}`, data),
  deleteAddress: (addressId) => skyApi.delete(`/constituent/v1/addresses/${addressId}`),

  // Emails
  getEmails: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/emailaddresses`),
  createEmail: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/emailaddresses`, data),
  updateEmail: (emailId, data) => skyApi.patch(`/constituent/v1/emailaddresses/${emailId}`, data),
  deleteEmail: (emailId) => skyApi.delete(`/constituent/v1/emailaddresses/${emailId}`),

  // Phones
  getPhones: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/phones`),
  createPhone: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/phones`, data),
  updatePhone: (phoneId, data) => skyApi.patch(`/constituent/v1/phones/${phoneId}`, data),
  deletePhone: (phoneId) => skyApi.delete(`/constituent/v1/phones/${phoneId}`),

  // Interactions
  getInteractions: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/interactions`),
  createInteraction: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/interactions`, data),
  getInteraction: (interactionId) => skyApi.get(`/constituent/v1/interactions/${interactionId}`),
  updateInteraction: (interactionId, data) => skyApi.patch(`/constituent/v1/interactions/${interactionId}`, data),
  deleteInteraction: (interactionId) => skyApi.delete(`/constituent/v1/interactions/${interactionId}`),

  // Notes
  getNotes: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/notes`),
  createNote: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/notes`, data),
  updateNote: (noteId, data) => skyApi.patch(`/constituent/v1/notes/${noteId}`, data),
  deleteNote: (noteId) => skyApi.delete(`/constituent/v1/notes/${noteId}`),

  // Appeals
  getAppeals: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/appeals`),
  createAppeal: (constituentId, data) => skyApi.post(`/constituent/v1/constituents/${constituentId}/appeals`, data),

  // Profile
  getProfilePicture: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/profilepicture`),
  getSummaryProfile: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/summaryprofile`),
  getPrimaryContactInfo: (constituentId) => skyApi.get(`/constituent/v1/constituents/${constituentId}/primarycontactinfo`)
}

// Gift API
export const giftApi = {
  list: (params) => skyApi.get('/gift/v1/gifts', { params }),
  get: (id) => skyApi.get(`/gift/v1/gifts/${id}`),
  create: (data) => skyApi.post('/gift/v1/gifts', data),
  update: (id, data) => skyApi.patch(`/gift/v1/gifts/${id}`, data),
  delete: (id) => skyApi.delete(`/gift/v1/gifts/${id}`)
}

// Fundraising API
export const fundraisingApi = {
  // Campaigns
  getCampaigns: (params) => skyApi.get('/fundraising/v1/campaigns', { params }),
  getCampaign: (id) => skyApi.get(`/fundraising/v1/campaigns/${id}`),

  // Appeals
  getAppeals: (params) => skyApi.get('/fundraising/v1/appeals', { params }),
  getAppeal: (id) => skyApi.get(`/fundraising/v1/appeals/${id}`),

  // Funds
  getFunds: (params) => skyApi.get('/fundraising/v1/funds', { params }),
  getFund: (id) => skyApi.get(`/fundraising/v1/funds/${id}`)
}

// Opportunity API
export const opportunityApi = {
  list: (params) => skyApi.get('/opportunity/v1/opportunities', { params }),
  get: (id) => skyApi.get(`/opportunity/v1/opportunities/${id}`),
  create: (data) => skyApi.post('/opportunity/v1/opportunities', data),
  update: (id, data) => skyApi.patch(`/opportunity/v1/opportunities/${id}`, data),
  delete: (id) => skyApi.delete(`/opportunity/v1/opportunities/${id}`)
}

export default skyApi
