<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const theme = useTheme()
const authStore = useAuthStore()

const drawer = ref(true)
const rail = ref(false)

const navItems = computed(() => {
  return router.getRoutes()
    .filter(r => r.meta?.icon)
    .map(r => ({
      title: r.meta.title,
      icon: r.meta.icon,
      to: r.path
    }))
})

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const isDark = computed(() => theme.global.current.value.dark)
</script>

<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="primary"
      theme="dark"
    >
      <v-list-item
        :prepend-icon="rail ? 'mdi-menu' : undefined"
        nav
        @click="rail = !rail"
      >
        <template v-if="!rail">
          <v-list-item-title class="text-h6 font-weight-bold">
            CRM SKY API
          </v-list-item-title>
          <v-list-item-subtitle>
            Blackbaud Integration
          </v-list-item-subtitle>
        </template>
        <template #append>
          <v-btn
            v-if="!rail"
            icon="mdi-chevron-left"
            variant="text"
            size="small"
            @click.stop="rail = true"
          />
        </template>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list nav density="compact">
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="route.path === item.to"
          rounded="lg"
          class="my-1"
        />
      </v-list>

      <template #append>
        <v-divider />
        <v-list nav density="compact">
          <v-list-item
            :prepend-icon="authStore.isAuthenticated ? 'mdi-cloud-check' : 'mdi-cloud-off-outline'"
            :title="authStore.isAuthenticated ? 'Connected' : 'Not Connected'"
            :subtitle="rail ? undefined : 'SKY API Status'"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar flat color="background" elevation="1">
      <v-app-bar-title>
        <span class="text-h6">{{ route.meta.title }}</span>
      </v-app-bar-title>

      <template #append>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          @click="toggleTheme"
        />
        <v-btn
          icon="mdi-bell-outline"
          variant="text"
        />
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              icon="mdi-account-circle"
              variant="text"
              v-bind="props"
            />
          </template>
          <v-list density="compact" min-width="200">
            <v-list-item
              prepend-icon="mdi-account"
              title="Profile"
            />
            <v-list-item
              prepend-icon="mdi-cog"
              title="Settings"
              to="/settings"
            />
            <v-divider />
            <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              @click="authStore.clearAuth()"
            />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
