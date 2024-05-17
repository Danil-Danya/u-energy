<template>
    <div class="admin__user">
        <div class="admin__user-container">
            <div class="admin__user-login admin__user-item" ref="login">
                <h2 class="title admin__user-title">{{ $t('Settings.AdminPanel.login') }}</h2>
                <div class="admin__user-input-container">
                    <input type="text" class="settings-input" v-model="login" ref="login">
                </div>
            </div>
            <div class="admin__user-password admin__user-item">
                <h2 class="title admin__user-title">{{ $t('Settings.AdminPanel.password') }}</h2>
                <div class="admin__user-input-container">
                    <input type="password" class="settings-input" v-model="password" ref="password">
                    <img src="@/assets/images/icons/settings/password.svg" alt="Icon" class="admin__user-password-icon" @click="toggleShowPassword">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        toggleShowPassword () {
            if (this.$refs.password.type === 'password') {
                this.$refs.password.type = 'text';
            }
            else if (this.$refs.password.type === 'text') {
                this.$refs.password.type = 'password';
            }
        }
    },

    mounted () {
        if (this.$i18n.locale === 'eng') {
            this.$refs.login.style.gap = '330px'
        }
    }
}

</script>