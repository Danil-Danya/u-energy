<template>
    <div class="user__menagement">
        <div class="user__menagement-container">
            <userMenagement  @update:inputs="sendUserInView" />
            <div class="user__orders">
                <userFilter />
                <userHistory />
            </div>
        </div>
        <div class="user__save">
            <div class="user__buttons">
                <button class="user__button user__button-delete" @click="deleteUser">Удалить</button>
                <button class="user__button user__button-save" @click="editeUser(inputs)">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/user_menagement/user_menagement.scss';
    @import '@/assets/styles/pages/user_menagement/user_history.scss';
</style>

<script>
import userHistory from '@/components/pages/user_managment/UserHistory.vue';
import userMenagement from '@/components/pages/user_managment/UserMenage.vue';
import userFilter from '@/components/pages/user_managment/UserFilter.vue';

import axios from 'axios';

const env = import.meta.env;

export default {
    data: () => ({
        userId: 0,
        inputs: []
    }),

    components: {
        userHistory,
        userMenagement,
        userFilter
    },

    methods: {
        sendUserInView(inputs) {
            this.inputs = inputs;
        },

        async editeUser (inputs) {
            const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/users/${this.userId}/`;

            if (this.inputs.length !== 0) {
                const data = {
                    phone_number: `+${this.inputs[0].value}`,
                    first_name: this.inputs[2].value,
                    last_name: this.inputs[3].value,
                    balance: this.inputs[4].value
                }

                if (this.inputs[1].value)
                    data.password = this.inputs[1].value;

                try {
                    const response = await axios.patch(url, data, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`,
                            'X-CSRFTOKEN': env.VITE_APP_CSRFTOKEN
                        }
                    })

                    if (response)
                        location.reload();
                }
                catch (error) {
                    console.log(error);
                }
            } 
        },

        async deleteUser () {
            const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/users/${this.userId}/`;

            try {
                const response = await axios.delete(url, {
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        'X-CSRFTOKEN': env.VITE_APP_CSRFTOKEN
                    }
                })

                if (response)
                    this.$router.push('client-base');
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    mounted () {
        this.userId = this.$route.query.user_id
    }
}

</script>