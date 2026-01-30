<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const subscriptionKey = ref(authStore.subscriptionKey || '')
const clientId = ref(localStorage.getItem('sky_client_id') || '')
const clientSecret = ref(localStorage.getItem('sky_client_secret') || '')
const redirectUri = ref(localStorage.getItem('sky_redirect_uri') || window.location.origin + '/auth/callback')

const showSecret = ref(false)
const saving = ref(false)
const testingConnection = ref(false)

const isConfigured = computed(() => {
  return subscriptionKey.value && clientId.value && clientSecret.value
})

const saveSettings = () => {
  saving.value = true

  authStore.setSubscriptionKey(subscriptionKey.value)
  localStorage.setItem('sky_client_id', clientId.value)
  localStorage.setItem('sky_client_secret', clientSecret.value)
  localStorage.setItem('sky_redirect_uri', redirectUri.value)

  setTimeout(() => {
    saving.value = false
  }, 500)
}

const initiateOAuth = () => {
  // TODO: Implement OAuth flow
  const authUrl = new URL('https://oauth2.sky.blackbaud.com/authorization')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('client_id', clientId.value)
  authUrl.searchParams.set('redirect_uri', redirectUri.value)
  authUrl.searchParams.set('state', crypto.randomUUID())

  window.location.href = authUrl.toString()
}

const testConnection = async () => {
  testingConnection.value = true
  // TODO: Implement connection test
  setTimeout(() => {
    testingConnection.value = false
  }, 2000)
}

const disconnect = () => {
  authStore.clearAuth()
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">Settings</h1>
      <p class="text-body-2 text-medium-emphasis">
        Configure your SKY API connection settings
      </p>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <!-- API Credentials -->
        <v-card class="mb-6">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-key" class="mr-2" />
            API Credentials
          </v-card-title>
          <v-card-text>
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
            >
              Get your API credentials from the
              <a href="https://developer.blackbaud.com/skyapi" target="_blank" class="text-info">
                Blackbaud Developer Portal
              </a>
            </v-alert>

            <v-text-field
              v-model="subscriptionKey"
              label="Subscription Key (Bb-Api-Subscription-Key)"
              variant="outlined"
              class="mb-4"
              hint="Your primary or secondary subscription key from the developer portal"
              persistent-hint
            />

            <v-text-field
              v-model="clientId"
              label="Application ID (Client ID)"
              variant="outlined"
              class="mb-4"
              hint="The Application ID from your registered SKY API application"
              persistent-hint
            />

            <v-text-field
              v-model="clientSecret"
              label="Application Secret (Client Secret)"
              :type="showSecret ? 'text' : 'password'"
              variant="outlined"
              class="mb-4"
              hint="The primary or secondary secret from your registered application"
              persistent-hint
              :append-inner-icon="showSecret ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showSecret = !showSecret"
            />

            <v-text-field
              v-model="redirectUri"
              label="Redirect URI"
              variant="outlined"
              hint="The OAuth callback URL registered with your application"
              persistent-hint
            />
          </v-card-text>
          <v-card-actions class="px-4 pb-4">
            <v-btn
              color="primary"
              :loading="saving"
              @click="saveSettings"
            >
              Save Settings
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Connection Status -->
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-cloud-sync" class="mr-2" />
            Connection Status
          </v-card-title>
          <v-card-text>
            <v-alert
              :type="authStore.isAuthenticated ? 'success' : 'warning'"
              variant="tonal"
              class="mb-4"
            >
              <template #title>
                {{ authStore.isAuthenticated ? 'Connected to SKY API' : 'Not Connected' }}
              </template>
              <template v-if="authStore.isAuthenticated">
                Token expires: {{ new Date(authStore.tokenExpiry).toLocaleString() }}
              </template>
              <template v-else>
                Configure your credentials above and connect to SKY API
              </template>
            </v-alert>

            <div v-if="authStore.isAuthenticated" class="d-flex ga-2">
              <v-btn
                color="primary"
                variant="tonal"
                :loading="testingConnection"
                @click="testConnection"
              >
                Test Connection
              </v-btn>
              <v-btn
                color="error"
                variant="tonal"
                @click="disconnect"
              >
                Disconnect
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                color="primary"
                :disabled="!isConfigured"
                @click="initiateOAuth"
              >
                Connect to SKY API
              </v-btn>
              <p v-if="!isConfigured" class="text-body-2 text-medium-emphasis mt-2">
                Please save your API credentials first
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Help Card -->
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-help-circle" class="mr-2" />
            Need Help?
          </v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                href="https://developer.blackbaud.com/skyapi/docs/getting-started"
                target="_blank"
                prepend-icon="mdi-rocket-launch"
                title="Getting Started Guide"
              />
              <v-list-item
                href="https://developer.blackbaud.com/skyapi/docs/authorization"
                target="_blank"
                prepend-icon="mdi-shield-key"
                title="Authorization Guide"
              />
              <v-list-item
                href="https://developer.blackbaud.com/skyapi/products/crm"
                target="_blank"
                prepend-icon="mdi-api"
                title="CRM API Reference"
              />
              <v-list-item
                href="https://developer.blackbaud.com/skyapi/support/faq"
                target="_blank"
                prepend-icon="mdi-frequently-asked-questions"
                title="FAQ"
              />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
