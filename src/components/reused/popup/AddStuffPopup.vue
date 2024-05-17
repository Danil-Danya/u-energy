<template>
    <transition name="add">
        <div class="add" v-if="isShow">
            <div class="add__container">
                <div class="add__popup">
                    <h2 class="title add__popup-title">Добавить Сотрудника</h2>
                    <input type="text" class="settings-input add-input" v-model="firstName" :placeholder="'Имя'">
                    <input type="text" class="settings-input add-input" v-model="last_name" :placeholder="'Фамилия'">
                    <input type="text" class="settings-input add-input" v-model="balance" placeholder="Баланс">
                    <input type="number" class="settings-input add-input" v-model="tell" :placeholder="'Телефон'">
                    <input type="text" class="settings-input add-input" v-model="password" :placeholder="'Пароль'">
                    <div class="add__popup-button-container">
                        <button class="add__popup-button" @click="toggleIsShow">{{$t('Stations.exit')}}</button>
                        <button class="add__popup-button" @click="addStuff">{{$t('Stations.save')}}</button>
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
        firstName: '',
        lastName: '',
        tell: '',
        password: '',
        balance: 0
    }),

    props: {
        isShow: Boolean
    },

    computed: {
        validateInputs () {
            const validator = new Validator ({
                fields: '.add-input',
            })

            return validator.validateEmptyInputs();
        }
    },

    methods: {
        toggleIsShow () {
            this.$emit('toggleIsShow');
        },

        async addStuff () {
            const data = { 
                first_name: this.firstName,
                last_name: this.lastName,
                phone_number: `+${this.tell}`,
                password: this.password,
                balance: this.balance
            };

            try {
                if (this.validateInputs) {
                    const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/staff/`;

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

