import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// inf-apitr base URL - update this to your environment
const INF_APITR_BASE_URL = localStorage.getItem('inf_apitr_url') || 'https://inf-pusa01.app.blackbaud.net/apitr'

const infApitr = axios.create({
  baseURL: INF_APITR_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth headers
infApitr.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.subscriptionKey) {
      config.headers['Bb-Api-Subscription-Key'] = authStore.subscriptionKey
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Data Form Save API
 *
 * Calls inf-apitr to execute AppFx DataFormSave operations
 */
export const dataFormApi = {
  /**
   * Save a data form (add or edit)
   *
   * @param {Object} params - The data form save parameters
   * @param {string} params.formId - The data form GUID (required)
   * @param {string} [params.formName] - The data form name (optional)
   * @param {string} [params.id] - The record ID for edit operations (optional, omit for add)
   * @param {Array<{id: string, value: any, valueTranslation?: string}>} params.values - Field values
   * @param {Object} [params.clientAppInfo] - Client application info
   * @param {string} [params.clientAppInfo.reDatabaseToUse] - RE database name
   * @param {number} [params.clientAppInfo.timeOutSeconds] - Timeout in seconds
   * @returns {Promise} - Axios response promise
   */
  save: (params) => {
    const payload = buildDataFormSavePayload(params)
    return infApitr.post('/v1/dataformsave', payload)
  },

  /**
   * Add a new record via data form
   */
  add: (formId, values, clientAppInfo = {}) => {
    return dataFormApi.save({
      formId,
      values,
      clientAppInfo
    })
  },

  /**
   * Edit an existing record via data form
   */
  edit: (formId, recordId, values, clientAppInfo = {}) => {
    return dataFormApi.save({
      formId,
      id: recordId,
      values,
      clientAppInfo
    })
  }
}

/**
 * Build the DataFormSaveContract payload
 */
function buildDataFormSavePayload(params) {
  const payload = {
    form_id: params.formId
  }

  if (params.formName) {
    payload.form_name = params.formName
  }

  if (params.id) {
    payload.id = params.id
  }

  // Build data_form_item with values
  payload.data_form_item = {
    values: params.values.map(v => ({
      id: v.id,
      value: v.value,
      ...(v.valueTranslation && { value_translation: v.valueTranslation })
    }))
  }

  // Build client_app_info if provided
  if (params.clientAppInfo) {
    payload.client_app_info = {}
    if (params.clientAppInfo.reDatabaseToUse) {
      payload.client_app_info.re_database_to_use = params.clientAppInfo.reDatabaseToUse
    }
    if (params.clientAppInfo.timeOutSeconds) {
      payload.client_app_info.time_out_seconds = params.clientAppInfo.timeOutSeconds
    }
  }

  return payload
}

// ============================================================================
// SAMPLE USAGE EXAMPLES
// ============================================================================

/**
 * Example: Add a new constituent interaction via data form save
 *
 * Replace the form_id GUID with a valid DataFormSave GUID from your CRM
 */
export async function sampleDataFormSaveCall() {
  const formId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' // Replace with valid GUID

  const values = [
    {
      id: 'CONSTITUENTID',
      value: '00000000-0000-0000-0000-000000000001' // Constituent GUID
    },
    {
      id: 'INTERACTIONTYPECODEID',
      value: '00000000-0000-0000-0000-000000000002' // Interaction type GUID
    },
    {
      id: 'EXPECTEDDATE',
      value: '2025-01-15'
    },
    {
      id: 'OBJECTIVE',
      value: 'Follow up call regarding annual fund appeal',
      valueTranslation: 'Follow up call regarding annual fund appeal' // For multi-language
    },
    {
      id: 'COMMENT',
      value: 'Constituent expressed interest in increasing gift amount'
    },
    {
      id: 'COMPLETED',
      value: false
    }
  ]

  const clientAppInfo = {
    reDatabaseToUse: '', // Leave empty to use default
    timeOutSeconds: 30
  }

  try {
    const response = await dataFormApi.save({
      formId,
      values,
      clientAppInfo
    })
    console.log('DataFormSave successful:', response.data)
    return response.data
  } catch (error) {
    console.error('DataFormSave failed:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Example: Edit an existing record
 */
export async function sampleDataFormEditCall() {
  const formId = 'b2c3d4e5-f6a7-8901-bcde-f23456789012' // Replace with valid GUID
  const recordId = 'c3d4e5f6-a7b8-9012-cdef-345678901234' // Existing record GUID

  const values = [
    {
      id: 'DESCRIPTION',
      value: 'Updated description text'
    },
    {
      id: 'STATUS',
      value: 1 // Numeric status code
    }
  ]

  try {
    const response = await dataFormApi.edit(formId, recordId, values, {
      timeOutSeconds: 60
    })
    console.log('DataFormSave (edit) successful:', response.data)
    return response.data
  } catch (error) {
    console.error('DataFormSave (edit) failed:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Get/Set the inf-apitr base URL
 */
export const infApitrConfig = {
  getBaseUrl: () => infApitr.defaults.baseURL,
  setBaseUrl: (url) => {
    infApitr.defaults.baseURL = url
    localStorage.setItem('inf_apitr_url', url)
  }
}

export default infApitr
