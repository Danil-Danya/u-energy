<template>
    <section class="client-base">
        <filters :title="pageTitle"/>
        <graphics />
        <clients />
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/analitics/analitics.scss'
</style>

<script>
// the import vue component
import statistic from '../components/reused/page_components/Statistic.vue';
import graphics from '../components/reused/page_components/Graphics.vue';
import clients from '../components/reused/page_components/Clients.vue';
import filters from '../components/reused/page_components/Filter.vue';

export default {
    data: () => ({
        pageTitle: 'Клиентская база',
    }),
    
    components: {
        filters,
        statistic,
        graphics,
        clients,
    },

    mounted () {
        this.pageTitle =  this.$i18n.locale === 'ru' ? 'Клиентская база' : 'Client base'
    }
}
</script>