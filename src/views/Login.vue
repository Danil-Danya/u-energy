<template>
    <div class="login-components">
        <Login />
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/login/login.scss';
</style>

<script>
import Login from '@/components/pages/login/Login.vue';

export default {
    components: {
        Login
    }
}

</script>