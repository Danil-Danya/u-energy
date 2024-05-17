<template>
    <div class="navbar__popup">
        <div class="navbar__popup-container">
            <div class="navbar__popup-avatar">
                <img src="@/assets/images/icons/navbar/verify.svg" alt="" class="navbar__popup-verify">
                <img src="@/assets/images/static/navbar/default-avatar.jpg" alt="Avatar" class="navbar__avatar-img">
                <div class="navbar__avatar-initial">
                    <h2 class="navbar__avatar-name">U-Energy</h2>
                    <p class="navbar__avatar-role">Администратор</p>
                </div>
            </div>
            <span class="navbar__popup-line"></span>
            <div class="navbar__popup-links">
                <ul class="navbar__popup-ul">
                    <li v-for="(link, index) in links" :key="link">
                        <router-link :to="link.path" class="navbar__popup-link">
                            <img :src="linksIcon[index]" alt="" class="navbar__popup-icon">
                            <p class="navbar__popup-text">{{ link.text }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <span class="navbar__popup-line"></span>
            <div class="navbar__language">
                <img src="@/assets/images/icons/navbar/russia.svg" alt="Lang" class="navbar__language-img" @click="toggleLanguage('ru')">
                <img src="@/assets/images/icons/navbar/uk.svg" alt="Lang" class="navbar__language-img"  @click="toggleLanguage('eng')">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/reused/popup/navbarPopup.scss';
</style>

<script>

export default {
    data: () => ({
        links: [
            {
                path: '/settings/all',
                icon: require('@/assets/images/icons/navbar/settings.svg'),
                text: 'Настройки'
            },
            {
                path: '/login',
                icon: require('@/assets/images/icons/navbar/exit.svg'),
                text: 'Выход'
            },
        ],

        linksIcon: [
            require('@/assets/images/icons/navbar/settings.svg'),
            require('@/assets/images/icons/navbar/exit.svg'),
        ]
    }),

    methods: {
        toggleLanguage (lang) {
            this.$i18n.locale = lang;
            localStorage.setItem('locale', lang);
            location.reload();
        }
    },

    mounted () {
        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.links = messages[lang].Navbar.links;
    }
}

</script>