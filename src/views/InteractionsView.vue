<script setup>
import { ref } from 'vue'

const loading = ref(false)
const interactions = ref([])

const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Constituent', key: 'constituent', sortable: true },
  { title: 'Type', key: 'type', sortable: true },
  { title: 'Summary', key: 'summary', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const interactionTypes = [
  'All Types',
  'Meeting',
  'Phone Call',
  'Email',
  'Event',
  'Task',
  'Note'
]
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Interactions</h1>
        <p class="text-body-2 text-medium-emphasis">
          Log and track constituent interactions
        </p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus">
        Log Interaction
      </v-btn>
    </div>

    <!-- Quick Stats -->
    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar color="primary" size="48" class="mr-4">
              <v-icon icon="mdi-calendar-today" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">0</div>
              <div class="text-body-2 text-medium-emphasis">Today</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar color="warning" size="48" class="mr-4">
              <v-icon icon="mdi-calendar-week" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">0</div>
              <div class="text-body-2 text-medium-emphasis">This Week</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar color="info" size="48" class="mr-4">
              <v-icon icon="mdi-clock-outline" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">0</div>
              <div class="text-body-2 text-medium-emphasis">Pending</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar color="success" size="48" class="mr-4">
              <v-icon icon="mdi-check-circle" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">0</div>
              <div class="text-body-2 text-medium-emphasis">Completed</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              label="Search interactions"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Type"
              :items="interactionTypes"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Status"
              :items="['All', 'Pending', 'Completed', 'Cancelled']"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="primary" block :loading="loading">
              Filter
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Interactions Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="interactions"
        :loading="loading"
        hover
      >
        <template #no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-message-text" size="64" color="grey-lighten-1" />
            <div class="text-h6 mt-4">No interactions found</div>
            <div class="text-body-2 text-medium-emphasis">
              Log an interaction to track constituent engagement
            </div>
          </div>
        </template>

        <template #item.type="{ value }">
          <v-chip size="small" variant="tonal">
            {{ value }}
          </v-chip>
        </template>

        <template #item.status="{ value }">
          <v-chip
            :color="value === 'Completed' ? 'success' : value === 'Pending' ? 'warning' : 'grey'"
            size="small"
          >
            {{ value }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-eye" variant="text" size="small" />
          <v-btn icon="mdi-pencil" variant="text" size="small" />
          <v-btn icon="mdi-delete" variant="text" size="small" color="error" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
