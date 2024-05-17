<template>
    <div class="crm__container">
        <sidebar />

        <div class="crm__content">
            <div class="container">
                <navbar v-if="type != 'SETTINGS'"/>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/layout/sidebar.scss';
</style>

<script>
import sidebar from "@/components/layout/Sidebar.vue";
import navbar from "@/components/layout/Navbar.vue";

export default {
    components: {
        sidebar,
        navbar
    },
}

</script>