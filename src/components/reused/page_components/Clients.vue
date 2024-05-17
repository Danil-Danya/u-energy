<template>
    <section class="clients">
        <div class="clients__container">
            <div class="clients__bar">
                <div class="clients__bar-left">
                    <h2 class="title clients__title">{{ $t("Analytics.Clients.title") }}</h2>
                    <span class="clients__number">{{ getUsers.total }}</span>
                </div>
                <div class="clients__bar-right">
                    <div class="clients__form search__form">
                        <input type="text" class="clients__input search__form-input" :placeholder="$t('Analytics.Clients.search')" v-model="search">
                        <img src="@/assets/images/icons/clients/search.svg" alt="Icon" class="search__form-icon">
                    </div>
                    <div class="clients__bar-button-container">
                        <button class="clients__bar-button" v-for="button in clientsFilterButton" :key="button">
                            <img :src="button.icon" alt="Icon" class="clients__bar-button-icon">
                            <p class="clients__bar-button-text">{{ button.text }}</p>
                        </button>
                    </div>
                </div>
            </div>
            <clientsForAll :search="search"/>
        </div>
    </section>
</template>

<script>
import clientsForAll from './ClientsForAll.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        clientsFilterButton: [
            {
                icon: require('@/assets/images/icons/clients/sort.svg'),
                text: 'Сортировать'
            },
            {
                icon: require('@/assets/images/icons/clients/download.svg'),
                text: 'Экспорт'
            },
        ],

        search: ''
    }),

    computed: {
        ...mapGetters(['getUsers'])
    },

    methods: {
        ...mapActions(['fetchUsers']),
    },

    components: {
        clientsForAll
    },

    mounted () {
        this.clientsFilterButton[0].text = this.$t('Analytics.Clients.sort');
        this.clientsFilterButton[1].text = this.$t('Analytics.Clients.export');
    }
}

</script>

