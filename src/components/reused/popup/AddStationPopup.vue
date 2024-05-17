<template>
    <transition name="add">
        <div class="add" v-if="isShow">
            <div class="add__container">
                <div class="add__popup">
                    <h2 class="title add__popup-title">{{$t('Stations.popupAdd.titleAdd')}}</h2>
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
                    <div class="add__popup-button-container">
                        <button class="add__popup-button" @click="toggleIsShow">{{$t('Stations.exit')}}</button>
                        <button class="add__popup-button" @click="addStation">{{$t('Stations.save')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';
import Validator from '@/scriprts/validator';

const env = import.meta.env;

export default {
    data: () => ({
        isShow: false,
        active: true,
        activeMessage: 'Включено',
        apiActiveStatus: 'active',
        title: '',
        address: '',
        lat: '',
        lon: '',
        region: 1
    }),

    props: {
        isShow: Boolean
    },

    computed: {
        validateInputs () {
            const validator = new Validator ({
                fields: '.settings-input',
            })

            return validator.validateEmptyInputs();
        }
    },

    methods: {
        toggleIsShow () {
            this.$emit('toggleIsShow');
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

        async addStation () {
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
                if (this.validateInputs) {
                    const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/`;

                    const response = await axios.post(url, data, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }
                    })

                    location.reload();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}

</script>