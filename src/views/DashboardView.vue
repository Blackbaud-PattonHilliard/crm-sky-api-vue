<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const stats = ref([
  { title: 'Total Constituents', value: '—', icon: 'mdi-account-group', color: 'primary' },
  { title: 'Revenue YTD', value: '—', icon: 'mdi-cash-multiple', color: 'success' },
  { title: 'Active Campaigns', value: '—', icon: 'mdi-bullhorn', color: 'warning' },
  { title: 'Open Opportunities', value: '—', icon: 'mdi-chart-timeline-variant', color: 'info' }
])

const recentActivity = ref([
  { type: 'info', text: 'Connect to SKY API to view live data', time: 'Now' }
])
</script>

<template>
  <div>
    <!-- Connection Alert -->
    <v-alert
      v-if="!authStore.isAuthenticated"
      type="warning"
      variant="tonal"
      class="mb-6"
      closable
    >
      <template #title>Not Connected to SKY API</template>
      <template #text>
        Go to <router-link to="/settings" class="text-warning font-weight-bold">Settings</router-link>
        to configure your SKY API credentials and connect.
      </template>
    </v-alert>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar :color="stat.color" size="56" class="mr-4">
              <v-icon :icon="stat.icon" color="white" size="28" />
            </v-avatar>
            <div>
              <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ stat.title }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions & Recent Activity -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-lightning-bolt" class="mr-2" />
            Quick Actions
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-account-plus"
                  to="/constituents"
                  class="mb-3"
                >
                  Add Constituent
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="success"
                  variant="tonal"
                  prepend-icon="mdi-cash-plus"
                  to="/revenue"
                  class="mb-3"
                >
                  Record Gift
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="warning"
                  variant="tonal"
                  prepend-icon="mdi-message-plus"
                  to="/interactions"
                >
                  Log Interaction
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="info"
                  variant="tonal"
                  prepend-icon="mdi-magnify"
                  to="/constituents"
                >
                  Search
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-history" class="mr-2" />
            Recent Activity
          </v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="(activity, index) in recentActivity"
                :key="index"
              >
                <template #prepend>
                  <v-icon
                    :icon="activity.type === 'info' ? 'mdi-information' : 'mdi-check-circle'"
                    :color="activity.type === 'info' ? 'info' : 'success'"
                    size="small"
                  />
                </template>
                <v-list-item-title>{{ activity.text }}</v-list-item-title>
                <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- API Documentation Link -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-text class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-icon icon="mdi-book-open-variant" class="mr-3" color="primary" />
              <div>
                <div class="font-weight-medium">SKY API Documentation</div>
                <div class="text-body-2 text-medium-emphasis">
                  Learn more about Blackbaud CRM SKY API endpoints
                </div>
              </div>
            </div>
            <v-btn
              color="primary"
              variant="text"
              href="https://developer.blackbaud.com/skyapi/products/crm"
              target="_blank"
              append-icon="mdi-open-in-new"
            >
              View Docs
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
