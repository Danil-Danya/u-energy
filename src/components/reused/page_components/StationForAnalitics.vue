<template>
    <div class="station station__analitics">
        <div class="station__container">
            <div class="station__analitics-item" v-for="(item, index) in getStations.results" :key="item" v-if="getStations.results">
                <div class="station__bar">
                    <div class="station__image-container">
                        <img src="@/assets/images/static/stations/station.png" alt="Station" class="station__image">
                    </div>
                    <div class="station__button-container">
                        <a :href="`https://yandex.uz/maps/10335/${item.region.title}/?pt=${item.lon}%2C${item.lat}`" class="station__button">
                            <img src="@/assets/images/icons/stations/location.svg" alt="Icon" class="station__icon">
                        </a>
                        <button class="station__button" @click="toggleIsShowControle(item.id)">
                            <img src="@/assets/images/icons/stations/station.svg" alt="Icon" class="station__icon">
                        </button>
                    </div>
                </div>
                <h2 class="title station__analitics-title">{{ item.title }}</h2>
                <p class="station__text">{{ item.address }}</p>
                <div class="station__analitics-data">
                    <h3 class="station__analitics-price">10.000.000<span class="station__analitics-filter">месяц</span></h3>
                    <div class="station__analitics-different">
                        <h3 class="station__analitics-profit">1.000.000</h3>
                        <span class="station__analitics-consumption">500.000</span>
                    </div>
                </div>
            </div>
            <Skeleton v-for="skelet in 9" :key="skelet" v-else />
        </div>
    </div>
    <div>
        <ControleStationPopup :isShowControle="isShowControle" :stationId="stationId" @toggleIsShowControle="toggleIsShowControle"/>
    </div>
</template>

<script>
import Skeleton from '../preloaders/Skeleton.vue';
import ControleStationPopup from '../popup/ControleStationPopup.vue';;

import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

//const env = import.meta.env;

export default {
    data: () => ({
        price: 0,
        specialPrice: '',
        isShowControle: false,
        isShowEdite: false,
        stationId: 0
    }),

    computed: {
        ...mapGetters(['getStations']),
        ...mapGetters(['getTariffs'])
    },

    components: {
        Skeleton,
        ControleStationPopup,
    },

    methods: {
        ...mapActions(['fetchStations']),
        ...mapActions(['fetchTariffs']),

        toggleIsShowControle (id) {
            this.stationId = !this.isShowControle ? id : 0;
            this.isShowControle = !this.isShowControle;

        },
        toggleIsShowEdite (id) {
            this.stationId = id;
            this.isShowEdite = !this.isShowEdite;
        },

        async toggleStation (id) {
            const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/${id}/`;
            let data = this.getStations.results.filter(station => station.id === id)[0];

            data.is_active = !data.is_active;
            data.region_id = 1;

            try {
                const response = await axios.put(url, data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    async mounted () {
        await this.fetchStations();
        await this.fetchTariffs();

        this.price = this.getTariffs[0].price;
        this.specialPrice = this.getTariffs[0].special_price;

        console.log(this.getTariffs);
    }
}

</script>