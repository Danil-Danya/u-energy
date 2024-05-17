<template>
    <div class="user__menage">
        <div class="user__menage-container">
            <h2 class="title user__menage-title">Управление пользователем</h2>
            <div class="user__menage-info">
                <div class="user__menage-name">
                    <img src="@/assets/images/static/clients/default-avatar.jpg" alt="Avatar" class="user__menage-avatar">
                    <p class="user__menage-text">{{ getUser.first_name }} {{ getUser.last_name }}</p>
                </div>
                <div class="user__menage-login">
                    <a href="tel:+998909999999">
                        <p class="user__menage-text">{{ getUser.phone_number }}</p>
                    </a>
                </div>
                <div class="user__menage-block">
                    <p class="user__menage-text user__menage-text-block" v-if="isUserActive">Заблокировать</p>
                    <p class="user__menage-text user__menage-text-block" v-else>Разблокировать</p>
                    <label class="switch">
                        <input type="checkbox" v-model="isUserActive">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="user__menage-edite">
                <div class="user__menage-edite-container" v-for="input in inputs" :key="input">
                    <div class="user__menage-input-container">
                        <label class="title user__menage-label">{{input.name}}</label>
                        <input :type="input.type" class="user__menage-input" v-model="input.value" @input="onInput">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        inputs: [
            { name: 'Телефон', type: 'number' },
            { name: 'Пароль', type: 'password' },
            { name: 'Имя', type: 'text' },
            { name: 'Фамилия', type: 'text' },
            { name: 'Баланс', type: 'number' },
        ],
        values: [],
        isUserActive: true,
        userId: 0,
    }),

    computed: {
        ...mapGetters(['getUser'])
    },

    methods: {
        ...mapActions(['fetchOneUser']),
        
        onInput () {
            this.$emit('update:inputs', this.inputs);
        }
    },

    async mounted () {
        this.userId = this.$route.query.user_id;
        console.log(this.getUser);

        await this.fetchOneUser(this.userId);

        this.values = [
            this.getUser.phone_number,
            this.getUser.password,
            this.getUser.first_name,
            this.getUser.last_name,
            this.getUser.balance,
        ]

        this.inputs.forEach((input, index) => {
            input.value = this.values[index];

            if (!isNaN(Number(input.value))) {
                input.value = Number(input.value);
            }
        });
    }
}

</script>