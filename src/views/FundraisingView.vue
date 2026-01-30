<script setup>
import { ref } from 'vue'

const activeTab = ref('campaigns')
const loading = ref(false)

const campaigns = ref([])
const appeals = ref([])
const funds = ref([])
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Fundraising</h1>
        <p class="text-body-2 text-medium-emphasis">
          Manage campaigns, appeals, and funds
        </p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus">
        New Campaign
      </v-btn>
    </div>

    <!-- Tabs -->
    <v-card>
      <v-tabs v-model="activeTab" color="primary">
        <v-tab value="campaigns">
          <v-icon icon="mdi-bullhorn" class="mr-2" />
          Campaigns
        </v-tab>
        <v-tab value="appeals">
          <v-icon icon="mdi-email-outline" class="mr-2" />
          Appeals
        </v-tab>
        <v-tab value="funds">
          <v-icon icon="mdi-bank" class="mr-2" />
          Funds
        </v-tab>
      </v-tabs>

      <v-divider />

      <v-tabs-window v-model="activeTab">
        <!-- Campaigns Tab -->
        <v-tabs-window-item value="campaigns">
          <v-card-text>
            <div v-if="campaigns.length === 0" class="text-center py-8">
              <v-icon icon="mdi-bullhorn" size="64" color="grey-lighten-1" />
              <div class="text-h6 mt-4">No campaigns found</div>
              <div class="text-body-2 text-medium-emphasis mb-4">
                Create your first campaign to get started
              </div>
              <v-btn color="primary" prepend-icon="mdi-plus">
                Create Campaign
              </v-btn>
            </div>
            <v-list v-else>
              <v-list-item
                v-for="campaign in campaigns"
                :key="campaign.id"
                :title="campaign.name"
                :subtitle="campaign.description"
              >
                <template #prepend>
                  <v-avatar color="primary">
                    <v-icon icon="mdi-bullhorn" />
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-tabs-window-item>

        <!-- Appeals Tab -->
        <v-tabs-window-item value="appeals">
          <v-card-text>
            <div v-if="appeals.length === 0" class="text-center py-8">
              <v-icon icon="mdi-email-outline" size="64" color="grey-lighten-1" />
              <div class="text-h6 mt-4">No appeals found</div>
              <div class="text-body-2 text-medium-emphasis mb-4">
                Appeals help track your fundraising solicitations
              </div>
              <v-btn color="primary" prepend-icon="mdi-plus">
                Create Appeal
              </v-btn>
            </div>
          </v-card-text>
        </v-tabs-window-item>

        <!-- Funds Tab -->
        <v-tabs-window-item value="funds">
          <v-card-text>
            <div v-if="funds.length === 0" class="text-center py-8">
              <v-icon icon="mdi-bank" size="64" color="grey-lighten-1" />
              <div class="text-h6 mt-4">No funds found</div>
              <div class="text-body-2 text-medium-emphasis mb-4">
                Funds categorize how donations are allocated
              </div>
              <v-btn color="primary" prepend-icon="mdi-plus">
                Create Fund
              </v-btn>
            </div>
          </v-card-text>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>
