<template>
    <section class="dashboard">
        <statistic />
        <graphics />
        <clients />
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/dashboard/dashboard.scss'
</style>

<script>
import statistic from '../components/reused/page_components/Statistic.vue';
import graphics from '../components/reused/page_components/Graphics.vue';
import clients from '../components/reused/page_components/Clients.vue';

export default {
    components: {
        statistic,
        graphics,
        clients
    }
}
</script>