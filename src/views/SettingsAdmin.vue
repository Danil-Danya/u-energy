<template>
    <div class="admin">
        <Admin />
        <AdminList />
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_admin/admin.scss';
</style>

<script>
import Admin from '@/components/pages/settings_admin/Admin.vue';
import AdminList from '@/components/pages/settings_admin/AdminList.vue';

export default {
    components: {
        Admin,
        AdminList
    }
}

</script>