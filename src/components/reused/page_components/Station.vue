<template>
    <div class="station">
        <div class="station__container">
            <div class="station__item" v-for="(item, index) in getStations.results" :key="item" v-if="getStations.results">
                <div class="station__bar">
                    <div class="station__image-container">
                        <img src="@/assets/images/static/stations/station.png" alt="Station" class="station__image">
                    </div>
                    <div class="station__button-container">
                        <label class="switch">
                            <input type="checkbox" :checked="item.is_active" @input="toggleStation(item.id)">
                            <span class="slider round"></span>
                        </label>
                        <a :href="`https://yandex.uz/maps/10335/${item.region.title}/?pt=${item.lon}%2C${item.lat}`" class="station__button">
                            <img src="@/assets/images/icons/stations/location.svg" alt="Icon" class="station__icon">
                        </a>
                        <button class="station__button" @click="toggleIsShowEdite(item.id)">
                            <img src="@/assets/images/icons/stations/settings.svg" alt="Icon" class="station__icon">
                        </button>
                        <button class="station__button" @click="toggleIsShowControle(item.id)">
                            <img src="@/assets/images/icons/stations/station.svg" alt="Icon" class="station__icon">
                        </button>
                    </div>
                </div>
                <h2 class="title station__title">{{ $i18n.locale === 'ru' ? item.title_ru : item.title_en }}</h2>
                <p class="station__text">{{ $i18n.locale === 'ru' ? item.address_ru : item.address_en }}</p>
                <h3 class="station__price">1 {{ $t('Stations.unit') }} - {{ price }} {{ $t('Stations.valute') }}, <span> {{ specialPrice }} {{ $t('Stations.sale') }} </span></h3>
            </div>
            <Skeleton v-for="skelet in 9" :key="skelet" v-else />
        </div>
    </div>
    <div>
        <ControleStationPopup :isShowControle="isShowControle" :stationId="stationId" @toggleIsShowControle="toggleIsShowControle"/>
        <EditStationPopup :isShowEdite="isShowEdite" :stationId="stationId" @toggleIsShowEdite="toggleIsShowEdite"/>
    </div>
</template>

<script>
import Skeleton from '../preloaders/Skeleton.vue';
import ControleStationPopup from '../popup/ControleStationPopup.vue';
import EditStationPopup from '../popup/EditStationPopup.vue';

import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

const env = import.meta.env;

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
        EditStationPopup
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