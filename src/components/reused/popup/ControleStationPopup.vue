<template>
    <transition name="add">
        <div class="add" v-if="isShowControle && station">
            <div class="add__container">
                <div class="add__popup">
                    <div class="add__controle">
                        <h2 class="add__title title">{{ $t('Stations.popupControl.title') }}: {{ $i18n.locale === 'ru' ? station.title_ru : station.title_en }} </h2>
                        <div class="add__controle-item" v-for="(port, index) in station.ports" :key="port">
                            <div class="switcher__container">
                                <label class="switch">
                                    <input type="checkbox" v-model="is_charging[index]" @input="startAndStop(port)">
                                    <span class="slider round"></span>
                                </label>
                                <p class="add__popup-text"> {{ $i18n.locale === 'ru' ? port.title_ru : port.title_en }}</p>
                            </div>
                            <div class="port__status">
                                <div class="port__status-container" v-for="(status, index) in statusList" :key="status">
                                    <div class="port__status-available" :class="`port__status-${status.color}`" v-if="port.status === 'Available' && port.status === status.status">
                                        <p class="port__status-text">{{ $i18n.locale === 'ru' ? status.statusRu : status.statusEng }}</p>
                                    </div>
                                    <div class="port__status-notavailable" :class="`port__status-${status.color}`" v-if="port.status !== 'Available' && port.status === status.status">
                                        <p class="port__status-text">{{ $i18n.locale === 'ru' ? status.statusRu : status.statusEng }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="batary__status">
                                <div class="batary__status-container">
                                    <div class="batary__item" v-for="(batary, index) in bataryList" :key="batary">
                                        <img :src="batary.img" alt="Icon" class="batary__img" v-if="batary.percentageMax < port.percentage && batary.percentageMin > port.percentage">
                                        <img src="@/assets/images/icons/stations/batary/not_batary.svg" alt="Icon" v-else-if="index === 0">
                                    </div>
                                </div>
                                <p class="add__popup-text">{{ port.percentage ? port.percentage : '0' }}%</p>
                            </div>
                        </div>
                        <div class="add__popup-button-container">
                            <button class="add__popup-button" @click="toggleIsShowControle">{{$t('Stations.exit')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

const env = import.meta.env;

export default {
    data: () => ({
        statusList: [
            { statusRu: 'Свободно', statusEng: 'Available', status: 'Available', color: 'green' },
            { statusRu: 'Подготовка', statusEng: 'Preparing', status: 'Preparing', color: 'yelow' },
            { statusRu: 'Зарядка', statusEng: 'Charging', status: 'Charging', color: 'red' },
            { statusRu: 'Завершение', statusEng: 'Finishing', status: 'Finishing', color: 'blue' },
            { statusRu: 'Завершено', statusEng: 'Finished', status: 'Finished', color: 'green' },
        ],
        bataryList: [
            { img: require('@/assets/images/icons/stations/batary/20.svg'), percentageMax: 20, percentageMin: 0 },
            { img: require('@/assets/images/icons/stations/batary/40.svg'), percentageMax: 40, percentageMin: 20 },
            { img: require('@/assets/images/icons/stations/batary/60.svg'), percentageMax: 60, percentageMin: 40 },
            { img: require('@/assets/images/icons/stations/batary/80.svg'), percentageMax: 80, percentageMin: 60 },
            { img: require('@/assets/images/icons/stations/batary/100.svg'), percentageMax: 100, percentageMin: 80 },
        ],
        isShowControle: false,
        is_charging: [],
        station: {},
    }),

    props: {
        isShowControle: Boolean,
        stationId: Number,
    },

    computed: {
        ...mapGetters(['getGlobalStations']),
    },

    methods: {
        ...mapActions(['fetchGlobalStation']),

        async scheduleUpdate() {
            await this.fetchGlobalStation();
            setTimeout(() => this.scheduleUpdate(), 10000);
        },

        toggleIsShowControle () {
            this.$emit('toggleIsShowControle');
        },

        calcProgressBar () {
            // pass
        },

        async startAndStop (port) {
            const URLForStatrt = `${env.VITE_APP_HOST_LINK}/v1/station/start-charging-session/`;
            const URLForStop = `${env.VITE_APP_HOST_LINK}/v1/station/stop-charging-session/`;

            const data = {
                station_id: this.stationId,
                port_id: port.id
            }

            console.log({
                front_data: data
            });

            try {
                const response = await axios.post(port.status === 'Preparing' ? URLForStatrt : URLForStop, data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        'X-CSRFTOKEN': env.VITE_APP_CSRFTOKEN
                    }
                })

                console.log(response);
    
                await this.fetchGlobalStation();
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    watch: {
        'stationId': {
            handler () {
                if (this.stationId !== 0) {
                    const foundStation = this.getGlobalStations.find(station => station.id === this.stationId);
                    this.station = foundStation;
                    this.is_charging = this.station.ports.map(item => item.is_charging);
                }
            }
        },
        'getGlobalStations': {
            handler () {
                // this code 
                if (this.stationId !== 0) {
                    const foundStation = this.getGlobalStations.find(station => station.id === this.stationId);
                    this.station = foundStation;
                    this.is_charging = this.station.ports.map(item => item.is_charging);
                }
            }
        }
    },

    async mounted () {
        await this.fetchGlobalStation();
        await this.scheduleUpdate();
    }
}

</script>