<template>
    <div class="settings__container">
        <sidebar />

        <div class="settings__content">
            <div class="container">
                <navbar />
                <div class="settings__content-container">
                    <navbarSettings />
                    <div class="settings__center">
                        <Router-view />
                    </div>
                    <save />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/layout/sidebar.scss';
</style>

<script>
import sidebar from "@/components/layout/Sidebar.vue";
import navbarSettings from "@/components/layout/NavbarSettings.vue";
import navbar from "@/components/layout/Navbar.vue";
import save from '@/components/layout/Save.vue';

export default {
    components: {
        sidebar,
        navbar,
        save,
        navbarSettings
    },
}

</script>