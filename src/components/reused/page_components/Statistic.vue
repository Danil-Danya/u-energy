<template>
    <section class="statistics">
        <div class="statistics__container">
            <div class="statistics__item" v-for="(item, index) in items" :key="item" v-if="getTotal">
                <div class="statistics__item-content">
                    <img :src="imgItems[index]" alt="Icon" class="statistcs__icon">
                    <h2 class="statistics__title">{{ item.title }}</h2>
                    <p class="statistics__text">{{ $t("Analytics.Statistics.day") }}</p>
                    <h2 class="statistics__number">{{ item.number }} {{item.unit}}</h2>
                </div>
            </div>
            <Skeleton v-for="skelet in 3" :key="skelet" v-else/>
        </div>
    </section>
</template>

<script>
import Skeleton from '../preloaders/Skeleton.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        items: [
            {
                icon: require('@/assets/images/icons/statistics/cach.svg'),
                title: 'Баланс',
                number: '0',
                unit: 'Сум'
            },
            {
                icon: require('@/assets/images/icons/statistics/user.svg'),
                title: 'Зарегистрированно',
                number: 0,
            },
            {
                icon: require('@/assets/images/icons/statistics/energy.svg'),
                title: 'Потребление',
                number: 0,
                unit: 'кВт'
            },
        ],

        imgItems: [
            require('@/assets/images/icons/statistics/cach.svg'),
            require('@/assets/images/icons/statistics/user.svg'),
            require('@/assets/images/icons/statistics/energy.svg')
        ],

        imgItemsForAnalitics: [
            require('@/assets/images/icons/statistics/cach.svg'),
            require('@/assets/images/icons/statistics/user.svg'),
            require('@/assets/images/icons/statistics/energy.svg'),
            require('@/assets/images/icons/statistics/revenue.svg'),
            require('@/assets/images/icons/statistics/consumption.svg'),
            require('@/assets/images/icons/statistics/profit.svg'),
        ]
    }),

    components: {
        Skeleton
    },
    
    computed: {
        ...mapGetters(['getTotal'])
    },

    methods: {
        ...mapActions(['fetchTotal']),
    },

    async mounted () {
        await this.fetchTotal();

        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.items = messages[lang].Analytics.Statistics.items;

        console.log(this.getTotal);

        if (this.$route.name === 'analitics') {
            this.items = messages[lang].Analytics.Statistics.moreItems;
            this.imgItems = this.imgItemsForAnalitics;

            // this.items[3].number = this.getTotal.total_balance;
            // this.items[4].number = this.getTotal.total_balance;
            // this.items[5].number = this.getTotal.total_balance;
        }

        this.items[0].number = this.getTotal.total_balance;
        this.items[1].number = this.getTotal.total_users;
        this.items[2].number = this.getTotal.total_used_energy;
    }
}

</script>