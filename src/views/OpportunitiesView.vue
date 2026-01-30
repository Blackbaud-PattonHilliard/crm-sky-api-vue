<script setup>
import { ref } from 'vue'

const loading = ref(false)
const opportunities = ref([])

const headers = [
  { title: 'Prospect', key: 'prospect', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Ask Amount', key: 'askAmount', sortable: true },
  { title: 'Expected Date', key: 'expectedDate', sortable: true },
  { title: 'Fundraiser', key: 'fundraiser', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const pipelineStats = ref([
  { stage: 'Identification', count: 0, value: '$0' },
  { stage: 'Qualification', count: 0, value: '$0' },
  { stage: 'Cultivation', count: 0, value: '$0' },
  { stage: 'Solicitation', count: 0, value: '$0' },
  { stage: 'Stewardship', count: 0, value: '$0' }
])
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Opportunities</h1>
        <p class="text-body-2 text-medium-emphasis">
          Track and manage prospect opportunities
        </p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus">
        Add Opportunity
      </v-btn>
    </div>

    <!-- Pipeline Overview -->
    <v-card class="mb-6">
      <v-card-title>Pipeline Overview</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(stage, index) in pipelineStats"
            :key="stage.stage"
            cols="12"
            sm="6"
            md
          >
            <div class="text-center">
              <v-chip
                :color="['info', 'primary', 'warning', 'success', 'secondary'][index]"
                size="small"
                class="mb-2"
              >
                {{ stage.stage }}
              </v-chip>
              <div class="text-h5 font-weight-bold">{{ stage.count }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ stage.value }}</div>
            </div>
            <v-divider v-if="index < pipelineStats.length - 1" vertical class="d-none d-md-block" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Filters -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              label="Search opportunities"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Status"
              :items="['All', 'Active', 'Closed Won', 'Closed Lost']"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Fundraiser"
              :items="['All Fundraisers']"
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

    <!-- Opportunities Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="opportunities"
        :loading="loading"
        hover
      >
        <template #no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-chart-timeline-variant" size="64" color="grey-lighten-1" />
            <div class="text-h6 mt-4">No opportunities found</div>
            <div class="text-body-2 text-medium-emphasis">
              Add an opportunity to start tracking prospects
            </div>
          </div>
        </template>

        <template #item.status="{ value }">
          <v-chip :color="value === 'Active' ? 'success' : 'grey'" size="small">
            {{ value }}
          </v-chip>
        </template>

        <template #item.askAmount="{ value }">
          <span class="font-weight-medium">{{ value }}</span>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-eye" variant="text" size="small" />
          <v-btn icon="mdi-pencil" variant="text" size="small" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
