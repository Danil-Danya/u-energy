import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const env = import.meta.env;

const auth = localStorage.getItem('access');

const router = createRouter({
  linkActiveClass: 'link-active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        layout: 'CRM',
        auth: true
      }
    },
    {
      path: '/analitics',
      name: 'analitics',
      component: () => import('../views/Analitics.vue'),
      meta: {
        layout: 'CRM',
        auth: true
      }
    },
    {
      path: '/client-base',
      name: 'client base',
      component: () => import('../views/ClientBase.vue'),
      meta: {
        layout: 'CRM',
        auth: true
      }
    },
    {
      path: '/station-controle',
      name: 'station controle',
      component: () => import('../views/StationControle.vue'),
      meta: {
        layout: 'CRM',
        auth: true
      }
    },
    {
      path: '/settings/all',
      name: 'settings all',
      component: () => import('../views/SettingsAll.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/payments',
      name: 'settings payments',
      component: () => import('../views/SettingsPayments.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/promotions-and-discounts',
      name: 'settings promotions and discounts',
      component: () => import('../views/SettingsPromotionsAndDiscounts.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/downtime',
      name: 'settings downtime',
      component: () => import('../views/SettingsDownTime.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/notifications',
      name: 'settings notification',
      component: () => import('../views/SettingsNotifications.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/security',
      name: 'settings security',
      component: () => import('../views/SettingsSecurity.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/backup',
      name: 'settings backup',
      component: () => import('../views/SettingsBackup.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/admin',
      name: 'settings admin',
      component: () => import('../views/SettingsAdmin.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/settings/integration',
      name: 'settings integration',
      component: () => import('../views/SettingsIntegration.vue'),
      meta: {
        layout: 'settings',
        auth: true
      }
    },
    {
      path: '/clients/user-menagement',
      name: 'user menagement',
      component: () => import('../views/UserMenagement.vue'),
      meta: {
        layout: 'CRM',
        auth: true
      }
    },
    // {
    //   path: '/settings/all',
    //   name: 'settings',
    //   component: () => import('../views/Dashboard.vue'),
    //   meta: {
    //     layout: 'settings'
    //   }
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        layout: 'login',
        auth: false
      }
    },
    {
      path: '/',
      name: 'index',
      redirect: checkTokenValidity ? '/dashboard' : '/login',
    },
  ]
});

async function checkTokenValidity() {
  try {
    const response = await axios.get(`${env.VITE_APP_HOST_LINK}/v1/dashboard/me/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    });

    const profile = response.data;

    localStorage.setItem('firstName', profile.first_name);
    localStorage.setItem('lastName', profile.last_name);

    return true;
  } catch (error) {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', 'ru')
  }
  if (to.matched.some(record => record.meta.auth)) {
    const isAuthenticated = await checkTokenValidity();
    !isAuthenticated ? next('/login') : next();
  } 
  else {
    next();
    console.log('admin');
  }
});



export default router
