import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: 'Dashboard', icon: 'mdi-view-dashboard' }
  },
  {
    path: '/constituents',
    name: 'Constituents',
    component: () => import('@/views/ConstituentsView.vue'),
    meta: { title: 'Constituents', icon: 'mdi-account-group' }
  },
  {
    path: '/revenue',
    name: 'Revenue',
    component: () => import('@/views/RevenueView.vue'),
    meta: { title: 'Revenue', icon: 'mdi-cash-multiple' }
  },
  {
    path: '/fundraising',
    name: 'Fundraising',
    component: () => import('@/views/FundraisingView.vue'),
    meta: { title: 'Fundraising', icon: 'mdi-hand-heart' }
  },
  {
    path: '/opportunities',
    name: 'Opportunities',
    component: () => import('@/views/OpportunitiesView.vue'),
    meta: { title: 'Opportunities', icon: 'mdi-chart-timeline-variant' }
  },
  {
    path: '/interactions',
    name: 'Interactions',
    component: () => import('@/views/InteractionsView.vue'),
    meta: { title: 'Interactions', icon: 'mdi-message-text' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: 'Settings', icon: 'mdi-cog' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Home'} | CRM SKY API`
  next()
})

export default router
