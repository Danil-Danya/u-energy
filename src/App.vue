

<template>
  <div :class="`${layout}`">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>



<script>
import LoginLayout from './layouts/LoginLayout.vue';
import CRMLayout from './layouts/CRMLayout.vue';
import SettingsLayout from './layouts/SettingsLayout.vue';

export default {
  computed: {
    layout () {
      return (`${ this.$route.meta.layout || 'CRM' }-layout`);
    }
  },
  
  components: {
    LoginLayout,
    CRMLayout,
    SettingsLayout
  },

  mounted () {
    if (!localStorage.getItem('locale')) {
      localStorage.setItem('locale', 'ru')
    }

    this.$i18n.locale = localStorage.getItem('locale');
  }
}

</script>