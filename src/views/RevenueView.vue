<script setup>
import { ref } from 'vue'

const loading = ref(false)
const gifts = ref([])
const dateRange = ref([])

const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Constituent', key: 'constituent', sortable: true },
  { title: 'Amount', key: 'amount', sortable: true },
  { title: 'Type', key: 'type', sortable: true },
  { title: 'Campaign', key: 'campaign', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const summaryStats = ref([
  { label: 'Total Revenue', value: '$0.00', icon: 'mdi-cash', color: 'success' },
  { label: 'Gift Count', value: '0', icon: 'mdi-gift', color: 'primary' },
  { label: 'Avg Gift', value: '$0.00', icon: 'mdi-chart-line', color: 'info' }
])
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Revenue</h1>
        <p class="text-body-2 text-medium-emphasis">
          View and manage gifts and revenue data
        </p>
      </div>
      <v-btn color="success" prepend-icon="mdi-plus">
        Record Gift
      </v-btn>
    </div>

    <!-- Summary Stats -->
    <v-row class="mb-6">
      <v-col
        v-for="stat in summaryStats"
        :key="stat.label"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar :color="stat.color" size="48" class="mr-4">
              <v-icon :icon="stat.icon" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ stat.label }}</div>
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
              label="Search gifts"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Gift Type"
              :items="['All', 'Cash', 'Check', 'Credit Card', 'Stock', 'In-Kind']"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Campaign"
              :items="['All Campaigns']"
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

    <!-- Gifts Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="gifts"
        :loading="loading"
        hover
      >
        <template #no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-cash-multiple" size="64" color="grey-lighten-1" />
            <div class="text-h6 mt-4">No gifts found</div>
            <div class="text-body-2 text-medium-emphasis">
              Record a gift or adjust your filters
            </div>
          </div>
        </template>

        <template #item.amount="{ value }">
          <span class="font-weight-medium text-success">{{ value }}</span>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-eye" variant="text" size="small" />
          <v-btn icon="mdi-pencil" variant="text" size="small" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
