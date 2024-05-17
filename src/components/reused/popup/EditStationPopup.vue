<template>
    <transition name="add">
        <div class="add" v-if="isShowEdite && station">
            <div class="add__container">
                <div class="add__popup">
                    <h2 class="title add__popup-title">{{ $t('Stations.popupAdd.titleEdite') }}: {{ station.title }}</h2>
                    <input type="text" class="settings-input" v-model="title" :placeholder="$t('Stations.popupAdd.name')">
                    <input type="text" class="settings-input" v-model="address" :placeholder="$t('Stations.addPopup.address')">
                    <!-- <input type="text" class="settings-input" v-model="region.title" placeholder="Регион"> -->
                    <input type="number" class="settings-input" v-model="lat" :placeholder="$t('Stations.popupAdd.lat')">
                    <input type="number" class="settings-input" v-model="lon" :placeholder="$t('Stations.popupAdd.long')">
                    <div class="switcher__container">
                        <label class="switch">
                            <input type="checkbox" v-model="active" @click="toggleActive">
                            <span class="slider round"></span>
                        </label>
                        <p class="add__popup-text">{{ activeMessage }}</p>
                    </div>
                    <div class="add__popup-button-container add__popup-button-container-edite">
                        <div class="add__popup-button-container-left">
                            <button class="add__popup-button" @click="toggleIsShowEdite">{{$t('Stations.exit')}}</button>
                            <button class="add__popup-button" @click="editeStation">{{$t('Stations.save')}}</button>
                        </div>
                        <div class="add__popup-button-container-right">
                            <button class="add__popup-button delete" @click="deleteStation">{{$t('Stations.delete')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';
import Validator from '@/scriprts/validator';

import { mapActions, mapGetters } from 'vuex';

const env = import.meta.env;

export default {
    data: () => ({
        isShowEdite: false,
        active: true,
        activeMessage: 'Включено',
        apiActiveStatus: 'active',
        title: '',
        address: '',
        lat: '',
        lon: '',
        region: 1,
        station: {}
    }),

    props: {
        isShowEdite: Boolean,
        stationId: Number
    },

    computed: {
        ...mapGetters(['getStations']),

        validateInputs () {
            const validator = new Validator ({
                fields: '.settings-input',
            })

            return validator.validateEmptyInputs();
        }
    },

    methods: {
        ...mapActions(['fetchStations']),

        toggleIsShowEdite () {
            this.$emit('toggleIsShowEdite');
        },

        toggleActive () {
            if (this.active) {
                this.active = false;
                this.activeMessage = 'Выключено';
                this.apiActiveStatus = 'disactive';
            }
            else {
                this.active = true;
                this.activeMessage = 'Включено'
                this.apiActiveStatus = 'active';
            }
        },

        async editeStation () {
            const data = { 
                lat: this.lat, 
                lon: this.lon,
                title: this.title, 
                region_id: this.region,
                address: this.address,
                is_active: this.active, 
                status: this.apiActiveStatus 
            };

            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/${this.stationId}/`;

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
        },

        async deleteStation () {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/${this.stationId}/`;

                const response = await axios.delete(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                })

                location.reload();
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    watch: {
        'stationId': {
            handler () {
                const foundStation = this.getStations.results.find(station => {
                    return station.id === this.stationId
                });
                
                if (foundStation) {
                    this.station = foundStation;
                    this.active = this.station.is_active;
    
                    this.title = this.station.title;
                    this.address = this.station.address;
    
                    this.lat = this.station.lat;
                    this.lon = this.station.lon;
                }

            },
            deep: true
        }
    },

    async mounted () {
        await this.fetchStations;
    }
}

</script>