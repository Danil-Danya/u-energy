<template>
    <section class="station-controle">
        <filters :title="pageTitle"/>
        <station />
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/station_controle/stationControle.scss'
</style>

<script>
// the import vue component
import filters from '../components/reused/page_components/Filter.vue';
import station from '../components/reused/page_components/Station.vue';

export default {
    data: () => ({
        pageTitle: 'Управление станциями',
    }),
    
    components: {
        filters,
        station
    },

    mounted () {
        this.pageTitle =  this.$i18n.locale === 'ru' ? 'Управление станциями' : 'Station control';
    }
}
</script>