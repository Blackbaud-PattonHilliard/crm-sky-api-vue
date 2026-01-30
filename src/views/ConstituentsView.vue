<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const loading = ref(false)
const constituents = ref([])

const headers = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Type', key: 'type', sortable: true },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'Phone', key: 'phone', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const searchConstituents = async () => {
  // TODO: Implement SKY API search
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Constituents</h1>
        <p class="text-body-2 text-medium-emphasis">
          Manage individuals and organizations in your CRM
        </p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus">
        Add Constituent
      </v-btn>
    </div>

    <!-- Search & Filters -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Search constituents"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              @keyup.enter="searchConstituents"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Type"
              :items="['All', 'Individual', 'Organization']"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              color="primary"
              block
              :loading="loading"
              @click="searchConstituents"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Constituents Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="constituents"
        :loading="loading"
        hover
      >
        <template #no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-account-search" size="64" color="grey-lighten-1" />
            <div class="text-h6 mt-4">No constituents found</div>
            <div class="text-body-2 text-medium-emphasis">
              Search for constituents or add a new one
            </div>
          </div>
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
