<template>
    <section class="Analitics">
        <filters :title="pageTitle"/>
        <statistic />
        <graphics />
        <stationForAnalitics />
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/analitics/analitics.scss';
    @import '@/assets/styles/pages/station_controle/stationControle.scss';
</style>

<script>
// the import vue component
import statistic from '../components/reused/page_components/Statistic.vue';
import graphics from '../components/reused/page_components/Graphics.vue';
import filters from '../components/reused/page_components/Filter.vue';
import stationForAnalitics from '@/components/reused/page_components/StationForAnalitics.vue';

export default {
    data: () => ({
        pageTitle: 'Аналитика',
    }),
    
    components: {
        filters,
        statistic,
        graphics,
        stationForAnalitics
    },

    mounted () {
        this.pageTitle =  this.$i18n.locale === 'ru' ? 'Аналитика' : 'Analitic'
    }
}
</script>