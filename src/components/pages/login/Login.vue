<template>
    <div class="login__container">
        <div class="login__left">
            <div class="login__content">
                <div class="login__logo">
                    <img src="@/assets/images/static/login/logo.png" alt="Logo" class="login__logo-img">
                </div>
                <div class="login__content">
                    <h1 class="login__title">{{ $t("Login.title") }}</h1>
                    <p class="login__text">{{ $t("Login.text") }}</p>
                </div>
                <form class="login__form">
                    <div class="login__input-container">
                        <input type="text" class="login__input" :placeholder="$t('Login.login')" v-model="login">
                    </div>
                    <div class="login__input-container">
                        <input type="password" class="login__input" :placeholder="$t('Login.password')" v-model="password" ref="password">
                        <span class="login-icon" @click="togglePassword">
                            <img src="@/assets/images/icons/login/password.svg" alt="password" class="logo-icon-svg">
                        </span>
                    </div>
                    <!-- <div class="login__check-container">
                        <div>
                            <input type="checkbox" id="cb1"> 
                            <label for="cb1" class="login__check-label">Чужой компьютер </label>
                        </div>
                    </div> -->
                    <button class="login__submit" type="button" @click="sendLoginAndPassword">{{ $t("Login.button") }}</button>
                </form>
            </div>
        </div>
        <div class="login__right">
            <img src="@/assets/images/static/login/login-bg.png" alt="Login-bg" class="login__bg-img">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Validator from '@/scriprts/validator';

const env = import.meta.env;

export default {
    data: () => ({
        login: '',
        password: ''
    }),

    computed: {
        validate () {
            const validate = new Validator({
                fields: '.login__input',
                //checkboxes: '.login__check'
            });

            return validate.validateEmptyInputs();
        },
    },

    methods: {
        togglePassword () {
            this.$refs.password.getAttribute('type') === 'password' ? this.$refs.password.setAttribute('type', 'text') : this.$refs.password.setAttribute('type', 'password');
        },

        async sendLoginAndPassword () {
            const URL = `${env.VITE_APP_HOST_LINK}/v1/dashboard/auth/login/`;

            const username = this.login;
            const password = this.password;

            const data = { username, password }

            if (this.validate) {
                try {
                    const response = await axios.post(URL, data, {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-CSRFTOKEN': env.VITE_APP_CSRFTOKEN
                        },
                    })

                    const { access, refresh } = response.data;

                    localStorage.setItem('access', access);
                    localStorage.setItem('refresh', refresh);

                    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
                        this.$router.push('/dashboard');
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
</script>