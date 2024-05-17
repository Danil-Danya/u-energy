<template>
    <div class="navbar">
        <div class="navbar__container">
            <form class="navbar__form search__form">
                <img src="@/assets/images/icons/navbar/search.svg" alt="Loop" class="search__form-icon">
                <input type="text" class="search__form-input" :placeholder="$t('Navbar.search')">
            </form>
            <div class="navbar__user">
                <div class="navbar__alert">
                    <img src="@/assets/images/icons/navbar/notification.svg" alt="Icon" class="navbar__alert-img">
                </div>
                <div class="navbar__avatar" @click.stop="togglePopup">
                    <img src="@/assets/images/static/navbar/default-avatar.jpg" alt="Avatar" class="navbar__avatar-img">
                    <div class="navbar__avatar-initial">
                        <h2 class="navbar__avatar-name">U-Energy</h2>
                        <p class="navbar__avatar-role">Администратор</p>
                    </div>
                </div>
            </div>
        </div>
        <transition name="navbar-popup">
            <navbarPopup v-show="popup" />
        </transition>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/layout/navbar.scss';
</style>

<script>
import navbarPopup from '@/components/reused/popup/NavbarPopup.vue';

export default {
    data: () => ({
        popup: false
    }),

    components: {
        navbarPopup
    },

    methods: {
        togglePopup () {
            this.popup ? this.popup = false : this.popup = true;
        },

        closePopup () {
            this.popup = false;
        }
    },

    mounted () {
        document.addEventListener('click', (e) => this.closePopup())
    }
}

</script>